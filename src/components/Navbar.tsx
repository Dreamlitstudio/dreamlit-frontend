import React from "react";
import {
  Box,
  Flex,
  Button,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { FaHome, FaListAlt, FaPenNib, FaInfoCircle, FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={7}>
          <Button
            as={RouterLink}
            to="/"
            leftIcon={<FaHome />}
            colorScheme="teal"
            variant="ghost"
          >
            Home
          </Button>

          <Button
            as={RouterLink}
            to="/catalog"
            leftIcon={<FaListAlt />}
            colorScheme="teal"
            variant="ghost"
          >
            Productos
          </Button>

          <Button
            as={RouterLink}
            to="/customize"
            leftIcon={<FaPenNib />}
            colorScheme="teal"
            variant="ghost"
          >
            Personalización
          </Button>

          <Button
            as={RouterLink}
            to="/about"
            leftIcon={<FaInfoCircle />}
            colorScheme="teal"
            variant="ghost"
          >
            Nosotros
          </Button>

          <Button
            as={RouterLink}
            to="/contact"
            leftIcon={<FaInfoCircle />}
            colorScheme="teal"
            variant="ghost"
          >
            Contacto
          </Button>
        </Stack>

        <IconButton
          aria-label="Carrito de Compras"
          icon={<FaShoppingCart />}
          variant="solid"
          colorScheme="teal"
          as={RouterLink}
          to="/cart"
        />
      </Flex>
    </Box>
  );
};

export default Navbar;
