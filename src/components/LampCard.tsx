// src/components/LampCard.tsx
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Heading,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Lamp } from "../types/Lamp";
import logo from "../assets/logo.png";

interface LampCardProps {
  lamp: Lamp;
}

const LampCard = ({ lamp }: LampCardProps) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const imageSet: Record<Lamp["name"], string[]> = {
    Kiki: ["/assets/koala1.webp", "/assets/koala2.webp", "/assets/koala3.webp"],
    Zaza: ["/assets/leon1.webp", "/assets/leon2.webp", "/assets/leon3.webp"],
    Nono: ["/assets/perro1.webp", "/assets/perro2.webp", "/assets/perro3.webp"],
  };

  const images = imageSet[lamp.name];
  const [index, setIndex] = useState(0);

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const description =
    lamp.name === "Kiki"
      ? "Tranquila y soñadora, acompaña cada noche con ternura y dulzura."
      : lamp.name === "Zaza"
      ? "Valiente y aventurera, ilumina los sueños de quienes no temen soñar en grande."
      : "Fiel y cariñoso, es el mejor compañero para soñar sin miedo.";

  return (
    <Box
      w={{ base: "90%", sm: "85%", md: "280px" }}
      maxW="100%"
      aspectRatio={4 / 5}
      mx="auto"
      border="3px solid #225059"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p={4}
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box position="relative" w="100%" h="60%">
        <Image
          src={images[index]}
          alt={lamp.name}
          objectFit="contain"
          maxH="100%"
          mx="auto"
        />
        <IconButton
          icon={<ChevronLeftIcon />}
          aria-label="Anterior"
          onClick={handlePrev}
          size="sm"
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          bg="transparent"
          _hover={{ bg: "gray.100" }}
        />
        <IconButton
          icon={<ChevronRightIcon />}
          aria-label="Siguiente"
          onClick={handleNext}
          size="sm"
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          bg="transparent"
          _hover={{ bg: "gray.100" }}
        />
      </Box>

      <Box mt={4} textAlign="center">
        <Heading size="md" color="#225059">
          {lamp.name}
        </Heading>
        <Text fontWeight="bold" color="#225059" fontSize="lg">
          ${lamp.price}
        </Text>
        <Text fontSize="sm" color="gray.600" mt={2}>
          {description}
        </Text>
        <Button
          mt={3}
          color="#225059"
          borderColor="#225059"
          border="1px solid"
          variant="outline"
          size="sm"
          _hover={{ bg: "#225059", color: "white" }}
          onClick={() => navigate("/customize", { state: { lamp } })}
        >
          Personalizar
        </Button>
      </Box>
    </Box>
  );
};

export default LampCard;
