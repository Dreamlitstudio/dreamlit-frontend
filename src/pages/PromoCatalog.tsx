import {
  Grid,
  Box,
  Input,
  Heading,
  VStack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import PromoLampCard from "../components/PromoLampCard";
import { useState } from "react";
import lamps from "../data/lamps";

const PromoCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLamps = lamps.filter((lamp) =>
    lamp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

  return (
    <Box
      px={{ base: 4, md: 10 }}
      py={10}
      bg="#fdfcf9"
      minH="100vh"
    >
      <VStack spacing={5} textAlign="center" mb={8} px={4}>
        <Heading size="lg" color="#225059">
          Catálogo Especial ✨
        </Heading>
        <Text fontSize="md" color="gray.600" maxW="600px">
          Gracias por unirte. Disfruta de un 15% de descuento exclusivo.
        </Text>
        <Input
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="100%"
          maxW="400px"
          bg="white"
          color="black"
          mt={{ base: 2, md: 0 }}
        />
      </VStack>

      {filteredLamps.length > 0 ? (
        <Grid
          templateColumns={`repeat(${columns}, 1fr)`}
          gap={8}
          px={{ base: 2, md: 4 }}
        >
          {filteredLamps.map((lamp) => (
            <PromoLampCard key={lamp.name} lamp={lamp} />
          ))}
        </Grid>
      ) : (
        <Text mt="10" fontSize="lg" color="gray.600" textAlign="center">
          ❌ No se encontraron resultados.
        </Text>
      )}
    </Box>
  );
};

export default PromoCatalog;
