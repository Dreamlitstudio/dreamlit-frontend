// src/components/PromoLampCard.tsx
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PromoLampCard = ({ lamp }: any) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const discountedPrice = (lamp.price * 0.85).toFixed(2);

  const description =
    lamp.name === "Kiki"
      ? "Tranquila y soñadora, acompaña cada noche con ternura y dulzura."
      : lamp.name === "Zaza"
      ? "Valiente y aventurera, ilumina los sueños de quienes no temen soñar en grande."
      : "Fiel y cariñoso, es el mejor compañero para soñar sin miedo.";

  return (
    <>
      <Box
        w={{ base: "85%", sm: "85%", md: "85%" }}
        maxW="280px"
        aspectRatio={1}
        mx="auto"
        mb={isMobile ? 4 : 0}
      >
        <Flex
          border="3px solid #225059"
          borderRadius="lg"
          bg="white"
          boxShadow="md"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
          textAlign="center"
        >
          <Image
            src={lamp.imageUrl}
            alt={lamp.name}
            borderRadius="md"
            objectFit="contain"
            maxH="55%"
            mb={3}
          />
          <Heading size="md" mt={1} color="#225059">
            {lamp.name}
          </Heading>
          <Text fontWeight="bold" color="#225059" fontSize="lg" mt={2}>
            ${discountedPrice}
          </Text>
          <Text fontSize="sm" mt={2}>
            {description}
          </Text>
          <Button
            mt={4}
            color="#225059"
            borderColor="#225059"
            border="1px solid"
            variant="outline"
            _hover={{ bg: "#225059", color: "white" }}
            onClick={() => navigate("/customize", { state: { lamp } })}
          >
            Personalizar
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default PromoLampCard;
