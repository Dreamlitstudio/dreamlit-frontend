import React, { useState } from "react";
import {
  Box,
  Image,
  Input,
  Button,
  VStack,
  useToast,
  Text,
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
    const words = name.split(" ");
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
    <VStack spacing={10} p={10}>
      <Box position="relative">
        <Image
          src={lamp.imageUrl}
          alt={lamp.name}
          boxSize="400px"
          objectFit="contain"
        />
        <svg
          width="400"
          height="400"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {renderText.map((line, index) => (
            <text
              key={index}
              x="50%"
              y={renderText.length > 1 ? `${83 + index * 8}%` : "88%"}
              textAnchor="middle"
              fontSize="28"
              fontFamily="NaishilaDancingScript"
              fill="black"
            >
              {line}
            </text>
          ))}
        </svg>
      </Box>
      <Input
        placeholder="Escribe un nombre"
        value={customName}
        onChange={handleInputChange}
        size="lg"
      />
      <Button colorScheme="teal" onClick={handleSave}>
        Guardar Personalización
      </Button>
    </VStack>
  );
};

export default Customize;
