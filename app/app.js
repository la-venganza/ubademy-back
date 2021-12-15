const express = require('express');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
require('dotenv').config();
const routes = require('./src/routes');

const tracer = require('dd-trace').init();

const app = express();

const port = process.env.PORT || 3000;

const corsOptions = {
  "credentials": true,
  "origin": ["*", "http://localhost:8080"],
  "methods": "GET, HEAD, PUT, PATCH, POST, DELETE",
  // other options
}

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json())

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.use('/', routes);

app.listen(port, () => {
  console.log(`Ubademy back app listening at http://localhost:${port}`);
});
