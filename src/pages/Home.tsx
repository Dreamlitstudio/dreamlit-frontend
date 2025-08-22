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

import animalesImage from "../assets/animales.webp";
import seleccionaIcon from "../assets/selecciona-icon.png";
import personalizaIcon from "../assets/personaliza-icon.png";
import pagaIcon from "../assets/paga-icon.png";

// Imagen justo debajo del header (hero adaptable)
import newHeroImage from "../assets/principal-good.webp";

const Home = () => {
  // Si cambias la altura de tu Navbar, ajusta los 80px de la siguiente línea.
  const headerPx = 80;

  return (
    <Box bg="#FAF3DF" color="#333" fontFamily="Nunito">
      {/* Hero adaptativo debajo del header */}
      <Box
        as="section"
        w="100%"
        // Ocupa toda la altura visible menos el header para un efecto hero limpio
        h={{ base: `calc(100svh - ${headerPx}px)`, md: `calc(100svh - ${headerPx}px)` }}
        minH={{ base: "60svh", md: "70svh" }}
        maxH="100svh"
      >
        <Image
          src={newHeroImage}
          alt="Dream Lit Studio - Lámparas personalizadas"
          w="100%"
          h="100%"
          objectFit="cover"
          draggable={false}
          loading="eager"
        />
      </Box>

      <Container maxW="container.lg" px={{ base: 4, md: 6 }} py={{ base: 8, md: 10 }}>
        {/* Descripción principal */}
        <VStack spacing={{ base: 3, md: 4 }} mb={{ base: 8, md: 10 }}>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            lineHeight={{ base: 1.6, md: 1.8 }}
            fontWeight="medium"
            textAlign="center"
          >
            Ilumina el cuarto de tus hijos con piezas personalizadas llenas de ternura,
            magia y diseño. Creadas con amor para acompañarlos cada noche con su nombre
            y su historia.
          </Text>
          <Button
            as={Link}
            to="/catalog"
            size={{ base: "md", md: "lg" }}
            bg="#225059"
            color="#FAF3DF"
            _hover={{ bg: "#2c6b74" }}
            w={{ base: "full", md: "auto" }}
          >
            Elige tu personaje favorito
          </Button>
        </VStack>

        {/* Pasos */}
        <Heading
          textAlign="center"
          fontFamily="Naishila Dancing Script"
          fontSize={{ base: "xl", md: "2xl" }}
          color="#E07A5F"
          mb={{ base: 5, md: 8 }}
        >
          Así empieza la magia personalizada
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, md: 6 }} mb={{ base: 8, md: 10 }}>
          {/* Paso 1 */}
          <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="md" boxShadow="sm" textAlign="center">
            <Image
              src={seleccionaIcon}
              alt="Selecciona tu personaje"
              boxSize={{ base: "64px", md: "100px" }}
              mb={{ base: 3, md: 4 }}
              mx="auto"
              loading="lazy"
            />
            <Text fontWeight="bold" color="#E07A5F" fontSize={{ base: "2xl", md: "3xl" }} mb={2}>
              PASO 1
            </Text>
            <Text fontWeight="bold" mb={1}>Descubre quién iluminará sus sueños.</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Cada personaje tiene su propia ternura. Escoge el animalito que mejor combine con la historia de tu pequeño.
            </Text>
          </Box>

          {/* Paso 2 */}
          <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="md" boxShadow="sm" textAlign="center">
            <Image
              src={personalizaIcon}
              alt="Personaliza tu lámpara"
              boxSize={{ base: "64px", md: "100px" }}
              mb={{ base: 3, md: 4 }}
              mx="auto"
              loading="lazy"
            />
            <Text fontWeight="bold" color="#E7A74F" fontSize={{ base: "2xl", md: "3xl" }} mb={2}>
              PASO 2
            </Text>
            <Text fontWeight="bold" mb={1}>Hazlo único como tu pequeño.</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Tu toque personal lo transforma en un regalo con emoción, memoria y cariño.
            </Text>
          </Box>

          {/* Paso 3 */}
          <Box bg="white" p={{ base: 4, md: 6 }} borderRadius="md" boxShadow="sm" textAlign="center">
            <Image
              src={pagaIcon}
              alt="Paga de forma segura"
              boxSize={{ base: "64px", md: "100px" }}
              mb={{ base: 3, md: 4 }}
              mx="auto"
              loading="lazy"
            />
            <Text fontWeight="bold" color="#E07A5F" fontSize={{ base: "2xl", md: "3xl" }} mb={2}>
              PASO 3
            </Text>
            <Text fontWeight="bold" mb={1}>Último paso para hacerlo realidad.</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Completa tu compra de forma fácil y segura. En poco tiempo, la magia estará tocando tu puerta.
            </Text>
          </Box>
        </SimpleGrid>

        {/* Beneficios */}
        <Heading
          textAlign="center"
          fontFamily="Naishila Dancing Script"
          fontSize={{ base: "xl", md: "2xl" }}
          color="#E07A5F"
          mb={{ base: 2, md: 2 }}
        >
          Beneficios para tu pequeño
        </Heading>
        <Text
          textAlign="center"
          fontSize={{ base: "md", md: "lg" }}
          color="#E07A5F"
          mb={{ base: 6, md: 8 }}
        >
          Seguridad suave toda la noche con un amigo que brilla contigo.
        </Text>

        <SimpleGrid columns={1} spacing={{ base: 4, md: 6 }} mb={{ base: 8, md: 10 }}>
          <Box>
            <HStack align="flex-start" spacing={4}>
              <Text fontWeight="extrabold" fontSize={{ base: "3xl", md: "5xl" }} color="#D9A86C">1</Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Dormir se vuelve más fácil cuando no se sienten solos. Esta luz suave los acompaña toda la noche,
                con un personaje que les da calma, compañía y convierte su cuarto en un lugar mágico solo para ellos.
              </Text>
            </HStack>
          </Box>
          <Box>
            <HStack align="flex-start" spacing={4}>
              <Text fontWeight="extrabold" fontSize={{ base: "3xl", md: "5xl" }} color="#E07A5F">2</Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                No es solo una lámpara. Es una presencia tranquila que los acompaña mientras duermen, les da seguridad
                si se despiertan y les recuerda que ese espacio está hecho con amor solo para ellos.
              </Text>
            </HStack>
          </Box>
          <Box>
            <HStack align="flex-start" spacing={4}>
              <Text fontWeight="extrabold" fontSize={{ base: "3xl", md: "5xl" }} color="#5C3A1D">3</Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Cada niño tiene su héroe nocturno. Este compañero de luz los ayuda a dormir mejor, sin miedos,
                con una luz tenue que cuida cada despertar, cada paso al baño, cada suspiro en medio de la noche.
              </Text>
            </HStack>
          </Box>
          <Box>
            <HStack align="flex-start" spacing={4}>
              <Text fontWeight="extrabold" fontSize={{ base: "3xl", md: "5xl" }} color="#999999">4</Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                Con un rincón pensado solo para él o ella, se sienten seguros, únicos y acompañados.
                La lámpara no solo alumbra: transforma, abraza y convierte la noche en una experiencia tierna y especial.
              </Text>
            </HStack>
          </Box>
        </SimpleGrid>

        {/* Imagen testimonial */}
        <VStack mb={{ base: 8, md: 10 }}>
          <Image
            src={animalesImage}
            alt="Animales decorativos"
            borderRadius="md"
            maxH={{ base: "220px", md: "300px" }}
            w="100%"
            objectFit="cover"
            loading="lazy"
          />
        </VStack>

        {/* Características */}
        <Heading
          textAlign="center"
          fontFamily="Naishila Dancing Script"
          fontSize={{ base: "xl", md: "2xl" }}
          color="#E07A5F"
          mb={{ base: 5, md: 8 }}
        >
          Características
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }} mb={{ base: 8, md: 10 }}>
          <Box>
            <Text fontWeight="bold">✂️ Corte láser seguro</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Bordes limpios y redondeados, ideales para manos pequeñas.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">💫 Acrílico duradero</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Material ligero, brillante y resistente para uso infantil diario.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">💡 Luz LED</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Iluminación suave, sin calor, para noches largas y tranquilas.
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold">❤️ Hecho con dedicación</Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              Cada pieza se arma a mano, bajo pedido especial.
            </Text>
          </Box>
        </SimpleGrid>

        {/* Botón final */}
        <VStack mb={{ base: 8, md: 10 }}>
          <Button
            as={Link}
            to="/catalog"
            size={{ base: "md", md: "lg" }}
            bg="#225059"
            color="#FAF3DF"
            _hover={{ bg: "#2c6b74" }}
            w={{ base: "full", md: "auto" }}
          >
            Ver los personajes
          </Button>
        </VStack>
      </Container>

      {/* Información de contacto al final */}
      <Box
        textAlign="center"
        fontSize={{ base: "xs", md: "sm" }}
        color="gray.600"
        py={{ base: 3, md: 4 }}
        borderTop="1px solid #ddd"
      >
        <Text>📞 55 33 31 91 86</Text>
        <Text>📧 hello.dreamlitstudio@gmail.com</Text>
      </Box>
    </Box>
  );
};

export default Home;
