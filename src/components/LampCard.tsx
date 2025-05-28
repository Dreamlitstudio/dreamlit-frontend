import { Box, Image, Text, Button, Flex, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LampCard = ({ lamp }: any) => {
  const navigate = useNavigate();

  return (
    <Box
      w={{ base: "85%", sm: "85%", md: "85%" }} // reducido un 15%
      maxW="280px"
      aspectRatio={1}
      mx="auto"
      sx={{ perspective: "1000px" }}
    >
      <Box
        w="100%"
        h="100%"
        position="relative"
        sx={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s",
        }}
        _hover={{
          transform: "rotateY(180deg)",
        }}
      >
        {/* Cara frontal */}
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          border="3px solid #225059"
          borderRadius="lg"
          bg="white"
          boxShadow="md"
          sx={{ backfaceVisibility: "hidden" }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Image
            src={lamp.imageUrl}
            alt={lamp.name}
            borderRadius="md"
            objectFit="contain"
            maxH="55%"
            mb={3}
            sx={{ imageRendering: "auto" }}
          />
          <Heading size="md" mt={1} color="#225059">
            {lamp.name}
          </Heading>
          <Text fontWeight="bold" color="#225059" fontSize="lg" mt={2}>
            ${lamp.price}
          </Text>
        </Flex>

        {/* Cara trasera */}
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          border="3px solid #225059"
          borderRadius="lg"
          bg="white"
          boxShadow="md"
          sx={{ backfaceVisibility: "hidden" }}
          transform="rotateY(180deg)"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={4}
        >
          <Image
            src={logo}
            alt="Logo"
            opacity={0.05}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            maxH="85%"
            pointerEvents="none"
            userSelect="none"
          />
          <Text zIndex={1} fontSize="sm" fontWeight="medium" color="#225059">
            {lamp.name === "Kiki"
              ? "Tranquila y soñadora, acompaña cada noche con ternura y dulzura."
              : lamp.name === "Zaza"
              ? "Valiente y aventurera, ilumina los sueños de quienes no temen soñar en grande."
              : "Fiel y cariñoso, es el mejor compañero para soñar sin miedo."}
          </Text>
          <Button
            mt={4}
            color="#225059"
            borderColor="#225059"
            border="1px solid"
            variant="outline"
            zIndex={1}
            _hover={{
              bg: "#225059",
              color: "white",
            }}
            onClick={() => navigate("/customize", { state: { lamp } })}
          >
            Personalizar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default LampCard;
