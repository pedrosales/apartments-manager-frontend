import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './components/main';
import Signin from './components/signin';
import Login from './components/login';
import NewCondominium from './pages/Condominium';
import NewResident from './pages/Resident';
import NewApartment from './pages/Apartment';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/login" component={Login} />
            <Route path="/residents/new" exact component={NewResident} />
            <Route path="/condominiums/new" exact component={NewCondominium} />
            <Route path="/apartments/new" exact component={NewApartment} />
        </Switch>
    );
}