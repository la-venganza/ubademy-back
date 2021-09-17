
const express = require('express')
const request = require('request')
const sleep = require('sleep');
const app = express()
const port = 3000
const TIMEOUT = 5*1000

app.get('/node', (_req, res) => {

  // sleep random amount of time to test graphs
  var delay = (Math.floor(Math.random() * 500)) + 200
  sleep.msleep(delay)

  res.send('Hello World Node!\n')
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

app.get('/ping', (_req, res) => {
  res.status(200).send('Ping\n');
});

