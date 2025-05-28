import {
  Grid,
  Box,
  Input,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import LampCard from "../components/LampCard";
import { useState } from "react";
import lamps from "../data/lamps";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLamps = lamps.filter((lamp) =>
    lamp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  return (
    <Box
      px={{ base: 4, md: 10 }}
      py={10}
      bgImage="url('/assets/bg-pattern.png')"
      bgSize="cover"
      bgRepeat="repeat"
      minH="100vh"
    >
      <VStack spacing={5} textAlign="center" mb={8}>
        <Heading size="lg" color="#225059">
          Catálogo de Lámparas ✨
        </Heading>
        <Text fontSize="sm" color="gray.600" maxW="600px">
          Diseñadas con magia, pensadas para acompañar los sueños más tiernos 🌙
        </Text>
        <Input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width={{ base: "100%", md: "50%" }}
          bg="white"
          color="black"
        />
      </VStack>

      {filteredLamps.length > 0 ? (
        <Grid
          templateColumns={`repeat(${columns}, 1fr)`}
          gap={6}
          mt={2}
          mb={12}
          px={2}
        >
          {filteredLamps.map((lamp) => (
            <LampCard key={lamp.name} lamp={lamp} />
          ))}
        </Grid>
      ) : (
        <Text mt="10" fontSize="xl" color="gray.600">
          ❌ No se encontraron resultados.
        </Text>
      )}

      <Box mt={10} textAlign="center" color="#225059">
        <Heading size="md" mb={2}>🎁 ¿Buscas un regalo perfecto?</Heading>
        <Text fontSize="sm">
          Personaliza una lámpara única para baby showers, cumpleaños o decorar el cuarto de los más pequeños.
        </Text>
      </Box>
    </Box>
  );
};

export default Catalog;
