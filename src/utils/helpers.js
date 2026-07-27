// Formatea una fecha a formato legible
export const formatearFecha = (fecha) => {
  if (!fecha) return '-';
  return new Date(fecha).toLocaleDateString('es-EC', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Calcula el promedio de notas
export const calcularPromedio = (nota1, nota2, examen) => {
  return ((parseFloat(nota1) + parseFloat(nota2) + parseFloat(examen)) / 3).toFixed(2);
};

// Determina si una calificación es aprobada
export const esAprobado = (promedio) => {
  return parseFloat(promedio) >= 7.0;
};

// Determina el color según el promedio
export const colorPromedio = (promedio) => {
  if (promedio >= 9) return '#22c55e';
  if (promedio >= 7) return '#3b82f6';
  if (promedio >= 5) return '#f59e0b';
  return '#ef4444';
};

// Calcula el porcentaje de asistencia
export const calcularAsistencia = (presentes, total) => {
  if (total === 0) return 0;
  return ((presentes / total) * 100).toFixed(2);
};

// Trunca un texto largo
export const truncar = (texto, longitud = 30) => {
  if (!texto) return '-';
  return texto.length > longitud ? texto.substring(0, longitud) + '...' : texto;
};