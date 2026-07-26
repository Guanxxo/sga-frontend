import { useState, useEffect } from 'react';
import { getPeriodos, createPeriodo } from '../services/api';

function Periodos() {
  const [periodos, setPeriodos] = useState([]);
  const [form, setForm] = useState({ nombre: '', fecha_inicio: '', fecha_fin: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getPeriodos().then(res => setPeriodos(res.data)).catch(() => setError('Error al cargar periodos'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createPeriodo(form)
      .then(() => { setExito('Periodo creado correctamente'); cargar(); setForm({ nombre: '', fecha_inicio: '', fecha_fin: '' }); })
      .catch(() => setError('Error al crear periodo. Verifica las fechas.'));
  };

  return (
    <div style={styles.container}>
      <h2>📅 Periodos Académicos</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Nuevo Periodo</h3>
        <input style={styles.input} placeholder="Nombre (ej: 2026-A)" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
        <label style={styles.label}>Fecha Inicio</label>
        <input style={styles.input} type="date" value={form.fecha_inicio} onChange={e => setForm({...form, fecha_inicio: e.target.value})} />
        <label style={styles.label}>Fecha Fin</label>
        <input style={styles.input} type="date" value={form.fecha_fin} onChange={e => setForm({...form, fecha_fin: e.target.value})} />
        <button style={styles.btnPrimary} onClick={handleSubmit}>Crear Periodo</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Fecha Inicio</th><th>Fecha Fin</th></tr>
        </thead>
        <tbody>
          {periodos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nombre}</td><td>{p.fecha_inicio}</td><td>{p.fecha_fin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: { padding: '20px' },
  error: { color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px' },
  exito: { color: 'green', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '8px' },
  form: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' },
  input: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' },
  label: { fontSize: '0.85rem', color: '#64748b' },
  btnPrimary: { padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  tabla: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
};

export default Periodos;