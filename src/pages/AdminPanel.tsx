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
  Flex,
  Badge,
} from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { supabase } from "../lib/supabaseClient";

type OrderStatus =
  | "pendiente"
  | "en_produccion"
  | "en producción"
  | "enviado"
  | "recibido";

interface Order {
  id: string;
  created_at: string;
  status: OrderStatus;

  buyer_email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;

  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  postal_code?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;

  items: any;
  total?: number | null;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en_produccion", label: "En producción" },
  { value: "en producción", label: "En producción" },
  { value: "enviado", label: "Enviado" },
  { value: "recibido", label: "Recibido" },
];

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const ADMIN_PASSWORD = (process.env.REACT_APP_ADMIN_PASSWORD as string) || "";

  const applyFilters = useCallback(
    (term: string, status: OrderStatus | "all", list: Order[]) => {
      let filtered = list;

      if (status !== "all") {
        filtered = filtered.filter((order) => order.status === status);
      }

      const clean = term.trim().toLowerCase();
      if (clean) {
        filtered = filtered.filter((order) => {
          const email = (order.buyer_email ?? "").toLowerCase();
          const name = `${order.first_name ?? ""} ${
            order.last_name ?? ""
          }`.toLowerCase();
          return email.includes(clean) || name.includes(clean);
        });
      }

      setFilteredOrders(filtered);
    },
    []
  );

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const list = (data ?? []) as Order[];
      setOrders(list);
      applyFilters(searchTerm, filterStatus, list);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "No se pudieron cargar las órdenes.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [applyFilters, filterStatus, searchTerm, toast]);

  const updateOrderStatus = async (id: string, newStatus: OrderStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) fetchOrders();
  };

  const deleteOrder = async () => {
    if (!deleteId) return;

    await supabase.from("orders").delete().eq("id", deleteId);
    setDeleteId(null);
    fetchOrders();
  };

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated]);

  const formatAddress = (order: Order) => {
    const parts = [
      [order.street, order.number].filter(Boolean).join(" "),
      order.neighborhood,
      [order.city, order.state].filter(Boolean).join(", "),
      order.postal_code ? `CP: ${order.postal_code}` : "",
      order.country,
    ].filter(Boolean);

    return parts.length ? parts.join(" • ") : "—";
  };

  if (!authenticated) {
    return (
      <Box p={8} minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box maxW="400px" w="100%" p={8} boxShadow="md" borderRadius="lg">
          <Heading mb={6} size="md" textAlign="center">
            Panel Admin DreamLit
          </Heading>

          <Input
            type="password"
            placeholder="Contraseña"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            mb={4}
          />

          <Button
            colorScheme="teal"
            w="100%"
            onClick={() => {
              if (passwordInput === ADMIN_PASSWORD) {
                setAuthenticated(true);
              } else {
                toast({
                  title: "Contraseña incorrecta",
                  status: "error",
                });
              }
            }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Heading mb={6}>Panel de Administración</Heading>

      <Flex mb={4} gap={4}>
        <Input
          placeholder="Buscar por email o nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="300px"
        />

        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
          maxW="220px"
        >
          <option value="all">Todos los estados</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>

        <Button onClick={fetchOrders}>Refrescar</Button>
      </Flex>

      <Table variant="striped">
        <Thead>
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
          {filteredOrders.map((order) => (
            <Tr key={order.id}>
              <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
              <Td>{order.buyer_email ?? "—"}</Td>
              <Td>
                {`${order.first_name ?? ""} ${order.last_name ?? ""}`.trim() ||
                  "—"}
              </Td>
              <Td fontSize="sm">
                {formatAddress(order)}
                <br />
                {order.phone ? `Tel: ${order.phone}` : "—"}
              </Td>
              <Td>
                <Select
                  size="sm"
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order.id, e.target.value as OrderStatus)
                  }
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </Select>
              </Td>
              <Td>
                <IconButton
                  icon={<DeleteIcon />}
                  aria-label="Eliminar"
                  size="sm"
                  colorScheme="red"
                  onClick={() => setDeleteId(order.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <AlertDialog
        isOpen={!!deleteId}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteId(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>¿Eliminar orden?</AlertDialogHeader>
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