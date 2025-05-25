import React from "react";
import { Box, Text, Link, Stack, Icon, Flex } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="#225059" color="#9fe0ed" py={6} px={4} mt={10}>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 3, md: 0 }}
        justify="space-between"
        align="center"
        textAlign={{ base: "center", md: "left" }}
      >
        <Text fontSize="sm">Hecho con amor en México</Text>
        <Link
          href="https://www.instagram.com/dream.lit.studio?igsh=dzBrY2Jwa2NjY3Fs"
          isExternal
          display="flex"
          alignItems="center"
          justifyContent={{ base: "center", md: "flex-start" }}
          _hover={{ color: "white", textDecoration: "none" }}
        >
          <Icon as={FaInstagram} mr={2} />
          @dream.lit.studio
        </Link>
      </Stack>
    </Box>
  );
};

export default Footer;
