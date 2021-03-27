const awilix = require('awilix')
const db = require('./db')
const {jwt} = require('./util/jwt');
const CustomerController = require('./controller/customer')
const CustomerService = require('./services/customer')
const CustomerDao = require('./dao/customer')
const MoviesDao = require("./dao/movies");
const MoviesService = require("./services/movies");
const MoviesController = require("./controller/movies");

const container = awilix.createContainer({
  //Use Proxy for destructuring injection
  injectionMode: awilix.InjectionMode.PROXY
})

const setup = () => {
  container.register({

    db: awilix.asValue(db),
    jwt: awilix.asValue(jwt),

    //Customer Component
    customerController: awilix.asClass(CustomerController),
    customerService: awilix.asClass(CustomerService),
    customerDao: awilix.asClass(CustomerDao),

    //Movies Component
    moviesController: awilix.asClass(MoviesController),
    moviesService: awilix.asClass(MoviesService),
    moviesDao: awilix.asClass(MoviesDao),

  })
}

module.exports = {
  container,
  setup
}
