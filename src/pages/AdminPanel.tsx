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
  Input,
  Button,
  useToast,
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";

interface Order {
  id: string;
  buyer_email: string;
  first_name: string;
  last_name: string;
  external_reference: string;
  status: string;
  items: any; // puede ser string (JSON) o array
  created_at: string;
}

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const cancelRef = useRef(null);
  const toast = useToast();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "";

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders`);
      const data = await response.json();
      setOrders(data);
    } catch {
      toast({
        title: "Error",
        description: "No se pudieron cargar las órdenes.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, newStatus: string) => {
    const res = await fetch(`${BACKEND_URL}/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      );
      toast({ title: "Estado actualizado", status: "success" });
    }
  };

  const deleteOrder = async () => {
    if (!deleteId) return;
    const res = await fetch(`${BACKEND_URL}/orders/${deleteId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o.id !== deleteId));
      toast({ title: "Orden eliminada", status: "info" });
    }
    setDeleteId(null);
  };

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <Box p={8} textAlign="center">
        <Heading mb={4}>Acceso restringido</Heading>
        <Input
          type="password"
          placeholder="Contraseña de administrador"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          mb={4}
        />
        <Button
          onClick={() => {
            if (passwordInput === ADMIN_PASSWORD) {
              setAuthenticated(true);
            } else {
              toast({
                title: "Contraseña incorrecta",
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
            <Th>Nombre</Th>
            <Th>Productos</Th>
            <Th>Estado</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => {
            let itemsArray: any[] = [];

            try {
              const raw = order.items;
              if (typeof raw === "string") {
                const parsed = JSON.parse(raw);
                itemsArray = Array.isArray(parsed) ? parsed : [];
              } else if (Array.isArray(raw)) {
                itemsArray = raw;
              }
            } catch (e) {
              itemsArray = [];
            }

            return (
              <Tr key={order.id}>
                <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
                <Td>{order.buyer_email}</Td>
                <Td>{order.first_name} {order.last_name}</Td>
                <Td>
                  <VStack align="start">
                    {itemsArray.length > 0 ? (
                      itemsArray.map((item: any, i: number) => (
                        <Text key={i}>
                          {item.title} - ${item.unit_price} MXN
                        </Text>
                      ))
                    ) : (
                      <Text color="red.500">⚠️ No se pudieron mostrar productos</Text>
                    )}
                  </VStack>
                </Td>
                <Td>
                  <Select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="en producción">En producción</option>
                    <option value="enviado">Enviado</option>
                    <option value="recibido">Recibido</option>
                  </Select>
                </Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Eliminar orden"
                    onClick={() => setDeleteId(order.id)}
                    size="sm"
                    colorScheme="red"
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={!!deleteId}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteId(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              ¿Eliminar orden?
            </AlertDialogHeader>

            <AlertDialogBody>
              Esta acción no se puede deshacer.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDeleteId(null)}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={deleteOrder} ml={3}>
                Eliminar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminPanel;
