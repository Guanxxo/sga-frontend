import { useState, useEffect } from 'react';
import { getEstadisticas } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getEstadisticas()
      .then(res => setStats(res.data))
      .catch(() => setError('No se pudo conectar al backend. ¿Está corriendo el servidor?'));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.titulo}>📊 Dashboard</h2>
      {error && <p style={styles.error}>{error}</p>}
      {stats ? (
        <div style={styles.grid}>
          <Tarjeta titulo="Usuarios" valor={stats.total_usuarios} color="#4f46e5" />
          <Tarjeta titulo="Estudiantes" valor={stats.total_estudiantes} color="#0891b2" />
          <Tarjeta titulo="Docentes" valor={stats.total_docentes} color="#059669" />
          <Tarjeta titulo="Materias" valor={stats.total_materias} color="#d97706" />
          <Tarjeta titulo="Matrículas" valor={stats.total_matriculas} color="#dc2626" />
          <Tarjeta titulo="Calificaciones" valor={stats.total_calificaciones} color="#7c3aed" />
          <Tarjeta titulo="Asistencias" valor={stats.total_asistencias} color="#0d9488" />
        </div>
      ) : (
        !error && <p style={styles.loading}>Cargando estadísticas...</p>
      )}

      {stats && (
        <div style={styles.seccion}>
          <h3>Matrículas por Estado</h3>
          <div style={styles.grid}>
            {Object.entries(stats.matriculas_por_estado).map(([estado, total]) => (
              <div key={estado} style={styles.estadoCard}>
                <p style={styles.estadoNombre}>{estado.toUpperCase()}</p>
                <p style={styles.estadoValor}>{total}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Tarjeta({ titulo, valor, color }) {
  return (
    <div style={{ ...styles.tarjeta, borderLeft: `5px solid ${color}` }}>
      <p style={styles.tarjetaTitulo}>{titulo}</p>
      <p style={{ ...styles.tarjetaValor, color }}>{valor}</p>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  titulo: { color: '#1e293b', marginBottom: '20px' },
  error: { color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px' },
  loading: { color: '#64748b' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' },
  tarjeta: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  tarjetaTitulo: { margin: 0, color: '#64748b', fontSize: '0.85rem' },
  tarjetaValor: { margin: '8px 0 0', fontSize: '2rem', fontWeight: 'bold' },
  seccion: { marginTop: '30px' },
  estadoCard: { backgroundColor: 'white', padding: '15px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  estadoNombre: { margin: 0, fontSize: '0.75rem', color: '#64748b' },
  estadoValor: { margin: '5px 0 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' },
};

export default Dashboard;