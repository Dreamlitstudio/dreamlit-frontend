import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../context/CartContext";

const ThankYou = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <Box p={{ base: 5, md: 10 }} textAlign="center">
      <VStack spacing={5}>
        <Heading size="lg" color="#225059">
          ¡Gracias por tu compra!
        </Heading>
        <Text fontSize="md">
          Hemos recibido tu pedido y pronto nos pondremos en contacto contigo para la confirmación y el envío.
        </Text>
        <Button colorScheme="teal" onClick={() => navigate("/catalog")}>
          Seguir Comprando
        </Button>
      </VStack>
    </Box>
  );
};

export default ThankYou;
