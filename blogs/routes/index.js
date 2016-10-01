var express = require('express');
var router = express.Router();

const movieDb = require('../models/moviedb_gateway.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  movieDb.getNowPlaying(function (err, data) {
    if (!err) {
      res.render('index', {title: 'Movie Blogs', now_playing: data});
    } else {
      res.emit(err);
    }
  });
});

/* GET movie details */
router.get('/movie/:movieId', function (req, res, next) {
  movieDb.getMovie(req.params.movieId, function (err, data) {
    if (!err) {
      res.render('movie_detail', {title: data.title, movie: data});
    } else {
      res.emit(err);
    }
  });
});

module.exports = router;
