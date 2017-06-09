var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// the user schema attributes /characteristic / fields
var UserSchema = new moongoose.Schema({
    email: { type: String, unique: true, lowercase: true},
    password: String,

    profile: {
        name: { type: String, default: ''},
        picture: { type: String, default: ''}
    },

    address: String,
    history: [{
        date: Date,
        paid: { type: Number, default: 0},
        // item: { tyep: Schema.Types.ObjectId, ref: ''}
    }]
});
/**
 * Human
 * 
 * hair 
 * weight
 * name
 */

// var user = new User();
// user.email = '';
// user.profile.name = "Batman";

// hash the password before we even save it to the database

// var user = new User();
// var user1  = new User();

UserSchema.pre('save', function(next){ // pre: moongose method
    var user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
       // salt = dnakdasm1212311 //random data
       if(err) return next(err);
       bcrypt.hash(user.password, salt, null, function(err, hash) {
           if(err) return next(err);
        // hash = 1234591293u1jdancj
           user.password = hash;
           next();
       })
    });

    // user.password = 123132128undsanjqndanxja##

//     UserSchema.pre('save', function(next) {
//         var user = this;
//         user.name = 'Handskmaasmkdakdmaksome'; 
//         user.name = 'Handsome'; 
//     })
// })

// compare password in database and te one that the user type in

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

// penjelasan bcrypt:
// abc123 -> 1234121kdakamakakcnzk1231143
// abc123 