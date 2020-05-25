import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Signin from './pages/Signin';
import NewCondominium from './pages/Condominium';
import NewResident from './pages/Resident';
import NewApartment from './pages/Apartment';
import Login from './pages/Logon';
import CondominiumList from './pages/Condominium/list';
import ApartmentList from './pages/Apartment/list';
import ResidentList from './pages/Resident/list';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={CondominiumList} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/residents" component={ResidentList} />
            <Route path="/residents/new" exact component={NewResident} />
            <Route path="/condominiums" exact component={CondominiumList} />
            <Route path="/condominiums/new" exact component={NewCondominium} />
            <Route exact path="/apartments" component={ApartmentList} />
            <Route path="/apartments/new/:condominiumId" exact component={NewApartment} />
        </Switch>
    );
}