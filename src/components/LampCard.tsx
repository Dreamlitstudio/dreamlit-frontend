import {
  Box,
  Image,
  Text,
  Button,
  Heading,
  IconButton,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { Lamp } from "../types/Lamp";

interface LampCardProps {
  lamp: Lamp;
}

const LampCard = ({ lamp }: LampCardProps) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const imageSet: Record<Lamp["name"], string[]> = {
    Kiki: ["/assets/koala1.webp", "/assets/koala2.webp", "/assets/koala3.webp"],
    Zuzu: ["/assets/leon1.webp", "/assets/leon2.webp", "/assets/leon3.webp"],
    Nono: ["/assets/perro1.webp", "/assets/perro2.webp", "/assets/perro3.webp"],
  };

  const images = imageSet[lamp.name];
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const description =
    lamp.name === "Kiki"
      ? "Tranquila y soñadora, acompaña cada noche con ternura y dulzura."
      : lamp.name === "Zuzu"
      ? "Valiente y aventurera, ilumina los sueños de quienes no temen soñar en grande."
      : "Fiel y cariñoso, es el mejor compañero para soñar sin miedo.";

  return (
    <Box
      w={{ base: "92%", sm: "85%", md: "300px" }}
      maxW="100%"
      aspectRatio={4 / 5}
      mx="auto"
      border="3px solid #225059"
      borderRadius="lg"
      bg="white"
      boxShadow="md"
      p={{ base: 3, md: 4 }}
      position="relative"
      display="flex"
      flexDirection="column"
      overflow="hidden"
    >
      {/* Carrusel */}
      <Box position="relative" w="100%" h={{ base: "52%", md: "60%" }} flexShrink={0}>
        <Image
          src={images[index]}
          alt={lamp.name}
          objectFit="contain"
          w="100%"
          h="100%"
          draggable={false}
        />

        <IconButton
          icon={<ChevronLeftIcon boxSize={{ base: 5, md: 6 }} />}
          aria-label="Anterior"
          onClick={handlePrev}
          size="sm"
          position="absolute"
          top="50%"
          left="2"
          transform="translateY(-50%)"
          bg="whiteAlpha.700"
          _hover={{ bg: "whiteAlpha.900" }}
          _active={{ bg: "white" }}
          rounded="full"
          px={2}
        />
        <IconButton
          icon={<ChevronRightIcon boxSize={{ base: 5, md: 6 }} />}
          aria-label="Siguiente"
          onClick={handleNext}
          size="sm"
          position="absolute"
          top="50%"
          right="2"
          transform="translateY(-50%)"
          bg="whiteAlpha.700"
          _hover={{ bg: "whiteAlpha.900" }}
          _active={{ bg: "white" }}
          rounded="full"
          px={2}
        />
      </Box>

      {/* Contenido */}
      <Flex
        direction="column"
        mt={{ base: 2, md: 3 }}
        px={{ base: 1, md: 0 }}
        flex="1"
        minH={0}   // para permitir clamp
        minW={0}   // evita overflow horizontal en textos
      >
        <Heading
          as="h3"
          size={{ base: "sm", md: "md" }}
          color="#225059"
          textAlign="center"
          lineHeight="short"
          noOfLines={1}
          overflowWrap="anywhere"
          wordBreak="break-word"
          minW={0}
        >
          {lamp.name}
        </Heading>

        <Text
          fontWeight="bold"
          color="#225059"
          fontSize={{ base: "md", md: "lg" }}
          textAlign="center"
          mt={{ base: 1, md: 1 }}
          noOfLines={1}
          minW={0}
        >
          ${lamp.price}
        </Text>

        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.600"
          textAlign="center"
          noOfLines={1}
          minW={0}
        >
          Incluye IVA y envío gratis
        </Text>

        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.600"
          mt={{ base: 2, md: 2 }}
          textAlign="center"
          noOfLines={{ base: 3, md: 4 }}
          overflowWrap="anywhere"
          wordBreak="break-word"
          flexGrow={1}
          minW={0}
        >
          {description}
        </Text>

        <Button
          mt={{ base: 2, md: 3 }}
          color="#225059"
          borderColor="#225059"
          border="1px solid"
          variant="outline"
          size={{ base: "sm", md: "sm" }}
          _hover={{ bg: "#225059", color: "white" }}
          onClick={() => navigate("/customize", { state: { lamp } })}
          w={{ base: "100%", md: "auto" }}
          alignSelf="center"
          flexShrink={0}
        >
          Personalizar
        </Button>
      </Flex>
    </Box>
  );
};

export default LampCard;
