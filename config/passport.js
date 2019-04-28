/*============================A passport config for local registration and authorization======================*/

const
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcryptjs'),
    mongoose = require('mongoose')
    User = mongoose.model('users');

module.exports = function(passport) {
    //Using local strategy for simplier issues
    passport.use(
        new LocalStrategy({
                usernameField:'email',
                passwordField: 'password',
            },
            function(email,password,done){
                User.findOne({
                    email:email
                },(err,user)=>{
                    if(err){
                        console.log('error finding user\n',err);
                        return done(err);
                    }
                    if(!user) {
                        return done(null,false,{message:'No user found'});
                    } else {
                        bcrypt.compare(password,user.password
                            ,(err,isMatch)=>{
                                if(err){
                                    console.log('error comparing passwords\n',err)
                                }
                                if(isMatch){
                                    console.log('found user, password is right')
                                    console.log(user)
                                    return done(null,user)
                                }else{
                                    return done(null, false, {message:'Wrong password'})
                                }

                    })
                }
            }
        )}
    ))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

        }
