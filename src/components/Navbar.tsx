import React from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Stack,
  Image,
  useDisclosure,
  Collapse,
  HStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import logo from "../assets/logo.png";

// Íconos personalizados
import iconBox from "../assets/icon-box.png";
import iconPeople from "../assets/icon-people.png";
import iconContact from "../assets/icon-contact.png";
import iconCart from "../assets/icon-cart.png";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  const iconStyle = {
    boxSize: "20px",
    mr: 2,
  };

  return (
    <Box
      bg="#225059"
      px={{ base: 3, md: 4 }}
      boxShadow="md"
      position="sticky"
      top="0"
      zIndex="1000"
    >
      {/* Barra principal */}
      <Flex
        h={20}
        align="center"
        position="relative"
      >
        {/* Izquierda (links escritorio) */}
        <HStack spacing={2} display={{ base: "none", md: "flex" }}>
          <Button
            as={RouterLink}
            to="/catalog"
            leftIcon={<Image src={iconBox} alt="Productos" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Productos
          </Button>
          <Button
            as={RouterLink}
            to="/about"
            leftIcon={<Image src={iconPeople} alt="Nosotros" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Nosotros
          </Button>
          <Button
            as={RouterLink}
            to="/contact"
            leftIcon={<Image src={iconContact} alt="Contacto" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Contacto
          </Button>
        </HStack>

        {/* Centro (logo grande y clicable a Home) */}
        <Box
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <RouterLink to="/">
            <Image
              src={logo}
              alt="Dream Lit Studio"
              boxSize={{ base: "56px", md: "72px" }}  // logo más grande que el resto
              _hover={{ transform: "scale(1.04)", transition: "0.2s" }}
              cursor="pointer"
            />
          </RouterLink>
        </Box>

        {/* Derecha (carrito + hamburguesa móvil) */}
        <HStack ml="auto" spacing={1}>
          <IconButton
            as={RouterLink}
            to="/cart"
            aria-label="Carrito"
            icon={<Image src={iconCart} alt="Carrito" boxSize="24px" />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          />
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onToggle}
            icon={isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />}
            variant="ghost"
            aria-label="Abrir menú"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)" }}
          />
        </HStack>
      </Flex>

      {/* Menú colapsable móvil */}
      <Collapse in={isOpen} animateOpacity>
        <Stack mt={2} spacing={2} pb={4} display={{ md: "none" }}>
          <Button
            as={RouterLink}
            to="/catalog"
            leftIcon={<Image src={iconBox} alt="Productos" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
            onClick={onToggle}
          >
            Productos
          </Button>
          <Button
            as={RouterLink}
            to="/about"
            leftIcon={<Image src={iconPeople} alt="Nosotros" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
            onClick={onToggle}
          >
            Nosotros
          </Button>
          <Button
            as={RouterLink}
            to="/contact"
            leftIcon={<Image src={iconContact} alt="Contacto" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
            onClick={onToggle}
          >
            Contacto
          </Button>
          <Button
            as={RouterLink}
            to="/cart"
            leftIcon={<Image src={iconCart} alt="Carrito" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
            onClick={onToggle}
          >
            Carrito
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
