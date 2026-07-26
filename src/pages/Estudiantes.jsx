import { useState, useEffect } from 'react';
import { getEstudiantes, createEstudiante, deleteEstudiante } from '../services/api';

function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [form, setForm] = useState({ id_usuario: '', codigo: '', carrera: '', semestre: 1 });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getEstudiantes().then(res => setEstudiantes(res.data)).catch(() => setError('Error al cargar estudiantes'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createEstudiante({ ...form, id_usuario: parseInt(form.id_usuario), semestre: parseInt(form.semestre) })
      .then(() => { setExito('Estudiante creado correctamente'); cargar(); setForm({ id_usuario: '', codigo: '', carrera: '', semestre: 1 }); })
      .catch(() => setError('Error al crear estudiante. Verifica que el usuario exista.'));
  };

  const handleDelete = (id) => {
    deleteEstudiante(id).then(() => cargar()).catch(() => setError('Error al eliminar estudiante'));
  };

  return (
    <div style={styles.container}>
      <h2>🎓 Estudiantes</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Nuevo Estudiante</h3>
        <input style={styles.input} placeholder="ID Usuario" value={form.id_usuario} onChange={e => setForm({...form, id_usuario: e.target.value})} />
        <input style={styles.input} placeholder="Código" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} />
        <input style={styles.input} placeholder="Carrera" value={form.carrera} onChange={e => setForm({...form, carrera: e.target.value})} />
        <input style={styles.input} type="number" placeholder="Semestre" min="1" max="10" value={form.semestre} onChange={e => setForm({...form, semestre: e.target.value})} />
        <button style={styles.btnPrimary} onClick={handleSubmit}>Crear Estudiante</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr>
            <th>ID</th><th>ID Usuario</th><th>Código</th><th>Carrera</th><th>Semestre</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.id_usuario}</td>
              <td>{e.codigo}</td>
              <td>{e.carrera}</td>
              <td>{e.semestre}</td>
              <td>
                <button style={styles.btnDanger} onClick={() => handleDelete(e.id)}>Eliminar</button>
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
  error: { color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '8px' },
  exito: { color: 'green', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '8px' },
  form: { backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' },
  input: { padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' },
  btnPrimary: { padding: '10px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnDanger: { padding: '5px 10px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  tabla: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' },
};

export default Estudiantes;