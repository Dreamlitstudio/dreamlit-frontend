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
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

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
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

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
      applyFilters(searchTerm, filterStatus, startDate, endDate, selectedMonth);
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
      applyFilters(searchTerm, filterStatus, startDate, endDate, selectedMonth, updated);
      toast({ title: "Orden eliminada", status: "info" });
    }
    setDeleteId(null);
  };

  const applyFilters = (
    term: string,
    status: string,
    start: string,
    end: string,
    month: string,
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

    if (start) {
      const startTime = new Date(start).getTime();
      filtered = filtered.filter((order) => new Date(order.created_at).getTime() >= startTime);
    }

    if (end) {
      const endTime = new Date(end).getTime();
      filtered = filtered.filter((order) => new Date(order.created_at).getTime() <= endTime);
    }

    if (month) {
      const [year, monthNum] = month.split("-");
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.created_at);
        return (
          orderDate.getFullYear() === parseInt(year) &&
          orderDate.getMonth() + 1 === parseInt(monthNum)
        );
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  useEffect(() => {
    applyFilters(searchTerm, filterStatus, startDate, endDate, selectedMonth);
  }, [searchTerm, filterStatus, startDate, endDate, selectedMonth]);

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

  // KPIs filtrados
  const totalVentas = filteredOrders.reduce((sum, order) => {
    let itemsArray: any[] = [];
    try {
      const raw = order.items;
      if (typeof raw === "string") {
        const parsed = JSON.parse(raw);
        itemsArray = Array.isArray(parsed) ? parsed : [];
      } else if (Array.isArray(raw)) {
        itemsArray = raw;
      }
    } catch {
      itemsArray = [];
    }
    const subtotal = itemsArray.reduce((acc, item) => acc + item.unit_price, 0);
    return sum + subtotal;
  }, 0);

  const ticketPromedio =
    filteredOrders.length > 0 ? (totalVentas / filteredOrders.length).toFixed(2) : "0.00";

  // Preparar datos para gráfico
  const salesByMonth = orders.reduce((acc, order) => {
    const date = new Date(order.created_at);
    const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

    let itemsArray: any[] = [];
    try {
      const raw = order.items;
      if (typeof raw === "string") {
        const parsed = JSON.parse(raw);
        itemsArray = Array.isArray(parsed) ? parsed : [];
      } else if (Array.isArray(raw)) {
        itemsArray = raw;
      }
    } catch {
      itemsArray = [];
    }

    const subtotal = itemsArray.reduce((acc, item) => acc + item.unit_price, 0);

    acc[yearMonth] = (acc[yearMonth] || 0) + subtotal;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(salesByMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, total]) => ({ month, total }));

  return (
    <Box p={8}>
      <Heading mb={6}>Panel de Administrador</Heading>

      {/* KPIs */}
      <Box mb={8} p={6} bg="gray.50" borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Resumen de Ventas (Filtrado)</Heading>
        <HStack spacing={8} flexWrap="wrap">
          <VStack><Text fontSize="sm" color="gray.600">Órdenes filtradas</Text><Text fontSize="xl" fontWeight="bold">{filteredOrders.length}</Text></VStack>
          <VStack><Text fontSize="sm" color="gray.600">Ventas totales</Text><Text fontSize="xl" fontWeight="bold">${totalVentas.toLocaleString('es-MX')} MXN</Text></VStack>
          <VStack><Text fontSize="sm" color="gray.600">Ticket promedio</Text><Text fontSize="xl" fontWeight="bold">${ticketPromedio} MXN</Text></VStack>
        </HStack>
      </Box>

      {/* Gráfico */}
      <Box mb={10} p={6} bg="white" borderRadius="md" boxShadow="sm">
        <Heading size="md" mb={4}>Ventas por Mes</Heading>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#225059" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Filtros */}
      <HStack mb={6} spacing={4} flexWrap="wrap">
        <Input placeholder="Buscar por email o nombre" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} width="200px">
          <option value="all">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en producción">En producción</option>
          <option value="enviado">Enviado</option>
          <option value="recibido">Recibido</option>
        </Select>
        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Input type="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
      </HStack>

      {/* Tabla */}
      <Table variant="simple" bg="white" borderRadius="md" overflow="hidden">
        <Thead bg="gray.100">
          <Tr>
            <Th>Fecha</Th><Th>Email</Th><Th>Nombre</Th><Th>Estado</Th><Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredOrders.map(order => (
            <Tr key={order.id}>
              <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
              <Td>{order.buyer_email}</Td>
              <Td>{order.first_name} {order.last_name}</Td>
              <Td>
                <Select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                  <option value="pendiente">Pendiente</option>
                  <option value="en producción">En producción</option>
                  <option value="enviado">Enviado</option>
                  <option value="recibido">Recibido</option>
                </Select>
              </Td>
              <Td>
                <IconButton icon={<DeleteIcon />} aria-label="Eliminar orden" onClick={() => setDeleteId(order.id)} size="sm" colorScheme="red" />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog isOpen={!!deleteId} leastDestructiveRef={cancelRef} onClose={() => setDeleteId(null)}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">¿Eliminar orden?</AlertDialogHeader>
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
