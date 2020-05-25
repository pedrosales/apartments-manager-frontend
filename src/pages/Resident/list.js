import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';
import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';
import './styles.css';

const ResidentList = () => {
    const [userState, setUserState] = useState(null);
    const [residents, setResidents] = useState([]);

    const history = useHistory();

    useEffect(() => {
        firebase.getUserState().then(async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const response = await api.get('v1/residents/active', { headers: { 'Authorization': `Bearer ${token}` } });

                if (response != null && response.status === 200) {
                    setResidents(response.data);
                }

                setUserState(user);
            }
            else {
                history.push('/login');
            }
        })
    }, [history])

    const logout = async () => {
        await firebase.logout();
        setUserState(null);
        history.push('/login');
    };

    return (
        <div className="apartment-list-container">
            <header>
                <img src={logoImg} alt="Condominium Manager" />
                <span>Welcome, {userState != null ? userState.displayName : ''}</span>

                <Link className="button" to="/apartments">Apartments</Link>
                <Link className="button" to="/residents/new">New Resident</Link>
                <button onClick={() => logout()} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Residents</h1>

            <ul>
                {residents.map(resident => (
                    <li key={resident.id}>
                        <strong>Name:</strong>
                        <p>{resident.name}</p>

                        <strong>Email:</strong>
                        <p>{resident.email}</p>

                        <strong>CPF:</strong>
                        <p>{resident.cpf}</p>

                        <strong>Birth Date:</strong>
                        <p>{new Date(resident.birthDate).toLocaleDateString()}</p>

                        <strong>Phone:</strong>
                        <p>{resident.phone}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withRouter(ResidentList);