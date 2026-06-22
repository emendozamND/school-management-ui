const URL = "https://localhost:7113/api/";

export async function login(usuario, pass) {
  const datos = {
    usuario: usuario,
    pass: pass,
  };

  const response = await fetch(URL + "Profesor/autenticacion", {
    method: "POST",
    body: JSON.stringify(datos),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.text();

  console.log("Respuesta API:", data);

  return data;
}
export function getStudents(usuario) {
  return fetch(URL + "alumnosprofesor?usuario=" + usuario, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}
export function createStudent(student) {
  let data = {
    dni: student.dni,
    nombre: student.nombre,
    direccion: student.direccion,
    edad: student.edad,
    email: student.email,
    asignatura: student.asignatura,
  };
  return fetch(URL + "Alumno?id_asig=" + student.asignatura, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.text());
}
export function deleteStudent(id) {
  return fetch(URL + "Alumno?id=" + id, {
    method: "DELETE",
    headers: {
      contentType: "application/json",
    },
  }).then((data) => data.text());
}
export function getStudentDetails(id) {
  return fetch(URL + "Alumno?id=" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}
export function StudentEdit(student) {
  let data = {
    id: student.id,
    dni: student.dni,
    nombre: student.nombre,
    direccion: student.direccion,
    edad: student.edad,
    email: student.email,
    asignatura: student.asignatura,
  };

  return fetch(URL + "Alumno", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.text());
}

export function getCalificaciones(id) {
  return fetch(URL + "calificaciones?idMatricula=" + id, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.json());
}
export function createCalificacion(calificacion, matriculaId) {
  let data = {
    descripcion: calificacion.descripcion,
    nota: Number(calificacion.nota),
    porcentaje: Number(calificacion.porcentaje),
    matriculaId: Number(matriculaId),
  };

  console.log("JSON enviado:", data);

  return fetch(URL + "calificacion", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.text());
}
export function deleteCalificacion(id) {
  return fetch(URL + "calificacion?id=" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => data.text());
}
