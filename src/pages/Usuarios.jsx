import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario, deleteUsuario } from '../services/api';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({ nombre: '', apellido: '', email: '', rol: 'estudiante' });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getUsuarios().then(res => setUsuarios(res.data)).catch(() => setError('Error al cargar usuarios'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createUsuario(form)
      .then(() => { setExito('Usuario creado correctamente'); cargar(); setForm({ nombre: '', apellido: '', email: '', rol: 'estudiante' }); })
      .catch(() => setError('Error al crear usuario. Verifica los datos.'));
  };

  const handleDelete = (id) => {
    deleteUsuario(id).then(() => cargar()).catch(() => setError('Error al eliminar usuario'));
  };

  return (
    <div style={styles.container}>
      <h2>👤 Usuarios</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Nuevo Usuario</h3>
        <input style={styles.input} placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
        <input style={styles.input} placeholder="Apellido" value={form.apellido} onChange={e => setForm({...form, apellido: e.target.value})} />
        <input style={styles.input} placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <select style={styles.input} value={form.rol} onChange={e => setForm({...form, rol: e.target.value})}>
          <option value="estudiante">Estudiante</option>
          <option value="docente">Docente</option>
          <option value="admin">Admin</option>
        </select>
        <button style={styles.btnPrimary} onClick={handleSubmit}>Crear Usuario</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr>
            <th>ID</th><th>Nombre</th><th>Apellido</th><th>Email</th><th>Rol</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.email}</td>
              <td>{u.rol}</td>
              <td>
                <button style={styles.btnDanger} onClick={() => handleDelete(u.id)}>Eliminar</button>
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

export default Usuarios;