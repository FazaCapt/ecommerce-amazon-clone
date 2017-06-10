var router = require('express').Router();
var User = require('../models/user');

router.get('/', function(req, res) {
    res.render('main/home');
});

router.get('/about', function(req, res) {
    res.render('main/about');
});

// router.get('/users', function(req, res) {
//     User.find({}, function(err, users) {
//         res.json(users);
//     });
// });  

router.get('/products/:id', function(req, res, next) {
    Product
    .find({ category: req.params.id})
    .populate('category')
    .exec(function(err, products) {
        if(err) return next(err);
        res.render('main/category', {
            products: products
        });
    });
});

// products.category.name

// {
//     category: 12312132,
//     name: harry potter,
//     price: 12345,
//     image: gravatar.com/link
// }

// {
//     category:{
//         _id: 1231231,
//         name: foods
//     }
//     name: harry potter,
//     price: 12345,
//     image: gravatar.com/link
// }

module.exports = router;