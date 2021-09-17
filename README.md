# Ubademy - Backend

Backend of Ubademy application, it works as a link between front-end app and microservices.


## How to run:
```bash
cd app
npm install
cd ..
docker-compose up
```

## How to browse

```bash
http://localhost:5555/node 
http://localhost:5555/ping
```
It query the nginx server which in turn query the node server(s) (acts as a load balancer)

## Design

![Arquitectura](/doc/arquitectura.png)

## Recursos

https://docs.docker.com/engine/install/ubuntu/