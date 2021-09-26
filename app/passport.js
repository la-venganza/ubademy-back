const passport =require("passport")
const config = require("config");
const PropertiesReader = require('properties-reader');
const prop = PropertiesReader('sensitive.conf');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:`${prop.get('google.client.id')}`,
        clientSecret:`${prop.get('google.client.secret')}`,
        callbackURL: `${config.get('callbackURL')}/auth/callback`,
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
));