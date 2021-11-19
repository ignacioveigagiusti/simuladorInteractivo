//Se traen las señales guardadas en sesiones previas
if (localStorage.getItem("Signal1") === null && localStorage.getItem("Signal1") === null) {
    localStorage.setItem('Signal1', '{"soundPower":10,"distance":1,"Qfactor":1,"timeDelay":0,"frequencies":[40,80,160,320]}');
    localStorage.setItem('Signal2', '{"soundPower":20,"distance":2,"Qfactor":2,"timeDelay":1,"frequencies":[40,80,160,320]}');
}else{
    let Signal1 = JSON.parse(localStorage.getItem('Signal1'));
    let Signal2 = JSON.parse(localStorage.getItem('Signal2'));
}    


//función Callback para traer señales anteriores

let retrieveLastSignal = document.getElementById("retrieveLastSignal");
retrieveLastSignal.addEventListener('click',retrieveLastSignalCallback);
function retrieveLastSignalCallback() {
    //Traigo las señales de nuevo por si fueron creadas nuevas señales durante la sesión
    Signal1 = JSON.parse(localStorage.getItem('Signal1'));
    Signal2 = JSON.parse(localStorage.getItem('Signal2'));
    //Asigno valores
    document.getElementById("soundPower1").value = Signal1.soundPower;
    document.getElementById("distance1").value = Signal1.distance;
    document.getElementById("Qfactor1").value = Signal1.Qfactor;
    document.getElementById("timeDelay1").value = Signal1.timeDelay;
    if (Signal1.frequencies[0] >= 0 && Signal1.frequencies[0] !== null){
        document.getElementById("frequency1signal1").value = Signal1.frequencies[0]
    }
    if (Signal1.frequencies[1] >= 0 && Signal1.frequencies[1] !== null){
        document.getElementById("frequency2signal1").value = Signal1.frequencies[1]
    }
    if (Signal1.frequencies[2] >= 0 && Signal1.frequencies[2] !== null){
        document.getElementById("frequency3signal1").value = Signal1.frequencies[2] 
    }
    if (Signal1.frequencies[3] >= 0 && Signal1.frequencies[3] !== null){
        document.getElementById("frequency4signal1").value = Signal1.frequencies[3]      
    }
    document.getElementById("soundPower2").value = Signal2.soundPower;
    document.getElementById("distance2").value = Signal2.distance;
    document.getElementById("Qfactor2").value = Signal2.Qfactor;
    document.getElementById("timeDelay2").value = Signal2.timeDelay;
    if (Signal2.frequencies[0] >= 0 && Signal1.frequencies[0] !== null){
        document.getElementById("frequency1signal2").value = Signal2.frequencies[0]
    }
    if (Signal2.frequencies[1] >= 0 && Signal1.frequencies[1] !== null){
        document.getElementById("frequency2signal2").value = Signal2.frequencies[1]
    }
    if (Signal2.frequencies[2] >= 0 && Signal1.frequencies[2] !== null){
        document.getElementById("frequency3signal2").value = Signal2.frequencies[2]
    }
    if (Signal2.frequencies[3] >= 0 && Signal1.frequencies[3] !== null){
        document.getElementById("frequency4signal2").value = Signal2.frequencies[3]
    }
}

//Función para calcular los parámetros acústicos

let calculate = document.getElementById("calculate");
calculate.addEventListener('click',calculateCallback);
function calculateCallback() {
    //Tomo datos
    let soundPower1 = parseFloat(document.getElementById("soundPower1").value);
    let distance1 = parseFloat(document.getElementById("distance1").value);
    let Qfactor1 = parseFloat(document.getElementById("Qfactor1").value);
    let timeDelay1 = parseFloat(document.getElementById("timeDelay1").value);
    let soundPower2 = parseFloat(document.getElementById("soundPower2").value);
    let distance2 = parseFloat(document.getElementById("distance2").value);
    let Qfactor2 = parseFloat(document.getElementById("Qfactor2").value);
    let timeDelay2 = parseFloat(document.getElementById("timeDelay2").value);
    
    //Chequeo de datos
    if (isNaN(soundPower1) || isNaN(distance1) || isNaN(Qfactor1) || isNaN(timeDelay1) || isNaN(soundPower2) || isNaN(distance2) || isNaN(Qfactor2) || isNaN(timeDelay2)) {
        document.getElementById("signalSumTag").innerHTML = 'Alguno de los valores ingresados no es correcto!';
        document.getElementById("signalSumTag").style.color = 'crimson';
        document.getElementById("signalSumResult").style.display = 'none';
    }
    else{
        document.getElementById("signalSumTag").innerHTML = 'Suma de Niveles de Presión: ';
        document.getElementById("signalSumTag").style.color = 'black';
        document.getElementById("signalSumResult").style.display = 'table-cell';
        //Construyo las señales
        const Signal1 = new Signal(soundPower1, distance1, Qfactor1, timeDelay1);
        const Signal2 = new Signal(soundPower2, distance2, Qfactor2, timeDelay2);
        
        Signal1.addFrequency(parseInt(document.getElementById('frequency1signal1').value));
        Signal1.addFrequency(parseInt(document.getElementById('frequency2signal1').value));
        Signal1.addFrequency(parseInt(document.getElementById('frequency3signal1').value));
        Signal1.addFrequency(parseInt(document.getElementById('frequency4signal1').value));
        Signal2.addFrequency(parseInt(document.getElementById('frequency1signal2').value));
        Signal2.addFrequency(parseInt(document.getElementById('frequency2signal2').value));
        Signal2.addFrequency(parseInt(document.getElementById('frequency3signal2').value));
        Signal2.addFrequency(parseInt(document.getElementById('frequency4signal2').value));
        
        //Almaceno
        localStorage.setItem('Signal1', JSON.stringify(Signal1));
        localStorage.setItem('Signal2', JSON.stringify(Signal2));    
        
        
        //Calculo
        document.getElementById('signalSumResult').innerHTML = signalsum(Signal1,Signal2);
        document.getElementById('soundPowerLevel1').value = parseInt(Signal1.soundPowerLevel());
        document.getElementById('soundPressureLevel1').value = parseInt(Signal1.soundPressureLevel());
        document.getElementById('soundPressure1').value = parseInt(Signal1.soundPressure());
        document.getElementById('soundPowerLevel2').value = parseInt(Signal2.soundPowerLevel());
        document.getElementById('soundPressureLevel2').value = parseInt(Signal2.soundPressureLevel());
        document.getElementById('soundPressure2').value = parseInt(Signal2.soundPressure());
    }
}

// Ejecutar con 'Enter'
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("calculate").click();
    }
});