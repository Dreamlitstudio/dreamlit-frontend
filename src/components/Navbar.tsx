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
import {
  FaListAlt,
  FaInfoCircle,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="#225059" px={4} boxShadow="md">
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

        {/* Icono menú responsive */}
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
          icon={isOpen ? <FaTimes /> : <FaBars />}
          variant="ghost"
          aria-label="Toggle Navigation"
          color="#9fe0ed"
          _hover={{ bg: "rgba(255,255,255,0.2)" }}
        />

        {/* Links en escritorio */}
        <Flex display={{ base: "none", md: "flex" }} alignItems="center">
          <Stack direction="row" spacing={4}>
            <Button as={RouterLink} to="/catalog" leftIcon={<FaListAlt />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}>
              Productos
            </Button>
            <Button as={RouterLink} to="/about" leftIcon={<FaInfoCircle />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}>
              Nosotros
            </Button>
            <Button as={RouterLink} to="/contact" leftIcon={<FaInfoCircle />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}>
              Contacto
            </Button>
            <IconButton as={RouterLink} to="/cart" aria-label="Carrito" icon={<FaShoppingCart />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }} />
          </Stack>
        </Flex>
      </Flex>

      {/* Links en móviles */}
      <Collapse in={isOpen} animateOpacity>
        <Stack mt={4} spacing={4} pb={4} display={{ md: "none" }}>
          <Button as={RouterLink} to="/catalog" leftIcon={<FaListAlt />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}>
            Productos
          </Button>
          <Button as={RouterLink} to="/about" leftIcon={<FaInfoCircle />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}>
            Nosotros
          </Button>
          <Button as={RouterLink} to="/contact" leftIcon={<FaInfoCircle />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}>
            Contacto
          </Button>
          <Button as={RouterLink} to="/cart" leftIcon={<FaShoppingCart />} variant="ghost" color="#9fe0ed" _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}>
            Carrito
          </Button>
        </Stack>
      </Collapse>
    </Box>
  );
};

export default Navbar;
