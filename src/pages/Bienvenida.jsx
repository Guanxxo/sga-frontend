function Bienvenida({ setPagina }) {
  const modulos = [
    { id: 'usuarios', emoji: '👤', titulo: 'Usuarios', desc: 'Gestiona los usuarios del sistema' },
    { id: 'estudiantes', emoji: '🎓', titulo: 'Estudiantes', desc: 'Administra los estudiantes' },
    { id: 'docentes', emoji: '👨‍🏫', titulo: 'Docentes', desc: 'Gestiona los docentes' },
    { id: 'periodos', emoji: '📅', titulo: 'Periodos', desc: 'Administra los periodos académicos' },
    { id: 'materias', emoji: '📚', titulo: 'Materias', desc: 'Gestiona las materias' },
    { id: 'matriculas', emoji: '📋', titulo: 'Matrículas', desc: 'Administra las matrículas' },
    { id: 'calificaciones', emoji: '📝', titulo: 'Calificaciones', desc: 'Registra calificaciones' },
    { id: 'asistencias', emoji: '✅', titulo: 'Asistencias', desc: 'Controla la asistencia' },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.titulo}>🏫 Sistema de Gestión Académica</h1>
        <p style={styles.subtitulo}>Universidad Politécnica Salesiana — 2026</p>
        <button style={styles.btn} onClick={() => setPagina('dashboard')}>
          📊 Ver Dashboard
        </button>
      </div>

      <h2 style={styles.modulosTitulo}>Módulos del Sistema</h2>
      <div style={styles.grid}>
        {modulos.map(m => (
          <div key={m.id} style={styles.card} onClick={() => setPagina(m.id)}>
            <span style={styles.emoji}>{m.emoji}</span>
            <h3 style={styles.cardTitulo}>{m.titulo}</h3>
            <p style={styles.cardDesc}>{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  hero: { backgroundColor: '#4f46e5', color: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px' },
  titulo: { margin: 0, fontSize: '2rem' },
  subtitulo: { margin: '10px 0 20px', opacity: 0.9 },
  btn: { padding: '12px 24px', backgroundColor: 'white', color: '#4f46e5', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },
  modulosTitulo: { color: '#1e293b', marginBottom: '15px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' },
  card: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', textAlign: 'center', transition: 'transform 0.2s' },
  emoji: { fontSize: '2rem' },
  cardTitulo: { margin: '10px 0 5px', color: '#1e293b' },
  cardDesc: { margin: 0, color: '#64748b', fontSize: '0.85rem' },
};

export default Bienvenida;