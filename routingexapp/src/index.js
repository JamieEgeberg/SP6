import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ViewAll from './component/ViewAll';
import Details from './component/Details';
import Add from './component/Add';
import './index.css';
import {hashHistory, IndexRoute, Route, Router} from "react-router";

var persons = [
    {id: 1, name: "Jens", age: 18},
    {id: 2, name: "Peter", age: 23},
    {id: 3, name: "Hanne", age: 23}
];

function submit(person) {  // probably not optimal placement, but it works now.
    //Moved here because of problems passing from the App class to Add class through the routing
    if (!person.id) {
        person.id = getHighestID(persons) + 1;
        persons.push(person);
    } else {
        persons.forEach((p, i) => {
            if (p.id === person.id) {
                persons[i] = person;
            }
        })
    }
}
function getHighestID(arr) {
    var highest = 0;
    arr.forEach(p => {
        if (p.id > highest) {
            highest = p.id;
        }
    });
    return highest;
}
ReactDOM.render((
    <Router history={hashHistory}>
        {/*The outer Route in this case means that App is the containing component and the nested components will only be shown if App components displays its this.props.children*/}
        <Route persons={persons} path="/" component={App}>
            <IndexRoute persons={persons} component={ViewAll}/>
            <Route persons={persons} path="/Details/:id" component={Details}/>
            <Route persons={persons} submit={submit} path="/Add" component={Add}/>
        </Route>
    </Router>

), document.getElementById('root'));

