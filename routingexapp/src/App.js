import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Link} from "react-router";



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persons: props.route.persons
        };
        console.log(this.state.persons);

        this.submit = this.submit.bind(this);
    }

    submit(person){
        const persons = this.state.persons;
        if (!person.id) {
            person.id = this.getHighestID(persons) + 1;
            persons.push(person);
        } else {
            persons.forEach((p, i) => {
                if (p.id === person.id) {
                    persons[i] = person;
                }
            })
        }
        const newPersons = this.state.persons.slice(0);
        this.setState({persons: newPersons});
    }

    render() {
        return (
            <div id="containerDiv">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <ul id="navlist">
                        {/*onlyActiveOnIndex is used in the default route so it doesnt stay lit up at all times*/}
                        <li><Link to="/" activeStyle={{color: 'red'}}>View All</Link></li>
                        <li><Link to="/Add" activeStyle={{color: 'red'}}>Add New Person</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>)
    }

    getHighestID(arr) {
        var highest = 0;
        arr.forEach(p => {
            if (p.id > highest) {
                highest = p.id;
            }
        });
        return highest;
    }
}

export default App;
