import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const LampCard = ({ lamp }: any) => {
  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [tilt, setTilt] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setTilt(true);
      const timer = setTimeout(() => setTilt(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  const description =
    lamp.name === "Kiki"
      ? "Tranquila y soñadora, acompaña cada noche con ternura y dulzura."
      : lamp.name === "Zaza"
      ? "Valiente y aventurera, ilumina los sueños de quienes no temen soñar en grande."
      : "Fiel y cariñoso, es el mejor compañero para soñar sin miedo.";

  return (
    <Box
      w={{ base: "85%", sm: "85%", md: "85%" }}
      maxW="280px"
      aspectRatio={1}
      mx="auto"
      className={!isMobile && tilt ? "initial-tilt" : ""}
      sx={{ perspective: "1000px" }}
    >
      <Box
        w="100%"
        h="100%"
        position="relative"
        className={!isMobile ? "flip-card-inner" : ""}
      >
        {/* Frente */}
        <Flex
          className="flip-card-front"
          position="absolute"
          w="100%"
          h="100%"
          border="3px solid #225059"
          borderRadius="lg"
          bg="white"
          boxShadow="md"
          sx={{ backfaceVisibility: "hidden" }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={4}
        >
          <Image
            src={lamp.imageUrl}
            alt={lamp.name}
            borderRadius="md"
            objectFit="contain"
            maxH="55%"
            mb={3}
            sx={{ imageRendering: "auto" }}
          />
          <Heading size="md" mt={1} color="#225059">
            {lamp.name}
          </Heading>
          <Text fontWeight="bold" color="#225059" fontSize="lg" mt={2}>
            ${lamp.price}
          </Text>
          {!isMobile && (
            <Flex align="center" mt={2}>
              <Text fontSize="xs" color="gray.500">
                Pasa el cursor para ver más
              </Text>
              <Box
                ml={1}
                fontSize="xs"
                className="rotate-icon"
                animation="spin 2.5s linear infinite"
              >
                🔁
              </Box>
            </Flex>
          )}
        </Flex>

        {/* Reverso */}
        <Flex
          className="flip-card-back"
          position="absolute"
          w="100%"
          h="100%"
          border="3px solid #225059"
          borderRadius="lg"
          bg="white"
          boxShadow="md"
          sx={{ backfaceVisibility: "hidden" }}
          transform="rotateY(180deg)"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          p={4}
        >
          <Image
            src={logo}
            alt="Logo"
            opacity={0.05}
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            maxH="85%"
            pointerEvents="none"
            userSelect="none"
          />
          <Text zIndex={1} fontSize="sm" fontWeight="medium" color="#225059">
            {description}
          </Text>
          <Button
            mt={4}
            color="#225059"
            borderColor="#225059"
            border="1px solid"
            variant="outline"
            zIndex={1}
            _hover={{
              bg: "#225059",
              color: "white",
            }}
            onClick={() => navigate("/customize", { state: { lamp } })}
          >
            Personalizar
          </Button>
        </Flex>

        {/* Alternativa para móviles */}
        {isMobile && (
          <Flex
            direction="column"
            align="center"
            justify="center"
            mt={4}
            textAlign="center"
            px={4}
            pt="90%"
          >
            <Text fontSize="sm" fontWeight="medium" color="#225059">
              {description}
            </Text>
            <Button
              mt={4}
              color="#225059"
              borderColor="#225059"
              border="1px solid"
              variant="outline"
              _hover={{ bg: "#225059", color: "white" }}
              onClick={() => navigate("/customize", { state: { lamp } })}
            >
              Personalizar
            </Button>
          </Flex>
        )}
      </Box>

      {/* Estilos de animación */}
      <style>{`
        .flip-card-inner {
          transition: transform 0.8s ease;
          transform-style: preserve-3d;
        }

        .flip-card-inner:hover {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 12px;
        }

        .initial-tilt .flip-card-inner {
          animation: tiltOnce 0.8s ease;
        }

        @keyframes tiltOnce {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(10deg); }
          100% { transform: rotateY(0deg); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .rotate-icon {
          display: inline-block;
        }
      `}</style>
    </Box>
  );
};

export default LampCard;
