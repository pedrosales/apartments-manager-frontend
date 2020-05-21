import React from 'react';
// firebaseauth reducer
import { firebaseAuth } from "../reducers/authReducer";
export const Auth = React.createContext();
const inicialState = {
    user: {}
}

export const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(firebaseAuth, inicialState);
    const value = { state, dispatch };

    return <Auth.Provider value={value}>
        {props.children}
    </Auth.Provider>
}