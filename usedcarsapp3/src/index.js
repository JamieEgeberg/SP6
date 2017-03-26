import React from 'react';
import ReactDOM from 'react-dom';
import App from './UsedCarsApp';
import UsedCarsView from './usedcarsview/UsedCarsView';
import CarInput from './carinput/CarInput';
import CarsFacade from './facade/CarsFacade';
import './index.css';

import {hashHistory, IndexRoute, Route, Router} from "react-router";

var facade = new CarsFacade();
facade.loadCars(() => {
    ReactDOM.render(
        (<Router history={hashHistory}>
            <Route facade={facade} path='/' component={App}>
                <IndexRoute facade={facade} delete={App.deleteCar} edit={App.grabCar} component={UsedCarsView} />

                <Route facade={facade} path='/add' component={CarInput} />
                <Route facade={facade} path='/edit/:id' component={CarInput} />
            </Route>
        </Router>)
        , document.getElementById('root')
    );
});
