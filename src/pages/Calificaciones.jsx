import { useState, useEffect } from 'react';
import { getCalificaciones, createCalificacion } from '../services/api';

function Calificaciones() {
  const [calificaciones, setCalificaciones] = useState([]);
  const [form, setForm] = useState({ id_matricula: '', nota1: '', nota2: '', examen: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getCalificaciones().then(res => setCalificaciones(res.data)).catch(() => setError('Error al cargar calificaciones'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createCalificacion({
      ...form,
      id_matricula: parseInt(form.id_matricula),
      nota1: parseFloat(form.nota1),
      nota2: parseFloat(form.nota2),
      examen: parseFloat(form.examen),
    })
      .then(() => { setExito('Calificación registrada correctamente'); cargar(); setForm({ id_matricula: '', nota1: '', nota2: '', examen: '' }); })
      .catch(() => setError('Error al registrar calificación. Verifica los datos.'));
  };

  const colorEstado = (estado) => estado === 'aprobado' ? '#22c55e' : '#ef4444';

  return (
    <div style={styles.container}>
      <h2>📝 Calificaciones</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Nueva Calificación</h3>
        <input style={styles.input} placeholder="ID Matrícula" value={form.id_matricula} onChange={e => setForm({...form, id_matricula: e.target.value})} />
        <input style={styles.input} type="number" placeholder="Nota 1 (0-10)" min="0" max="10" step="0.1" value={form.nota1} onChange={e => setForm({...form, nota1: e.target.value})} />
        <input style={styles.input} type="number" placeholder="Nota 2 (0-10)" min="0" max="10" step="0.1" value={form.nota2} onChange={e => setForm({...form, nota2: e.target.value})} />
        <input style={styles.input} type="number" placeholder="Examen (0-10)" min="0" max="10" step="0.1" value={form.examen} onChange={e => setForm({...form, examen: e.target.value})} />
        <button style={styles.btnPrimary} onClick={handleSubmit}>Registrar Calificación</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr><th>ID</th><th>Matrícula</th><th>Nota 1</th><th>Nota 2</th><th>Examen</th><th>Promedio</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {calificaciones.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.id_matricula}</td>
              <td>{c.nota1}</td>
              <td>{c.nota2}</td>
              <td>{c.examen}</td>
              <td><strong>{c.promedio}</strong></td>
              <td><span style={{ ...styles.badge, backgroundColor: colorEstado(c.estado) }}>{c.estado}</span></td>
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
  btnPrimary: { padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  tabla: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
  badge: { padding: '3px 8px', borderRadius: '12px', color: 'white', fontSize: '0.8rem' },
};

export default Calificaciones;