var router = require('express').Router(); 
var User = require('../models/user');
var passport = require('passport');
var passportConf = require('../config/passport');

/* ================ LOGIN ============== */
router.get('/login', function(req, res) {
    if(req.user) return res.redirect('/');

    res.render('accounts/login', { 
        message: req.flash('loginMessage')
    });
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/profile', function(req, res, next) {
    // res.json(req.user);
    User.findOne({ _id: req.user._id}, function(err, user) {
        if(err) return next(err);
        res.render('accounts/profile', { user: user });
    })
});

/* ================ SIGNUP ============== */

router.get('/signup', function(req, res, next) {
    if(req.user) return res.redirect('/profile')

    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

router.post('/signup', function(req, res, next){
    var user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password= req.body.password;
    user.profile.picture = user.gravatar();
    
    User.findOne({ email: req.body.email }, function(err, existingUser) {

        if(existingUser) {
            req.flash('errors', 'Account with that email address already exist')
            return res.redirect('/signup');
        } else {
            user.save(function(err, user) {
                if (err) return next(err);

                req.logIn(user, function(err){
                    if(err) return next(err);
                    res.redirect('profile');
                })
                
            });
        }
    })
}); 

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
