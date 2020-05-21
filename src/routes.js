import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NewCondominium from './pages/Condominium';
import NewResident from './pages/Resident';
import NewApartment from './pages/Apartment';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/residents/new" exact component={NewResident} />
                <Route path="/condominiums/new" exact component={NewCondominium} />
                <Route path="/apartments/new" exact component={NewApartment} />
            </Switch>
        </BrowserRouter>
    );
}