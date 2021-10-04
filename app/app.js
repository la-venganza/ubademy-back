const express = require('express');
// const tracer = require('dd-trace').init();
const passport = require('passport');
const cookieSession = require('cookie-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
// require('./firebase');
require('./passport');
require('dotenv').config();
const routes = require('./src/routes');

const dd_options = {
  response_code: true,
  tags: ['app:ubademy_back'],
};

const connect_datadog = require('connect-datadog')(dd_options);

const app = express();

const port = process.env.PORT || 3000;
app.use(connect_datadog);
app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2'],
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);
app.use('/', routes);

app.listen(port, () => {
  console.log(`Ubademy back app listening at http://localhost:${port}`);
});
