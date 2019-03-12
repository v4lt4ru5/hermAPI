const express = require('express');
const colors = require('colors');
const server = express();
const port = 3000;
const request = require('request');

const Estrella = require('./estrellas');

const fecha = require('./fecha');

server.get('/', (req, res) => {
    res.status(200);
    res.send("API por H3rm3s, hackathon");
});

server.get('/fecha',(req, res) => {
    res.status(200);
    res.send(fecha.fecha().toString());
});

server.get('/fecha-formato', (req, res) => {
    res.status(200);
    res.send("Hoy es " + fecha.fechaFormato( fecha.fecha() ));
});

server.get('/estrellas', (req,res) =>{
    Estrella.getEstrellas(req, res);
});

server.get('/estrella-formato', (req, res) => {
    Estrella.getFormat(req, res);
});

// Para error 404

server.get('*', (req, res) => {
    res.status(404);
    res.send("Has vuelto a perder");
})

server.listen(port,() => {
    console.log(" Server utilizado en el puerto".green + port);
});