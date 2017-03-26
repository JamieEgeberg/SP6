/**
 * Created by Jamie on 24-03-2017.
 */

const URL = "http://localhost:4000/cars"
class CarsFacade {
    constructor(cars) {
        this._cars = typeof cars !== 'undefined' ? cars : [];
        this._nextId = -1;
    }

    get cars() {
        return this._cars;
    }

    loadCars(callback) {
        fetch(URL).then(res => res.json()).then(data => {
            this._cars = data;

            if (callback) {
                callback(data);
            }
        }).catch((err) => {
            console.log("Could not fetch data from server. Is the backend running?");
            callback(null);
        });
        return this._cars;
    }


    get emptyCar() {
        return {
            id: "",
            title: "",
            author: "",
            rating: "",
            year_published: ""
        };
    }

    deleteCar(id, callback) {
        fetch(URL + "/" + id, {
            method: 'delete'
        }).then(response =>
            response.json()
                .then(deletedCar => {
                    for (var i = 0; i < this._cars.length; i++) {
                        if (this._cars[i].id === id) {
                            this._cars.splice(i, 1);
                        }
                    }
                    callback();
                }))
    }

    addEditCar(car, callback) {
        var method = car.id===0 ? "post" : "put"; //if no id then must be post
        var URL_Post_Put = (method === "put") ? URL + "/" + car.id : URL;
        fetch(URL_Post_Put, {
            method: method,
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(car)
        }).then(res => res.json())
            .then(newCar => {
                if (method === "post") {
                    this.addCar(car);
                }
                else {
                    this.editCar(car);
                }
                callback(newCar);
            })
    }

    editCar(car) {
        for (var i = 0; i < this._cars.length; i++) {
            if (this._cars[i].id === car.id) {
                this._cars[i] = Object.assign({}, car); //Object.assign creates a copy
            }
        }
    }

    addCar(car) {
        if (car.id===0) {
            car.id=null;
            this._cars.push(Object.assign({}, car));
        } else {
            throw new Error("Cannot save a car with existing ID");
        }
    }

}

export default CarsFacade;