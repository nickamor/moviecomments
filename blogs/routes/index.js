var express = require('express');
var router = express.Router();

const blogController = require('../controllers/blog_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  blogController.home(req, res, next);
});

/* GET movie details */
router.get('/movie/:movieId', function (req, res, next) {
  blogController.movie(req, res, next);
});

/* POST new comment */
router.post('/movie/:movieId/comments', function (req, res, next) {
  blogController.newComment(req, res, next);
});

module.exports = router;
