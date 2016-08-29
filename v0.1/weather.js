//weather.js basic environment set up
    
    var express  = require('express');
    
    //create the app with express
    var app      = express();
    
    //mongoose for mongodb
    var mongoose = require('mongoose');
    
    //log the request and show in console
    var morgan = require('morgan');
    
    //pull information from HTML POST method
    var bodyParser = require('body-parser');
    
    //simulate DELETE and PUT method
    var methodOverride = require('method-override');
    
    //Pre-define city for retreive weather details
    var addresses = ["Hong Kong"];
    
    
    //Environment configuration

    //connect to mongoDB by modulus.io
    mongoose.connect('mongodb://localhost/test');

    //set the static files location
    app.use(express.static(__dirname + '/public'));
    
    //log every request to the console
    app.use(morgan('dev'));
    
    //parse application/x-www-form-url-urlencoded
    app.use(bodyParser.urlencoded({'extended':'true'}));
    
    //parse application/json
    app.use(bodyParser.json());
    
    //parse application/vnd.api+json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    
    //override method
    app.use(methodOverride());
    
    //define model (also equal as database)
    var weatherDB = mongoose.model('weather', {

        city: String,
        weather: String,
        temperature: Number

    });

    //Web page routers

    //Get weather by openweather API
    var request = require('request');
    
    var async = require('async');

    //get city weather by openweather api
    app.get('/api/getcityweather', function(req, res)
    {

        async.concat (addresses, getWeatherRequestHandler, function(err, result) 
        {

            if (err) 
            {

                console.error(err);

            } 
            else 
            {

                res.send(result);

                console.log(result);

            }
        });
    });
    
    function getWeatherRequestHandler( address, callback ) 
    {  

        options =
        {

            headers: {'user-agent': 'Mozilla/5.0'},
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + address + '&APPID=31538fe27dd36887159b09eb67838b37',
            json: true

        };
        
        request.get(options, function(err, response, body_json) 
        {

            if( !err && response.statusCode === 200 )
            {

                return callback(null, body_json);

            }
            else
            {

                return callback(err);

            }
        });
    }
    
    // application
    app.get('*', function(req, res) 
    {

        res.sendfile('./public/index.html');

    });
    
app.listen(process.env.PORT);