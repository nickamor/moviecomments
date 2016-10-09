# WDA-A2
A git repository for Web Database Applications, assignment 2.

## First run
To download the dependencies for each project, run the following commands in either the PhpStorm Run Command tool or a terminal in the project directory;

### Bookings:

```
php composer.phar install
```
### Blogs:

```
npm install
```

### .env file contents:

~~~~
APP_ENV=local
APP_DEBUG=true
APP_KEY=base64:fXjmh6wzlTjsmXms5ZAZWoitVzkTd63YB5x2xFS227s=
APP_URL=http://localhost
 
DB_CONNECTION=sqlite
DB_DATABASE=/var/www/html/WDA-A2/bookings/storage/database.sqlite
 
CACHE_DRIVER=file
SESSION_DRIVER=file
QUEUE_DRIVER=sync
 
REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379
 
MAIL_DRIVER=smtp
MAIL_HOST=mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
~~~~


## Attributions
Each of the projects are base on the following;

### Bookings:

- [Laravel](http://laravel.com)

### Blogs:

- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [Request](https://github.com/request/request)
- [Mongoose](http://mongoosejs.com/)
- [Bootswatch](http://bootswatch.com/)
