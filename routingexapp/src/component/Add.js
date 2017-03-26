/**
 * Created by tha on 16-03-2017.
 */
import React, {Component} from 'react';

//import {Link} from "react-router";


class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: props.route.persons,
            person: props.route.person,
        };
        this.submitData = this.submitData.bind(this);
    }

    //Ensure a setState with rerender whenever new props are send to CarInput from the UsedCarsApp render() method (when another person was chosen to edit)
    componentWillReceiveProps(nextProps) {
        this.setState({person: nextProps.person});
    };

    submitData(e) {
        const person = {};
        person.id = (this.state.person) ? Number(this.state.person.id) : 0; //If no id availble set to 0; (this is the case when not edit but when register new person)
        person.name = document.getElementById("name").value;
        person.age = Number(document.getElementById("age").value);
    console.log(person);
        e.preventDefault();
        e.stopPropagation();
        this.props.route.submit(person);
    }

    render() {
        //if no person reference in this.state then: provide a person object with empty properties else: use the person from this.state
        const person = (!this.state.person) ? ({
            person: {
                id: 0,
                year: '',
                age: '',
            }
        }) : (this.state.person);

        return (
            <div className="person">
                <h2 className="person-header">Register Person</h2>
                <div className="person-container">
                    <p><Input id="name" type="text" placeholder="name" val={person.name}/></p>
                    <p><Input id="age" type="number" placeholder="age" val={person.age}/></p>
                    <p>
                        <button onClick={this.submitData = this.submitData.bind(this)}>Submit person</button>
                    </p>
                </div>
            </div>)
    }
}

class Input extends Component {
    render() {
        return (
            <input
                key={this.props.val} //USING key combined with defaultValue is what makes it work !!!!!! Straing and wonderfull
                type={this.props.type}
                value={this.props.value}
                name={this.props.name}
                placeholder={this.props.placeholder}
                id={this.props.id}
                ref="myTextInput"
                //onBlur = {this.myTextInputHandler}
                defaultValue={this.props.val} //defaultValue does not work since it is only used in the very first render before the props is set.
            />)
    }
}
export default Add;
