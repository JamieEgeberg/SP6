/**
 * Created by Jamie on 23-03-2017.
 */
import React, {Component} from "react";
import '../App.css';
//import paramFilter from './FilterOnParams';
import {Link} from "react-router";


class ViewAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: props.route.persons,
        };
    }

    //See this https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/update/component_will_receive_props.html
    componentWillReceiveProps(nextProps) {
        this.setState({persons: nextProps.persons});
    };

    render() {
        const persons = this.state.persons;
        const personslines = persons.map((person, index) => {
                //const registered = (new Date(car.registered)).toISOString().slice(0, 10);
                return <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.age}</td>
                    <td>
                        <Link to={"/Details/" + person.id} activeStyle={{color: 'red'}}>+</Link>
                    </td>
                </tr>;
            }
        );
        const personsTable = <table className="table-striped">
            <thead>
            <tr>
                {/*<th>Year</th>*/}
                <th>Name</th>
                <th>Age</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {personslines}
            </tbody>
        </table>;
        return (
            <div className="car-app">

                <h3 className="grey-back">Number of persons in the list: {persons.length}</h3>
                {personsTable}
            </div>
        );
    }
}
export default ViewAll;