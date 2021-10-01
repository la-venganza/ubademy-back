const express = require('express');
const router = express.Router();
require('./passport')
const passport = require('passport');
require('dotenv').config();

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
  
router.get("/", (req, res) => {
    res.json({message: "You are not logged in"})
})
  
router.get("/failed", (req, res) => {
    res.send("Failed")
  })

router.get("/success", isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.displayName}`)
})
  
router.get('/ping', (_req, res) => {
    res.status(200).send('Ping\n');
});
  
router.get('/auth',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
));
  
router.get('/auth/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')
  
    }
);
  
router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

module.exports = router;
