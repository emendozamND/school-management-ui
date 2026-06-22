import { useParams } from "react-router-dom";
import { Header } from "./Header";
import { useState, useEffect } from "react";
import * as API from "./services/data.js";

import {
  Box,
  Heading,
  Input,
  Button,
  Text,
} from "@chakra-ui/react";

export function StudentEdit() {
  const params = useParams();

  const [student, setStudent] = useState({
    dni: "",
    nombre: "",
    direccion: "",
    edad: "",
    email: "",
    asignatura: "",
  });

  useEffect(() => {
    API.getStudentDetails(params.studentId).then((data) =>
      setStudent(data)
    );
  }, [params.studentId]);

  function handleSubmit(e) {
    e.preventDefault();

    API.StudentEdit(student).then((result) => {
      if (result === "true") {
        swal.fire(
          'Éxito',
          'Estudiante editado correctamente',
          'success'
        );
      } else {
        swal.fire(
          'Error',
          'Error al editar el estudiante',
          'error'
        );
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
          <Heading
            size="lg"
            color="blue.600"
            mb="10px"
            textAlign="center"
          >
            Editar Estudiante
          </Heading>

          <Text
            textAlign="center"
            color="gray.500"
            mb="25px"
          >
            ID: {params.studentId}
          </Text>

          <form onSubmit={handleSubmit}>
            <Box mb="15px">
              <Text mb="5px">DNI</Text>
              <Input
                type="text"
                value={student.dni || ""}
                isDisabled
                bg="gray.100"
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Nombre</Text>
              <Input
                type="text"
                value={student.nombre || ""}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    nombre: event.target.value,
                  })
                }
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Dirección</Text>
              <Input
                type="text"
                value={student.direccion || ""}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    direccion: event.target.value,
                  })
                }
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Edad</Text>
              <Input
                type="number"
                value={student.edad || ""}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    edad: event.target.value,
                  })
                }
              />
            </Box>

            <Box mb="15px">
              <Text mb="5px">Email</Text>
              <Input
                type="email"
                value={student.email || ""}
                onChange={(event) =>
                  setStudent({
                    ...student,
                    email: event.target.value,
                  })
                }
              />
            </Box>

            
            <Button
              type="submit"
              width="100%"
              colorScheme="green"
            >
              Guardar cambios
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}