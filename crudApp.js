class Car {
    constructor(name) {
        this.name = name;
        this.model = [];
    }

    addModel(model, price) {
        this.model.push(new Model(model, price));
    }
}

class Model {
    constructor(model, price) {
        this.model = model;
        this.price = price;
    }
}

const cars = [];

class DOMManager { // how the code functions

    static renderCars() { // clear the elements before each render
        $('#app').empty();
        DOMManager.renderCar()
    }

    static renderCar(car) {
        cars.map((car,i) => {car.id = i + 1}) // map through cars, assign id and increment the id of each car
        for (let car of cars) {
            // prepend each new car
            $('#app').prepend(
            `<div id="${car.id}" class="card">
                <div class="card-header">
                    <h2>${car.name}</h2>
                    <div>
                        <button id="delete-car" class="btn btn-danger form-control" onclick="DOMManager.deleteCar(${car.id})">Delete</button>
                    </div> <br>
                    <div class="card-body">
                        <div class="card">    
                            <div class="row">
                                <div class="col-sm">
                                    <input type="text" id="${car.id}-model" class="form-control" placeholder="Model">
                                </div>
                                <div class="col-sml">
                                    <input type="text" id="${car.id}-price" class="form-control" placeholder="Price">
                                </div>
                            </div><br>
                        </div>
                    </div>
                    <div>
                        <button id="${car.id}-new-model" class="btn btn-primary form-control" onclick="DOMManager.addModel(${car.id})">Add</button>
                    </div>
                </div>
            </div> `
            );
            // New card body for model and price of the car
            car.model.map((model,i) => {model.id = i + 1}); // assign new id to models and increment each model.id
            for (let model of car.model) {
                    $( `#${car.id}`).find('.card-body').append( // create new card body for model and price
                        `<p>
                            <span id-"name-${model.id}" ><strong>Model: </strong> ${model.model}</span> 
                            <span id-"name-${model.id}" ><strong>Price: </strong> ${model.price}</span>
                            <button class="btn btn-danger" onclick="DOMManager.deleteModel('${car.id}', '${model.id}')">Delete Model</button>
                        </p>`
                    );
            };
        }
    }

    //  NEW SAVE POINT----------------------------------------------
    static createCar(name) {
        cars.push(new Car(name));
        return DOMManager.renderCars(cars)
    };

    static addModel(id) {
        for (let car of cars) {
            if (car.id == id) {
                car.model.push(new Model($(`#${car.id}-model`).val(),$(`#${car.id}-price`).val())); // push the value of input into the id
                DOMManager.renderCars(cars);
            }
            
        }
    }

    static deleteCar(id) {
        const carsIndex = cars.findIndex(c => c.id == id); // find the car.id index and splice
        cars.splice(carsIndex,1);
        DOMManager.renderCars(cars);

    }

    static deleteModel(id, mid) {
        for (let car of cars) { // iterate through cars and match the car.id
            if (car.id == id) {
                for (let model of car.model) { // iterate through models and match the model.id
                    if (model.id == mid) {
                        const modelIndex = car.model.findIndex(m => m.id == mid);// find the index of model.id
                        car.model.splice(modelIndex, 1);
                        DOMManager.renderCars(cars);
                    }
                }
            
            }
        }
        
    }
}

// initial click of create new car button
$('#create-new-car').click(() => {
    DOMManager.createCar($('#new-car-name').val());
    $('#new-car-name').val('');
});

