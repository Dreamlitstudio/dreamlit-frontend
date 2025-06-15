import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Address } from "../types/Address";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const toast = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [address, setAddress] = useState<Address>({
    street: "",
    number: "",
    neighborhood: "",
    postalCode: "",
    city: "",
    state: "",
    country: "México",
    phone: "",
  });

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handlePayment = async () => {
    if (!firstName || !lastName || !email || !email.includes("@")) {
      toast({
        title: "Datos incompletos",
        description: "Por favor ingresa tu nombre, apellido y un correo válido.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!address.street || !address.number || !address.postalCode || !address.city || !address.state || !address.phone) {
      toast({
        title: "Dirección incompleta",
        description: "Por favor completa todos los campos de envío.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const external_reference = `order-${Date.now()}`;

      const formattedItems = cart.map((item, index) => ({
        id: `lamp-${index}`,
        title: `${item.name} - ${item.customName}`,
        description: `Lámpara personalizada con el nombre "${item.customName}", Envío: ${item.shippingType}`,
        category_id: "home_decor",
        quantity: 1,
        unit_price: item.price,
        currency_id: "MXN",
        image_url: item.imageUrl,
        shipping_type: item.shippingType,
      }));

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/create_preference`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: formattedItems,
          external_reference,
          address: {
            ...address,
            email,
            first_name: firstName,
            last_name: lastName,
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Error en la respuesta: ${response.status}`);
      }

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error("No se recibió un punto de inicio de pago.");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al iniciar el pago. Intenta nuevamente.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.error("❌ Error en el pago:", error);
    }
  };

  if (cart.length === 0) {
    return (
      <Box p="10" textAlign="center">
        <Heading size="md">No hay productos en el carrito</Heading>
        <Button mt="5" onClick={() => navigate("/catalog")}>
          Volver al catálogo
        </Button>
      </Box>
    );
  }

  return (
    <Box p={{ base: 5, md: 10 }}>
      <Heading size="lg" mb={5}>Datos de Compra y Envío</Heading>
      <VStack spacing={4} align="stretch">

        <FormControl isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Apellido</FormLabel>
          <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Correo electrónico</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Calle</FormLabel>
          <Input name="street" value={address.street} onChange={handleAddressChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Número</FormLabel>
          <Input name="number" value={address.number} onChange={handleAddressChange} />
        </FormControl>

        <FormControl>
          <FormLabel>Colonia (opcional)</FormLabel>
          <Input name="neighborhood" value={address.neighborhood} onChange={handleAddressChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Código Postal</FormLabel>
          <Input name="postalCode" value={address.postalCode} onChange={handleAddressChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Ciudad</FormLabel>
          <Input name="city" value={address.city} onChange={handleAddressChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Estado</FormLabel>
          <Input name="state" value={address.state} onChange={handleAddressChange} />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Teléfono</FormLabel>
          <Input name="phone" value={address.phone} onChange={handleAddressChange} />
        </FormControl>

        <Text fontWeight="bold" fontSize="lg" textAlign="right">Total: ${total} MXN</Text>

        <Button colorScheme="teal" onClick={handlePayment}>
          Proceder al Pago
        </Button>

      </VStack>
    </Box>
  );
};

export default Checkout;
