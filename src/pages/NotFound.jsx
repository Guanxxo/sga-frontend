function NotFound({ setPagina }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.codigo}>404</h1>
      <h2 style={styles.titulo}>Página no encontrada</h2>
      <p style={styles.texto}>La página que buscas no existe.</p>
      <button style={styles.btn} onClick={() => setPagina('dashboard')}>
        🏠 Volver al Dashboard
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    padding: '20px',
  },
  codigo: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#4f46e5',
    margin: 0,
  },
  titulo: {
    fontSize: '1.5rem',
    color: '#1e293b',
    margin: '10px 0',
  },
  texto: {
    color: '#64748b',
    marginBottom: '20px',
  },
  btn: {
    padding: '10px 20px',
    backgroundColor: '#4f46e5',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
};

export default NotFound;