import React, { useState } from 'react';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import firebase from '../../firebase/config';

import './style.css';

import logoImg from '../../assets/logo.svg';
import buildingImg from '../../assets/building.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [routeRedirect, setRedirect] = useState(false);
    const history = useHistory();

    const login = async (e) => {
        e.preventDefault();
        let response = await firebase.login(email, password);
        if (response.hasOwnProperty("message")) {
            console.log(response.message);
        }
        if (response.hasOwnProperty("user")) {
            console.log(response.user);
            history.push("/");
        }
    };

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="ApartmentsBuilding" />

                <form onSubmit={login}>
                    <h1>Make your login</h1>

                    <input
                        placeholder="Email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        SignIn
                    </Link>
                </form>
            </section>

            <img src={buildingImg} height="400" alt="Heroes" />
        </div>
    );
}

export default withRouter(Login);