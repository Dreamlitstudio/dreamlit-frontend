// src/pages/Home.tsx
import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Button,
  SimpleGrid,
  Image,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import principalImage from "../assets/principal.png";
import animalesImage from "../assets/animales.webp";
import seleccionaIcon from "../assets/selecciona-icon.png";
import personalizaIcon from "../assets/personaliza-icon.png";
import pagaIcon from "../assets/paga-icon.png";

const Home = () => {
  return (
    <Box bg="#FAF3DF" color="#333" fontFamily="Nunito">
      {/* Hero */}
      <Box position="relative" textAlign="center">
        <Image
          src={principalImage}
          alt="Hero principal"
          width="100%"
          objectFit="cover"
          maxH={{ base: "300px", md: "500px" }}
        />
        <Heading
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="#225059"
          fontFamily="Catalish Huntera"
          fontSize={{ base: "3xl", md: "5xl" }}
          px={4}
        >
          Lámparas que abrazan sueños
        </Heading>
      </Box>

      <Container maxW="container.lg" py={10}>
        {/* Descripción principal */}
        <VStack spacing={4} mb={10}>
          <Text fontSize="lg" fontWeight="medium" textAlign="center">
            Ilumina el cuarto de tus hijos con piezas personalizadas llenas de ternura,
            magia y diseño. Creadas con amor para acompañarlos cada noche con su nombre
            y su historia.
          </Text>
          <Button
            as={Link}
            to="/catalog"
            size="lg"
            bg="#225059"
            color="#FAF3DF"
            _hover={{ bg: "#2c6b74" }}
          >
            Elige tu personaje favorito
          </Button>
        </VStack>

        {/* Pasos */}
        <Heading
          textAlign="center"
          fontFamily="Naishila Dancing Script"
          fontSize="2xl"
          color="#E07A5F"
          mb={8}
        >
          Así empieza la magia personalizada
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={10}>
          {/* Paso 1 */}
          <Box bg="white" p={6} borderRadius="md" boxShadow="sm" textAlign="center">
            <Image src={seleccionaIcon} alt="Selecciona tu personaje" height="100px" mb={4} mx="auto" />
            <Text fontWeight="bold" color="#E07A5F" fontSize="3xl" mb={2}>PASO 1</Text>
            <Text fontWeight="bold" mb={1}>Descubre quién iluminará sus sueños.</Text>
            <Text>Cada personaje tiene su propia ternura. Escoge el animalito que mejor combine con la historia de tu pequeño.</Text>
          </Box>

          {/* Paso 2 */}
          <Box bg="white" p={6} borderRadius="md" boxShadow="sm" textAlign="center">
            <Image src={personalizaIcon} alt="Personaliza tu lámpara" height="100px" mb={4} mx="auto" />
            <Text fontWeight="bold" color="#E7A74F" fontSize="3xl" mb={2}>PASO 2</Text>
            <Text fontWeight="bold" mb={1}>Hazlo único como tu pequeño.</Text>
            <Text>Tu toque personal lo transforma en un regalo con emoción, memoria y cariño.</Text>
          </Box>

          {/* Paso 3 */}
          <Box bg="white" p={6} borderRadius="md" boxShadow="sm" textAlign="center">
            <Image src={pagaIcon} alt="Paga de forma segura" height="100px" mb={4} mx="auto" />
            <Text fontWeight="bold" color="#E07A5F" fontSize="3xl" mb={2}>PASO 3</Text>
            <Text fontWeight="bold" mb={1}>Último paso para hacerlo realidad.</Text>
            <Text>Completa tu compra de forma fácil y segura. En poco tiempo, la magia estará tocando tu puerta.</Text>
          </Box>
        </SimpleGrid>

        {/* Beneficios */}
        <Heading textAlign="center" fontFamily="Naishila Dancing Script" fontSize="2xl" color="#E07A5F" mb={2}>
          Beneficios para tu pequeño
        </Heading>
        <Text textAlign="center" fontSize="lg" color="#E07A5F" mb={8}>
          Seguridad suave toda la noche con un amigo que brilla contigo.
        </Text>
        <SimpleGrid columns={1} spacing={6} mb={10}>
          <Box>
            <HStack align="center" spacing={4}>
              <Text fontWeight="extrabold" fontSize="5xl" color="#D9A86C">1</Text>
              <Text>Dormir se vuelve más fácil cuando no se sienten solos. Esta luz suave los acompaña toda la noche, con un personaje que les da calma, compañía y convierte su cuarto en un lugar mágico solo para ellos.</Text>
            </HStack>
          </Box>
          <Box>
            <HStack align="center" spacing={4}>
              <Text fontWeight="extrabold" fontSize="5xl" color="#E07A5F">2</Text>
              <Text>No es solo una lámpara. Es una presencia tranquila que los acompaña mientras duermen, les da seguridad si se despiertan y les recuerda que ese espacio está hecho con amor solo para ellos.</Text>
            </HStack>
          </Box>
          <Box>
            <HStack align="center" spacing={4}>
              <Text fontWeight="extrabold" fontSize="5xl" color="#5C3A1D">3</Text>
              <Text>Cada niño tiene su héroe nocturno. Este compañero de luz los ayuda a dormir mejor, sin miedos, con una luz tenue que cuida cada despertar, cada paso al baño, cada suspiro en medio de la noche.</Text>
            </HStack>
          </Box>
          <Box>
            <HStack align="center" spacing={4}>
              <Text fontWeight="extrabold" fontSize="5xl" color="#999999">4</Text>
              <Text>Con un rincón pensado solo para él o ella, se sienten seguros, únicos y acompañados. La lámpara no solo alumbra: transforma, abraza y convierte la noche en una experiencia tierna y especial.</Text>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Imagen testimonial */}
        <VStack mb={10}>
          <Image src={animalesImage} alt="Animales decorativos" borderRadius="md" maxH="300px" objectFit="cover" />
        </VStack>

        {/* Características */}
        <Heading textAlign="center" fontFamily="Naishila Dancing Script" fontSize="2xl" color="#E07A5F" mb={8}>
          Características
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
          <Box>
            <Text fontWeight="bold">✂️ Corte láser seguro</Text>
            <Text>Bordes limpios y redondeados, ideales para manos pequeñas.</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">💫 Acrílico duradero</Text>
            <Text>Material ligero, brillante y resistente para uso infantil diario.</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">💡 Luz LED</Text>
            <Text>Iluminación suave, sin calor, para noches largas y tranquilas.</Text>
          </Box>
          <Box>
            <Text fontWeight="bold">❤️ Hecho con dedicación</Text>
            <Text>Cada pieza se arma a mano, bajo pedido especial.</Text>
          </Box>
        </SimpleGrid>

        {/* Botón final */}
        <VStack mb={10}>
          <Button
            as={Link}
            to="/catalog"
            size="lg"
            bg="#225059"
            color="#FAF3DF"
            _hover={{ bg: "#2c6b74" }}
          >
            Ver los personajes
          </Button>
        </VStack>
      </Container>

      {/* Información de contacto al final */}
      <Box textAlign="center" fontSize="sm" color="gray.600" py={4} borderTop="1px solid #ddd">
        <Text>📞 55 33 31 91 86</Text>
        <Text>📧 hello.dreamlitstudio@gmail.com</Text>
      </Box>
    </Box>
  );
};

export default Home;
