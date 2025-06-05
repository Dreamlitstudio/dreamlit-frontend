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
    <Box bg="#225059" px={4} boxShadow="md" position="sticky" top="0" zIndex="1000">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <RouterLink to="/">
          <Image
            src={logo}
            alt="Logo"
            boxSize="40px"
            _hover={{ transform: "scale(1.1)", transition: "0.2s" }}
            cursor="pointer"
          />
        </RouterLink>

        {/* Botón hamburguesa en móviles */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={isOpen ? <CloseIcon boxSize={5} /> : <HamburgerIcon boxSize={6} />}
          variant="ghost"
          aria-label="Abrir menú"
          color="#9fe0ed"
          _hover={{ bg: "rgba(255,255,255,0.2)" }}
        />

        {/* Links escritorio */}
        <Flex display={{ base: "none", md: "flex" }} alignItems="center">
          <Stack direction="row" spacing={4}>
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
            <IconButton
              as={RouterLink}
              to="/cart"
              aria-label="Carrito"
              icon={<Image src={iconCart} alt="Carrito" boxSize="24px" />}
              variant="ghost"
              color="#9fe0ed"
              _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
            />
          </Stack>
        </Flex>
      </Flex>

      {/* Links móviles */}
      <Collapse in={isOpen} animateOpacity>
        <Stack mt={4} spacing={4} pb={4} display={{ md: "none" }}>
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
          <Button
            as={RouterLink}
            to="/cart"
            leftIcon={<Image src={iconCart} alt="Carrito" {...iconStyle} />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Carrito
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
