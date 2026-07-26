import { useState, useEffect } from 'react';
import { getEstadisticas } from '../services/api';

function Estadisticas() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getEstadisticas()
      .then(res => setStats(res.data))
      .catch(() => setError('Error al cargar estadísticas'));
  }, []);

  return (
    <div style={styles.container}>
      <h2>📈 Estadísticas del Sistema</h2>
      {error && <p style={styles.error}>{error}</p>}
      {stats && (
        <>
          <div style={styles.seccion}>
            <h3>Resumen General</h3>
            <div style={styles.grid}>
              <Dato label="Total Usuarios" valor={stats.total_usuarios} />
              <Dato label="Total Estudiantes" valor={stats.total_estudiantes} />
              <Dato label="Total Docentes" valor={stats.total_docentes} />
              <Dato label="Total Materias" valor={stats.total_materias} />
              <Dato label="Total Matrículas" valor={stats.total_matriculas} />
              <Dato label="Total Calificaciones" valor={stats.total_calificaciones} />
              <Dato label="Total Asistencias" valor={stats.total_asistencias} />
            </div>
          </div>

          <div style={styles.seccion}>
            <h3>Matrículas por Estado</h3>
            <div style={styles.grid}>
              {Object.entries(stats.matriculas_por_estado).map(([estado, total]) => (
                <Dato key={estado} label={estado.toUpperCase()} valor={total} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Dato({ label, valor }) {
  return (
    <div style={styles.dato}>
      <p style={styles.datoLabel}>{label}</p>
      <p style={styles.datoValor}>{valor}</p>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  error: { color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px' },
  seccion: { marginBottom: '30px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' },
  dato: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' },
  datoLabel: { margin: 0, color: '#64748b', fontSize: '0.8rem' },
  datoValor: { margin: '8px 0 0', fontSize: '2rem', fontWeight: 'bold', color: '#4f46e5' },
};

export default Estadisticas;