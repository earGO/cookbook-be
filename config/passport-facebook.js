const
    FacebookStrategy = require('passport-facebook').Strategy,
    mongoose = require('mongoose'),
    User = mongoose.model('users'),
    keys = require('./keys');

module.exports = function(passport) {
    passport.use(
        new FacebookStrategy({
            clientID: keys.CLIENT_ID,
            clientSecret: keys.CLIENT_SECRET,
            callbackURL: keys.CALLBACK_URL,
            profileFields: ['id', 'picture.type(large)', 'name','email','displayName'],
                enableProof: true
        },
        function(accessToken, refreshToken, profile, cb) {
            let givenName = '',
                familyName='',
                facebookEmail=''

            if (profile.name.givenName){
                givenName=profile.name.givenName
            } else {
                givenName = profile.displayName.split(' ')[0];
            }
            (profile.name.familyName)
                ?familyName=profile.name.familyName
                :familyName=profile.displayName.split(' ')[1];

            (profile.email)
                ?facebookEmail=profile.email
                :facebookEmail='no email listed';

            const newUser={
                facebookID:profile.id,
                firstName:givenName,
                lastName:familyName,
                email:facebookEmail,
                image:profile._json.picture.data.url
            }
            //check for existing user, and if not - create one
            User.findOne({
                facebookID: newUser.facebookID
            }).then(user=>{
                if(user){
                    //return the result of authentucation
                    return cb(null,user)
                } else {
                    //create new User
                    new User(newUser)
                        .save()
                        .then(user => { return cb(null,user)})
                        .catch(err=>console.log('error creating user\n',cb(err)))

                }
            })
        }));

    passport.serializeUser((user,cb)=>{
        cb(null,user.id)
    })

    passport.deserializeUser((id,cb)=>{
        User.findById(id).then(user=> cb(null,user))
    })
        }
