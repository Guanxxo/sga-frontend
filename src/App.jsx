import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import Estudiantes from './pages/Estudiantes';
import Docentes from './pages/Docentes';
import Periodos from './pages/Periodos';
import Materias from './pages/Materias';
import Matriculas from './pages/Matriculas';
import Calificaciones from './pages/Calificaciones';
import Asistencias from './pages/Asistencias';
import Estadisticas from './pages/Estadisticas';

function App() {
  const [pagina, setPagina] = useState('dashboard');

  const renderPagina = () => {
    switch(pagina) {
      case 'dashboard': return <Dashboard />;
      case 'usuarios': return <Usuarios />;
      case 'estudiantes': return <Estudiantes />;
      case 'docentes': return <Docentes />;
      case 'periodos': return <Periodos />;
      case 'materias': return <Materias />;
      case 'matriculas': return <Matriculas />;
      case 'calificaciones': return <Calificaciones />;
      case 'asistencias': return <Asistencias />;
      case 'estadisticas': return <Estadisticas />;
      default: return <Dashboard />;
    }
  };

  return (
    <div style={styles.app}>
      <Navbar paginaActual={pagina} setPagina={setPagina} />
      <main style={styles.main}>
        {renderPagina()}
      </main>
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
  },
  main: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  },
};

export default App;