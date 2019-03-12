const request = require('request');


const Estrella = {};

function getEstrellas(req, res)
{

    request({
        headers : 
        {
            'User-Agent' : 'v4lt4ru5'
        },
        uri: 'https://api.github.com/repos/v4lt4ru5/v4lt4ru5.github.io'
    }), (error, response, body) => {
        if(!error && response.statusCode == 200)
        {
            var info = JSON.parse(body);
            res.send(info.stargazers_count.toString());
        }else res.send(404, "has perdido");
    
    }
}

function getFormat(req, res)
{
    request({
        headers : 
        {
            'User-Agent' : 'v4lt4ru5'
        },
        uri: 'https://api.github.com/repos/v4lt4ru5/v4lt4ru5.github.io'

    }, (error, response, body) => {
        if(!error && response.statusCode == 200) 
        {
            var info = JSON.parse(body);
            res.send('Este repositorio tiene '+ info.stargazers_count.toString() + ' estrellas');
        }else res.send(404,"has perdido");
    })
}

Estrella.getEstrellas = getEstrellas;
Estrella.getFormat = getFormat;

module.exports = Estrella;