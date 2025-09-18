import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import LampCard from "../components/LampCard";
import lamps from "../data/lamps";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLamps = useMemo(
    () =>
      lamps.filter((lamp) =>
        lamp.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <Box
      pt={{ base: 3, md: 4 }}
      pb={{ base: 6, md: 8 }}
      bgImage="url('/assets/bg-pattern.png')"
      bgRepeat="repeat"
      bgSize="220px"           // patrón más contenido (menos sensación de vacío)
      minH="100vh"
    >
      <Container
        maxW={{ base: "100%", md: "7xl" }}   // más ancho en desktop
        px={{ base: 3, md: 6 }}              // menos padding lateral
      >
        <Heading
          size={{ base: "md", md: "lg" }}
          color="#225059"
          textAlign="center"
          mb={{ base: 2, md: 3 }}            // menos espacio
        >
          Catálogo de Lámparas ✨
        </Heading>

        <Text
          fontSize={{ base: "sm", md: "md" }}
          color="gray.600"
          textAlign="center"
          maxW="760px"
          mx="auto"
          mb={{ base: 3, md: 4 }}            // menos espacio
        >
          Diseñadas con magia, pensadas para acompañar los sueños más tiernos 🌙
        </Text>

        <Input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW={{ base: "100%", md: "640px" }}
          mx="auto"
          mb={{ base: 4, md: 6 }}
          bg="white"
          color="black"
          borderColor="#22505933"
          _focus={{ borderColor: "#225059", boxShadow: "0 0 0 1px #225059" }}
        />

        {filteredLamps.length > 0 ? (
          <SimpleGrid
            minChildWidth={{ base: "300px", md: "320px" }} // autofit real
            spacingX={{ base: 3, md: 4 }}                  // gaps más pequeños
            spacingY={{ base: 4, md: 6 }}
            justifyItems="stretch"
            mt={{ base: 0, md: 0 }}
            mb={{ base: 6, md: 10 }}
          >
            {filteredLamps.map((lamp) => (
              <LampCard key={lamp.name} lamp={lamp} />
            ))}
          </SimpleGrid>
        ) : (
          <Text mt={{ base: 6, md: 8 }} fontSize="lg" color="gray.600" textAlign="center">
            ❌ No se encontraron resultados.
          </Text>
        )}

        <Box mt={{ base: 6, md: 8 }} textAlign="center" color="#225059">
          <Heading size={{ base: "sm", md: "md" }} mb={1}>
            🎁 ¿Buscas un regalo perfecto?
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} maxW="760px" mx="auto">
            Personaliza una lámpara única para baby showers, cumpleaños o decorar el cuarto de los más pequeños.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Catalog;
