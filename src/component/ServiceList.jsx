import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { HospitalContext } from '../App';

function ServiceList(props) {
    const { servicios } = useContext(HospitalContext)
    const servicio = servicios.find(ser => ser === props.servicio)

    if (!servicio) {
        return <div>Servicio not found</div>
    }
    return (
        <li className="list-group-item">{servicio}</li>
    )
}

export default ServiceList;
