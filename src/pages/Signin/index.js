import React, { useState, useEffect } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';

import './style.css';

const Signin = () => {
    const [userState, setUserState] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    // useEffect(() => {
    //     firebase.getUserState().then((user) => {
    //         if (user) {
    //             setUserState(user);
    //         }
    //         else {
    //             history.push('/login');
    //         }
    //     })
    // })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // let response = await firebase.signin(email, password);
            // if (response.hasOwnProperty("message")) {
            //     console.log(response.message);
            // }
            // if (response.hasOwnProperty("user")) {
            //     console.log(response.user);
            //     setRedirect(true);
            // }
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
                    />
                    <input
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Signin);