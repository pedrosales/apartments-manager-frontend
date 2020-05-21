import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../firebase/config';

import { Auth } from '../context/authContext';

const Nav = () => {
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        firebase.getUserState().then((user) => {
            console.log(user, 'usuario');
            if (user) {
                setUserState(user);
            }
        })
    })

    const logout = () => {
        firebase.logout();
        setUserState(null);

    }

    let buttons;
    if (userState != null) {
        buttons = (
            <React.Fragment>
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
                <li><Link to="/">ReactContextHooksFirebase</Link></li>
            </ul>
            <ul>
                {buttons}
            </ul>
            <ul>
                <li><Link to="/create">new post</Link></li>
            </ul>
        </nav>
    )
}
export default withRouter(Nav);