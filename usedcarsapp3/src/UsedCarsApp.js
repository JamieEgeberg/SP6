import React, {Component} from "react";
import "./App.css";
import logo from "./logo.svg";
import {Link} from "react-router";

/*var carsArray = [
    {
        id: 1,
        year: 1997,
        registered: 867621600000,
        make: 'Ford', model: 'E350',
        description: 'ac,abs, moon',
        price: 3000
    }, {
        id: 2,
        year: 1999,
        registered: 945212400000,
        make: 'Chevy',
        model: 'Venture',
        description: 'None',
        price: 4900
    }, {
        id: 3,
        year: 2000,
        registered: 953766000000,
        make: 'Chevy',
        model: 'Venture',
        description: '',
        price: 5000
    }, {
        id: 4,
        year: 1996,
        registered: 844380000000,
        make: 'Jeep',
        model: 'GrandCherokee',
        description: 'Air, moon roof, loaded',
        price: 4799
    }, {
        id: 5,
        year: 2012,
        registered: 844380000000,
        make: 'VW',
        model: 'Up',
        description: 'Air, moon roof, loaded',
        price: 2799
    }, {
        id: 6,
        year: 2015,
        registered: 844380000000,
        make: 'Fiat',
        model: 'Panda',
        description: 'Breaks, Seats, Steering wheel',
        price: 1799
    }
];*/

class UsedCarsApp extends Component {


    constructor(props) {
        super(props);
        var facade = this.props.route.facade;
        var carsArray = facade.cars;
        //format the date string to something usefull in each car object
        carsArray.forEach((car) => {
            car.registered = (new Date(car.registered)).toISOString().slice(0, 10);
        });


        //Set State object
        this.state = {
            facade: facade,
            cars: carsArray
        };
        //Bind the 'this' reference to each method in this class
        this.deleteCar = this.deleteCar.bind(this);
        this.grabCar = this.grabCar.bind(this);
        this.submitCar = this.submitCar.bind(this);
    }

    //This method is run from the UsedCarsView (the delete button)
    deleteCar = function (target) {
        const carId = Number(target.id);
        this.setState({
            cars: this.state.cars.filter((car) => car.id !== carId)
        });
    };

    //This method is run from the UsedCarsView (edit buttons) in order to fill the CarInput component with the appropriate data.
    grabCar = function (target) {
        const carId = Number(target.id);
        this.setState({
            car: this.state.cars.filter((car) => car.id === carId)[0]
        });
    };

    //This method is run from the CarInput Component with the data from the user form.
    submitCar = function (newCar) {
        const cars = this.state.cars;
        if (!newCar.id) {
            newCar.id = this.getHighestID(cars) + 1;
            cars.push(newCar);
        } else {
            cars.forEach((car, i) => {
                if (car.id === newCar.id) {
                    cars[i] = newCar;
                }
            })
        }
        const newCars = this.state.cars.slice(0);
        this.setState({cars: newCars});
    };

    render() {
        document.title = "Used Cars App";
        return (
            <div id="containerDiv">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <ul id="navlist">
                        {/*onlyActiveOnIndex is used in the default route so it doesnt stay lit up at all times*/}
                        <li><Link to="/" activeStyle={{color: 'red'}}>View All Cars</Link></li>
                        <li><Link to="/Add" activeStyle={{color: 'red'}}>Add Car</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>)
    }

    getHighestID(arr) {
        var highest = 0;
        arr.forEach(car => {
            if (car.id > highest) {
                highest = car.id;
            }
        });
        return highest;
    }
}

export default UsedCarsApp;
