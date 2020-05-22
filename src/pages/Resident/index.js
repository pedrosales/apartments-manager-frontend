import React, { useEffect, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import firebase from '../../firebase/config';

import './style.css';

import logoImg from '../../assets/logo.svg';

const NewResident = () => {
    const [userState, setUserState] = useState(null);

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
    })

    return (
        <div className="new-resident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Apartments Manager" />

                    <div style={{ padding: 10 }}>
                        <h1>Create new Resident</h1>

                        {/* <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Não tenho cadastro
                    </Link> */}
                    </div>
                </section>
                <form>
                    <input
                        placeholder="Name"
                    // value={name}
                    // onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                    // value={email}
                    // onChange={e => setEmail(e.target.value)}
                    />
                    <div className="input-group">
                        <input
                            placeholder="CPF"
                        // value={city}
                        // onChange={e => setCity(e.target.value)}
                        />

                        <input
                            placeholder="Birth Date"
                            style={{ width: 140 }}
                        // value={uf}
                        // onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <input placeholder="Phone" />
                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(NewResident);