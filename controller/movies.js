const ApiError = require('../error/api-error');


class MoviesController {
  constructor({moviesService: moviesService}) {
    this.moviesService = moviesService;
    this.getMovies = this.getMovies.bind(this);
    this.getAllMovies = this.getAllMovies.bind(this);

  }

  async getMovies(req, res, next) {
    try {
      const customerId = req.params.id;
      const customer = await this.moviesService.getMovies(req.params.id);
      if (customer == null) {
        next(ApiError.notFound(`Oh no :o movies in  ${customerId} city not found!`));
        return;
      }
      res.json(customer);
    } catch (err) {
      next(err);
    }
  }

  async getAllMovies(req, res, next) {
    try {
      const customer = await this.moviesService.getAllMovies();
      if (customer == null) {
        next(ApiError.notFound(`Oh no :o movies not found!`));
        return;
      }
      res.json(customer);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MoviesController;
