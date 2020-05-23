import React, { useState, useEffect } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import firebase from '../firebase/config';

import { Auth } from '../context/authContext';

const Nav = () => {
    const [userState, setUserState] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const user = async () => {
            return await firebase.getCurrentUser();
        };

        if (user) {
            console.log(user);
            setUserState(user);
        }
        // firebase.getUserState().then((user) => {
        //     if (user) {
        //         console.log(user);
        //         setUserState(user);
        //     }
        // })

    }, [userState])

    const logout = () => {
        firebase.logout();
        setUserState(null);
        history.push('/login');
    }

    let buttons;
    if (userState != null) {
        buttons = (
            <React.Fragment>
                <li><Link to="/condominiums">Condominiums</Link></li>
                {/* <li><Link to="/condominiums/new">New Condominium</Link></li> */}
                <li><Link to="/apartments/new">New Apartment</Link></li>
                <li><Link to="/residents/new">New Resident</Link></li>
                <li><button className="logout" onClick={logout}>LogOut</button></li>
            </React.Fragment>
        )
    } else {
        buttons = (
            <React.Fragment>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link to="/login">LogIn</Link></li>
            </React.Fragment>
        )
    }

    return (
        <nav>
            <ul>
                {buttons}
            </ul>
        </nav>
    )
}
export default withRouter(Nav);