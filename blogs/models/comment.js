const mongoose = require('mongoose');

var commentsSchema = mongoose.Schema({
		movie_id: {type: String, required: true},
		author: {type: String, default: 'Anonymous'},
		content: {type: String, required: true},
		created: {type: Date, default: Date.now}
	},  { collection: 'comments' 
});

module.exports = mongoose.model('Comment', commentsSchema);
