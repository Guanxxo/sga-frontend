function Navbar({ paginaActual, setPagina }) {
  const links = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'usuarios', label: '👤 Usuarios' },
    { id: 'estudiantes', label: '🎓 Estudiantes' },
    { id: 'docentes', label: '👨‍🏫 Docentes' },
    { id: 'periodos', label: '📅 Periodos' },
    { id: 'materias', label: '📚 Materias' },
    { id: 'matriculas', label: '📋 Matrículas' },
    { id: 'calificaciones', label: '📝 Calificaciones' },
    { id: 'asistencias', label: '✅ Asistencias' },
    { id: 'estadisticas', label: '📈 Estadísticas' },
  ];

  return (
    <nav style={styles.nav}>
      <h2 style={styles.titulo}>🏫 SGA</h2>
      <ul style={styles.ul}>
        {links.map(link => (
          <li key={link.id}>
            <button
              style={{
                ...styles.btn,
                backgroundColor: paginaActual === link.id ? '#4f46e5' : 'transparent',
                color: paginaActual === link.id ? 'white' : '#cbd5e1',
              }}
              onClick={() => setPagina(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const styles = {
  nav: {
    width: '220px',
    minHeight: '100vh',
    backgroundColor: '#1e293b',
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
  },
  titulo: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '1.5rem',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  btn: {
    width: '100%',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  },
};

export default Navbar;