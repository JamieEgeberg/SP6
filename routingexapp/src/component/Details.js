/**
 * Created by Jamie on 23-03-2017.
 */
import React, {Component} from "react";
import {Link} from "react-router";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: props.route.persons,
        };
    }

    render() {
        var id = this.props.params.id - 1;
        return (
            <div>
                <h2>Details of person {id}</h2>
                <table>
                    <tbody>
                    <tr>
                        <td>Name:</td>
                        <td>{this.state.persons[id].name}</td>
                    </tr>
                    <tr>
                        <td>Age:</td>
                        <td>{this.state.persons[id].age}</td>
                    </tr>
                    </tbody>
                </table>
                <li><Link to="/">Go back</Link></li>
            </div>
        )
    }
}
export default Details;