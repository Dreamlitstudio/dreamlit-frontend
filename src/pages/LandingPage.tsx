// src/pages/LandingPage.tsx
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    acceptPolicy: false,
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.acceptPolicy) {
      toast({
        title: "Debes aceptar la política de privacidad.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("promo_access").insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        accepted: true, // opcional si quieres registrar que aceptaron
      },
    ]);
    setLoading(false);
    if (error) {
      toast({
        title: "Error al enviar los datos.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "¡Datos enviados con éxito!",
        description: "Gracias por registrarte. Disfruta de tu descuento especial.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        acceptPolicy: false,
      });
      setTimeout(() => {
        window.location.href = "/promo-catalog";
      }, 1500);
    }
  };

  return (
    <Container maxW="md" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" color="#225059" textAlign="center">
          Acceso Exclusivo 🌟
        </Heading>
        <Text textAlign="center" color="gray.600">
          Deja tus datos para desbloquear un 15% de descuento especial en tu compra.
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Nombre completo</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Correo electrónico</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Teléfono</FormLabel>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </FormControl>
            <Checkbox
              name="acceptPolicy"
              isChecked={formData.acceptPolicy}
              onChange={handleChange}
              colorScheme="teal"
            >
              Acepto la{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#225059", textDecoration: "underline" }}
              >
                política de privacidad
              </a>
              .
            </Checkbox>
            <Button
              type="submit"
              isLoading={loading}
              colorScheme="teal"
              width="full"
            >
              Enviar y desbloquear descuento
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default LandingPage;
