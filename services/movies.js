class MoviesService {
  constructor({moviesDao}) {
    this.moviesDao = moviesDao;
  }

  getMovies(city) {

    return this.moviesDao.getMovies(city);

  }

  getAllMovies() {

    return this.moviesDao.getAllMovies();

  }


}

module.exports = MoviesService;
