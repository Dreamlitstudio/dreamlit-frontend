import React, { useState } from "react";
import {
  Box,
  Image,
  Input,
  Button,
  VStack,
  useToast,
  Text,
  Heading,
  Stack,
  Divider,
  Select,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Product } from "../types/Lamp";
import "../assets/fonts/fonts.css";

const Customize = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { lamp } = location.state || {};
  const [customName, setCustomName] = useState("");
  const [shippingType, setShippingType] = useState<"standard" | "express">("standard");
  const toast = useToast();

  if (!lamp) {
    return (
      <VStack p={10}>
        <Text color="red.500">No se encontró la información de la lámpara.</Text>
        <Button onClick={() => navigate("/catalog")} colorScheme="teal">
          Volver al catálogo
        </Button>
      </VStack>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 16) {
      setCustomName(value);
    }
  };

  const splitName = (name: string) => {
    const words = name.trim().split(" ");
    if (words.length > 1) {
      return [
        words.slice(0, Math.ceil(words.length / 2)).join(" "),
        words.slice(Math.ceil(words.length / 2)).join(" "),
      ];
    }
    return [name];
  };

  const renderText = splitName(customName);

  const calculateTotal = () => {
    const basePrice = Number(lamp.price);
    const shippingCost = shippingType === "express" ? 150 : 0;
    return basePrice + shippingCost;
  };

  const handleSave = () => {
    if (!customName) {
      toast({
        title: "Error",
        description: "Por favor, escribe un nombre para personalizar.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newProduct: Product = {
      id: lamp.id,
      name: lamp.name,
      description: lamp.description,
      imageUrl: lamp.imageUrl,
      price: calculateTotal(),
      customName: customName,
      shippingType: shippingType,
    };

    addToCart(newProduct);

    toast({
      title: "Personalización Guardada",
      description: `Has guardado la lámpara "${lamp.name}" con el nombre "${customName}".`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    navigate("/cart");
  };

  return (
    <Stack spacing={8} px={4} py={8} direction={{ base: "column", md: "row" }} maxW="6xl" mx="auto">
      <VStack spacing={6} flex="2">
        <Heading color="#225059" size="lg" textAlign="center">
          Personaliza tu lámpara
        </Heading>
        <Box position="relative" width="100%" maxW="400px">
          <Image src={lamp.imageUrl} alt={lamp.name} width="100%" objectFit="contain" />
          <svg viewBox="0 0 400 400" style={{ position: "absolute", top: 55, left: 0, width: "100%", height: "100%" }}>
            {renderText.map((line, index) => {
              const isMobile = window.matchMedia("(max-width: 480px)").matches;
              const baseY = isMobile ? 310 : 320;
              const lineSpacing = isMobile ? 30 : 40;
              const fontSize = isMobile ? 30 : 39;

              return (
                <text
                  key={index}
                  x="200"
                  y={renderText.length > 1 ? baseY + index * lineSpacing : baseY + 20}
                  textAnchor="middle"
                  fontSize={fontSize}
                  fontFamily="NaishilaDancingScript"
                  fill="black"
                >
                  {line}
                </text>
              );
            })}
          </svg>
        </Box>

        <Input
          placeholder="Escribe un nombre"
          value={customName}
          onChange={handleInputChange}
          size="lg"
          borderColor="#225059"
          focusBorderColor="#9fe0ed"
          maxW="400px"
          width="100%"
        />
      </VStack>

      <VStack spacing={6} flex="1" border="1px solid #225059" borderRadius="md" p={6} bg="#f7f7f7" height="fit-content">
        <Text fontWeight="bold" fontSize="lg">
          Resumen de compra
        </Text>
        <Divider />
        <Text>Precio base: ${lamp.price} MXN</Text>
        <Box width="100%">
          <Text mb={1}>Selecciona envío:</Text>
          <Select
            value={shippingType}
            onChange={(e) => setShippingType(e.target.value as "standard" | "express")}
          >
            <option value="standard">Estándar (Gratis)</option>
            <option value="express">Express (+$150 MXN)</option>
          </Select>
        </Box>
        <Divider />
        <Text fontSize="xl" fontWeight="bold">
          Total: ${calculateTotal()} MXN
        </Text>
        <Button
          bg="#225059"
          color="#9fe0ed"
          _hover={{ bg: "#1a3e45", color: "white" }}
          size="lg"
          onClick={handleSave}
          width="100%"
        >
          Guardar Personalización
        </Button>
      </VStack>
    </Stack>
  );
};

export default Customize;
