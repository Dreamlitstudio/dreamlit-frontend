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
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { supabase } from "../lib/supabaseClient";

type OrderStatus = "pendiente" | "en_produccion" | "enviado" | "recibido";

type ShippingAddress = {
  street?: string;
  number?: string;
  neighborhood?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country?: string;
};

interface Order {
  id: string;
  created_at: string;
  status: OrderStatus;

  customer_name?: string | null;
  customer_email?: string | null;
  phone?: string | null;

  shipping_address?: ShippingAddress | null;

  items: any; // jsonb
  total?: number | null;

  mp_preference_id?: string | null;
  mp_payment_id?: string | null;
  mp_status?: string | null;
  external_reference?: string | null;

  // Fallbacks por si existen columnas “viejas”
  buyer_email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  postal_code?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en_produccion", label: "En producción" },
  { value: "enviado", label: "Enviado" },
  { value: "recibido", label: "Recibido" },
];

const AdminPanel = () => {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all");

  const ADMIN_PASSWORD = (import.meta.env.VITE_ADMIN_PASSWORD as string) || "";

  const getEmail = (o: Order) =>
    o.customer_email ?? o.buyer_email ?? "—";

  const getName = (o: Order) => {
    if (o.customer_name) return o.customer_name;
    const full = `${o.first_name ?? ""} ${o.last_name ?? ""}`.trim();
    return full || "—";
  };

  const formatAddress = (o: Order) => {
    // Preferido: shipping_address (nuevo)
    const addr = o.shipping_address;
    if (addr) {
      const parts = [
        [addr.street, addr.number].filter(Boolean).join(" "),
        addr.neighborhood,
        [addr.city, addr.state].filter(Boolean).join(", "),
        addr.postal_code ? `CP: ${addr.postal_code}` : "",
        addr.country,
      ].filter(Boolean);
      return parts.length ? parts.join(" • ") : "—";
    }

    // Fallback: columnas viejas
    const parts = [
      [o.street, o.number].filter(Boolean).join(" "),
      o.neighborhood ?? undefined,
      [o.city, o.state].filter(Boolean).join(", "),
      o.postal_code ? `CP: ${o.postal_code}` : "",
      o.country ?? undefined,
    ].filter(Boolean);

    return parts.length ? parts.join(" • ") : "—";
  };

  const applyFilters = useCallback(
    (term: string, status: OrderStatus | "all", ordersList: Order[]) => {
      let filtered = ordersList;

      if (status !== "all") {
        filtered = filtered.filter((order) => order.status === status);
      }

      const cleanTerm = term.trim().toLowerCase();
      if (cleanTerm !== "") {
        filtered = filtered.filter((order) => {
          const email = getEmail(order).toLowerCase();
          const name = getName(order).toLowerCase();
          return email.includes(cleanTerm) || name.includes(cleanTerm);
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
      setAllOrders(list);
      applyFilters(searchTerm, filterStatus, list);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "No se pudieron cargar las órdenes.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [applyFilters, filterStatus, searchTerm, toast]);

  const updateOrderStatus = useCallback(
    async (id: string, newStatus: OrderStatus) => {
      try {
        const { error } = await supabase
          .from("orders")
          .update({ status: newStatus })
          .eq("id", id);

        if (error) throw error;

        setAllOrders((prev) => {
          const updated = prev.map((o) =>
            o.id === id ? { ...o, status: newStatus } : o
          );
          applyFilters(searchTerm, filterStatus, updated);
          return updated;
        });

        toast({ title: "Estado actualizado", status: "success", duration: 2000 });
      } catch (err: any) {
        toast({
          title: "Error",
          description: err?.message || "No se pudo actualizar el estado.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    },
    [applyFilters, filterStatus, searchTerm, toast]
  );

  const deleteOrder = useCallback(async () => {
    if (!deleteId) return;

    try {
      const { error } = await supabase.from("orders").delete().eq("id", deleteId);
      if (error) throw error;

      setAllOrders((prev) => {
        const updated = prev.filter((o) => o.id !== deleteId);
        applyFilters(searchTerm, filterStatus, updated);
        return updated;
      });

      toast({ title: "Orden eliminada", status: "info", duration: 2500 });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "No se pudo eliminar la orden.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setDeleteId(null);
    }
  }, [applyFilters, deleteId, filterStatus, searchTerm, toast]);

  useEffect(() => {
    if (!authenticated) return;
    fetchOrders();
  }, [authenticated, fetchOrders]);

  useEffect(() => {
    applyFilters(searchTerm, filterStatus, allOrders);
  }, [applyFilters, filterStatus, allOrders, searchTerm]);

  useEffect(() => {
    if (!authenticated) return;

    const channel = supabase
      .channel("orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authenticated, fetchOrders]);

  if (!authenticated) {
    return (
      <Box
        p={8}
        bg="white"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          maxW="400px"
          w="100%"
          p={8}
          boxShadow="md"
          borderRadius="lg"
          bg="gray.50"
        >
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
              if (!ADMIN_PASSWORD) {
                toast({
                  title: "Falta configurar VITE_ADMIN_PASSWORD",
                  description: "Agrega la variable en .env y reinicia el proyecto.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                return;
              }

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
      </Box>
    );
  }

  if (loading) {
    return (
      <Box textAlign="center" mt={10} bg="white" minHeight="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 10 }} bg="white" minHeight="100vh">
      <Flex justify="space-between" align="center" gap={4} flexWrap="wrap" mb={6}>
        <Heading size="lg">Panel de Administración</Heading>
        <Button size="sm" variant="outline" onClick={fetchOrders}>
          Refrescar
        </Button>
      </Flex>

      <Flex mb={6} gap={4} flexWrap="wrap">
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
      </Flex>

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
            {filteredOrders.map((order) => (
              <Tr key={order.id}>
                <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
                <Td>{getEmail(order)}</Td>
                <Td>{getName(order)}</Td>
                <Td fontSize="sm">
                  {formatAddress(order)}
                  <br />
                  {order.phone ? <span>Tel: {order.phone}</span> : <span>—</span>}
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
      </Box>

      <AlertDialog
        isOpen={!!deleteId}
        leastDestructiveRef={cancelRef}
        onClose={() => setDeleteId(null)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader>¿Eliminar orden?</AlertDialogHeader>
            <AlertDialogBody>Esta acción no se puede deshacer.</AlertDialogBody>
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