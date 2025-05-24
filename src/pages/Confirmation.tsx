import {
  Box,
  Text,
  Button,
  VStack,
  Heading,
  Divider,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state;

  return (
    <Box p="10" textAlign="center">
      <Heading size="lg" mb="5">
        🎉 ¡Pedido Confirmado!
      </Heading>

      <Text fontSize="lg" mb="3">
        Gracias por tu compra, <strong>{order.customer.name}</strong>. Tu pedido
        está en preparación y será enviado a:
      </Text>

      <VStack spacing="3" mb="5">
        <Text>📍 Dirección: {order.customer.address}</Text>
        <Text>📞 Teléfono: {order.customer.phone}</Text>
      </VStack>

      <Divider my="5" />

      <Heading size="md" mb="3">
        Resumen del Pedido
      </Heading>

      {order.products.map((product: any, index: number) => (
        <Box
          key={index}
          borderWidth="1px"
          borderRadius="md"
          p="4"
          mb="2"
          textAlign="left"
        >
          <Text>
            🛋️ <strong>{product.name}</strong> 
          </Text>
          <Text>✏️ Personalización: {product.customName}</Text>
          <Text>💰 Precio: ${product.price}</Text>
        </Box>
      ))}

      <Text fontSize="xl" fontWeight="bold" mt="3">
        Total: ${order.total.toFixed(2)}
      </Text>

      <Divider my="5" />

      <VStack spacing="4">
        <Button
          colorScheme="teal"
          onClick={() => navigate("/orders")}
        >
          📑 Ver Historial de Pedidos
        </Button>

        <Button
          colorScheme="blue"
          onClick={() => navigate("/")}
        >
          🔙 Volver al Catálogo
        </Button>
      </VStack>
    </Box>
  );
};

export default Confirmation;
