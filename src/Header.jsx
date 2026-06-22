import { Link } from 'react-router-dom';
import { Login } from './login.jsx';
import { Dashboard } from './Dashboard';
import { StudentNew } from './StudentNew.jsx';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Button, Spacer, Heading } from "@chakra-ui/react";

export function Header() {
  const navigate = useNavigate();

  function cerrarSesion() {
    sessionStorage.removeItem("usuario");
    navigate("/");
  }

  return (
    <Box
      bg="blue.600"
      color="white"
      px="20px"
      py="15px"
      boxShadow="md"
    >
      <Flex alignItems="center">
        <Heading size="md">
          School Udemy
        </Heading>

        <Spacer />

        <Flex gap="10px" color="white">
          <Button
            as={Link}
            to="/dashboard"
            colorScheme="whiteAlpha"
            color = "white"
            variant="ghost"
          >
            Listado
          </Button>

          <Button
            as={Link}
            to="/studentnew"
            colorScheme="whiteAlpha"
            color = "white"
            variant="ghost"
          >
            Nuevo
          </Button>

          <Button
            colorScheme="red"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}