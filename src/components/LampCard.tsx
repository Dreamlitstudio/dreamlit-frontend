import { Box, Image, Text, Button, VStack, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LampCard = ({ lamp }: any) => {
  const navigate = useNavigate();

  const handleCustomize = () => {
    navigate("/customize", { state: { lamp } });
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="5"
      boxShadow="lg"
      _hover={{ boxShadow: "2xl" }}
    >
      <Image src={lamp.imageUrl} alt={lamp.name} borderRadius="md" />

      <VStack spacing={3} mt="4">
        <Heading size="md">{lamp.name}</Heading>
        <Text color="gray.500">
          {lamp.name === "León"
            ? "Una lámpara que representa la valentía y el liderazgo, ideal para iluminar los sueños más audaces."
            : lamp.name === "Koala"
            ? "Una lámpara que transmite serenidad y calma, perfecta para acompañar noches tranquilas."
            : "El mejor amigo de los pequeños, brindando luz y compañía en cada sueño."}
        </Text>
        <Text fontWeight="bold">${lamp.price}</Text>
        <Button
      colorScheme="teal"
      onClick={() =>
        navigate("/customize", { state: { lamp } }) // ✅ Pasar correctamente la lámpara
      }
    >
      Personalizar
    </Button>
      </VStack>
    </Box>
  );
};

export default LampCard;
