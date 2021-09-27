const express = require('express')
const request = require('request')
const sleep = require('sleep');
const passport = require('passport');
const cookieSession = require('cookie-session');

const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

const app = express()
require('./passport');

const port = 3000
app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.sendStatus(401);
  }
}

app.use(passport.initialize());
app.use(passport.session());
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.get("/", (req, res) => {
  res.json({message: "You are not logged in"})
})

app.get("/failed", (req, res) => {
  res.send("Failed")
})

app.get("/success", isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.displayName}`)
})

app.get('/ping', (_req, res) => {
  res.status(200).send('Ping\n');
});

app.get('/auth',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/auth/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/success')

    }
);

app.get('/logout', (req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Ubademy back app listening at http://localhost:${port}`)
});

