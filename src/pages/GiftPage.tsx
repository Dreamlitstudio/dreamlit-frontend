// src/pages/GiftPage.tsx
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react";
import { DownloadIcon } from "@chakra-ui/icons";
import regaloImage from "../assets/gift-illustration.png"; // puedes poner una ilustración decorativa

const GiftPage = () => {
  return (
    <Box bg="#fdfcf9" minH="100vh" py={{ base: 8, md: 12 }}>
      <Container maxW="md">
        <Box
          bg="white"
          borderRadius="lg"
          boxShadow="md"
          p={{ base: 6, md: 8 }}
          border="1px solid #e2e8f0"
        >
          <VStack spacing={6} textAlign="center">
            <Image
              src={regaloImage}
              alt="Ilustración de regalo"
              maxH={{ base: "180px", md: "220px" }}
              objectFit="contain"
            />

            <Heading size="lg" color="#225059">
              ¡Gracias por tu compra! ✨
            </Heading>
            <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
              Hemos preparado este pequeño regalo como agradecimiento por tu confianza.
            </Text>
            <Text color="gray.600" fontSize={{ base: "md", md: "lg" }}>
              Esperamos que tu lámpara acompañe muchos sueños tiernos. 💛
            </Text>

            <Button
              as="a"
              href="/assets/regalo-dreamlit.pdf"
              download
              leftIcon={<DownloadIcon />}
              colorScheme="teal"
              size="lg"
              width="full"
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
