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

type OrderItem = {
  id?: string;
  title?: string;
  customName?: string;
  unit_price?: number | string;
  quantity?: number | string;
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

  // compat por si tu tabla también tiene estos campos (no estorban)
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

  // ✅ CRA env var
  const ADMIN_PASSWORD =
    (process.env.REACT_APP_ADMIN_PASSWORD as string) || "";

  const normalizeEmail = (o: Order) =>
    (o.customer_email ?? o.buyer_email ?? "").toLowerCase();

  const normalizeName = (o: Order) => {
    const v =
      o.customer_name ??
      `${o.first_name ?? ""} ${o.last_name ?? ""}`.trim();
    return (v ?? "").toLowerCase();
  };

  const safeItemsArray = (items: any): OrderItem[] => {
    if (!items) return [];
    if (Array.isArray(items)) return items as OrderItem[];
    // por si en algún punto llega string
    if (typeof items === "string") {
      try {
        const parsed = JSON.parse(items);
        return Array.isArray(parsed) ? (parsed as OrderItem[]) : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  const formatItemsSummary = (items: any) => {
    const arr = safeItemsArray(items);
    if (arr.length === 0) return "—";

    return arr
      .map((it) => {
        const title = it.title?.trim() || "Producto";
        const custom = it.customName?.trim() || "Sin personalización";

        const qtyRaw = it.quantity ?? 1;
        const qty = Number(qtyRaw);
        const qtyLabel = Number.isFinite(qty) && qty > 1 ? ` x${qty}` : "";

        const priceRaw = it.unit_price;
        const price = Number(priceRaw);
        const priceLabel = Number.isFinite(price) ? ` — $${price} MXN` : "";

        return `${title} (${custom})${qtyLabel}${priceLabel}`;
      })
      .join("\n");
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
          const email = normalizeEmail(order);
          const name = normalizeName(order);
          const itemsText = formatItemsSummary(order.items).toLowerCase();

          return (
            email.includes(cleanTerm) ||
            name.includes(cleanTerm) ||
            itemsText.includes(cleanTerm)
          );
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

        setOrders((prev) => {
          const updated = prev.map((o) =>
            o.id === id ? { ...o, status: newStatus } : o
          );
          applyFilters(searchTerm, filterStatus, updated);
          return updated;
        });

        toast({
          title: "Estado actualizado",
          status: "success",
          duration: 2000,
        });
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
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;

      setOrders((prev) => {
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
    if (authenticated) fetchOrders();
  }, [authenticated, fetchOrders]);

  useEffect(() => {
    applyFilters(searchTerm, filterStatus, orders);
  }, [applyFilters, filterStatus, orders, searchTerm]);

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

  const totalCount = useMemo(() => orders.length, [orders.length]);
  const filteredCount = useMemo(
    () => filteredOrders.length,
    [filteredOrders.length]
  );

  const formatAddress = (o: Order) => {
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

    // fallback por si tu tabla aún usa columnas planas
    const parts = [
      [o.street, o.number].filter(Boolean).join(" "),
      o.neighborhood,
      [o.city, o.state].filter(Boolean).join(", "),
      o.postal_code ? `CP: ${o.postal_code}` : "",
      o.country,
    ].filter(Boolean);

    return parts.length ? parts.join(" • ") : "—";
  };

  const displayEmail = (o: Order) =>
    o.customer_email ?? o.buyer_email ?? "—";

  const displayName = (o: Order) =>
    o.customer_name ??
    `${o.first_name ?? ""} ${o.last_name ?? ""}`.trim() ||
    "—";

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
                  title: "Falta configurar REACT_APP_ADMIN_PASSWORD",
                  description:
                    "Agrega la variable en Vercel/.env y vuelve a desplegar.",
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
        <Text mt={4}>Cargando órdenes...</Text>
      </Box>
    );
  }

  return (
    <Box p={{ base: 4, md: 10 }} bg="white" minHeight="100vh">
      <Flex justify="space-between" align="center" gap={4} flexWrap="wrap" mb={6}>
        <Heading size="lg">Panel de Administración</Heading>
        <Flex gap={2} align="center">
          <Badge colorScheme="gray">Total: {totalCount}</Badge>
          <Badge colorScheme="teal">Mostrando: {filteredCount}</Badge>
          <Button size="sm" variant="outline" onClick={fetchOrders}>
            Refrescar
          </Button>
        </Flex>
      </Flex>

      {/* Filtros */}
      <Flex mb={6} gap={4} flexWrap="wrap">
        <Input
          placeholder="Buscar por email, nombre o producto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="340px"
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

      {/* Tabla */}
      <Box overflowX="auto" boxShadow="md" borderRadius="lg">
        <Table variant="striped" size="sm">
          <Thead bg="gray.100">
            <Tr>
              <Th>Fecha</Th>
              <Th>Email</Th>
              <Th>Nombre</Th>
              <Th>Productos</Th>
              <Th>Dirección</Th>
              <Th>Estado</Th>
              <Th>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map((order) => (
              <Tr key={order.id}>
                <Td>{new Date(order.created_at).toLocaleDateString()}</Td>
                <Td>{displayEmail(order)}</Td>
                <Td>{displayName(order)}</Td>

                {/* ✅ NUEVA COLUMNA */}
                <Td whiteSpace="pre-line" fontSize="sm">
                  {formatItemsSummary(order.items)}
                </Td>

                <Td fontSize="sm">
                  {formatAddress(order)}
                  <br />
                  {order.phone ? (
                    <span>Tel: {order.phone}</span>
                  ) : (
                    <span>—</span>
                  )}
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

            {filteredOrders.length === 0 && (
              <Tr>
                <Td colSpan={7}>
                  <Text p={4} color="gray.500">
                    No hay órdenes que coincidan con los filtros actuales.
                  </Text>
                </Td>
              </Tr>
            )}
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