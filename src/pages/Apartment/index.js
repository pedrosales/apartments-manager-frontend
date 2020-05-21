import React from 'react';

import logoImg from '../../assets/logo.svg';

import './style.css';

export default function NewApartment() {
    return (
        <div className="new-apartments-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Apartments Manager" />

                    <h1>Create new apartment</h1>
                    <p>Provide apartment information</p>

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