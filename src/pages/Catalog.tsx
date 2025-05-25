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

  // Ajuste de columnas según el ancho de pantalla
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  return (
    <Box px={{ base: 4, md: 10 }} py={10} bg="#f9fafa" minH="100vh">
      <VStack spacing={5}>
        <Heading size="lg" color="#225059">
          Catálogo de Lámparas ✨
        </Heading>
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
          mt="10"
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
    </Box>
  );
};

export default Catalog;
