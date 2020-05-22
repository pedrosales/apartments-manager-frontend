import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import firebase from '../firebase/config';

const Main = () => {

    const [userState, setUserState] = useState(null);

    const history = useHistory();

    useEffect(() => {
        firebase.getUserState().then((user) => {
            console.log(user, 'usuario');
            if (user) {

            }
            else {
                history.push('/login');
            }
        })
    })

    return (
        <React.Fragment>
            <p>Main works</p>
        </React.Fragment>
    )
}

export default Main;