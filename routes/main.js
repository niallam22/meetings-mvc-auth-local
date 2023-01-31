const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')
//ensureAuth is not being used by main router because auth controller is authenticating and setting up the user session. ensureAuth just checks if the user is authenticated
//the server directs all requests to the routers and then the router sends the request to the relevant controller
//home controller and authController are imported and the getIndex method is called which renders the ejs (views) and responds with html
router.get('/', homeController.getIndex)
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router