'use strict'

//PARA QUE LA API SEA RESTful TIENE QUE TENER LAS CUATRO PETICIONES PRINCIPALES: GET / POST / PUT / DELETE
// GET: pide datos a un servidor
// POST: cuando enviamos datos al servidor para que se guarden en una base de datos, los mensajen viajan en el cuerpo y no la cabecera
// DELETE: Desde el cliente indica al servidor el borrado de un recurso en la base de datos
// PUT: para indiciar que se quiere actualizar un recurso como por ejemplo el nombre de un producto etc etc

//Para los diferentes estados usaremos los codigos de estado HTTP

const express = require('express'); //Lee en la carpeta node_modules y busca express
const bodyParser = require('body-parser');
const colors = require('colors');
const server = express();
const port = process.env.PORT || 3000;
const request = require('request');
const mongoose = require('mongoose');

const User = require('./models/user')


server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

server.get('/api/user', (req, res) => {

    User.find({},(err, users)=>{

        if(err)  res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!users) return res.status(404).send({message: 'No existen usuarios'})

        res.status(200).send({ users })
    }) 
}) 

server.get('/api/user/:userID', (req, res) =>{

    let userID = req.params.userID

    User.findById(userID, (err, user)=>{
        if(err) res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!user) return res.status(404).send({message: `El user no existe`})

        res.status(200).send({ user })
    })
})
/*Para añadir el user. Para acceder al cuerpo del que recibe la petición, donde estaran
los datos a los que queremos acceder. Gracias al Body-Parser, podemos "parsear" ese cuerpo
 del mensaje y tratarlo como un objeto json de una manera mas sencilla.
 Para poder acceder al cuerpo de la peticion en el post */ 

server.post('/api/user', (req, res) => { 
      console.log('POST /api/user')
      console.log(req.body)
//Luego al introducir los datos con Postman, habrá que insertarlos el body en formato raw y JSON

      let user = new User()
      user.name = req.body.name
      user.picture = req.body.picture
      user.profession = req.body.profession
      user.age = req.body.age
      user.department = req.body.department
      user.description = req.body.description

      /*Como es un objeto de mongoose, ya tiene acceso a las funciones
      de Mongodb*/

      user.save((err, userStored) => {
          if (err) res.status(500).send({message: `Error al añadir el user: ${err}` })
          //Si no da error, en la misma respuesta nos devuelve todo
          res.status(200).send({user: userStored})
      })
})

server.put('/api/user/:userID', (req,res)=> { //Para las actualizaciones

   let userID = req.params.userID
   let update = req.body
   
   User.findOneAndUpdate(userID, update, (err, userUpdated)=> {
    if(err) res.status(500).send({message: `Error al actualizar al usuario: ${err}`})


    res.status(200).send({ user: userUpdated })
   })

}) 

server.delete('/api/user/:userID', (req, res) => { //Para borrar un usuario
    let userID = req.params.userID

    User.findById(userID, (err, user) =>{
        if(err) res.status(500).send({message: `Error al borrar al usuario: ${err}`})

        user.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar al usuario: ${err}`})

            res.status(200).send({message : 'El user ha sido eliminado'})
        })
    })
})


const Estrella = require('./estrellas');

const fecha = require('./fecha');

server.get('/', (req, res) => { //Los param se obtienen del request siempre que pongamos : delante y enviar al destino con res
    res.status(200);
    res.send({ message: `API creada por Hermes, ¡ hola ${req.params.name} !`});
});

server.get('/fecha',(req, res) => { //el get nos ejecuta la función fecha, con request y response
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

//Nodemon usada como dependencia de desarrollo que cada vez que hagamos un cambio, el servidor se reinicia

mongoose.connect('mongodb://127.0.0.1:27017/users', (err, res) => {
    if (err) 
    {
     return console.log(`Error al conectar a la base de dato, y has perdido: ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')

    server.listen(port,() => {
        console.log(`hermAPI corriendo en http://localhost:${port}`);
    });
})
