import React, { useState } from 'react';
import Select from 'react-select';

import 'bootstrap/dist/css/bootstrap.min.css';

const Countries = [
    { label: "Albania", value: 355 },
    { label: "Argentina", value: 54 },
    { label: "Austria", value: 43 },
    { label: "Cocos Islands", value: 61 },
    { label: "Kuwait", value: 965 },
    { label: "Sweden", value: 46 },
    { label: "Venezuela", value: 58 }
];

export const Default = () => {
    return (<div className="container">
        <div className="row">
            <div className="col-lg-12">
                <Select options={Countries} isMulti />
            </div>
        </div>
    </div>)
};
// const DropDown = (label, defaultState, options) => {
//     const[state, setState] = useState(defaultState);
//     const Dropdownmaker = () => {

//     };
// }
