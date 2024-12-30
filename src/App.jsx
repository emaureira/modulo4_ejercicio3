import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import DoctorCard from './component/DoctorCard';
import ServiceList from './component/ServiceList';
import ApoinmentForm from './component/AppointmentForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';

// 1. Crear el Context
const HospitalContext = createContext();
export { HospitalContext };

function App() {
  const [doctores, setDoctores] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loadingDoctores, setLoadingDoctores] = useState(true); // estado para loading
  const [errorDoctores, setErrorDoctores] = useState(null); // estado para error

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = await fetch('/doctores.json'); // Ruta a tu archivo json
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setDoctores(data.doctores);
      } catch (err) {
        setErrorDoctores(err.message);
      } finally {
        setLoadingDoctores(false)
      }
    };

    fetchDoctores();

    const serviciosData = ['Broncopulmonar', 'Pediatria', 'Examenes', 'Imagen', 'Kiniseologia','Pies'];

    // Establecer los datos en el estado
    
    setServicios(serviciosData);
  }, []);

  const hospitalData = {
    doctores,
    servicios,
  };

  if (loadingDoctores) {
    return <div>Cargando doctores...</div>;
  }
  if (errorDoctores) {
    return <div>Error al cargar los doctores: {errorDoctores}</div>;
  }

  return (
    // 2. Proveer el Context
    <HospitalContext.Provider value={hospitalData}>
      <Router>
        <nav>
          <Link to="/" className='mx-4'>Inicio</Link>
          <Link to="/servicios" className='mx-4'>Servicios</Link>
          <Link to="/citas" className='mx-4'>Citas</Link>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage doctores={doctores} />} />
          <Route path="/servicios" element={<ServicesPage servicios={servicios} />} />
          <Route path="/citas" element={<AppointmentsPage doctores={doctores} />} />
        </Routes>
        </Router>
        </HospitalContext.Provider>
  );
}
function HomePage({doctores}){
  return(
    <>
    <h1>Hospital</h1>
        <section className="container">
          <div className='row g-4'>
            {doctores.map(({ id, nombre, experiencia, descripcion, especialidad }) => (
              <DoctorCard key={id} doctor={nombre} experiencia={experiencia} descripcion={descripcion} especialidad={especialidad} />
            )
            )}
          </div>
        </section>
    </>
  );
}

function ServicesPage({servicios}){
  return(
    <section className='container my-3'>
    <h2>Servicios Médicos</h2>
    <p>Conoce nuestra variedad de servicios médicos</p>
    <ul className="list-group">
      {servicios.map((servicio, index) => (
        <ServiceList key={index} servicio={servicio} />
      ))}
    </ul>
  </section>
  );
}
function AppointmentsPage({ doctores }) {
  return (

        <section>
          <h2>Reservar Cita</h2>
          <ApoinmentForm doctores={doctores} />
        </section>
        );
      }
export default App;


