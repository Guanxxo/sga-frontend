function Tarjeta({ titulo, children, accion }) {
  return (
    <div style={styles.tarjeta}>
      <div style={styles.header}>
        <h3 style={styles.titulo}>{titulo}</h3>
        {accion && <div>{accion}</div>}
      </div>
      <div style={styles.contenido}>
        {children}
      </div>
    </div>
  );
}

const styles = {
  tarjeta: {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '20px',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: '#f8fafc',
  },
  titulo: {
    margin: 0,
    fontSize: '1rem',
    color: '#1e293b',
  },
  contenido: {
    padding: '20px',
  },
};

export default Tarjeta;