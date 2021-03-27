class CustomerDao {
  constructor({db}) {
    this.db = db;
  }

  async createCustomer(username, password, email, city) {
    try {
      const [id] = await this.db('customers')
        .insert({email, username, password, city})
        .returning('id');
      return {id};
    } catch (err) {
      throw err;
    }
  }

  async getCustomer(id) {
    try {
      const customers = await this.db
        .select('id', 'username', 'createdDate', 'city', 'email')
        .from('customers')
        .where('id', id);
      return customers && customers.length >= 1 ? customers[0] : null;
    } catch (err) {
      throw err;
    }
  }

  async authCustomer(username, password) {
    try {
      const customers = await this.db
        .select('id', 'username', 'createdDate', 'city', 'email')
        .from('customers')
        .where('username', username)
        .and.where('password', password);
      console.log(customers)
      return customers && customers.length >= 1 ? customers[0] : null;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CustomerDao;
