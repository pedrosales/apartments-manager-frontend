import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewCondominium() {
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');

    const history = useHistory();

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

            const response = await api.post('v1/condominiums', data);

            if (!response.data.success) {
                //alert(response.data.message);
                let messages = "";
                if (response.data.data.length > 0) {
                    console.log(response.data.data.length);
                    response.data.data.forEach((item) => {
                        messages += item.message + "\n";
                    })
                    alert(messages);
                }
            }

        } catch (error) {
            console.log(error);
            alert("Error on condominium creation.");
        }
    }

    return (
        <div className="new-condominium-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Apartments Manager" />

                    <h1>Create new condominium</h1>
                    <p>Provide informations about the Condominium</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
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
                    <input
                        placeholder="Addres"
                        minLength="1"
                        maxLength="500"
                        value={street}
                        onChange={e => setStreet(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="Neighborhood"
                            minLength="1"
                            maxLength="160"
                            value={neighborhood}
                            onChange={e => setNeighborhood(e.target.value)}
                        />
                        <input
                            placeholder="Nº"
                            minLength="1"
                            type="number"
                            style={{ width: 100 }}
                            value={number}
                            onChange={e => setNumber(e.target.value)}
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
}