//Se traen las señales guardadas en sesiones previas
if (localStorage.getItem("Signal1") === null && localStorage.getItem("Signal1") === null) {
    localStorage.setItem('Signal1', '{"soundPower":10,"distance":1,"Qfactor":1,"timeDelay":0,"frequencies":[40,80,160,320]}');
    localStorage.setItem('Signal2', '{"soundPower":20,"distance":2,"Qfactor":2,"timeDelay":1,"frequencies":[40,80,160,320]}');
}else{
    let Signal1 = JSON.parse(localStorage.getItem('Signal1'));
    let Signal2 = JSON.parse(localStorage.getItem('Signal2'));
}    

$('.appTable_Input--f').change(function(){
    if ($('.appTable_Input--f').val()<=0){
        $('.appTable_Input--f').val('')
    }    
})

//Parámetros para el gráfico
let samplerate=1024;
let timeStart=0;
let timeStop=2;
let timeStep=(1/samplerate);
let timeVector=[];
let signalSamples=[];
for (let i = 0; i < samplerate; i++) {
    timeVector.push((timeStop-timeStart)*(i/(samplerate-1)));
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
    if (isNaN(soundPower1) || isNaN(distance1) || isNaN(Qfactor1) || isNaN(timeDelay1) || isNaN(soundPower2) || isNaN(distance2) || isNaN(Qfactor2) || isNaN(timeDelay2) || soundPower1<0 || distance1<=0 || Qfactor1<=0 || soundPower2<0 || distance2<=0 || Qfactor2<=0) {
        $("#signalSumTag").html('Alguno de los valores ingresados no es correcto!');
        $("#signalSumTag").css('color','crimson');
        $("#signalSumResult").css('display','none');
        if (isNaN(soundPower1) || soundPower1<0){
            $("#soundPower1").addClass('appTable_Input--error');
        }
        if (isNaN(distance1) || distance1<=0){
            $("#distance1").addClass('appTable_Input--error');
        }
        if (isNaN(Qfactor1) || Qfactor1<=0){
            $("#Qfactor1").addClass('appTable_Input--error');
        }
        if (isNaN(timeDelay1)){
            $("#timeDelay1").addClass('appTable_Input--error');
        }
        if (isNaN(soundPower2) || soundPower2<0){
            $("#soundPower2").addClass('appTable_Input--error');
        }
        if (isNaN(distance2) || distance2<=0){
            $("#distance2").addClass('appTable_Input--error');
        }
        if (isNaN(Qfactor2) || Qfactor2<=0){
            $("#Qfactor2").addClass('appTable_Input--error');
        }
        if (isNaN(timeDelay2)){
            $("#timeDelay2").addClass('appTable_Input--error');
        }
    }
    else{
        $("#soundPower1").removeClass('appTable_Input--error');
        $("#distance1").removeClass('appTable_Input--error');
        $("#Qfactor1").removeClass('appTable_Input--error');
        $("#timeDelay1").removeClass('appTable_Input--error');
        $("#soundPower2").removeClass('appTable_Input--error');
        $("#distance2").removeClass('appTable_Input--error');
        $("#Qfactor2").removeClass('appTable_Input--error');
        $("#timeDelay2").removeClass('appTable_Input--error');
        $("#signalSumTag").html('Suma de Niveles de Presión: ');
        $("#signalSumTag").css('color','black');
        $("#signalSumResult").css('display','table-cell');
        //Construyo las señales
        const Signal1 = new Signal(soundPower1, distance1, Qfactor1, timeDelay1);
        const Signal2 = new Signal(soundPower2, distance2, Qfactor2, timeDelay2);
        
        Signal1.addFrequency(parseFloat($('#frequency1signal1').val()));
        Signal1.addFrequency(parseFloat($('#frequency2signal1').val()));
        Signal1.addFrequency(parseFloat($('#frequency3signal1').val()));
        Signal1.addFrequency(parseFloat($('#frequency4signal1').val()));
        Signal2.addFrequency(parseFloat($('#frequency1signal2').val()));
        Signal2.addFrequency(parseFloat($('#frequency2signal2').val()));
        Signal2.addFrequency(parseFloat($('#frequency3signal2').val()));
        Signal2.addFrequency(parseFloat($('#frequency4signal2').val()));
        
        //Almaceno
        localStorage.setItem('Signal1', JSON.stringify(Signal1));
        localStorage.setItem('Signal2', JSON.stringify(Signal2));    
        
        
        //Calculo
        $('#signalSumResult').hide();
        $('#signalSumResult').html(signalsum(Signal1,Signal2));
        $('#signalSumResult').fadeIn('slow');
        $('#soundPowerLevel1').hide();
        $('#soundPowerLevel1').val(parseInt(Signal1.soundPowerLevel()));
        $('#soundPowerLevel1').fadeIn('slow');
        $('#soundPressureLevel1').hide();
        $('#soundPressureLevel1').val(parseInt(Signal1.soundPressureLevel()));
        $('#soundPressureLevel1').fadeIn('slow');
        $('#soundPressure1').hide();
        $('#soundPressure1').val(parseInt(Signal1.soundPressure()));
        $('#soundPressure1').fadeIn('slow');
        $('#soundPowerLevel2').hide();
        $('#soundPowerLevel2').val(parseInt(Signal2.soundPowerLevel()));
        $('#soundPowerLevel2').fadeIn('slow');
        $('#soundPressureLevel2').hide();
        $('#soundPressureLevel2').val(parseInt(Signal2.soundPressureLevel()));
        $('#soundPressureLevel2').fadeIn('slow');
        $('#soundPressure2').hide();
        $('#soundPressure2').val(parseInt(Signal2.soundPressure()));
        $('#soundPressure2').fadeIn('slow');

        //Valores de y para el gráfico
        for (let i = 0; i < samplerate; i++) {
            let lowestFrequency1 = parseFloat(Signal1.frequencies.sort(compareNumbers)[0])
            let phase1 = 2*Math.PI*lowestFrequency1*Signal1.timeDelay + ((Signal1.distance) % (343/lowestFrequency1));
            var y1f1;
            var y1f2;
            var y1f3;
            var y1f4;
            var y2f1;
            var y2f2;
            var y2f3;
            var y2f4;
            if (isNaN(Signal1.frequencies[0])) {
                y1f1 = 0;
            } else {
            y1f1 = Math.sin(2 * Math.PI * Signal1.frequencies[0] * timeVector[i] + phase1);        
            }
        
            if (isNaN(Signal1.frequencies[1])) {
                y1f2 = 0;
            } else {
            y1f2 = Math.sin(2 * Math.PI * Signal1.frequencies[1] * timeVector[i] + phase1);
            }
        
            if (isNaN(Signal1.frequencies[2])) {
                y1f3 = 0;
            } else {
            y1f3 = Math.sin(2 * Math.PI * Signal1.frequencies[2] * timeVector[i] + phase1);    
            }
        
            if (isNaN(Signal1.frequencies[3])) {
                y1f4 = 0;
            } else {
            y1f4 = Math.sin(2 * Math.PI * Signal1.frequencies[3] * timeVector[i] + phase1);
            }
        
            let y1 = Signal1.soundPressureLevel()*(y1f1 + y1f2 + y1f3 + y1f4);
        
            let lowestFrequency2 = parseFloat(Signal2.frequencies.sort(compareNumbers)[0])
            let phase2 = 2*Math.PI*lowestFrequency2*Signal2.timeDelay + ((Signal2.distance) % (343/lowestFrequency2));
            
            if (isNaN(Signal2.frequencies[0])) {
                y2f1 = 0;
            } else {
            y2f1 = Math.sin(2 * Math.PI * Signal2.frequencies[0] * timeVector[i] + phase2); 
            }    
            
            if (isNaN(Signal2.frequencies[1])) {
                y2f2 = 0;
            } else {
            y2f2 = Math.sin(2 * Math.PI * Signal2.frequencies[1] * timeVector[i] + phase2);   
            }    
        
            if (isNaN(Signal2.frequencies[2])) {
                y2f3 = 0;
            } else {
            y2f3 = Math.sin(2 * Math.PI * Signal2.frequencies[2] * timeVector[i] + phase2);
            }    
        
            if (isNaN(Signal2.frequencies[3])) {
                y2f4 = 0;
            } else {
            y2f4 = Math.sin(2 * Math.PI * Signal2.frequencies[3] * timeVector[i] + phase2);
            }    
        
            let y2 = Signal2.soundPressureLevel()*(y2f1 + y2f2 + y2f3 + y2f4);
         
            let y = y1 + y2;
            
            signalSamples.push(y);
        }
        
        //Grafico
        SIGNAL = document.getElementById('signalPlot');
        Plotly.react( SIGNAL, [{
        x: timeVector,
        y: signalSamples }]);

        $('#signalPlot').slideDown("slow")
    }
}

// Ejecutar con 'Enter'
document.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        $("#calculate").click();
    }
})