function Tabla({ columnas, datos, acciones }) {
  return (
    <table style={styles.tabla}>
      <thead>
        <tr>
          {columnas.map(col => <th key={col}>{col}</th>)}
          {acciones && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {datos.length === 0 ? (
          <tr>
            <td colSpan={columnas.length + (acciones ? 1 : 0)} style={styles.vacio}>
              No hay datos disponibles
            </td>
          </tr>
        ) : (
          datos.map((fila, i) => (
            <tr key={i}>
              {columnas.map(col => <td key={col}>{fila[col.toLowerCase()] ?? '-'}</td>)}
              {acciones && <td>{acciones(fila)}</td>}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

const styles = {
  tabla: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  vacio: { textAlign: 'center', padding: '20px', color: '#94a3b8' },
};

export default Tabla;