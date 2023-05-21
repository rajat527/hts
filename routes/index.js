/*
Author (Rajat chauhan)

emailId : rajatchauhan527@gmail.com

*/

var express = require('express');
var router = express.Router();
var app = require('express');
const AUTH_CONTROLLER = require('../app/auth/auth.controller/authController')
const VALIDATION = require('../middleware/validationMiddleware')

require('express-group-routes');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'HTS' });
});

// routes start
router.post("/signup",VALIDATION.signupValidation, AUTH_CONTROLLER.signup); 
router.post("/login",VALIDATION.loginValidation, AUTH_CONTROLLER.login)



module.exports = router;
