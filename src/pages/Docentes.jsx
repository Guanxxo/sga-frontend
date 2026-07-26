import { useState, useEffect } from 'react';
import { getDocentes, createDocente } from '../services/api';

function Docentes() {
  const [docentes, setDocentes] = useState([]);
  const [form, setForm] = useState({ id_usuario: '', titulo: '', especialidad: '' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getDocentes().then(res => setDocentes(res.data)).catch(() => setError('Error al cargar docentes'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createDocente({ ...form, id_usuario: parseInt(form.id_usuario) })
      .then(() => { setExito('Docente creado correctamente'); cargar(); setForm({ id_usuario: '', titulo: '', especialidad: '' }); })
      .catch(() => setError('Error al crear docente. Verifica que el usuario exista.'));
  };

  return (
    <div style={styles.container}>
      <h2>👨‍🏫 Docentes</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Nuevo Docente</h3>
        <input style={styles.input} placeholder="ID Usuario" value={form.id_usuario} onChange={e => setForm({...form, id_usuario: e.target.value})} />
        <input style={styles.input} placeholder="Título" value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} />
        <input style={styles.input} placeholder="Especialidad" value={form.especialidad} onChange={e => setForm({...form, especialidad: e.target.value})} />
        <button style={styles.btnPrimary} onClick={handleSubmit}>Crear Docente</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr><th>ID</th><th>ID Usuario</th><th>Título</th><th>Especialidad</th></tr>
        </thead>
        <tbody>
          {docentes.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td><td>{d.id_usuario}</td><td>{d.titulo}</td><td>{d.especialidad}</td>
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
};

export default Docentes;