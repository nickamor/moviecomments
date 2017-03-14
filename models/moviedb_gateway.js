var request = require('request');

/**
 * Facade to https://api.themoviedb.org/.
 * @constructor
 */
function MovieDbGateway() {
  var gateway = this;
  this.getConfiguration(function (err, data) {
    if (!err && data) {
      gateway.config = data;
    } else {
      console.log("Error getting API configuration: ", err);
    }
  });
}

MovieDbGateway.prototype.config = null;

MovieDbGateway.prototype.host = 'https://api.themoviedb.org';

MovieDbGateway.prototype.credentials = {
  "username": "USERNAME",
  "password": "PASSWORD",
  "api_key": process.env.TMDB_API_KEY,
  "api_read_access_token": "API_READ_ACCESS_TOKEN"
};

/**
 * Fetch API configuration data.
 * @param next function(err, data)
 */
MovieDbGateway.prototype.getConfiguration = function (next) {
  var method = '/3/configuration?api_key=' + this.credentials.api_key;

  request(this.host + method, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      next(null, JSON.parse(body));
    } else {
      next(err);
    }
  });
};

/**
 * Fetch Now Playing movies.
 * @param next function(err, data)
 */
MovieDbGateway.prototype.getNowPlaying = function (next) {
  var gateway = this;
  var method = '/3/movie/now_playing?api_key=' + this.credentials.api_key + '&language=en-US';

  request(this.host + method, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var results = JSON.parse(body).results;

      // insert small poster uris
      var base_uri = gateway.getSmallPosterBaseUri();
      for (var i = 0; i < results.length; i++) {
        results[i].small_poster_uri = base_uri + results[i].poster_path;
      }

      next(null, results);
    } else {
      next(err);
    }
  });
};

/**
 * Fetch popular movies.
 * @param next function(err, data)
 */
MovieDbGateway.prototype.getPopular = function (next) {
  var gateway = this;
  var method = '/3/movie/popular?api_key=' + this.credentials.api_key + '&language=en-US';

  request(this.host + method, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var results = JSON.parse(body).results;

      // insert small poster uris
      var base_uri = gateway.getSmallPosterBaseUri();
      for (var i = 0; i < results.length; i++) {
        results[i].small_poster_uri = base_uri + results[i].poster_path;
      }

      next(null, results);
    } else {
      next(err);
    }
  });
};

/**
 * Fetch a given movie.
 * @param id
 * @param next function(err, data)
 */
MovieDbGateway.prototype.getMovie = function (id, next) {
  var gateway = this;
  var method = '/3/movie/' + id + '?api_key=' + this.credentials.api_key + '&language=en-US';

  request(this.host + method, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var result = JSON.parse(body);

      // insert large poster uri
      result.large_poster_uri = gateway.getLargePosterBaseUri() + result.poster_path;

      next(null, result);
    } else {
      next(err);
    }
  });
};

MovieDbGateway.prototype.search = function(query, next) {
  var gateway = this;
  var method = '/3/search/movie/?api_key=' + this.credentials.api_key 
    + '&language=en-US'
    + '&query=' + query;

  request(this.host + method, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      var search = JSON.parse(body);

      var base_uri = gateway.getSmallPosterBaseUri();
      for (var i = 0; i < search.results.length; i++) {
        search.results[i].small_poster_uri = base_uri + search.results[i].poster_path;
      }

      next(null, search);
    } else {
      next(err);
    }
  });
};

MovieDbGateway.prototype.getSmallPosterBaseUri = function () {
  if (this.config) {
    return this.config.images.base_url + this.config.images.poster_sizes[2];
  } else {
    throw "Bad API Configuration";
  }
};

MovieDbGateway.prototype.getLargePosterBaseUri = function () {
  if (this.config) {
    return this.config.images.base_url + this.config.images.poster_sizes[3];
  } else {
    throw "Bad API Configuration";
  }
};

module.exports = new MovieDbGateway();
