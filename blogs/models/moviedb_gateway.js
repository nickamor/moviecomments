var request = require('request');

/**
 * Facade to https://api.themoviedb.org/.
 * @constructor
 */
function MovieDbGateway() {}

MovieDbGateway.prototype.host = 'https://api.themoviedb.org';

MovieDbGateway.prototype.credentials = {
    "username": "USERNAME",
    "password": "PASSWORD",
    "api_key": "API_KEY",
    "api_read_access_token": "API_READ_ACCESS_TOKEN"
};

/**
 * Fetch Now Playing movies.
 * @param next function(err, data)
 */
MovieDbGateway.prototype.getNowPlaying = function(next) {
    var method = '/3/movie/now_playing?api_key=' + this.credentials.api_key + '&language=en-US';

    request(this.host + method, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            next(null, JSON.parse(body).results);
        } else {
            next(err);
        }
    });
};

/**
 * Fetch popular movies.
 * @param next function(err, data)
 */
MovieDbGateway.prototype.getPopular = function(next) {
    var method = '/3/movie/popular?api_key=' + this.credentials.api_key + '&language=en-US';

    request(this.host + method, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            next(null, JSON.parse(body).results);
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
    var method = '/3/movie/' + id + '?api_key=' + this.credentials.api_key + '&language=en-US';

    request(this.host + method, function (err, res, body) {
        if (!err && res.statusCode === 200) {
            next(null, JSON.parse(body));
        } else {
            next(err);
        }
    });
};

module.exports = new MovieDbGateway();
