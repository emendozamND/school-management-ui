import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as API from "./services/data.js";
import { Header } from "./Header.jsx";

import {
  Box,
  Heading,
  Table,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

export function StudentCalifications() {
  const params = useParams();
  const matriculaId = params.matriculaId;

  const [calificaciones, setCalificaciones] = useState([]);

  const [calificacion, setCalificacion] = useState({
    descripcion: "",
    nota: "",
    porcentaje: "",
  });

  useEffect(() => {
    API.getCalificaciones(params.matriculaId).then(setCalificaciones);
  }, [params.matriculaId]);

  let total = 0;

  calificaciones?.forEach((calificacion) => {
    total +=
      (calificacion.nota * calificacion.porcentaje) / 100;
  });

  function cargarCalificaciones() {
    API.getCalificaciones(params.matriculaId).then(setCalificaciones);
  }

  function createCalificacion() {
    let valid =
      calificacion.descripcion.trim() !== "" &&
      calificacion.nota !== "" &&
      calificacion.porcentaje !== "";

    if (valid) {
      API.createCalificacion(calificacion, matriculaId).then((result) => {
        if (result === true || result === "true") {
         Swal.fire(
            'Éxito',
            'Calificación creada correctamente',
            'success'
          )

          setCalificacion({
            descripcion: "",
            nota: "",
            porcentaje: "",
          });

          cargarCalificaciones();
        } else {
          Swal.fire(
            'Éxito',
            'Error al crear la calificación',
            'error'
          )
        }
      });
    } else {
      Swal.fire(
        'Error',
        'Todos los campos son obligatorios',
        'error'
      );
    }
  }

  function deleteCalificacion(id) {
    API.deleteCalificacion(id).then((result) => {
      if (result === "true" || result === true) {
        Swal.fire(
          'Éxito',
          'Calificación eliminada correctamente',
          'success'
        );
        cargarCalificaciones();
      } else {
        Swal.fire(
          'Error',
          'Error al eliminar la calificación',
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
          bg="white"
          p="25px"
          borderRadius="md"
          boxShadow="lg"
        >
          <Heading
            size="lg"
            color="blue.600"
            mb="20px"
          >
            Calificaciones del estudiante
          </Heading>

          <Table.Root variant="outline">
            <Table.Header>
              <Table.Row bg="blue.600">
                <Table.ColumnHeader color="white">
                  Descripción
                </Table.ColumnHeader>

                <Table.ColumnHeader color="white">
                  Nota
                </Table.ColumnHeader>

                <Table.ColumnHeader color="white">
                  Ponderación
                </Table.ColumnHeader>

                <Table.ColumnHeader color="white">
                  Acciones
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {calificaciones?.map((calificacion, index) => (
                <Table.Row
                  key={calificacion.id}
                  bg={
                    index % 2 === 0
                      ? "gray.50"
                      : "blue.50"
                  }
                >
                  <Table.Cell>
                    {calificacion.descripcion}
                  </Table.Cell>

                  <Table.Cell>
                    {calificacion.nota}
                  </Table.Cell>

                  <Table.Cell>
                    {calificacion.porcentaje}%
                  </Table.Cell>

                  <Table.Cell>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() =>
                        deleteCalificacion(calificacion.id)
                      }
                    >
                      Eliminar
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}

              <Table.Row bg="gray.100">
                <Table.Cell>
                  <Input
                    type="text"
                    id="descripcion"
                    placeholder="Descripción"
                    value={calificacion.descripcion}
                    onChange={(event) =>
                      setCalificacion({
                        ...calificacion,
                        descripcion: event.target.value,
                      })
                    }
                  />
                </Table.Cell>

                <Table.Cell>
                  <Input
                    type="number"
                    id="nota"
                    placeholder="Nota"
                    value={calificacion.nota}
                    onChange={(event) =>
                      setCalificacion({
                        ...calificacion,
                        nota: event.target.value,
                      })
                    }
                  />
                </Table.Cell>

                <Table.Cell>
                  <Input
                    type="number"
                    id="porcentaje"
                    placeholder="Ponderación"
                    value={calificacion.porcentaje}
                    onChange={(event) =>
                      setCalificacion({
                        ...calificacion,
                        porcentaje: event.target.value,
                      })
                    }
                  />
                </Table.Cell>

                <Table.Cell>
                  <Button
                    colorScheme="green"
                    onClick={createCalificacion}
                  >
                    Nueva
                  </Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>

          <Box
            mt="25px"
            p="20px"
            bg="blue.50"
            borderRadius="md"
            border="1px solid"
            borderColor="blue.200"
          >
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="blue.700"
            >
              NOTA FINAL: {total.toFixed(2)}
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
}