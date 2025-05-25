import React from "react";
import { Box, Text, Link, Stack, Icon } from "@chakra-ui/react";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <Box bg="#225059" color="#9fe0ed" py={6} px={4} mt={10}>
      <Stack direction={{ base: "column", md: "row" }} justify="space-between" align="center">
        <Text fontSize="sm">Hecho con amor en México</Text>
        <Link
          href="https://www.instagram.com/dream.lit.studio?igsh=dzBrY2Jwa2NjY3Fs"
          isExternal
          display="flex"
          alignItems="center"
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
