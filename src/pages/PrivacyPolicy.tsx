import { Box, Heading, Text, VStack } from "@chakra-ui/react";

const PrivacyPolicy = () => {
  return (
    <Box maxW="800px" mx="auto" p={6}>
      <Heading size="lg" mb={4} color="#225059">
        Aviso de Privacidad
      </Heading>
      <VStack spacing={4} align="start">
        <Text>
          Dream Lit Studio, con domicilio en México, es responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
        </Text>
        <Text>
          Los datos personales que recopilamos (nombre completo, correo electrónico y número telefónico) tienen como finalidad principal:
        </Text>
        <Text>
          • Gestionar y procesar su compra de productos personalizados.
          <br />
          • Contactarlo en relación con su pedido o consultas.
          <br />
          • Ofrecerle información promocional relacionada con nuestros productos y servicios.
        </Text>
        <Text>
          Sus datos no serán compartidos con terceros ajenos a Dream Lit Studio sin su consentimiento expreso, salvo las excepciones previstas en la ley.
        </Text>
        <Text>
          Usted tiene derecho a acceder, rectificar y cancelar sus datos personales, así como a oponerse al tratamiento de los mismos (derechos ARCO). Para ejercer estos derechos, puede contactarnos en el correo electrónico: hello.dreamlitstudio@gmail.com.
        </Text>
        <Text>
          El uso de este sitio y el envío de sus datos personales implica su aceptación de este Aviso de Privacidad.
        </Text>
        <Text>
          Este sitio web utiliza cookies y tecnologías similares para mejorar su experiencia de navegación. Estas cookies no recopilan datos sensibles ni permiten identificarlo personalmente. Al continuar usando nuestro sitio, usted acepta el uso de cookies conforme a esta política.
        </Text>
        <Text>
          Nos reservamos el derecho de realizar modificaciones o actualizaciones al presente aviso en cualquier momento, para la atención de novedades legislativas o políticas internas.
        </Text>
      </VStack>
    </Box>
  );
};

export default PrivacyPolicy;
