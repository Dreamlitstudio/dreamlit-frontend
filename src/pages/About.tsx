import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box py={16} px={4}>
      <VStack spacing={6} textAlign="center">
        <Heading fontSize={{ base: "3xl", md: "5xl" }} color="#225059">
          Sobre nosotros
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} maxW="3xl" color="#225059">
          En Dream Lit Studio, creemos que cada niño merece un espacio mágico. Creamos lámparas personalizadas con amor, cuidando cada detalle para iluminar sueños y acompañar momentos especiales. Nuestra misión es diseñar piezas únicas que inspiren ternura, imaginación y alegría.
        </Text>
      </VStack>
    </Box>
  );
};

export default About;
