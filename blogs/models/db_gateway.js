const credentials = require('../config/credentials');
const mongoose = require('mongoose');

mongoose.connect(credentials.mongo.devel.connection);


/**
 * Facade to blog comment storage
 * @constructor
 */
function DbGateway() {
  var Schema = mongoose.Schema;

  var commentsSchema = new Schema({
    movie_id: {type: String, required: true},
    author: {type: String, default: 'Anonymous'},
    content: {type: String, required: true},
    created: {type: Date, default: Date.now}
  }, { collection: 'comments' });

  this.Comment = mongoose.model('Comment', commentsSchema);
}

module.exports = new DbGateway();
