import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';
import './styles.css';

const CondominiumList = () => {


    useEffect(() => {
        firebase.getUserState().then((user) => {
            if (user) {
                setUserState(user);
            }
            else {
                history.push('/login');
            }
        })
    })

    return (
        <div className="condominium-list-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, Teste</span>

                <Link className="button" to="/condominiums/new">Create new Condominium</Link>
                <button onClick={} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Condominiums</h1>

            <ul>
                {/* {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO: </strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))} */}
                <li>

                </li>
            </ul>
        </div>
    );
};

export default withRouter(CondominiumList);