import { Header } from "./Header.jsx";
import { useState } from "react";
import * as API from "./services/data.js";

import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Select,
} from "@chakra-ui/react";

export function StudentNew() {
  const [student, setStudent] = useState({
    dni: "",
    nombre: "",
    direccion: "",
    edad: "",
    email: "",
    asignatura: "1",
  });

  function handleSubmit(e) {
    e.preventDefault();

    API.createStudent(student).then((result) => {
      if (result === "true") {
        alert("Estudiante creado correctamente");

        setStudent({
          dni: "",
          nombre: "",
          direccion: "",
          edad: "",
          email: "",
          asignatura: "1",
        });
      } else {
        alert("Error al crear el estudiante");
      }
    });
  }

  return (
    <>
      <Header />

      <Box p="30px" bg="gray.100" minH="100vh">
        <Box
          maxW="600px"
          mx="auto"
          bg="white"
          p="30px"
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading size="lg" mb="25px" color="blue.600" textAlign="center">
            Nuevo estudiante
          </Heading>

          <form id="formulario" onSubmit={handleSubmit}>
            <Box mb="15px">
              <Text mb="5px">DNI</Text>
              <Input
                type="text"
                id="dni"
                required
                value={student.dni}
                onChange={(event) =>
                  setStudent({ ...student, dni: event.target.value })
                }
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Nombre</Text>
              <Input
                type="text"
                id="nombre"
                required
                value={student.nombre}
                onChange={(event) =>
                  setStudent({ ...student, nombre: event.target.value })
                }
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Dirección</Text>
              <Input
                type="text"
                id="direccion"
                required
                value={student.direccion}
                onChange={(event) =>
                  setStudent({ ...student, direccion: event.target.value })
                }
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Edad</Text>
              <Input
                type="number"
                id="edad"
                required
                value={student.edad}
                onChange={(event) =>
                  setStudent({ ...student, edad: event.target.value })
                }
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Email</Text>
              <Input
                type="email"
                id="email"
                required
                value={student.email}
                onChange={(event) =>
                  setStudent({ ...student, email: event.target.value })
                }
              />
            </Box>

            <Box mb="20px">
              <Text mb="5px">Asignatura</Text>
              <Select.Root
                value={[student.asignatura]}
                onValueChange={(details) =>
                  setStudent({
                    ...student,
                    asignatura: details.value[0],
                  })
                }
              >
                <Select.HiddenSelect />

                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Selecciona una asignatura" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Select.Positioner>
                  <Select.Content>
                    <Select.Item item="1">Matemáticas</Select.Item>
                    <Select.Item item="2">Informática</Select.Item>
                    <Select.Item item="3">Inglés</Select.Item>
                    <Select.Item item="4">Literatura</Select.Item>
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>
            </Box>

            <Button width="100%" colorScheme="blue" type="submit">
              Guardar estudiante
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}