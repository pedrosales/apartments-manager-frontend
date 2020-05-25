import React, { useState } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';

import './style.css';

const Signin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            firebase.signin(email, password, name).then((user) => {
                console.log(user);
                if (user) {
                    alert('User created successfully');
                    history.push('/condominiums');
                }
            });
        } catch (error) {
            alert('Error in sign up, try again');
        }
    };

    return (
        <div className="signin-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Apartments Manager" />

                    <h1>Create new user</h1>

                    <Link className="back-link" to="/login">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to login
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Signin);