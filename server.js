const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const http = require('http')
const cookieParser = require('cookie-parser')
const validator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')

const container = require('./container')

container.resolve(function(users, _, admin, home){

    mongoose.Promise = global.Promise
    mongoose.connect('mongodb://localhost:27017/chatApp', {useMongoClient: true})

    const app = SetupExpress()

    //Setup Express, server
    function SetupExpress(){
        const app = express()
        const server = http.createServer(app)
        server.listen('3000', function(){
            console.log('Listening on port 3000')
        })

        ConfigureExpress(app)

        //Setup Router
        const router = require('express-promise-router')()
        users.SetRouting(router)
        admin.SetRouting(router)
        home.SetRouting(router)
        app.use(router)
    }

    function ConfigureExpress(app){
        require('./passport/passport-local')
        require('./passport/passport-facebook')
        require('./passport/passport-google')

        app.use(express.static('public'))
        app.use(cookieParser())
        app.set('view engine', 'ejs')
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))

        app.use(validator())
        app.use(session({
            secret: 'thisissecretkey',
            resave: true,
            saveInitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }))
        app.use(flash())
        app.use(passport.initialize())
        app.use(passport.session())

        app.locals._ = _
    }

})
