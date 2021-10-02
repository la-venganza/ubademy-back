[![Build Status](https://app.travis-ci.com/la-venganza/ubademy-back.svg?branch=develop)](https://app.travis-ci.com/la-venganza/ubademy-back)
[![Coverage Status](https://coveralls.io/repos/github/la-venganza/ubademy-back/badge.svg?branch=develop)](https://coveralls.io/github/la-venganza/ubademy-back?branch=develop)

# Ubademy - Backend

Backend of Ubademy application, it works as a link between front-end app and microservices.


## How to run

Ask the mantainers for the file sensitive.conf

### Stand alone mode

It starts the server without a Load Balancer in one process.

```bash
cd app
npm install
npm run start:dev
```

### Dockerized mode

Starts the server and the load balancer in a dockerized environment

```bash
cd app
npm install
cd ..
docker-compose build
docker-compose up
```


## How to browse

```bash
http://localhost:3000/
http://localhost:3000/api-docs 
http://localhost:3000/health-check
```

In prod mode, the nginx server is queried which in turn query the node server(s) (acts as a load balancer)

## Design

![Arquitectura](/doc/arquitectura.png)


## Login

### Creation of oauth google client id.

Those were the steps followed to get the credentials (it is not needed to be done again):

Sign up "Ubademy - login" project in google cloud: https://console.cloud.google.com/

Go to credentials -> Create conscent screen -> Follow Steps for external users.

Go to credentials -> Create Credentials and select OAuth Client API ID, stored credentials in sensitive.conf


## Resources

https://docs.docker.com/engine/install/ubuntu/

https://medium.com/nerd-for-tech/google-oauth2-0-authentication-using-node-js-and-passportjs-1a77f42b1111
