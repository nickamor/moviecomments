/**
 * Created by nicka on 9/10/2016.
 */

const movieDb = require('../models/moviedb_gateway.js');
const Comment = require('../models/comment');

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
          res.render('index', {
            user: req.user,
            title: 'Movie Blogs', 
            now_playing: nowPlaying_data, 
            popular: popular_data});
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
      Comment.find({ movie_id: movie_id })
        .sort({ created: -1 })
        .select({ author: 1, content: 1, created: 1 })
        .exec(function (comments_err, comments_data) {
          if (!comments_err && comments_data) {
            res.render('movie_detail', {
              user: req.user,
              title: movie_data.title, 
              movie: movie_data, 
              comments: comments_data,
              message: req.flash('commentMessage')
            });
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
    author: req.body.author || 'Anonymous',
    content: req.body.content
  };

  var data = new Comment(item);
  data.save();

  req.flash('commentMessage', 'Success!');
  res.redirect('/movie/' + item.movie_id);
};

module.exports = new BlogController();
