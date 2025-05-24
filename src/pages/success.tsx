import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Box, Heading, Text } from "@chakra-ui/react";

const SuccessPage = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <Box p={10} textAlign="center">
      <Heading size="lg">¡Gracias por tu compra!</Heading>
      <Text mt={4}>Tu pedido ha sido procesado exitosamente.</Text>
    </Box>
  );
};

export default SuccessPage;
