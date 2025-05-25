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
  useBreakpointValue,
  Image,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";
import { Link } from "react-router-dom";

import leon from "../assets/leon.png";
import koala from "../assets/koala.png";
import perro from "../assets/perro.png";
import logo from "../assets/logo.png";

const Home = () => {
  const headingSize = useBreakpointValue({ base: "2xl", md: "3xl" });

  return (
    <Box bg="#fefefe">
      <Container maxW="container.xl" py={{ base: 8, md: 14 }}>
        <VStack spacing={10}>
          {/* Logo */}
          <Image src={logo} alt="Logo" boxSize="80px" />

          {/* Título y descripción */}
          <Heading size={headingSize} color="#225059" textAlign="center">
            Dream Lit Studio ✨
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} textAlign="center" px={4} color="#444">
            Creamos lámparas personalizables para los más pequeños, llenas de luz,
            cariño y un toque único. Explora nuestros modelos y personaliza el nombre
            de cada lámpara para un regalo especial que ilumine sus sueños.
          </Text>

          {/* Carrusel */}
          <Box w="100%" maxW="600px">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop
              style={{ width: "100%", height: "100%" }}
            >
              {[leon, koala, perro].map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`Lámpara ${idx}`}
                    style={{
                      width: "100%",
                      height: "320px",
                      objectFit: "contain",
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          {/* Botón CTA */}
          <Button
            as={Link}
            to="/catalog"
            size="lg"
            bg="#225059"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Explora nuestros modelos
          </Button>

          <Divider borderColor="#225059" />

          {/* Sección Sobre Nosotros */}
          <Stack spacing={6} textAlign="center" px={4}>
            <Heading size="lg" color="#225059">
              Sobre Nosotros
            </Heading>
            <Text fontSize="md" color="#444">
              En Dream Lit Studio creemos en la magia de los detalles. Nuestras lámparas
              no solo iluminan, sino que también crean un vínculo emocional. Cada modelo
              es diseñado con cariño, y la personalización le añade ese toque único que
              convierte un objeto en un recuerdo para toda la vida.
            </Text>
            <Text fontSize="md" color="#444">
              Nuestro compromiso es ofrecer productos de calidad, que además de ser
              funcionales, decoren y embellezcan los espacios de los más pequeños.
              Cada lámpara es un reflejo de amor y cuidado en cada detalle.
            </Text>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default Home;
