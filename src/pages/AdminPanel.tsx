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
  HStack,
  Flex,
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
  items: any;
  created_at: string;
  street?: string;
  number?: string;
  neighborhood?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
  phone?: string;
}

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const cancelRef = useRef(null);
  const toast = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
  const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "";

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/orders`);
      const data = await response.json();
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => (b.created_at > a.created_at ? 1 : -1))
        : [];
      setOrders(sorted);
      setFilteredOrders(sorted);
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
      applyFilters(searchTerm, filterStatus);
      toast({ title: "Estado actualizado", status: "success" });
    }
  };

  const deleteOrder = async () => {
    if (!deleteId) return;
    const res = await fetch(`${BACKEND_URL}/orders/${deleteId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const updated = orders.filter((o) => o.id !== deleteId);
      setOrders(updated);
      applyFilters(searchTerm, filterStatus, updated);
      toast({ title: "Orden eliminada", status: "info" });
    }
    setDeleteId(null);
  };

  const applyFilters = (
    term: string,
    status: string,
    ordersList = orders
  ) => {
    let filtered = ordersList;

    if (status !== "all") {
      filtered = filtered.filter((order) => order.status === status);
    }

    if (term.trim() !== "") {
      filtered = filtered.filter(
        (order) =>
          order.buyer_email.toLowerCase().includes(term.toLowerCase()) ||
          `${order.first_name} ${order.last_name}`.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  useEffect(() => {
    applyFilters(searchTerm, filterStatus);
  }, [searchTerm, filterStatus]);

  if (!authenticated) {
    return (
      <Box p={8} bg="white" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box maxW="400px" w="100%" p={8} boxShadow="md" borderRadius="lg" bg="gray.50">
          <Heading mb={6} size="md" textAlign="center">Panel Admin DreamLit</Heading>
          <Input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            mb={4}
          />
          <Button colorScheme="teal" w="100%" onClick={() => {
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
          }}>
            Entrar
          </Button>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={10} bg="white" minHeight="100vh">
        <Spinner size="xl" />
        <Text mt={4}>Cargando órdenes...</Text>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 10 }} bg="white" minHeight="100vh">
      <Heading mb={8} size="lg">Panel de Administración</Heading>

      {/* Filtros */}
      <Flex mb={6} gap={4} flexWrap="wrap">
        <Input
          placeholder="Buscar por email o nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="300px"
        />
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} maxW="200px">
          <option value="all">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en producción">En producción</option>
          <option value="enviado">Enviado</option>
          <option value="recibido">Recibido</option>
        </Select>
      </Flex>

      {/* Tabla */}
      <Box overflowX="auto" boxShadow="md" borderRadius="lg">
        <Table variant="striped" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>Fecha</Th>
              <Th>Email</Th>
              <Th>Nombre</Th>
              <Th>Dirección</Th>
              <Th>Estado</Th>
              <Th>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map(order => (
              <Tr key={order.id}>
                <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
                <Td>{order.buyer_email}</Td>
                <Td>{order.first_name} {order.last_name}</Td>
                <Td fontSize="sm">
                  {`${order.street ?? ""} ${order.number ?? ""}, ${order.city ?? ""}, ${order.state ?? ""}, CP: ${order.postal_code ?? ""}`}
                  <br />
                  {order.phone && <span>Tel: {order.phone}</span>}
                </Td>
                <Td>
                  <Select size="sm" value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                    <option value="pendiente">Pendiente</option>
                    <option value="en producción">En producción</option>
                    <option value="enviado">Enviado</option>
                    <option value="recibido">Recibido</option>
                  </Select>
                </Td>
                <Td>
                  <IconButton icon={<DeleteIcon />} aria-label="Eliminar" size="sm" colorScheme="red" onClick={() => setDeleteId(order.id)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <AlertDialog isOpen={!!deleteId} leastDestructiveRef={cancelRef} onClose={() => setDeleteId(null)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>¿Eliminar orden?</AlertDialogHeader>
            <AlertDialogBody>Esta acción no se puede deshacer.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setDeleteId(null)}>Cancelar</Button>
              <Button colorScheme="red" onClick={deleteOrder} ml={3}>Eliminar</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default AdminPanel;
