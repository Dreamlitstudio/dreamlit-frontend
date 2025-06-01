import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Text,
  VStack,
  Spinner,
  useToast,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Order {
  items: { title: string; unit_price: number }[];
  buyerEmail: string;
  status?: string;
  date?: string;
}

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const toast = useToast();

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar las órdenes.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (index: number, newStatus: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/orders/${index}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) throw new Error();

      const updated = [...orders];
      updated[index].status = newStatus;
      setOrders(updated);

      toast({
        title: "Estado actualizado",
        description: "La orden se actualizó correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <Box p={8} maxW="md" mx="auto" textAlign="center">
        <Heading mb={4}>Acceso restringido</Heading>
        <Text mb={2}>Ingresa la contraseña de administrador</Text>
        <Input
          type="password"
          placeholder="Contraseña"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          mb={3}
        />
        <Button
          colorScheme="teal"
          onClick={() => {
            if (passwordInput === import.meta.env.VITE_ADMIN_PASSWORD) {
              setAuthenticated(true);
            } else {
              toast({
                title: "Contraseña incorrecta",
                description: "La contraseña ingresada no es válida.",
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          Entrar
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
        <Text mt={4}>Cargando órdenes...</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Panel de Administrador</Heading>
      <Table variant="simple" bg="white" borderRadius="md" overflow="hidden">
        <Thead bg="gray.100">
          <Tr>
            <Th>Fecha</Th>
            <Th>Email</Th>
            <Th>Productos</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order, index) => (
            <Tr key={index}>
              <Td>{new Date(order.date || "").toLocaleDateString()}</Td>
              <Td>{order.buyerEmail}</Td>
              <Td>
                <VStack align="start">
                  {order.items.map((item, i) => (
                    <Text key={i}>
                      {item.title} - ${item.unit_price} MXN
                    </Text>
                  ))}
                </VStack>
              </Td>
              <Td>
                <Select
                  value={order.status || "pendiente"}
                  onChange={(e) => updateOrderStatus(index, e.target.value)}
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en producción">En producción</option>
                  <option value="enviado">Enviado</option>
                  <option value="recibido">Recibido</option>
                </Select>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminPanel;
