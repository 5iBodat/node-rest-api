const express = require('express');
const bodyParser = require('body-parser');
const app = express();


// parse apllication/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./App/Config/routes')
routes(app)

app.listen(3000, () => {
    console.log('server is running in http://localhost:3000');
});