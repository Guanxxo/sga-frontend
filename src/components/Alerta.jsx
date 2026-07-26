function Alerta({ tipo, mensaje }) {
  if (!mensaje) return null;

  const estilos = {
    error: { color: '#dc2626', backgroundColor: '#fee2e2', border: '1px solid #fca5a5' },
    exito: { color: '#16a34a', backgroundColor: '#dcfce7', border: '1px solid #86efac' },
    info: { color: '#2563eb', backgroundColor: '#dbeafe', border: '1px solid #93c5fd' },
    advertencia: { color: '#d97706', backgroundColor: '#fef3c7', border: '1px solid #fcd34d' },
  };

  const iconos = {
    error: '❌',
    exito: '✅',
    info: 'ℹ️',
    advertencia: '⚠️',
  };

  return (
    <div style={{ ...styles.alerta, ...estilos[tipo] }}>
      {iconos[tipo]} {mensaje}
    </div>
  );
}

const styles = {
  alerta: {
    padding: '10px 15px',
    borderRadius: '8px',
    marginBottom: '15px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
};

export default Alerta;