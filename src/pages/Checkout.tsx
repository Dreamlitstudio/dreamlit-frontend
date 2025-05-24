import {
  Box,
  Heading,
  VStack,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.phone.trim()
    ) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newOrder = {
      id: uuidv4(),
      items: cart.map((item) => ({
        name: item.name,
        customName: item.customName,
        imageUrl: item.imageUrl,
        price: Number(item.price), // ✅ Aseguramos que sea un número
      })),
    };

    console.log("Nueva Orden Generada: ", newOrder); // ✅ Debug para revisar el objeto

    // Validación adicional
    if (!newOrder.items || newOrder.items.length === 0) {
      console.error("Error: La orden no contiene productos.");
      toast({
        title: "Error",
        description: "No se encontraron productos en el pedido.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Guardamos el pedido en el contexto
    addOrder(newOrder);
    clearCart();

    toast({
      title: "¡Compra realizada!",
      description: "Te contactaremos para acordar el envío.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    console.log("Navegando a Order History..."); // ✅ Debug para saber si llega hasta aquí
    navigate("/order-history");
  };

  return (
    <Box p="10">
      <VStack spacing={5} align="start">
        <Heading size="lg">Finalizar Compra</Heading>

        <Input
          placeholder="Nombre Completo"
          value={form.name}
          onChange={handleInputChange}
          name="name"
        />
        <Input
          placeholder="Correo Electrónico"
          value={form.email}
          onChange={handleInputChange}
          name="email"
          type="email"
        />
        <Input
          placeholder="Dirección"
          value={form.address}
          onChange={handleInputChange}
          name="address"
        />
        <Input
          placeholder="Teléfono"
          value={form.phone}
          onChange={handleInputChange}
          name="phone"
          type="tel"
        />

        <Button colorScheme="teal" onClick={handleSubmit}>
          Confirmar Pedido
        </Button>
      </VStack>
    </Box>
  );
};

export default Checkout;
