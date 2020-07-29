const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../api/model/user");
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
var GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}

// jwt authantication 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.SECRET_KEY,
    passReqToCallback: true
}, async (req, payload, done) => {
    try {
        // Find the user specified in token
        const user = await User.findById(payload.sub);
        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        req.user = user;
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

// google authtoken

passport.use("googleToken", new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);

        // find existing user:-
        User.findOne({ "google.id": profile.id })
            .then(currentUser => {
                if (currentUser) {
                    done(null, currentUser)
                } else {
                    const newUser = new User({
                        method: "google",
                        google: {
                            id: profile.id,
                            email: profile.emails[0].value
                        }
                    })
                    newUser.save().then(newUser => done(null, newUser)).catch(err => console.log(err))
                }
            })
    } catch (error) {
        done(error, false)
    }
}));

// facebook stratagy
passport.use("facebookToken", new FacebookTokenStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        // console.log(profile);
        // console.log(accessToken);
        // console.log(refreshToken);

        console.log(profile.emails, profile.id);

        User.findOne({ "facebook.id": profile.id })
            .then(currentUser => {
                if (currentUser) {
                    done(null, currentUser)
                } else {
                    const newUser = new User({
                        method: "facebook",
                        facebook: {
                            id: profile.id,
                            email: profile.emails[0].value
                        }
                    })

                    newUser.save().then(newUser => done(null, newUser)).catch(err => console.log(err))

                }
            })

    } catch (error) {
        done(error, false)
    }
}
));

// local stratagy :-
passport.use(new LocalStrategy({ usernameField: "email" },
    (email, password, done) => {
        User.findOne({ "local.email": email })
            .then(user => {
                if (!user) {
                    return done(null, false)
                }
                bcrypt.compare(password, user.local.password, (err, isMached) => {
                    if (err) throw err
                    if (isMached) {
                        return done(null, user)
                    } else {
                        done(null, false)
                    }
                })
            }).catch(err => console.log(err))
    }
));