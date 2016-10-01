var express = require('express');
var router = express.Router();

const movieDb = require('../models/moviedb_gateway.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  movieDb.getNowPlaying(function (nowPlaying_err, nowPlaying_data) {
    if (!nowPlaying_err && nowPlaying_data) {
      movieDb.getPopular(function (popular_err, popular_data) {
        if (!popular_err && popular_data) {
          res.render('index', {title: 'Movie Blogs', now_playing: nowPlaying_data, popular: popular_data});
        } else {
          res.emit(popular_err);
        }
      });
    } else {
      res.emit(nowPlaying_err);
    }
  });
});

/* GET movie details */
router.get('/movie/:movieId', function (req, res, next) {
  movieDb.getMovie(req.params.movieId, function (err, data) {
    if (!err && data) {
      res.render('movie_detail', {title: data.title, movie: data});
    } else {
      res.emit(err);
    }
  });
});

module.exports = router;
