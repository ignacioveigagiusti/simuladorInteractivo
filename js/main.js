//PARA TRABAJAR CON OBJETOS: Los objetos serán señales que incluirán:
// Nivel de Potencia o Presión / Distancia del Receptor / Factor de Directividad / Retraso Inicial

class signal {
    constructor(soundPower, distance, Qfactor, timeDelay){
        this.soundPower = parseFloat(soundPower);
        this.distance = parseFloat(distance);
        this.Qfactor = parseFloat(Qfactor);
        this.timeDelay = parseFloat(timeDelay);
        this.soundPowerLevel = 10*Math.log10(soundPower/10**(-12))
        this.soundPressureLevel = this.soundPowerLevel - 10 * Math.log10((4*Math.PI*(distance**2))/(Qfactor));
        this.soundPressure = ( 10**(this.soundPressureLevel/20) ) * 2 * (10**(-5));
    }
}

// PRUEBA DE DATOS

const signal1 = new signal(10, 2, 1, 0)
console.log(signal1.soundPressureLevel)

//PARA TRABAJAR CON ARRAYS: Operación aparte con frecuencias específicas pusheadas al array



let soundPressureLevel1 = parseFloat(prompt("Ingrese el nivel de presión sonora en decibeles de la primera señal:"));
let soundPressureLevel2 = parseFloat(prompt("Ingrese el nivel de presión sonora en decibeles de la primera señal:"));
let phasediff = parseFloat(prompt("Ingrese la diferencia de fase (sólo necesaria si desea realizar una suma correlacionada):"));

function correlatedsum(spl1,spl2,phasediff){
    //Se convierte Nivel a Presión Eficaz para simplificar las fórmulas
    p1 = ( 10**(spl1/20) ) * 2 * (10**(-5));
    p2 = ( 10**(spl2/20) ) * 2 * (10**(-5));
    corsumpef = Math.sqrt( (p1**2) + (p2**2) + (2*p1*p2*(Math.cos(phasediff))) );
    corsum = parseInt(10*( Math.log10 ( (corsumpef**2) / (4*(10**(-10))) )));
    let corsumalert = 'La suma de los niveles es: ' + corsum + ' dB';
    alert(corsumalert)
}

function noncorrelatedsum(spl1,spl2){
    noncorsum = parseInt(10 * Math.log10( 10**(spl1/10) + 10**(spl2/10)));
    let noncorsumalert = 'La suma de los niveles es: ' + noncorsum + ' dB';
    alert(noncorsumalert)
}



