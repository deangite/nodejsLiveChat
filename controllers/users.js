'use strict';

module.exports = function(_){
    return {
        SetRouting: function(router){
            router.get('/', this.indexPage),
            router.get('/signup', this.signupPage)
        },
        indexPage: function(req, res){
            return res.render('index', {test: 'this is a test', moreTest: 'this is more test'})
        },
        signupPage: function(req, res){
            return res.render('signup')
        }
    }
}