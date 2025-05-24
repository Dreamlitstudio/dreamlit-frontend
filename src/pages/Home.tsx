import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
  Button,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";

// Imágenes (asegúrate de poner las imágenes en `src/assets`)
import leon from "../assets/leon.png";
import koala from "../assets/koala.png";
import perro from "../assets/perro.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8}>
        <Heading size="xl">Dream Lit Studio ✨</Heading>
        <Text fontSize="lg" textAlign="center">
          Creamos lámparas personalizables para los más pequeños, llenas de luz, 
          cariño y un toque único. Explora nuestros modelos y personaliza el nombre 
          de cada lámpara para un regalo especial que ilumine sus sueños.
        </Text>

        {/* Carrusel */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          loop
          style={{ width: "100%", height: "400px" }}
        >
          <SwiperSlide>
            <img
              src={leon}
              alt="Lámpara León"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={koala}
              alt="Lámpara Koala"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={perro}
              alt="Lámpara Perro"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </SwiperSlide>
        </Swiper>

        {/* Botón de llamada a la acción */}
        <Button
          as={Link}
          to="/catalog"
          colorScheme="teal"
          size="lg"
          mt={5}
        >
          Explora nuestros modelos
        </Button>

        <Divider />

        {/* Sección "Nosotros" */}
        <Stack spacing={6} textAlign="center">
          <Heading size="lg">Sobre Nosotros</Heading>
          <Text fontSize="md">
            En Dream Lit Studio creemos en la magia de los detalles. Nuestras lámparas 
            no solo iluminan, sino que también crean un vínculo emocional. Cada modelo 
            es diseñado con cariño, y la personalización le añade ese toque único que 
            convierte un objeto en un recuerdo para toda la vida.
          </Text>
          <Text fontSize="md">
            Nuestro compromiso es ofrecer productos de calidad, que además de ser 
            funcionales, decoren y embellezcan los espacios de los más pequeños. 
            Cada lámpara es un reflejo de amor y cuidado en cada detalle.
          </Text>
        </Stack>
      </VStack>
    </Container>
  );
};

export default Home;
