class CustomerService {
  constructor({customerDao, moviesDao}) {
    this.customerDao = customerDao;
    this.moviesDao = moviesDao;
  }

  getCustomer(id) {

    return this.customerDao.getCustomer(id);

  }

  createCustomer({username, password, email, city}) {

    return this.customerDao.createCustomer(username, password, email, city);
  }

  authCustomer({username, password}) {

    return this.customerDao.authCustomer(username, password);

  }

  async customerCheckout({customerId, movieShowId}) {

    const isValidTransaction = await this.validateCityOfCustomerCheckout(customerId, movieShowId)
    if (isValidTransaction)
      return this.customerDao.customerCheckout(customerId, movieShowId);

  }

  async getCustomerTickets({customerId}) {

    return this.customerDao.getCustomerTickets(customerId);

  }

  async validateCityOfCustomerCheckout(customerId, movieShowId) {
    try {
      const customer = await this.getCustomer(customerId)
      const {city} = await this.moviesDao.getMovie(movieShowId)
      return customer.city === city
    } catch (error) {
      return error
    }
  }

}

module.exports = CustomerService;
