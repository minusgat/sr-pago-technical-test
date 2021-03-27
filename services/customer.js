class CustomerService {
  constructor({customerDao}) {
    this.customerDao = customerDao;
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

}

module.exports = CustomerService;
