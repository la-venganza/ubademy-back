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
docker-compose up
```


## How to browse

### Stand alone mode 

```bash
http://localhost:3000/
http://localhost:3000/auth 
http://localhost:3000/health-check
```

### Dockerized mode

```bash
http://localhost:5555/
http://localhost:5555/auth
http://localhost:5555/health-check
```
It query the nginx server which in turn query the node server(s) (acts as a load balancer)

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