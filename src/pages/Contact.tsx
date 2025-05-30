// src/pages/Contact.tsx
import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Todos los campos son obligatorios",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("https://dreamlit-backend.onrender.com/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        toast({
          title: "Mensaje enviado 📨",
          description: "Gracias por escribirnos. Te responderemos pronto.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setForm({ name: "", email: "", message: "" });
      } else {
        throw new Error("Error al enviar");
      }
    } catch (error) {
      toast({
        title: "Ocurrió un error",
        description: "Intenta de nuevo más tarde.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box px={{ base: 4, md: 10 }} py={10} minH="100vh">
      <VStack spacing={5} align="start" w="100%" maxW="600px" mx="auto">
        <Heading size="lg" color="#225059" textAlign="center" w="full">
          Contáctanos 💌
        </Heading>
        <Text fontSize="md" color="gray.700">
          Si tienes dudas, comentarios o deseas una personalización especial, escríbenos. Te responderemos lo antes posible.
        </Text>
        <Input
          name="name"
          placeholder="Tu nombre"
          value={form.name}
          onChange={handleChange}
          bg="white"
        />
        <Input
          name="email"
          type="email"
          placeholder="Tu correo electrónico"
          value={form.email}
          onChange={handleChange}
          bg="white"
        />
        <Textarea
          name="message"
          placeholder="Cuéntanos tu idea o mensaje..."
          value={form.message}
          onChange={handleChange}
          bg="white"
          rows={5}
        />
        <Button
          onClick={handleSubmit}
          isLoading={loading}
          bg="#225059"
          color="white"
          _hover={{ bg: "#1b4047" }}
          w="full"
        >
          Enviar mensaje
        </Button>
      </VStack>
    </Box>
  );
};

export default Contact;
