/*modulos*/
const express = require('express');
const consign = require('consign');
const bodyParse = require('body-parser');
const expressValidator = require('express-validator');

const app = express();
//configura views
app.set('view engine', 'ejs')
app.set('views','./app/views')

//configura middleware express.static
app.use(express.static('./app/public'));
//configura middleware body-parse
app.use(bodyParse.urlencoded({extended: true}));
//configurar o middleware express-validator
app.use(expressValidator());

consign() //efetua o autoload das rotas,models e controllers no objeto app
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);



/*exportando objeto app */
module.exports = app;
