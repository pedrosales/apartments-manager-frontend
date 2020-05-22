import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';

import firebase from '../../firebase/config';

import logoImg from '../../assets/logo.svg';

import './style.css';

const NewApartment = () => {
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
        <div className="new-apartments-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Apartments Manager" />

                    <h1>Create new apartment</h1>

                    {/* <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link> */}
                </section>
                <form>
                    <input
                        placeholder="Númber of apartment"
                    // value={title}
                    // onChange={e => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Block/Complement"
                    // value={description}
                    // onChange={e => setDescription(e.target.value)}
                    />
                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(NewApartment);