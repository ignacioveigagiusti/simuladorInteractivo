//Se traen las señales guardadas en sesiones previas
if (localStorage.getItem("Signal1") === null && localStorage.getItem("Signal1") === null) {
    localStorage.setItem('Signal1', '{"soundPower":10,"distance":1,"Qfactor":1,"timeDelay":0,"frequencies":[40,80,160,320]}');
    localStorage.setItem('Signal2', '{"soundPower":20,"distance":2,"Qfactor":2,"timeDelay":1,"frequencies":[40,80,160,320]}');
}else{
    let Signal1 = JSON.parse(localStorage.getItem('Signal1'));
    let Signal2 = JSON.parse(localStorage.getItem('Signal2'));
}    


//función Callback para traer señales anteriores

let retrieveLastSignal = $("#retrieveLastSignal");
retrieveLastSignal.click(retrieveLastSignalCallback);
function retrieveLastSignalCallback() {
    //Traigo las señales de nuevo por si fueron creadas nuevas señales durante la sesión
    Signal1 = JSON.parse(localStorage.getItem('Signal1'));
    Signal2 = JSON.parse(localStorage.getItem('Signal2'));
    //Asigno valores
    $("#soundPower1").val(Signal1.soundPower);
    $("#distance1").val(Signal1.distance);
    $("#Qfactor1").val(Signal1.Qfactor);
    $("#timeDelay1").val(Signal1.timeDelay);
    if (Signal1.frequencies[0] >= 0 && Signal1.frequencies[0] !== null){
        $("#frequency1signal1").val(Signal1.frequencies[0]);
    }
    if (Signal1.frequencies[1] >= 0 && Signal1.frequencies[1] !== null){
        $("#frequency2signal1").val(Signal1.frequencies[1]);
    }
    if (Signal1.frequencies[2] >= 0 && Signal1.frequencies[2] !== null){
        $("#frequency3signal1").val(Signal1.frequencies[2]); 
    }
    if (Signal1.frequencies[3] >= 0 && Signal1.frequencies[3] !== null){
        $("#frequency4signal1").val(Signal1.frequencies[3]);      
    }
    $("#soundPower2").val(Signal2.soundPower);
    $("#distance2").val(Signal2.distance);
    $("#Qfactor2").val(Signal2.Qfactor);
    $("#timeDelay2").val(Signal2.timeDelay);
    if (Signal2.frequencies[0] >= 0 && Signal1.frequencies[0] !== null){
        $("#frequency1signal2").val(Signal2.frequencies[0]);
    }
    if (Signal2.frequencies[1] >= 0 && Signal1.frequencies[1] !== null){
        $("#frequency2signal2").val(Signal2.frequencies[1]);
    }
    if (Signal2.frequencies[2] >= 0 && Signal1.frequencies[2] !== null){
        $("#frequency3signal2").val(Signal2.frequencies[2]);
    }
    if (Signal2.frequencies[3] >= 0 && Signal1.frequencies[3] !== null){
        $("#frequency4signal2").val(Signal2.frequencies[3]);
    }
}

//Función para calcular los parámetros acústicos

let calculate = $("#calculate");
calculate.click(calculateCallback);
function calculateCallback() {
    //Tomo datos
    let soundPower1 = parseFloat($("#soundPower1").val());
    let distance1 = parseFloat($("#distance1").val());
    let Qfactor1 = parseFloat($("#Qfactor1").val());
    let timeDelay1 = parseFloat($("#timeDelay1").val());
    let soundPower2 = parseFloat($("#soundPower2").val());
    let distance2 = parseFloat($("#distance2").val());
    let Qfactor2 = parseFloat($("#Qfactor2").val());
    let timeDelay2 = parseFloat($("#timeDelay2").val());
    
    //Chequeo de datos
    if (isNaN(soundPower1) || isNaN(distance1) || isNaN(Qfactor1) || isNaN(timeDelay1) || isNaN(soundPower2) || isNaN(distance2) || isNaN(Qfactor2) || isNaN(timeDelay2)) {
        $("#signalSumTag").html('Alguno de los valores ingresados no es correcto!');
        $("#signalSumTag").css('color','crimson');
        $("#signalSumResult").css('display','none');
    }
    else{
        $("#signalSumTag").html('Suma de Niveles de Presión: ');
        $("#signalSumTag").css('color','black');
        $("#signalSumResult").css('display','table-cell');
        //Construyo las señales
        const Signal1 = new Signal(soundPower1, distance1, Qfactor1, timeDelay1);
        const Signal2 = new Signal(soundPower2, distance2, Qfactor2, timeDelay2);
        
        Signal1.addFrequency(parseInt($('#frequency1signal1').val()));
        Signal1.addFrequency(parseInt($('#frequency2signal1').val()));
        Signal1.addFrequency(parseInt($('#frequency3signal1').val()));
        Signal1.addFrequency(parseInt($('#frequency4signal1').val()));
        Signal2.addFrequency(parseInt($('#frequency1signal2').val()));
        Signal2.addFrequency(parseInt($('#frequency2signal2').val()));
        Signal2.addFrequency(parseInt($('#frequency3signal2').val()));
        Signal2.addFrequency(parseInt($('#frequency4signal2').val()));
        
        //Almaceno
        localStorage.setItem('Signal1', JSON.stringify(Signal1));
        localStorage.setItem('Signal2', JSON.stringify(Signal2));    
        
        
        //Calculo
        $('#signalSumResult').html(signalsum(Signal1,Signal2));
        $('#soundPowerLevel1').val(parseInt(Signal1.soundPowerLevel()));
        $('#soundPressureLevel1').val(parseInt(Signal1.soundPressureLevel()));
        $('#soundPressure1').val(parseInt(Signal1.soundPressure()));
        $('#soundPowerLevel2').val(parseInt(Signal2.soundPowerLevel()));
        $('#soundPressureLevel2').val(parseInt(Signal2.soundPressureLevel()));
        $('#soundPressure2').val(parseInt(Signal2.soundPressure()));
    }
}

// Ejecutar con 'Enter'
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $("#calculate").click();
    }
});