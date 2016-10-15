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
- [Laravel Collective](https://laravelcollective.com/)

### Blogs:

- [Node.js](https://nodejs.org)
- [Express.js](https://expressjs.com)
- [Request](https://github.com/request/request)
- [Mongoose](http://mongoosejs.com/)
- [Bootswatch](http://bootswatch.com/)
- [Passport](http://passportjs.org/)

### Images:

- [poster1](http://wallpapersdsc.net/wp-content/uploads/2015/11/1623.jpg)
- [poster2](http://i.imgur.com/ubxTFqL.jpg)
- [poster3](http://www.superiorpics.com/wallpaper/file/Will_Ferrell_in_Step_Brothers_Wallpaper_2_1280.jpg)
- [poster4](https://images.alphacoders.com/675/thumb-1920-675871.jpg)
- [poster5](https://s-media-cache-ak0.pinimg.com/originals/a6/82/59/a6825904227363b8fb49611bd9f9ee0f.jpg)
- [posert6](http://graphicdesignjunction.com/wp-content/uploads/2011/12/big-miracle-movie-poster.jpg)
- [poster7](https://s-media-cache-ak0.pinimg.com/564x/fd/5e/66/fd5e662dce1a3a8cd192a5952fa64f02.jpg)
- [poster8](http://www.eonline.com/eol_images/Entire_Site/2016015/rs_634x937-160115101507-634-martian-parody-poster.jpg)
- [poster9](http://wallpaperrs.com/uploads/movies/big-miracle-wide-wallpaper-26373.jpg)
- [poster10](https://i.ytimg.com/vi/4pJvqv7aspQ/maxresdefault.jpg)
- [poster11](http://www.followingthenerd.com/site/wp-content/uploads/FindingDoryPoster.jpg)
- [poster12](http://images.moviepostershop.com/ghostbusters-movie-poster-2016-1020775586.jpg)
- [poster13](http://www.printmag.com/wp-content/uploads/skyfall_xlg.jpg?2cd552)
- [poster14](http://cdn.traileraddict.com/content/paramount-pictures/zoolander.jpg)
- [poster15](https://extraimago.com/images/2016/03/09/sherlock-holmes-2009-poster-artwork-robert-downey-jr-jude-law-rachel-mcadams.jpg)
