export const ROLES = {
  estudiante: { label: 'Estudiante', color: '#0891b2' },
  docente: { label: 'Docente', color: '#059669' },
  admin: { label: 'Administrador', color: '#4f46e5' },
};

export const ESTADOS_MATRICULA = {
  borrador: { label: 'Borrador', color: '#94a3b8' },
  en_revision: { label: 'En Revisión', color: '#f59e0b' },
  pendiente: { label: 'Pendiente', color: '#3b82f6' },
  activa: { label: 'Activa', color: '#22c55e' },
  rechazada: { label: 'Rechazada', color: '#ef4444' },
  completada: { label: 'Completada', color: '#8b5cf6' },
  anulada: { label: 'Anulada', color: '#6b7280' },
};

export const SEMESTRES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const CREDITOS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const API_BASE_URL = 'http://127.0.0.1:8000/api';