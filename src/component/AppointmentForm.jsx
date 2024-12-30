import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function ApoinmentForm({ doctores }) {

    // Estado para el doctor seleccionado
    const [doctorSeleccionado, setDoctorSeleccionado] = useState('');
    // Estado para el nombre del paciente
    const [nombrePaciente, setnombrePaciente] = useState('');
    // Estado para la fecha de la cita
    const [fechaCita, setfechaCita] = useState('');

    // Referencia al campo de entrada del nombre del paciente
    const nombrePacienteInputRef = useRef(null);
    // Referencia al campo de entrada de la fecha de la cita
    const fechaCitaInputRef = useRef(null);


    useEffect(() => {
        // Enfoca el campo nombre al montar el componente
        if (nombrePacienteInputRef.current) {
            nombrePacienteInputRef.current.focus();
        }
    }, []); // El array vacio para que se ejecute solo una vez al montar

    // Manejador para el cambio en la selección del doctor
    const handleSelectChange = (event) => {
        setDoctorSeleccionado(event.target.value);
    };

    // Manejador para el cambio en el nombre del paciente
    const handleInputChange = (event) => {
        setnombrePaciente(event.target.value);
    };

      // Manejador para el cambio en la fecha de la cita
    const handleCitaChange = (event) => {
        setfechaCita(event.target.value);
    };

     // Función para enfocar el campo de fecha de la cita
    const focusFechaCitaInput = (element) => {
        if (element) {
            element.focus()
            console.log("input enfocado")
        }
    }

    // Manejador para el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del formulario
        console.log("Nombre ingresado en el input:", nombrePaciente);
        console.log(
            "Doctor seleccionado:",
            doctores.find((d) => d.id === Number(doctorSeleccionado))?.especialidad || "Ninguno"
        );
        console.log("Fecha de la Cita:", fechaCita);
         // Enfocar el campo de fecha de cita despues del submit
        if (fechaCitaInputRef.current) {
            focusFechaCitaInput(fechaCitaInputRef.current)
        }
    };
    // Manejo de error en caso de que no haya doctores
    if (!doctores || doctores.length === 0) {
        return <div>No hay doctores disponibles para seleccionar.</div>
    }

    return (
        <>
            <form className="container" onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="firstName" className="form-label">Nombre del Paciente</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="Escribe tu nombre"
                            onChange={handleInputChange}
                            ref={nombrePacienteInputRef} // Asignamos la referencia al input
                        />
                    </div>
                    <div className="col-sm-6">
                        <label htmlFor="lastName" className="form-label">Especialidad del Doctor</label>
                        <select
                            name=""
                            id="lastName"
                            value={doctorSeleccionado}
                            onChange={handleSelectChange}
                        >
                            {doctores.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.especialidad}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12">
                        <label htmlFor="username" className="form-label">Fecha Cita</label>
                        <input
                            type="date"
                            className="form-control"
                            id="username"
                            placeholder="Ingrese la Fecha de la Cita"
                            onChange={handleCitaChange}
                            ref={fechaCitaInputRef}
                        />
                    </div>
                    <button className="w-50 btn btn-primary btn-lg mx-auto" type="submit">Reservar Cita</button>
                </div>
            </form>
        </>
    );
}

// Definición de los PropTypes
ApoinmentForm.propTypes = {
    doctores: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            especialidad: PropTypes.string.isRequired,
        })
    ).isRequired,
};