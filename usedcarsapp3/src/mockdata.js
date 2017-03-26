/**
 * Created by Jamie on 23-03-2017.
 */

var casual = require('casual');

// Create an object for config file
var db = {cars: []};

for (var i = 1; i <= 15; i++) {
    var car = {};

    car.id = i;
    car.year = casual.year;
    car.registered = casual.unix_time ;
    car.make = casual.last_name;
    car.model = casual.word;
    car.description = casual.sentence ;
    car.price = casual.integer(35, 95)*100;

    db.cars.push(car);
}
console.log(JSON.stringify(db));