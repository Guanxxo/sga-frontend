function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.texto}>
        © 2026 Sistema de Gestión Académica (SGA) — Universidad Politécnica Salesiana
      </p>
      <p style={styles.subtexto}>
        Desarrollado con React + FastAPI | Ingeniería de Software
      </p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1e293b',
    color: 'white',
    textAlign: 'center',
    padding: '15px',
    marginTop: 'auto',
  },
  texto: {
    margin: 0,
    fontSize: '0.85rem',
  },
  subtexto: {
    margin: '5px 0 0',
    fontSize: '0.75rem',
    color: '#94a3b8',
  },
};

export default Footer;