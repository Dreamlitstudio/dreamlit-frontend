import {
  Box,
  Image,
  Text,
  Button,
  Heading,
  IconButton,
  Grid,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, EditIcon } from "@chakra-ui/icons";
import { Lamp } from "../types/Lamp";

interface LampCardProps {
  lamp: Lamp;
}

const LampCard = ({ lamp }: LampCardProps) => {
  const navigate = useNavigate();

  const imageSet: Record<Lamp["name"], string[]> = {
    Kiki: ["/assets/koala1.webp", "/assets/koala2.webp", "/assets/koala3.webp"],
    Zuzu: ["/assets/leon1.webp", "/assets/leon2.webp", "/assets/leon3.webp"],
    Nono: ["/assets/perro1.webp", "/assets/perro2.webp", "/assets/perro3.webp"],
  };

  const images = imageSet[lamp.name];
  const [index, setIndex] = useState(0);

  const handlePrev = () =>
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const description =
    lamp.name === "Kiki"
      ? "Tranquila y soñadora, acompaña cada noche con ternura y dulzura."
      : lamp.name === "Zuzu"
      ? "Valiente y aventurera, ilumina los sueños de quienes no temen soñar en grande."
      : "Fiel y cariñoso, es el mejor compañero para soñar sin miedo.";

  return (
    <Box
      w="100%"
      maxW="420px"
      mx="auto"
      border="3px solid #225059"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p={{ base: 3, md: 4 }}
      position="relative"
      display="flex"
      flexDirection="column"
      overflow="visible"
    >
      {/* Carrusel */}
      <Box position="relative" w="100%" mb={{ base: 2, md: 3 }}>
        <Image
          src={images[index]}
          alt={lamp.name}
          objectFit="contain"
          w="100%"
          maxH={{ base: "300px", md: "360px" }}
          draggable={false}
        />

        <IconButton
          icon={<ChevronLeftIcon boxSize={{ base: 7, md: 9 }} />}
          aria-label="Anterior"
          onClick={handlePrev}
          size="lg"
          position="absolute"
          top="50%"
          left="2"
          transform="translateY(-50%)"
          bg="whiteAlpha.800"
          boxShadow="md"
          _hover={{
            bg: "whiteAlpha.900",
            transform: "translateY(-50%) scale(1.1)",
          }}
          _active={{ bg: "white" }}
          rounded="full"
        />

        <IconButton
          icon={<ChevronRightIcon boxSize={{ base: 7, md: 9 }} />}
          aria-label="Siguiente"
          onClick={handleNext}
          size="lg"
          position="absolute"
          top="50%"
          right="2"
          transform="translateY(-50%)"
          bg="whiteAlpha.800"
          boxShadow="md"
          _hover={{
            bg: "whiteAlpha.900",
            transform: "translateY(-50%) scale(1.1)",
          }}
          _active={{ bg: "white" }}
          rounded="full"
        />
      </Box>

      {/* Contenido */}
      <Grid
        gap={{ base: 1, md: 2 }}
        gridTemplateRows="auto auto auto auto auto"
        px={{ base: 1, md: 0 }}
      >
        <Heading
          as="h3"
          fontSize={{ base: "lg", md: "2xl" }}
          color="#225059"
          textAlign="center"
          lineHeight="short"
          overflowWrap="break-word"
          wordBreak="break-word"
        >
          {lamp.name}
        </Heading>

        <Text
          fontWeight="bold"
          color="#225059"
          fontSize={{ base: "md", md: "lg" }}
          textAlign="center"
        >
          ${lamp.price}
        </Text>

        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.600"
          textAlign="center"
        >
          Incluye IVA y envío gratis
        </Text>

        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.600"
          textAlign="center"
        >
          {description}
        </Text>

        <Button
          mt={{ base: 3, md: 3 }}
          size={{ base: "md", md: "lg" }}
          leftIcon={<EditIcon />}
          bg="#225059"
          color="white"
          fontWeight="bold"
          borderRadius="full"
          _hover={{
            bg: "#2e6a73",
            transform: "translateY(-2px)",
            boxShadow: "lg",
          }}
          _active={{ bg: "#1a3c41" }}
          transition="all 0.2s ease"
          onClick={() => navigate("/customize", { state: { lamp } })}
          w={{ base: "100%", md: "auto" }}
          justifySelf="center"
        >
          Personalizar
        </Button>
      </Grid>
    </Box>
  );
};

export default LampCard;
