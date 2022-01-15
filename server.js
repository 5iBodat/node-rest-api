const express = require('express');
const bodyParser = require('body-parser');
var morgan = require('morgan')
const app = express();


// parse apllication/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'))

//panggil routes
var routes = require('./App/Config/routes');
routes(app)

//panggil menu routes dari index
app.use('/auth', require('./App/Middleware'))

app.listen(3000, () => {
    console.log('server is running in http://localhost:3000');
});