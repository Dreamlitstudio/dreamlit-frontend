import {
  Grid,
  Box,
  Input,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import LampCard from "../components/LampCard";
import { useState } from "react";
import lamps from "../data/lamps";

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLamps = lamps.filter((lamp) =>
    lamp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box p="10">
      <VStack spacing={5}>
        <Heading size="lg">Catálogo de Lámparas ✨</Heading>
        <Input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="50%"
        />
      </VStack>

      {filteredLamps.length > 0 ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt="10">
          {filteredLamps.map((lamp) => (
            <LampCard key={lamp.name} lamp={lamp} />
          ))}
        </Grid>
      ) : (
        <Text mt="10" fontSize="xl">
          ❌ No se encontraron resultados.
        </Text>
      )}
    </Box>
  );
};

export default Catalog;
