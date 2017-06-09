var router = require('express').Router(); 
var User = require('../models/user');

router.get('/signup', function(req, res, next) {
    res.render('accounts/signup', {
        errors: req.flash('errors')
    });
});

router.post('/signup', function(req, res, next){
    var user = new User();

    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password= req.body.email;
    
    User.findOne({ email: req.body.email}, function(err, existingUser) {

        if(existingUser) {
            // console.log(req.body.email + " is already exist");
            req.flash('errors', 'Account with that email address already exist')
            return res.redirect('/signup');
        } else {
            user.save(function(err, user) {
                if (err) return next(err);
                
                return res.redirect('/');

                // res.json('New user has been created');
            });
        }
    });
}); 

module.exports = router;