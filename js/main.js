//PARA TRABAJAR CON OBJETOS: Los objetos serán señales que incluirán:
// Nivel de Potencia o Presión / Distancia del Receptor / Factor de Directividad / Retraso Inicial

//PARA TRABAJAR CON ARRAYS: Método dentro de la clase para armar un array de frecuencias que conforman la señal

//Llamada a txt con AJAX para mostrar las variables consideradas:

$(document).ready(function(){
    $("#acousticVariables").click(function(){
      $.ajax({url: "./data/variables.txt", success: function(result){
        $("#variablesDetail").html(result).slideToggle('fast');
      }});
    });
});

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
        if (this.soundPower<=0){
            return 0
        }
        else{
            return 10*Math.log10(this.soundPower/10**(-12));
        }
    }
    soundPressureLevel (){
        return this.soundPowerLevel() - 10*Math.log10((4*Math.PI*(this.distance**2))/(this.Qfactor));
    }
    soundPressure(){
        
        return (10**(this.soundPressureLevel()/20)) * 2 * (10**(-5));
    }
    addFrequency(newFrequency){
        if (newFrequency > 0 && newFrequency !== null) {
            this.frequencies.push(newFrequency);
        }
    }
}

//Funciones:

function correlatedsum(spl1,spl2,phasediff){
    //Se convierte Nivel a Presión Eficaz para simplificar las fórmulas
    p1 = ( 10**(spl1/20) ) * 2 * (10**(-5));
    p2 = ( 10**(spl2/20) ) * 2 * (10**(-5));
    corsumpef = Math.sqrt( (p1**2) + (p2**2) + (2*p1*p2*(Math.cos(phasediff))) );
    if (corsumpef>0) {
        corsum = parseInt(20*( Math.log10 ( (corsumpef) / (20*(10**(-6))) )));
    }
    else {
        corsum = 0;
    }
    let corsumalert;
    if (corsum < 0) {
        corsum = 0;
        corsumalert = corsum + ' dB';
    } else {
        corsumalert = corsum + ' dB';
    }
    return corsumalert;
}

function noncorrelatedsum(spl1,spl2){
    noncorsum = parseInt(10 * Math.log10( 10**(spl1/10) + 10**(spl2/10)));
    let noncorsumalert = noncorsum + ' dB';
    return noncorsumalert;
}

/*function correlatedsumDirect(spl1,spl2,phasediff){
    corsum = correlatedsum(spl1,spl2,phasediff);
    let sumResult = document.getElementById('sumResult');
    let corSumResult = document.createElement("corSumResult");
    corSumResult.innerHTML = '<input readonly>' + corsum + '</input>';
    sumResult.appendChild(corSumResult);
}

function noncorrelatedsumDirect(spl1,spl2){
    noncorsum = noncorrelatedsum(spl1,spl2);
    let sumResult = document.getElementById('sumResult');
    let nonCorSumResult = document.createElement("nonCorSumResult");
    nonCorSumResult.innerHTML = '<input readonly>' + noncorcum + '</input>';
    sumResult.appendChild(nonCorSumResult);
}*/

//Funcion comparadora para poder ordenar ascendentemente arrays numéricos con el método sort
function compareNumbers(a, b) {
    return a - b;
}

//Suma correlacionada si las frecuencias coinciden, si no, no correlacionada
function signalsum(Signal1,Signal2){
    if (Signal1.frequencies.length===Signal2.frequencies.length && Signal1.frequencies.length > 0 && JSON.stringify(Signal1.frequencies.sort(compareNumbers))===JSON.stringify(Signal2.frequencies.sort(compareNumbers))) {
        
        //Tomo la frecuencia más baja del array
        let lowestFrequency = parseFloat(Signal1.frequencies.sort(compareNumbers)[0]);
        
        //Calculo la diferencia de fase
        let phaseDifference = 2*Math.PI*lowestFrequency*(Signal1.timeDelay-Signal2.timeDelay) + ((Signal1.distance-Signal2.distance) % (343/lowestFrequency));
        
        let signalsum = correlatedsum(Signal1.soundPressureLevel(),Signal2.soundPressureLevel(),phaseDifference);
        return signalsum;
    }
    else{
        let signalsum = noncorrelatedsum(Signal1.soundPressureLevel(),Signal2.soundPressureLevel());
        return signalsum;
    }
}


// Funciones para estilos y clases:

$(window).on('resize', function() {
    var win = $(this);
    if (win.width() < 580) {
  
      $('.appTable').addClass('table-bordered');
  
    } else {
      $('.appTable').removeClass('table-bordered');
    }
  });