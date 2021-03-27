class MoviesDao {
  constructor({db}) {
    this.db = db;
  }

  async getMovies(city) {
    try {
      const movies = await this.db({mS: 'movieShow'})
        .select({id: 'mS.id'}, 'name', 'resume', 'photoUrl', 'screeningDate')
        .leftJoin('movies', 'mS.movieId', 'movies.id')
        .where('city', city);
      return movies && movies.length >= 1 ? movies : null;
    } catch (err) {
      throw err;
    }
  }

  async getMovie(movieShowId) {
    try {
      const movies = await this.db({mS: 'movieShow'})
        .select({id: 'mS.id'}, 'name', 'resume', 'photoUrl', 'screeningDate','city')
        .leftJoin('movies', 'mS.movieId', 'movies.id')
        .where('mS.id', movieShowId);
      return movies && movies.length >= 1 ? movies[0] : null;
    } catch (err) {
      throw err;
    }
  }

  async getAllMovies() {
    try {
      const movies = await this.db({mS: 'movieShow'})
        .select({id: 'mS.id'}, 'name', 'resume', 'photoUrl', 'screeningDate', 'city')
        .leftJoin('movies', 'mS.movieId', 'movies.id');
      return movies && movies.length >= 1 ? movies : null;
    } catch (err) {
      throw err;
    }
  }

}

module.exports = MoviesDao
