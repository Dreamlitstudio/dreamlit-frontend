// src/components/CookieConsent.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <Box
      position="fixed"
      bottom={0}
      width="100%"
      bg="white"
      borderTop="1px solid #ccc"
      p={4}
      zIndex={9999}
      boxShadow="md"
    >
      <Flex justify="space-between" align="center" maxW="6xl" mx="auto" flexWrap="wrap" gap={4}>
        <Text fontSize="sm" color="gray.600">
          Usamos cookies para mejorar tu experiencia. Al continuar, aceptas su uso.
        </Text>
        <Button colorScheme="teal" size="sm" onClick={handleAccept}>
          Aceptar
        </Button>
      </Flex>
    </Box>
  );
};

export default CookieConsent;
