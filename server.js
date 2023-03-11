const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport') //strategies can be changed e.g. google auth
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const meetingRoutes = require('./routes/meetings')
const methodOverride = require('method-override')

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

//middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //parses req object as json object
app.use(logger('dev'))
app.use(methodOverride('_method'))

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//pass request to router
app.use('/', mainRoutes)
app.use('/meetings', meetingRoutes)

//listen for requests
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    