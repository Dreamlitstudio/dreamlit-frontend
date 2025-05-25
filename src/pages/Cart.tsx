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
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  const handlePayment = async () => {
    try {
      const formattedItems = cart.map((item) => ({
        title: `${item.name} - ${item.customName}`,
        quantity: 1,
        unit_price: Number(item.price),
        currency_id: "MXN",
      }));

      console.log("🧾 Enviando a backend:", formattedItems);

      const response = await fetch("https://dreamlit-backend.onrender.com/create_preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: formattedItems }),
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
    <Box p="10">
      <Heading size="lg" mb="5">
        Carrito de Compras
      </Heading>
      <VStack spacing="5" align="stretch">
        {cart.map((item, index) => (
          <HStack key={index} spacing="5">
            <Image boxSize="100px" src={item.imageUrl} alt={item.name} />
            <Stack flex="1">
              <Text fontSize="xl">{item.name}</Text>
              <Text fontSize="sm">Personalización: {item.customName}</Text>
              <Text fontSize="md" fontWeight="bold">
                $ {item.price} MXN
              </Text>
            </Stack>
          </HStack>
        ))}
        <Divider />
        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="bold" mb="4">
            Total: $ {total} MXN
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
