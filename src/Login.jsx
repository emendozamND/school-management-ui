import { useState } from "react";
import * as API from "./services/data.js";
import imagen from "./assets/login.png";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";

export function Login() {
  const [teacher, setTeacher] = useState({
    usuario: "",
    password: "",
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await API.login(
      teacher.usuario,
      teacher.password
    );

    if (response !== "") {
      alert("Credenciales válidas");

      sessionStorage.setItem(
        "usuario",
        response
      );

      navigate("/dashboard");
    } else {
      Swal.fire(
        'Error',
        'Credenciales inválidas',
        'error'
      )
    }
  }

  return (
    <Flex
      minH="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg="gray.100"
    >
      <Image
        src={imagen}
        width="150px"
        mb="20px"
      />

      <Box
        p="30px"
        width="400px"
        bg="white"
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading
          size="lg"
          textAlign="center"
          mb="20px"
        >
          Iniciar sesión
        </Heading>

        <form onSubmit={handleSubmit}>
          <Box mb="15px">
            <Text mb="5px">Usuario</Text>

            <Input
              type="text"
              placeholder="Usuario"
              onChange={(event) =>
                setTeacher({
                  ...teacher,
                  usuario: event.target.value,
                })
              }
            />
          </Box>

          <Box mb="15px">
            <Text mb="5px">Contraseña</Text>

            <Input
              type="password"
              placeholder="Contraseña"
              onChange={(event) =>
                setTeacher({
                  ...teacher,
                  password: event.target.value,
                })
              }
            />
          </Box>

          <Button
            width="100%"
            colorScheme="blue"
            type="submit"
          >
            Iniciar sesión
          </Button>
        </form>
      </Box>
    </Flex>
  );
}