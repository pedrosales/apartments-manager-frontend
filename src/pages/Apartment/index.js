import React, { useState, useEffect } from 'react';
import { withRouter, useHistory, Link } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { FiArrowLeft } from 'react-icons/fi';

import firebase from '../../firebase/config';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.css';

const animatedComponents = makeAnimated();

const NewApartment = (props) => {
    const [userState, setUserState] = useState(null);
    const [residents, setResidents] = useState([]);
    const [condominiumId, setCondominiumId] = useState('');
    const [selectedResidents, setSelectedResidents] = useState([]);
    const [number, setNumber] = useState('');
    const [block, setBlock] = useState('');

    const history = useHistory();

    const resetFields = () => {
        setSelectedResidents([]);
        setNumber('');
        setBlock('');
    }

    useEffect(() => {
        firebase.getUserState().then(async (user) => {
            if (user) {
                setUserState(user);
                setCondominiumId(props.match.params.condominiumId);

                const token = await user.getIdToken();
                const response = await api.get('v1/residents/without-apartment', { headers: { 'Authorization': `Bearer ${token}` } });

                if (response != null && response.status === 200) {
                    if (response.data != null && response.data.length > 0) {
                        const items = response.data.map(resident => {
                            return { label: resident.name, value: resident.id }
                        });
                        setResidents(items);
                    }

                }
            }
            else {
                history.push('/login');
            }
        })
    }, [history, props.match.params.condominiumId])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            condominiumId: condominiumId,
            number: parseInt(number),
            block,
            residents: selectedResidents.map(x => x.value)
        }

        console.log(data);

        try {
            const token = await userState.getIdToken();
            console.log(token);
            const response = await api.post('v1/apartments', data, { headers: { 'Authorization': `Bearer ${token}` } });

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
            alert("Error in apartment creation.");
        }
    };

    return (
        <div className="new-apartments-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Apartments Manager" />

                    <h1>Create new apartment</h1>

                    <Link className="back-link" to="/condominiums">
                        <FiArrowLeft size={16} color="#e02041" />
                        Back to condominiums list
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input
                        required
                        type="number"
                        placeholder="Númber of apartment"
                        value={number}
                        onChange={e => setNumber(e.target.value)}
                    />
                    <input
                        placeholder="Block/Complement"
                        value={block}
                        onChange={e => setBlock(e.target.value)}
                    />
                    <Select value={selectedResidents}
                        className="select-residents"
                        options={residents} isMulti
                        onChange={value => setSelectedResidents(value)}
                        components={animatedComponents}
                    />

                    <button className="button" type="submit">Create</button>

                </form>
            </div>
        </div>
    );
};

export default withRouter(NewApartment);