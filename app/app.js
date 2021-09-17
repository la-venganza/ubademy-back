
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


app.get('/bbox1', (_req, res) => {
  request.get('http://box:9090/').on('response', (response) => {
    console.log("bbox1 " + response.statusCode)
    res.send("bbox1 " + response.statusCode + "\n")
  })
});

app.get('/bbox2', (_req, res) => {
  request.get('http://box:9091/').on('response', (response) => {
    console.log("bbox2 " + response.statusCode)
    res.send("bbox2 " + response.statusCode + "\n")
  })
});

app.get('/ping', (_req, res) => {
  res.status(200).send('Ping\n');
});

app.get('/heavy', (_req, res) => {
  // Date() me devuelve milisegundos
  let start = new Date();
  while(new Date() - start < TIMEOUT);
  res.status(200).send('Heavy work done\n')
});