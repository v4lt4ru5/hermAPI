var mes = ["","enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre", "noviembre","diciembre"]
var semana = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado", ""];

const Fecha = {};

function cero(param)
{
    if(param < 10)
    param = "0" + param;

    return param;
}

function fecha()
{
    var date = new Date();
    var vector = 
    [
        date.getDate(),
        date.getMonth(),
        date.getFullYear(),
        date.getDay(),
        cero(date.getHours()),
        cero(date.getMinutes()),
    ];

    return vector;

}

// Constructor para la fecha

function fechaFormato(vector)
{
    return ("dia "+vector[0]+" ("+semana[vector[3]]+") de "+ mes[vector[1]]+" del año "+vector[2]+". Son las "+vector[4]+":"+vector[5]);
}

Fecha.fecha = fecha;
Fecha.fechaFormato = fechaFormato;

module.exports = Fecha;