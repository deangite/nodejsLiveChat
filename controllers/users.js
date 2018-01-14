'use strict';
const passport = require('passport')
module.exports = function(_, User){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage),
            router.get('/signup', this.getSignUp),
            router.get('/home', this.homePage)

            router.post('/signup', User.SignUpValidation, this.postSignUp)
        },
        indexPage: function(req, res){
            return res.render('index', {test: 'this is a test', moreTest: 'this is more test'})
        },
        getSignUp: function(req, res){
            const errors = req.flash('error')
            return res.render('signup', {
                title: 'ChatApp | Login', 
                messages: errors, 
                hasErrors: errors.
                length > 0
            })
        },
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        homePage: (req, res) => { res.render('home') }
    }
}