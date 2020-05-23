import React, { useState, useEffect } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';
import './styles.css';

const NewCondominium = () => {
    const [userState, setUserState] = useState(null);
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');

    const history = useHistory();

    useEffect(() => {
        firebase.getUserState().then((user) => {
            if (user) {
                setUserState(user);
            }
            else {
                history.push('/login');
            }
        })
    }, [userState, history])

    const resetFields = () => {
        setName('');
        setStreet('');
        setNumber('');
        setNeighborhood('');
        setCity('');
        setState('');
        setCountry('');
        setZipCode('');
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const data = {
            name,
            street,
            number: parseInt(number),
            neighborhood,
            city,
            state,
            country,
            zipCode
        };

        try {
            // const token = await userState.getIdToken().then(token => {
            //     return token;
            // });

            const token = await userState.getIdToken();

            const response = await api.post('v1/condominiums', data, { headers: { 'Authorization': `Bearer ${token}` } });

            if (!response.data.success) {
                //alert(response.data.message);
                let messages = "";
                if (response.data.data.length > 0) {
                    response.data.data.forEach((item) => {
                        messages += item.message + "\n";
                    })
                    alert(messages);
                }
            }
            else {
                alert(response.data.message);
                resetFields();

            }

        } catch (error) {
            console.log(error);
            alert("Error in condominium creation.");
        }
    }

    return (
        <div className="new-condominium-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Apartments Manager" />

                    <h1>Create new condominium</h1>

                    <Link className="back-link" to="/condominiums">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to list
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            placeholder="Name"
                            minLength="1"
                            maxLength="160"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                    <input
                        placeholder="Addres"
                        minLength="1"
                        maxLength="500"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                    />
                    </div>
                    <div className="input-group">
                     <input
                            placeholder="Nº"
                            minLength="1"
                            type="number"
                            style={{ width: 130 }}
                            value={number}
                            onChange={e => setNumber(e.target.value)}
                        />
                        <input
                            placeholder="Neighborhood"
                            minLength="1"
                            maxLength="160"
                            value={neighborhood}
                            onChange={e => setNeighborhood(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            placeholder="City"
                            minLength="1"
                            maxLength="160"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="State"
                            minLength="2"
                            maxLength="2"
                            style={{ width: 100 }}
                            value={state}
                            onChange={e => setState(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            placeholder="Country"
                            minLength="1"
                            maxLength="160"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        />
                        <input
                            placeholder="ZipCode"
                            style={{ width: 150 }}
                            type="number"
                            minLength="8"
                            maxLength="8"
                            value={zipCode}
                            onChange={e => setZipCode(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(NewCondominium);