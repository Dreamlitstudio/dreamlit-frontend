// src/pages/LandingPage.tsx
import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Configura Supabase con tus variables de entorno
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL!,
  process.env.REACT_APP_SUPABASE_ANON_KEY!
);

const LandingPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !email || !accepted) {
      alert("Por favor completa todos los campos y acepta la política.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("promo_access").insert([
      {
        name,
        email,
        accepted: true,
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Error al guardar tus datos. Intenta más tarde.");
      console.error(error);
    } else {
      setSuccess(true);

      // Redirige en 2 segundos
      setTimeout(() => {
        navigate("/promo-catalog");
      }, 2000);
    }
  };

  return (
    <Box bg="#FAF3DF" minH="100vh" py={12}>
      <Container maxW="md" bg="white" p={8} borderRadius="md" boxShadow="md">
        <VStack spacing={6} align="stretch">
          <Heading size="lg" textAlign="center" color="#225059">
            Acceso exclusivo
          </Heading>
          <Text textAlign="center" fontSize="sm" color="gray.600">
            Ingresa tus datos y acepta la política de privacidad para acceder a precios especiales.
          </Text>

          {success && (
            <Alert status="success" borderRadius="md">
              <AlertIcon />
              ✅ Gracias, te estamos redirigiendo...
            </Alert>
          )}

          {!success && (
            <>
              <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Checkbox
                isChecked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
              >
                Acepto la política de privacidad
              </Checkbox>
              <Button
                bg="#225059"
                color="#FAF3DF"
                _hover={{ bg: "#2c6b74" }}
                isLoading={loading}
                onClick={handleSubmit}
              >
                Acceder al catálogo especial
              </Button>
            </>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;
