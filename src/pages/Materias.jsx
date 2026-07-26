import { useState, useEffect } from 'react';
import { getMaterias, createMateria, deleteMateria } from '../services/api';

function Materias() {
  const [materias, setMaterias] = useState([]);
  const [form, setForm] = useState({ id_docente: '', id_periodo: '', nombre: '', codigo: '', creditos: 1, cupo_max: 30 });
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const cargar = () => {
    getMaterias().then(res => setMaterias(res.data)).catch(() => setError('Error al cargar materias'));
  };

  useEffect(() => { cargar(); }, []);

  const handleSubmit = () => {
    setError(''); setExito('');
    createMateria({
      ...form,
      id_docente: parseInt(form.id_docente),
      id_periodo: parseInt(form.id_periodo),
      creditos: parseInt(form.creditos),
      cupo_max: parseInt(form.cupo_max),
    })
      .then(() => { setExito('Materia creada correctamente'); cargar(); setForm({ id_docente: '', id_periodo: '', nombre: '', codigo: '', creditos: 1, cupo_max: 30 }); })
      .catch(() => setError('Error al crear materia. Verifica los datos.'));
  };

  const handleDelete = (id) => {
    deleteMateria(id).then(() => cargar()).catch(() => setError('Error al eliminar materia'));
  };

  return (
    <div style={styles.container}>
      <h2>📚 Materias</h2>
      {error && <p style={styles.error}>{error}</p>}
      {exito && <p style={styles.exito}>{exito}</p>}

      <div style={styles.form}>
        <h3>Nueva Materia</h3>
        <input style={styles.input} placeholder="ID Docente" value={form.id_docente} onChange={e => setForm({...form, id_docente: e.target.value})} />
        <input style={styles.input} placeholder="ID Periodo" value={form.id_periodo} onChange={e => setForm({...form, id_periodo: e.target.value})} />
        <input style={styles.input} placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
        <input style={styles.input} placeholder="Código" value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value})} />
        <input style={styles.input} type="number" placeholder="Créditos" min="1" max="10" value={form.creditos} onChange={e => setForm({...form, creditos: e.target.value})} />
        <input style={styles.input} type="number" placeholder="Cupo máximo" min="1" max="100" value={form.cupo_max} onChange={e => setForm({...form, cupo_max: e.target.value})} />
        <button style={styles.btnPrimary} onClick={handleSubmit}>Crear Materia</button>
      </div>

      <table style={styles.tabla}>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Código</th><th>Créditos</th><th>Cupo</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {materias.map(m => (
            <tr key={m.id}>
              <td>{m.id}</td><td>{m.nombre}</td><td>{m.codigo}</td><td>{m.creditos}</td><td>{m.cupo_max}</td>
              <td><button style={styles.btnDanger} onClick={() => handleDelete(m.id)}>Eliminar</button></td>
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

export default Materias;