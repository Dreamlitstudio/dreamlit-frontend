import React from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Stack,
  Image,
} from "@chakra-ui/react";
import {
  FaListAlt,
  FaPenNib,
  FaInfoCircle,
  FaShoppingCart,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/logo.png"; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  return (
    <Box bg="#225059" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={7} align="center">
          <RouterLink to="/">
            <Image
              src={logo}
              alt="Logo"
              boxSize="40px"
              _hover={{ transform: "scale(1.1)", transition: "0.2s" }}
              cursor="pointer"
            />
          </RouterLink>

          <Button
            as={RouterLink}
            to="/catalog"
            leftIcon={<FaListAlt />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Productos
          </Button>


          <Button
            as={RouterLink}
            to="/about"
            leftIcon={<FaInfoCircle />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Nosotros
          </Button>

          <Button
            as={RouterLink}
            to="/contact"
            leftIcon={<FaInfoCircle />}
            variant="ghost"
            color="#9fe0ed"
            _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          >
            Contacto
          </Button>
        </Stack>

        <IconButton
          aria-label="Carrito de Compras"
          icon={<FaShoppingCart />}
          variant="ghost"
          color="#9fe0ed"
          _hover={{ bg: "rgba(255,255,255,0.2)", color: "white" }}
          as={RouterLink}
          to="/cart"
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
