//Clases:

class signal {
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

//Suma correlacionada si las frecuencias coinciden, si no, no correlacionada
function signalsum(signal1,signal2){
    if (signal1.frequencies.length===signal2.frequencies.length && toString(signal1.frequencies.sort(compareNumbers))==toString(signal1.frequencies.sort(compareNumbers))) {
        let phaseDifference = 2*Math.PI*parseFloat(signal1.frequencies.sort(compareNumbers)[0])*(signal1.timeDelay-signal2.timeDelay) + ((signal1.distance-signal2.distance) % (343/signal1.frequencies.sort(compareNumbers)[0]))
        correlatedsum(signal1.soundPressureLevel(),signal2.soundPressureLevel(),phaseDifference);
    }
    else{
        noncorrelatedsum(signal1.soundPressureLevel(),signal2.soundPressureLevel());
    }
}