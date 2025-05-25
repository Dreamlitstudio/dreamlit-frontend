import { Box, Image, Text, Button, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LampCard = ({ lamp }: any) => {
  const navigate = useNavigate();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="5"
      bg="white"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{
        boxShadow: "xl",
        transform: "translateY(-4px)",
      }}
    >
      <Image
        src={lamp.imageUrl}
        alt={lamp.name}
        borderRadius="md"
        mx="auto"
        objectFit="contain"
        maxH="200px"
      />

      <VStack spacing={3} mt={4} align="start">
        <Heading size="md" color="#225059">
          {lamp.name}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {lamp.name === "León"
            ? "Representa la valentía y el liderazgo, ideal para iluminar sueños audaces."
            : lamp.name === "Koala"
            ? "Transmite serenidad y calma, perfecta para noches tranquilas."
            : "El mejor amigo de los pequeños, brindando luz y compañía en cada sueño."}
        </Text>
        <Text fontWeight="bold" color="#225059">
          ${lamp.price}
        </Text>
        <Button
          color="#225059"
          borderColor="#225059"
          border="1px solid"
          variant="outline"
          _hover={{
            bg: "#225059",
            color: "white",
          }}
          onClick={() =>
            navigate("/customize", { state: { lamp } })
          }
        >
          Personalizar
        </Button>
      </VStack>
    </Box>
  );
};

export default LampCard;
