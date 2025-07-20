import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Heading,
  Badge,
  useBreakpointValue,
  IconButton,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Lamp } from "../types/Lamp";

interface PromoLampCardProps {
  lamp: Lamp;
}

const PromoLampCard = ({ lamp }: PromoLampCardProps) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [index, setIndex] = useState(0);

  const imageSet: Record<string, string[]> = {
    Kiki: ["/assets/koala1.png", "/assets/koala2.png", "/assets/koala3.png"],
    Zaza: ["/assets/leon1.png", "/assets/leon2.png", "/assets/leon3.png"],
    Nono: ["/assets/perro1.png", "/assets/perro2.png", "/assets/perro3.png"],
  };

  const images = imageSet[lamp.name] || [];
  const discountedPrice = (lamp.price * 0.85).toFixed(0);

  const description =
    lamp.name === "Kiki"
      ? "Tranquila y soñadora, acompaña cada noche con ternura y dulzura."
      : lamp.name === "Zaza"
      ? "Valiente y aventurera, ilumina los sueños de quienes no temen soñar en grande."
      : "Fiel y cariñoso, es el mejor compañero para soñar sin miedo.";

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box
      w={{ base: "85%", sm: "85%", md: "85%" }}
      maxW="280px"
      h="480px"
      mx="auto"
      border="3px solid #E07A5F"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      position="relative"
    >
      {/* Carrusel */}
      <Box position="relative" w="100%" h="270px">
        <Image
          src={images[index]}
          alt={lamp.name}
          objectFit="contain"
          borderRadius="md"
          boxSize="100%"
          maxH="100%"
          mx="auto"
        />
        <IconButton
          icon={<ChevronLeftIcon boxSize={6} />}
          aria-label="Anterior"
          position="absolute"
          top="50%"
          left="0"
          transform="translateY(-50%)"
          onClick={prevImage}
          variant="ghost"
          size="sm"
          color="#E07A5F"
        />
        <IconButton
          icon={<ChevronRightIcon boxSize={6} />}
          aria-label="Siguiente"
          position="absolute"
          top="50%"
          right="0"
          transform="translateY(-50%)"
          onClick={nextImage}
          variant="ghost"
          size="sm"
          color="#E07A5F"
        />
      </Box>

      {/* Info */}
      <Heading size="md" mt={2} textAlign="center" color="#225059">
        {lamp.name}
      </Heading>
      <Badge colorScheme="green" mt={1}>
        15% Descuento
      </Badge>

      <Flex align="center" justify="center" gap={2} mt={2}>
        <Text as="s" fontSize="sm" color="gray.500">
          ${lamp.price}
        </Text>
        <Text fontWeight="bold" color="#E07A5F" fontSize="lg">
          ${discountedPrice}
        </Text>
      </Flex>

      <Text
        fontSize="sm"
        fontWeight="medium"
        color="#225059"
        mt={2}
        textAlign="center"
        px={2}
      >
        {description}
      </Text>
      <Text fontSize="xs" color="green.600" mt={1}>
        Promoción exclusiva por tiempo limitado
      </Text>

      <Button
        mt={3}
        color="#225059"
        borderColor="#225059"
        border="1px solid"
        variant="outline"
        _hover={{ bg: "#225059", color: "white" }}
        onClick={() =>
          navigate("/customize", {
            state: {
              lamp: {
                ...lamp,
                price: parseInt(discountedPrice),
                isPromo: true,
              },
            },
          })
        }
      >
        Personalizar
      </Button>
    </Box>
  );
};

export default PromoLampCard;
