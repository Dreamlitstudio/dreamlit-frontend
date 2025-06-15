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
  IconButton,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price, 0);

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
              <Text fontSize="sm" color="gray.600">
                Envío: {item.shippingType === "standard" ? "Estándar (Gratis)" : "Express (+$150)"}
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

        <Box textAlign="right">
          <Text fontSize="lg" fontWeight="bold" mb="4">
            Total: ${total} MXN
          </Text>
          <Button colorScheme="teal" onClick={() => navigate("/checkout")}>
            Proceder al Pago
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default Cart;
