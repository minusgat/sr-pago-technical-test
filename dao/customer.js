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

  async customerCheckout(customerId, movieShowId) {
    try {
      const movies = await this.db({mS: 'movieShow'})
        .select({id: 'mS.id'}, 'name', 'resume', 'photoUrl', 'screeningDate', 'city')
        .leftJoin('movies', 'mS.movieId', 'movies.id')
        .where('mS.id', movieShowId);
      return movies && movies.length >= 1 ? movies[0] : null;
    } catch (err) {
      throw err;
    }
  }

  async getCustomerTickets(customerId) {
    try {
      const customerTickets = await this.db({mS: 'movieShow', t: 'tickets'})
        .select({id: 't.id'}, 'createdDate', 'screeningDate', 'name', 'resume', 'photoUrl', 'city')
        .rightJoin('movieShow', 'mS.id', 't.movieShowId')
        .rightJoin('movies', 'mS.movieId', 'movies.id')
        .where('id', customerId);
      return customerTickets && customerTickets.length >= 1 ? customerTickets : null;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CustomerDao;
