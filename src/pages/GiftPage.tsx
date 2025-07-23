import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";

const GiftPage = () => {
  return (
    <Box bg="#fdfcf9" minH="100vh" py={10}>
      <Container maxW="md">
        <Box
          bg="white"
          borderRadius="md"
          boxShadow="md"
          p={8}
          border="1px solid #e2e8f0"
        >
          <VStack spacing={6} textAlign="center">
            <Heading size="lg" color="#225059">
              ¡Gracias por tu compra! ✨
            </Heading>
            <Text color="gray.600">
              Como agradecimiento, hemos preparado este detalle especial para ti.
            </Text>
            <Text color="gray.600">
              Esperamos que nuestra lámpara acompañe muchos sueños tiernos. 💛
            </Text>
            <Button
              as="a"
              href="/assets/regalo-dreamlit.pdf"
              download
              leftIcon={<DownloadIcon />}
              colorScheme="teal"
              size="lg"
            >
              Descargar regalo
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default GiftPage;
