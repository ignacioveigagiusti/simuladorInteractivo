//PARA TRABAJAR CON OBJETOS: Los objetos serán señales que incluirán:
// Nivel de Potencia o Presión / Distancia del Receptor / Factor de Directividad (Q) / Retraso Inicial

//PARA TRABAJAR CON ARRAYS: Método dentro de la clase para armar un array de frecuencias que conforman la señal

//Clases:

class Signal {
    constructor(soundPower, distance, Qfactor, timeDelay){
        this.soundPower = parseFloat(soundPower);
        this.distance = parseFloat(distance);
        this.Qfactor = parseFloat(Qfactor);
        this.timeDelay = parseFloat(timeDelay);
        this.frequencies = [];
    }
    soundPowerLevel() {
        return 10*Math.log10(this.soundPower/10**(-12));
    }
    soundPressureLevel (){
        return this.soundPowerLevel() - 10*Math.log10((4*Math.PI*(this.distance**2))/(this.Qfactor));
    }
    soundPressure(){
        return (10**(this.soundPressureLevel()/20)) * 2 * (10**(-5));
    }
    addFrequency(newFrequency){
        this.frequencies.push(newFrequency);
    }
}

//Funciones:

function correlatedsum(spl1,spl2,phasediff){
    //Se convierte Nivel a Presión Eficaz para simplificar las fórmulas
    p1 = ( 10**(spl1/20) ) * 2 * (10**(-5));
    p2 = ( 10**(spl2/20) ) * 2 * (10**(-5));
    corsumpef = Math.sqrt( (p1**2) + (p2**2) + (2*p1*p2*(Math.cos(phasediff))) );
    if (corsumpef>0) {
        corsum = parseInt(10*( Math.log10 ( (corsumpef**2) / (4*(10**(-10))) )));
    }
    else {
        corsum = 0
    }
    let corsumalert = 'La suma de los niveles es: ' + corsum + ' dB';
    alert(corsumalert)
}

function noncorrelatedsum(spl1,spl2){
    noncorsum = parseInt(10 * Math.log10( 10**(spl1/10) + 10**(spl2/10)));
    let noncorsumalert = 'La suma de los niveles es: ' + noncorsum + ' dB';
    alert(noncorsumalert)
}

//Funcion comparadora para poder ordenar ascendentemente arrays numéricos con el método sort
function compareNumbers(a, b) {
    return a - b;
}

//Espectros de frecuencias ordenados para compararlos

frequencySpectrum1 = toString(Signal1.frequencies.sort(compareNumbers))
frequencySpectrum2 = toString(Signal2.frequencies.sort(compareNumbers))

//Suma correlacionada si las frecuencias coinciden, si no, no correlacionada
function signalsum(Signal1,Signal2){
    if (Signal1.frequencies.length===Signal2.frequencies.length && frequencySpectrum1==frequencySpectrum2) {
        //tomo la frecuencia más baja del array
        let lowestFrequency = parseFloat(Signal1.frequencies.sort(compareNumbers)[0]);

        //Calculo la diferencia de Fase (2*pi*lowestfreq * (diferencie de tiempo) + (resto entre diferencia de distancias y c/lowestfreq))
        let phaseDifference = 2*Math.PI*lowestFrequency*(Signal1.timeDelay-Signal2.timeDelay) + ((Signal1.distance-Signal2.distance) % (343/lowestFrequency));
        
        correlatedsum(Signal1.soundPressureLevel(),Signal2.soundPressureLevel(),phaseDifference);
    }
    else{
        noncorrelatedsum(Signal1.soundPressureLevel(),Signal2.soundPressureLevel());
    }
}