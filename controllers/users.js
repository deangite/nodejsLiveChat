'use strict';
module.exports = function(_, User, passport){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage),
            router.get('/signup', this.getSignUp),
            
            router.get('/auth/facebook', this.getFacebookLogin)
            router.get('/auth/facebook/callback', this.getFacebookLoginCallback)
            router.get('/auth/google', this.getGoogleLogin)
            router.get('/auth/google/callback', this.getGoogleLoginCallback)

            router.post('/', User.LoginValidation, this.postLogin)
            router.post('/signup', User.SignUpValidation, this.postSignUp)
        },
        indexPage: function(req, res){
            const errors = req.flash('error')
            return res.render('index', {
                title: 'ChatApp | SignUp', 
                messages: errors, 
                hasErrors: errors.length > 0
            })
        },
        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
        getSignUp: function(req, res){
            const errors = req.flash('error')
            return res.render('signup', {
                title: 'ChatApp | Login', 
                messages: errors, 
                hasErrors: errors.length > 0
            })
        },
        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        getFacebookLogin: passport.authenticate('facebook', {
            scope: 'email'
        }),
        getFacebookLoginCallback: passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),
        getGoogleLogin: passport.authenticate('google', {
            scope: ['email', 'profile']
        }),
        getGoogleLoginCallback: passport.authenticate('google', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        })
    }
}