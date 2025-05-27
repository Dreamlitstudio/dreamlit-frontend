import {
  Box,
  Button,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Divider,
  useToast,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const handlePayment = async () => {
    if (!email || !email.includes("@")) {
      toast({
        title: "Correo inválido",
        description: "Por favor ingresa un correo válido.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const formattedItems = cart.map((item) => ({
        title: `${item.name} - ${item.customName}`,
        quantity: 1,
        unit_price: Number(item.price),
        currency_id: "MXN",
      }));

      console.log("🧾 Enviando a backend:", formattedItems, email);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create_preference`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: formattedItems, email }),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status}`);
      }

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se recibió un punto de inicio de pago.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al iniciar el pago. Intenta nuevamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("❌ Error en el pago:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <Box p="10" textAlign="center">
        <Heading size="md">Tu carrito está vacío</Heading>
        <Button mt="5" onClick={() => navigate("/catalog")}>
          Volver al catálogo
        </Button>
      </Box>
    );
  }

  return (
    <Box p={{ base: 5, md: 10 }}>
      <Heading size="lg" mb={5}>
        Carrito de Compras
      </Heading>
      <VStack spacing={5} align="stretch">
        {cart.map((item, index) => (
          <HStack
            key={index}
            spacing={5}
            align="flex-start"
            flexDir={{ base: "column", md: "row" }}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg="white"
          >
            <Image
              src={item.imageUrl}
              alt={item.name}
              objectFit="contain"
              maxW="120px"
              maxH="120px"
              borderRadius="md"
            />
            <Stack flex="1" spacing={1}>
              <Text fontSize="xl" fontWeight="semibold">
                {item.name}
              </Text>
              <Text fontSize="sm" color="gray.600">
                Personalización: {item.customName}
              </Text>
              <Text fontSize="md" fontWeight="bold">
                ${item.price} MXN
              </Text>
            </Stack>
            <IconButton
              icon={<FaTrash />}
              aria-label="Eliminar producto"
              colorScheme="red"
              variant="outline"
              onClick={() => removeFromCart(item.name)}
            />
          </HStack>
        ))}
        <Divider />
        <Box>
          <Text mb={2}>Correo electrónico para confirmación:</Text>
          <Input
            placeholder="tucorreo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            bg="white"
          />
        </Box>
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="bold" mb="4">
            Total: ${total} MXN
          </Text>
          <Button colorScheme="teal" onClick={handlePayment}>
            Proceder al Pago
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Cart;
