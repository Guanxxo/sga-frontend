import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Usuarios
export const getUsuarios = () => API.get('/usuarios');
export const createUsuario = (data) => API.post('/usuarios', data);
export const deleteUsuario = (id) => API.delete(`/usuarios/${id}`);

// Estudiantes
export const getEstudiantes = () => API.get('/estudiantes');
export const createEstudiante = (data) => API.post('/estudiantes', data);
export const deleteEstudiante = (id) => API.delete(`/estudiantes/${id}`);
export const getResumenEstudiante = (id) => API.get(`/estudiantes/${id}/resumen`);

// Docentes
export const getDocentes = () => API.get('/docentes');
export const createDocente = (data) => API.post('/docentes', data);

// Periodos
export const getPeriodos = () => API.get('/periodos');
export const createPeriodo = (data) => API.post('/periodos', data);

// Materias
export const getMaterias = () => API.get('/materias');
export const createMateria = (data) => API.post('/materias', data);
export const deleteMateria = (id) => API.delete(`/materias/${id}`);

// Matriculas
export const getMatriculas = () => API.get('/matriculas');
export const createMatricula = (data) => API.post('/matriculas', data);
export const confirmarMatricula = (id) => API.put(`/matriculas/${id}/confirmar`);
export const aprobarMatricula = (id) => API.put(`/matriculas/${id}/aprobar`);
export const rechazarMatricula = (id) => API.put(`/matriculas/${id}/rechazar`);
export const anularMatricula = (id) => API.put(`/matriculas/${id}/anular`);

// Calificaciones
export const getCalificaciones = () => API.get('/calificaciones');
export const createCalificacion = (data) => API.post('/calificaciones', data);

// Asistencias
export const getAsistencias = () => API.get('/asistencias');
export const createAsistencia = (data) => API.post('/asistencias', data);

// Estadisticas
export const getEstadisticas = () => API.get('/estadisticas');