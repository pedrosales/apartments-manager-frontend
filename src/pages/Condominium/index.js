import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewCondominium() {
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
                <form>
                    <div className="input-group">
                        <input
                            placeholder="Name"
                        // value={title}
                        // onChange={e => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            placeholder="Addres"
                        // value={value}
                        // onChange={e => setValue(e.target.value)}
                        />
                        <input
                            placeholder="Nº"
                            style={{ width: 100 }}
                        // value={value}
                        // onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input placeholder="City"

                        />
                        <input
                            placeholder="State"
                            style={{ width: 100 }}
                        // value={value}
                        // onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <input
                            placeholder="Country"
                        // value={value}
                        // onChange={e => setValue(e.target.value)}
                        />
                        <input
                            placeholder="ZipCode"
                            style={{ width: 120 }}
                        // value={value}
                        // onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
}