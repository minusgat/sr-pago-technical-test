const ApiError = require('../error/api-error');


class CustomerController {
  constructor({customerService, jwt}) {
    this.jwt = jwt;
    this.customerService = customerService;
    this.createCustomer = this.createCustomer.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.authCustomer = this.authCustomer.bind(this);
  }

  async createCustomer(req, res, next) {
    try {
      const result = await this.customerService.createCustomer(req.body);
      const token = await this.jwt.create(result);
      res.status(201).json(token);
    } catch (err) {
      next(ApiError.internal(`Oh no :o we cant't create your account!`));
    }
  }

  async authCustomer(req, res, next) {
    try {
      const customer = await this.customerService.authCustomer(req.body);
      if (customer == null) {
        next(ApiError.notFound(`Oh no :o it's look your username or password are incorrect!`));
        return;
      }
      const token = await this.jwt.create(customer);
      res.status(200).json(token);

    } catch (err) {
      next(err);
    }
  }

  async getCustomer(req, res, next) {
    try {
      const customerId = req.params.id;
      const customer = await this.customerService.getCustomer(req.params.id);
      if (customer == null) {
        next(ApiError.notFound(`Oh no :o customer with id ${customerId} not found!`));
        return;
      }
      res.status(200).json(customer);
    } catch (err) {
      next(err);
    }
  }


}

module.exports = CustomerController;
