import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { FiArrowLeft, FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';
import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';
import './styles.css';

const CondominiumList = () => {
    const [userState, setUserState] = useState(null);
    const [condominiums, setCondominiums] = useState([]);

    const history = useHistory();

    useEffect(() => {
        firebase.getUserState().then(async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const response = await api.get('v1/condominiums/active', { headers: { 'Authorization': `Bearer ${token}` } });

                if (response != null && response.status === 200) {
                    setCondominiums(response.data);
                }

                setUserState(user);
            }
            else {
                history.push('/login');
            }
        })
    }, [userState])

    async function handleDelete(id) {
        try {
            const token = await userState.getIdToken();
            const response = await api.delete(`v1/condominiums/inactivate/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });

            if (response.status === 200 && response.data.success === true) {
                setCondominiums(condominiums.filter(condominium => condominium.id !== id));
                alert('Deletion concluded');
            }
            else {
                alert('Problem in condominium deletion');
            }
        } catch (err) {
            alert('Delete not works', err.message);
        }
    }

    async function logout() {
        await firebase.logout();
        setUserState(null);
        history.push('/login');
    }

    return (
        <div className="condominium-list-container">
            <header>
                <img src={logoImg} alt="Condominium Manager" />
                <span>Welcome, {userState != null ? userState.displayName : ''}</span>

                <Link className="button" to="/condominiums/new">Create new Condominium</Link>
                <button onClick={() => logout()} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Condominiums</h1>

            <ul>
                {condominiums.map(condominium => (
                    <li key={condominium.id}>
                        <strong>Condominium:</strong>
                        <p>{condominium.name}</p>

                        <strong>Address:</strong>
                        <p>{condominium.street}, {condominium.number}, {condominium.neighborhood}</p>

                        <strong>City:</strong>
                        <p>{condominium.city}/{condominium.state}</p>

                        <strong>ZipCode:</strong>
                        <p>{condominium.zipCode}</p>

                        <button onClick={() => handleDelete(condominium.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withRouter(CondominiumList);