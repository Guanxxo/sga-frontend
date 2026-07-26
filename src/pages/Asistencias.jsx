import { useState, useEffect } from 'react';
import { getAsistencias, createAsistencia } from '../services/api';

function Asistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [form, setForm] = useState({ id_matricula: '', fecha: '', presente: true, justificada: false, observacion: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getAsistencias().then(res => setAsistencias(res.data)).catch(() => setError('Error al cargar asistencias'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createAsistencia({
      ...form,
      id_matricula: parseInt(form.id_matricula),
      presente: form.presente === true || form.presente === 'true',
      justificada: form.justificada === true || form.justificada === 'true',
    })
      .then(() => { setExito('Asistencia registrada correctamente'); cargar(); setForm({ id_matricula: '', fecha: '', presente: true, justificada: false, observacion: '' }); })
      .catch(() => setError('Error al registrar asistencia. Verifica los datos.'));
  };

  return (
    <div style={styles.container}>
      <h2>✅ Asistencias</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Registrar Asistencia</h3>
        <input style={styles.input} placeholder="ID Matrícula" value={form.id_matricula} onChange={e => setForm({...form, id_matricula: e.target.value})} />
        <label style={styles.label}>Fecha</label>
        <input style={styles.input} type="date" value={form.fecha} onChange={e => setForm({...form, fecha: e.target.value})} />
        <label style={styles.label}>¿Presente?</label>
        <select style={styles.input} value={form.presente} onChange={e => setForm({...form, presente: e.target.value === 'true'})}>
          <option value="true">Sí</option>
          <option value="false">No</option>
        </select>
        <label style={styles.label}>¿Justificada?</label>
        <select style={styles.input} value={form.justificada} onChange={e => setForm({...form, justificada: e.target.value === 'true'})}>
          <option value="false">No</option>
          <option value="true">Sí</option>
        </select>
        <input style={styles.input} placeholder="Observación (opcional)" value={form.observacion} onChange={e => setForm({...form, observacion: e.target.value})} />
        <button style={styles.btnPrimary} onClick={handleSubmit}>Registrar Asistencia</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr><th>ID</th><th>Matrícula</th><th>Fecha</th><th>Presente</th><th>Justificada</th><th>Observación</th></tr>
        </thead>
        <tbody>
          {asistencias.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.id_matricula}</td>
              <td>{a.fecha}</td>
              <td style={{color: a.presente ? '#22c55e' : '#ef4444'}}>{a.presente ? '✅ Sí' : '❌ No'}</td>
              <td>{a.justificada ? '✅ Sí' : '❌ No'}</td>
              <td>{a.observacion || '-'}</td>
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

export default Asistencias;