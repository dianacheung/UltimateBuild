const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const transpileConfig = require('./controllers/transpile_config_form.js');
const userController = require('./controllers/userController');
const cookieController = require('./util/cookieController');
const sessionController = require('./controllers/sessionController');

app.use(express.static('../client/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', function(req,res){
    res.sendFile(__dirname + '/client/src/index.html')
})
//app.post to signup should:
//creater a user
//setSSIDcookie,
//start a session
//send a 200 response to the client
app.post('/signup',
        userController.createUser,
        cookieController.setSSIDcookie,
        sessionController.startSession,
        (req, res) => res.end(200));
app.post('/login',
        userController.verifyUser,
        cookieController,setSSIDcookie,
        sessionController.startSession,
        (req,res) => res.end(200)
) 
app.listen(3000,() => console.log('listening on port 3000'));
