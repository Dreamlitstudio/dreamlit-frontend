import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Image,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const { orders } = useOrder();
  const navigate = useNavigate();

  return (
    <Box p="10">
      <VStack spacing={5} align="start">
        <Heading size="lg">Historial de Pedidos</Heading>

        {orders.length === 0 ? (
          <Text>No hay pedidos realizados aún.</Text>
        ) : (
          orders.map((order, orderIndex) => (
            <Box
              key={orderIndex}
              p="5"
              borderWidth="1px"
              borderRadius="md"
              w="100%"
              maxW="600px"
              mb="5"
            >
              <VStack align="start" spacing={3}>
                <Text fontSize="lg" fontWeight="bold">
                  Pedido #{orderIndex + 1}
                </Text>
                <Divider />

                {/* Validación para evitar errores */}
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, itemIndex) => (
                    <HStack spacing={5} key={itemIndex} w="100%">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        boxSize="120px"
                        borderRadius="md"
                      />
                      <VStack align="start" spacing={1} w="100%">
                        <Text fontSize="xl" fontWeight="bold">
                          {item.name}
                        </Text>
                        <Text color="gray.600">Personalización:</Text>
                        <Text
                          fontSize="2xl"
                          fontFamily="'Naishila Dancing Script', cursive"
                          color="blackAlpha.800"
                        >
                          {item.customName}
                        </Text>
                        <Text color="gray.600">Precio: ${item.price} MXN</Text>
                        <Button
                          colorScheme="teal"
                          size="sm"
                          onClick={() =>
                            navigate("/customize", { state: { lamp: item } })
                          }
                        >
                          Personalizar de Nuevo
                        </Button>
                      </VStack>
                    </HStack>
                  ))
                ) : (
                  <Text>No hay artículos en este pedido.</Text>
                )}
              </VStack>
            </Box>
          ))
        )}
      </VStack>
    </Box>
  );
};

export default OrderHistory;
