import React, { useEffect, useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import DatePicker from 'react-datepicker';

import api from '../../services/api';
import firebase from '../../firebase/config';

import './style.css';
import 'react-datepicker/dist/react-datepicker.css'

import logoImg from '../../assets/logo.svg';

const NewResident = () => {
    const [userState, setUserState] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phone, setPhone] = useState('');

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

    const resetFields = () => {
        setName('');
        setEmail('');
        setCpf('');
        setBirthDate('');
        setPhone('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(userState);

        const data = {
            name,
            email,
            cpf,
            birthDate,
            phone
        };

        console.log(data);

        try {
            const token = await userState.getIdToken();

            const response = await api.post('v1/residents', data, { headers: { 'Authorization': `Bearer ${token}` } });

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

        }
    }

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
                <form onSubmit={handleSubmit}>
                    <input
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <div className="input-group">
                        <input
                            placeholder="CPF"
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                            required
                        />
                        <DatePicker
                            selected={birthDate}
                            onChange={date => setBirthDate(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Birth Date"
                            className="datepicker"
                            required
                        />
                    </div>
                    <input
                        placeholder="Phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                    <button className="button" type="submit">Create</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(NewResident);