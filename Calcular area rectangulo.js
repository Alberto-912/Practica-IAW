
//Calcular area rectangulo

// para que funcione ejecutar en cmd: npm i prompt-sync
const prompt=require("prompt-sync")({sigint:true});

let base = prompt('Introduce la base del rectangulo:','');
let altura = prompt('Introduce la altura del rectangulo:','');

function CalcularAreaRect(base,altura){
    return parseInt(base) * parseInt(altura);
}

console.log('El area de tu rectangulo es:', CalcularAreaRect(base,altura));