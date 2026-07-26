import { useState, useEffect } from 'react';
import { getMatriculas, createMatricula, confirmarMatricula, aprobarMatricula, rechazarMatricula, anularMatricula } from '../services/api';

function Matriculas() {
  const [matriculas, setMatriculas] = useState([]);
  const [form, setForm] = useState({ id_estudiante: '', id_materia: '', id_periodo: '', fecha: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getMatriculas().then(res => setMatriculas(res.data)).catch(() => setError('Error al cargar matrículas'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createMatricula({
      ...form,
      id_estudiante: parseInt(form.id_estudiante),
      id_materia: parseInt(form.id_materia),
      id_periodo: parseInt(form.id_periodo),
    })
      .then(() => { setExito('Matrícula creada correctamente'); cargar(); setForm({ id_estudiante: '', id_materia: '', id_periodo: '', fecha: '' }); })
      .catch(() => setError('Error al crear matrícula. Verifica los datos.'));
  };

  const accion = (fn, id) => {
    setError(''); setExito('');
    fn(id).then(() => { setExito('Acción realizada correctamente'); cargar(); }).catch(e => setError(e.response?.data?.detail || 'Error al realizar acción'));
  };

  const colorEstado = (estado) => {
    const colores = { borrador: '#94a3b8', en_revision: '#f59e0b', pendiente: '#3b82f6', activa: '#22c55e', rechazada: '#ef4444', completada: '#8b5cf6', anulada: '#6b7280' };
    return colores[estado] || '#94a3b8';
  };

  return (
    <div style={styles.container}>
      <h2>📋 Matrículas</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Nueva Matrícula</h3>
        <input style={styles.input} placeholder="ID Estudiante" value={form.id_estudiante} onChange={e => setForm({...form, id_estudiante: e.target.value})} />
        <input style={styles.input} placeholder="ID Materia" value={form.id_materia} onChange={e => setForm({...form, id_materia: e.target.value})} />
        <input style={styles.input} placeholder="ID Periodo" value={form.id_periodo} onChange={e => setForm({...form, id_periodo: e.target.value})} />
        <input style={styles.input} type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} />
        <button style={styles.btnPrimary} onClick={handleSubmit}>Crear Matrícula</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr>
            <th>ID</th><th>Estudiante</th><th>Materia</th><th>Fecha</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {matriculas.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.id_estudiante}</td>
              <td>{m.id_materia}</td>
              <td>{m.fecha}</td>
              <td>
                <span style={{ ...styles.badge, backgroundColor: colorEstado(m.estado) }}>
                  {m.estado}
                </span>
              </td>
              <td style={styles.acciones}>
                {m.estado === 'borrador' && <button style={styles.btnInfo} onClick={() => accion(confirmarMatricula, m.id)}>Confirmar</button>}
                {m.estado === 'pendiente' && <button style={styles.btnSuccess} onClick={() => accion(aprobarMatricula, m.id)}>Aprobar</button>}
                {m.estado === 'pendiente' && <button style={styles.btnDanger} onClick={() => accion(rechazarMatricula, m.id)}>Rechazar</button>}
                {m.estado === 'activa' && <button style={styles.btnWarning} onClick={() => accion(anularMatricula, m.id)}>Anular</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  error: { color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px', marginBottom: '10px' },
  exito: { color: 'green', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '8px', marginBottom: '10px' },
  form: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' },
  input: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' },
  btnPrimary: { padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnSuccess: { padding: '5px 10px', backgroundColor: '#22c55e', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' },
  btnDanger: { padding: '5px 10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' },
  btnInfo: { padding: '5px 10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '5px' },
  btnWarning: { padding: '5px 10px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  tabla: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  badge: { padding: '3px 8px', borderRadius: '12px', color: 'white', fontSize: '0.8rem' },
  acciones: { display: 'flex', gap: '5px' },
};

export default Matriculas;