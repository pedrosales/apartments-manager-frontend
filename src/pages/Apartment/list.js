import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';
import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';
import './styles.css';

const animatedComponents = makeAnimated();

const ApartmentList = () => {
    const [userState, setUserState] = useState(null);
    const [apartments, setApartments] = useState([]);

    const history = useHistory();

    useEffect(() => {
        firebase.getUserState().then(async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const response = await api.get('v1/apartments', { headers: { 'Authorization': `Bearer ${token}` } });

                if (response != null && response.status === 200) {
                    setApartments(response.data);
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

                <Link className="button" to="/condominiums">Condominiums</Link>
                <Link className="button" to="/residents">Residents</Link>
                <button onClick={() => logout()} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Apartments</h1>

            <ul>
                {apartments != null && apartments.map(apartment => (
                    <li key={apartment.id}>
                        <strong>Condominium:</strong>
                        <p>{apartment.condominium}</p>

                        <strong>Apartment:</strong>
                        <p>{apartment.number}</p>

                        <strong>Block:</strong>
                        <p>{apartment.block}</p>

                        <strong>Residents:</strong>
                        <Select
                            placeholder="No residents"
                            className="select-residents"
                            value={apartment.residents.map(resident => { return { label: resident.name, value: resident.id } })}
                            options={apartment.residents.map(resident => { return { label: resident.name, value: resident.id } })} isMulti
                            components={animatedComponents}
                            isDisabled
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default withRouter(ApartmentList);