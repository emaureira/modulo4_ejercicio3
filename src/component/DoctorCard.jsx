import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { HospitalContext } from '../App';
import withModal from '../hoc/withModal';


function DoctorCard(props) {
    const { doctores } = useContext(HospitalContext);
    const { openModal } = props;

    const doctor = doctores.find(doc => doc.nombre === props.doctor);

    const handleCardClick = useCallback(() => {
        if(doctor) {
          openModal(
              <>
                <h3>{doctor.nombre}</h3>
                <p>Experiencia: {doctor.experiencia}</p>
                <p>Especialidad: {doctor.especialidad}</p>
                <p>Descripción: {doctor.descripcion}</p>
              </>
            );
        }
    }, [doctor, openModal]);


    if (!doctor) {
        return <div> Doctor not Found</div>
    }

    return (
        <div className="col" onClick={handleCardClick}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{doctor.nombre}</h5>
                    <p className="card-text">Experiencia: {doctor.experiencia}</p>
                    <p className="card-text">Especialidad: {doctor.especialidad}</p>
                    {/* <p className="card-text">Descripción: {doctor.descripcion}</p> */} {/* Comentando para que se vea mejor */}
                </div>
            </div>
        </div>
    );
}

DoctorCard.propTypes = {
    doctor: PropTypes.string.isRequired,
    openModal: PropTypes.func, // Añadimos openModal
    experiencia: PropTypes.string,
    descripcion: PropTypes.string,
    especialidad: PropTypes.string,
};

export default withModal(DoctorCard);