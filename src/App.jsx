import React, { useEffect, useState, createContext } from 'react';
import './App.css';
import DoctorCard from './component/DoctorCard';
import ServiceList from './component/ServiceList';
import ApoinmentForm from './component/AppointmentForm';

// 1. Crear el Context
const HospitalContext = createContext();
export { HospitalContext };

function App() {
  const [doctores, setDoctores] = useState([]);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    // Simulando una carga de datos (puedes reemplazar esto con una llamada a una API)
    const doctoresData = [
      {
        id: 1,
        nombre: 'Doctor 1',
        experiencia: ' 5 años',
        descripcion: 'Descripcion del doctor 1 que tiene 5 años de experiencia y sabemos que no tiene experiencia',
        especialidad: 'Broncopulmonar'
      },
      {
        id: 2,
        nombre: 'Doctor 2',
        experiencia: '3 años',
        descripcion: 'Descripcion del doctor 2 que tiene 3 años de experiencia',
        especialidad: 'Pediatria'
      },
      {
        id: 3,
        nombre: 'Doctor 3',
        experiencia: ' 5 años',
        descripcion: 'Descripcion del doctor 3 que tiene 5 años de experiencia y sabemos que no tiene experiencia',
        especialidad: 'Examenes'
      },
      {
        id: 4,
        nombre: 'Doctor 4',
        experiencia: '9 años',
        descripcion: 'Descripcion del doctor 4 que tiene 9 años de experiencia',
        especialidad: 'Imagen'
      },
      {
        id: 5,
        nombre: 'Doctor 5',
        experiencia: '9 años',
        descripcion: 'Descripcion del doctor 4 que tiene 9 años de experiencia',
        especialidad: 'Kinesiologia'
      },
      {
        id: 6,
        nombre: 'Doctor 6',
        experiencia: '9 años',
        descripcion: 'Descripcion del doctor 4 que tiene 9 años de experiencia',
        especialidad: 'Broncopulmonar'
      },
      {
        id: 7,
        nombre: 'Doctor 7',
        experiencia: '5 años',
        descripcion: 'Descripcion del doctor 4 que tiene 9 años de experiencia',
        especialidad: 'Pediatria'
      },
      {
        id: 8,
        nombre: 'Doctor 8',
        experiencia: '9',
        descripcion: 'Descripcion del doctor 8 que tiene 9 años de experiencia',
        especialidad: 'Examenes'
      }
    ];

    const serviciosData = ['Broncopulmonar', 'Pediatria', 'Examenes', 'Imagen', 'Kiniseologia'];

    // Establecer los datos en el estado
    setDoctores(doctoresData);
    setServicios(serviciosData);
  }, []);

  const hospitalData = {
    doctores,
    servicios,
  };

  return (
    // 2. Proveer el Context
    <HospitalContext.Provider value={hospitalData}>
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

        <section className='container my-3'>
          <h2>Servicios Médicos</h2>
          <p>Conoce nuestra variedad de servicios médicos</p>
          <ul className="list-group">
            {servicios.map((servicio, index) => (
              <ServiceList key={index} servicio={servicio} />
            ))}
          </ul>
        </section>

        <section>
          <h2>Reservar Cita</h2>
          <ApoinmentForm doctores={doctores} />
        </section>
      </>
    </HospitalContext.Provider>
  );
}

export default App;


