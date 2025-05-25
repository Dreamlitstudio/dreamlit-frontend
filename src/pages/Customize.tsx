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
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../assets/fonts/fonts.css";

const Customize = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { lamp } = location.state || {};
  const [customName, setCustomName] = useState("");
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

    if (!lamp.name || !lamp.imageUrl || isNaN(Number(lamp.price))) {
      toast({
        title: "Error",
        description: "Los datos de la lámpara están incompletos o mal formateados.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    addToCart({
      name: lamp.name,
      customName: customName,
      imageUrl: lamp.imageUrl,
      price: Number(lamp.price),
    });

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
    <VStack spacing={8} px={4} py={8} maxW="lg" mx="auto">
      <Heading color="#225059" size="lg" textAlign="center">
        Personaliza tu lámpara
      </Heading>

      <Box position="relative" width="100%" maxW="400px">
        <Image
          src={lamp.imageUrl}
          alt={lamp.name}
          width="100%"
          objectFit="contain"
        />
        <svg
          viewBox="0 0 400 400"
          style={{ position: "absolute", top: 55, left: 0, width: "100%", height: "100%" }}
        >
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

      <Button
        bg="#225059"
        color="#9fe0ed"
        _hover={{ bg: "#1a3e45", color: "white" }}
        size="lg"
        onClick={handleSave}
        width="100%"
        maxW="300px"
      >
        Guardar Personalización
      </Button>
    </VStack>
  );
};

export default Customize;
