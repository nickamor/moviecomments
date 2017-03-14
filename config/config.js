const config = require('config');

function Configuration() {
    this.MONGO_CONNECT = process.env.MONGO_CONNECT ? process.env.MONGO_CONNECT : config.get('mongo.connect');
    this.TMDB_API_KEY = process.env.TMDB_API_KEY ? process.env.TMDB_API_KEY : config.get('tmdb.api_key');

    if (!(this.MONGO_CONNECT && this.TMDB_API_KEY)) {
        console.error("Missing config values");
        process.exit(1);
    }
}

module.exports = new Configuration();
