import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { StudentEdit } from './StudentEdit.jsx';
import * as API from './services/data.js'
import { FaEdit, FaCheck,FaTrash } from 'react-icons/fa';
import {
  Box,
  Table,
  Heading,
  Button,
} from "@chakra-ui/react";
export function StudentList(){
    let usuario = sessionStorage.getItem("usuario");
    const [students, setStudents] = useState([]);
   useEffect(() => {
    API.getStudents(usuario).then(data => setStudents(data));
}, []);
    function deleteStudent(id) {
        API.deleteStudent(id).then(result => {
            if (result === "true") {
                alert("Estudiante eliminado correctamente");
            } else {
                alert("Error al eliminar el estudiante");
            }
        });
    }
  return (
  <Box p="30px">
    <Heading
      mb="20px"
      color="blue.600"
      size="lg"
    >
      Listado de Estudiantes
    </Heading>

    <Box
      bg="white"
      p="20px"
      borderRadius="md"
      boxShadow="md"
    >
      <Table.Root variant="striped" colorSchema="gray">
        <Table.Header>
          <Table.Row bg="blue.500">
            <Table.ColumnHeader color="white">ID</Table.ColumnHeader>
            <Table.ColumnHeader color="white">DNI</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Nombre</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Dirección</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Edad</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Email</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Asignatura</Table.ColumnHeader>
            <Table.ColumnHeader color="white">Acciones</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {students?.map((student) => (
            <Table.Row key={student.id}>
              <Table.Cell>{student.id}</Table.Cell>
              <Table.Cell>{student.dni}</Table.Cell>
              <Table.Cell>{student.nombre}</Table.Cell>
              <Table.Cell>{student.direccion}</Table.Cell>
              <Table.Cell>{student.edad}</Table.Cell>
              <Table.Cell>{student.email}</Table.Cell>
              <Table.Cell>{student.asignatura}</Table.Cell>

              <Table.Cell>
                <Button
                  as={Link}
                  to={`/studentEdit/${student.id}`}
                  size="sm"
                  colorScheme="yellow"
                  mr="2"
                >
                  <FaEdit />
                </Button>

                <Button
                  as={Link}
                  to={`/student/califications/${student.matriculaId}`}
                  size="sm"
                  colorScheme="blue"
                  mr="2"
                >
                   <FaCheck />
                </Button>

                <Button
                  size="sm"
                  colorScheme="red"
                  onClick={() =>
                    deleteStudent(student.id)
                  }
                >
                  <FaTrash />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  </Box>
);
}