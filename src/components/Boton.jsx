function Boton({ texto, onClick, tipo = 'primary', disabled = false }) {
  const colores = {
    primary: { backgroundColor: '#4f46e5', color: 'white' },
    danger: { backgroundColor: '#dc2626', color: 'white' },
    success: { backgroundColor: '#22c55e', color: 'white' },
    warning: { backgroundColor: '#f59e0b', color: 'white' },
    info: { backgroundColor: '#3b82f6', color: 'white' },
    secondary: { backgroundColor: '#94a3b8', color: 'white' },
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles.btn,
        ...colores[tipo],
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {texto}
    </button>
  );
}

const styles = {
  btn: {
    padding: '8px 14px',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    fontSize: '0.85rem',
    marginRight: '5px',
    transition: 'opacity 0.2s',
  },
};

export default Boton;