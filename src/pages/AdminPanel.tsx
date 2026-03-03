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
  buyer_email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  items: any;
  street?: string | null;
  number?: string | null;
  neighborhood?: string | null;
  postal_code?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
}

const STATUS_OPTIONS = [
  { value: "pendiente", label: "Pendiente" },
  { value: "en_produccion", label: "En producción" },
  { value: "enviado", label: "Enviado" },
  { value: "recibido", label: "Recibido" },
] as const;

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
  const [filterStatus, setFilterStatus] =
    useState<OrderStatus | "all">("all");

  const ADMIN_PASSWORD =
    (process.env.REACT_APP_ADMIN_PASSWORD as string) || "";

  const safeItemsArray = useCallback((items: any): OrderItem[] => {
    if (!items) return [];
    if (Array.isArray(items)) return items;
    if (typeof items === "string") {
      try {
        const parsed = JSON.parse(items);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }, []);

  const formatItemsSummary = useCallback(
    (items: any) => {
      const arr = safeItemsArray(items);
      if (arr.length === 0) return "—";

      return arr
        .map((it) => {
          const title = it.title?.trim() || "Producto";
          const custom = it.customName?.trim() || "Sin personalización";

          const qty = Number(it.quantity ?? 1);
          const qtyLabel =
            Number.isFinite(qty) && qty > 1 ? ` x${qty}` : "";

          const price = Number(it.unit_price);
          const priceLabel =
            Number.isFinite(price) ? ` — $${price} MXN` : "";

          return `${title} (${custom})${qtyLabel}${priceLabel}`;
        })
        .join("\n");
    },
    [safeItemsArray]
  );

  const displayEmail = (o: Order) => {
    const email = o.customer_email ?? o.buyer_email ?? "";
    return email.trim() ? email : "—";
  };

  const displayName = (o: Order) => {
    const cn = (o.customer_name ?? "").trim();
    if (cn) return cn;

    const fn = (o.first_name ?? "").trim();
    const ln = (o.last_name ?? "").trim();
    const full = `${fn} ${ln}`.trim();
    return full ? full : "—";
  };

  const formatAddress = (o: Order) => {
    const parts = [
      [o.street, o.number].filter(Boolean).join(" "),
      o.neighborhood,
      [o.city, o.state].filter(Boolean).join(", "),
      o.postal_code ? `CP: ${o.postal_code}` : "",
      o.country,
    ].filter(Boolean);

    return parts.length ? parts.join(" • ") : "—";
  };

  const applyFilters = useCallback(
    (term: string, status: OrderStatus | "all", ordersList: Order[]) => {
      let filtered = ordersList;

      if (status !== "all") {
        filtered = filtered.filter((o) => o.status === status);
      }

      const cleanTerm = term.trim().toLowerCase();

      if (cleanTerm !== "") {
        filtered = filtered.filter((o) => {
          const email = displayEmail(o).toLowerCase();
          const name = displayName(o).toLowerCase();
          const itemsText = formatItemsSummary(o.items).toLowerCase();

          return (
            email.includes(cleanTerm) ||
            name.includes(cleanTerm) ||
            itemsText.includes(cleanTerm)
          );
        });
      }

      setFilteredOrders(filtered);
    },
    [formatItemsSummary]
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
        description: err?.message,
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [applyFilters, filterStatus, searchTerm, toast]);

  useEffect(() => {
    if (authenticated) fetchOrders();
  }, [authenticated, fetchOrders]);

  useEffect(() => {
    applyFilters(searchTerm, filterStatus, orders);
  }, [applyFilters, filterStatus, orders, searchTerm]);

  if (!authenticated) {
    return (
      <Box p={8} display="flex" justifyContent="center">
        <Box maxW="400px" w="100%">
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
        <Text mt={4}>Cargando órdenes...</Text>
      </Box>
    );
  }

  return (
    <Box p={10}>
      <Heading mb={6}>Panel de Administración</Heading>

      <Flex mb={6} gap={4}>
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as any)}
        >
          <option value="all">Todos los estados</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </Select>
      </Flex>

      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Fecha</Th>
            <Th>Email</Th>
            <Th>Nombre</Th>
            <Th>Productos</Th>
            <Th>Dirección</Th>
            <Th>Estado</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredOrders.map((order) => (
            <Tr key={order.id}>
              <Td>
                {new Date(order.created_at).toLocaleDateString()}
              </Td>
              <Td>{displayEmail(order)}</Td>
              <Td>{displayName(order)}</Td>
              <Td whiteSpace="pre-line">
                {formatItemsSummary(order.items)}
              </Td>
              <Td>{formatAddress(order)}</Td>
              <Td>{order.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default AdminPanel;