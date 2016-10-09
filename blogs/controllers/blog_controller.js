/**
 * Created by nicka on 9/10/2016.
 */

const movieDb = require('../models/moviedb_gateway.js');
const db = require('../models/db_gateway.js');

function BlogController() {

}

/**
 * The index page: show current movies
 * @param req
 * @param res
 * @param next
 */
BlogController.prototype.home = function(req, res, next) {
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
};

/**
 * The movie page: show movie detail and comments
 * @param req
 * @param res
 * @param next
 */
BlogController.prototype.movie = function (req, res, next) {
  var movie_id = req.params.movieId;

  movieDb.getMovie(movie_id, function (movie_err, movie_data) {
    if (!movie_err && movie_data) {
      db.Comment.find({
        movie_id: movie_id
        })
        .sort({ created: -1 })
        .select({ author: 1, content: 1, created: 1 })
        .exec(function (comments_err, comments_data) {
          if (!comments_err && comments_data) {
            res.render('movie_detail', {title: movie_data.title, movie: movie_data, comments: comments_data});
          } else {
            res.emit(comments_err);
          }
        });
    } else {
      res.emit(movie_err);
    }
  });
};

/**
 * Add a new comment
 * @param req
 * @param res
 * @param next
 */
BlogController.prototype.newComment = function (req, res, next) {
  var item = {
    movie_id: req.body.movie_id,
    author: req.body.author,
    content: req.body.content
  };

  var data = new db.Comment(item);
  data.save();

  res.redirect('/movie/' + item.movie_id).with({ message: 'Success!' });
};

module.exports = new BlogController();