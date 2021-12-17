//Se traen las señales guardadas en sesiones previas
if (localStorage.getItem("Signal1") === null && localStorage.getItem("Signal1") === null) {
    localStorage.setItem('Signal1', '{"soundPower":10,"distance":1,"Qfactor":1,"timeDelay":0,"frequencies":[40,80,160,320]}');
    localStorage.setItem('Signal2', '{"soundPower":20,"distance":2,"Qfactor":2,"timeDelay":1,"frequencies":[40,80,160,320]}');
}else{
    let Signal1 = JSON.parse(localStorage.getItem('Signal1'));
    let Signal2 = JSON.parse(localStorage.getItem('Signal2'));
}    

    
//Parámetros para el gráfico
let samplerate=1024;
let timeStart=0;
let timeStop=1;
let timeVector=[];
let signalSamples=[];
for (let i = 0; i < samplerate; i++) {
    timeVector.push((timeStop-timeStart)*(i/(samplerate-1)));
}

//Función Callback para traer señales anteriores

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
    else{
        $("#frequency1signal1").val('');
    }
    if (Signal1.frequencies[1] >= 0 && Signal1.frequencies[1] !== null){
        $("#frequency2signal1").val(Signal1.frequencies[1]);
    }
    else{
        $("#frequency2signal1").val('');
    }
    if (Signal1.frequencies[2] >= 0 && Signal1.frequencies[2] !== null){
        $("#frequency3signal1").val(Signal1.frequencies[2]); 
    }
    else{
        $("#frequency3signal1").val('');
    }
    if (Signal1.frequencies[3] >= 0 && Signal1.frequencies[3] !== null){
        $("#frequency4signal1").val(Signal1.frequencies[3]);      
    }
    else{
        $("#frequency4signal1").val('');
    }
    $("#soundPower2").val(Signal2.soundPower);
    $("#distance2").val(Signal2.distance);
    $("#Qfactor2").val(Signal2.Qfactor);
    $("#timeDelay2").val(Signal2.timeDelay);
    if (Signal2.frequencies[0] >= 0 && Signal1.frequencies[0] !== null){
        $("#frequency1signal2").val(Signal2.frequencies[0]);
    }
    else{
        $("#frequency1signal2").val('');
    }
    if (Signal2.frequencies[1] >= 0 && Signal1.frequencies[1] !== null){
        $("#frequency2signal2").val(Signal2.frequencies[1]);
    }
    else{
        $("#frequency2signal2").val('');
    }
    if (Signal2.frequencies[2] >= 0 && Signal1.frequencies[2] !== null){
        $("#frequency3signal2").val(Signal2.frequencies[2]);
    }
    else{
        $("#frequency3signal2").val('');
    }
    if (Signal2.frequencies[3] >= 0 && Signal1.frequencies[3] !== null){
        $("#frequency4signal2").val(Signal2.frequencies[3]);
    }
    else{
        $("#frequency4signal2").val('');
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
        $("#signalSumTag").html('Alguno de los valores ingresados no es correcto!').hide().fadeIn('slow');
        $("#signalSumTag").css('color','crimson');
        $("#signalSumResult").css('display','none');
        if (isNaN(soundPower1) || soundPower1<0){
            $("#soundPower1").addClass('appTable_Input--error').hide().fadeIn('slow');
        }
        if (isNaN(distance1) || distance1<=0){
            $("#distance1").addClass('appTable_Input--error').hide().fadeIn('slow');
        }
        if (isNaN(Qfactor1) || Qfactor1<=0){
            $("#Qfactor1").addClass('appTable_Input--error').hide().fadeIn('slow');
        }
        if (isNaN(timeDelay1)){
            $("#timeDelay1").addClass('appTable_Input--error').hide().fadeIn('slow');
        }
        if (isNaN(soundPower2) || soundPower2<0){
            $("#soundPower2").addClass('appTable_Input--error').hide().fadeIn('slow');
        }
        if (isNaN(distance2) || distance2<=0){
            $("#distance2").addClass('appTable_Input--error').hide().fadeIn('slow');
        }
        if (isNaN(Qfactor2) || Qfactor2<=0){
            $("#Qfactor2").addClass('appTable_Input--error').hide().fadeIn('slow');
        }
        if (isNaN(timeDelay2)){
            $("#timeDelay2").addClass('appTable_Input--error').hide().fadeIn('slow');
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
        $('#signalSumResult').hide().html(signalsum(Signal1,Signal2)).fadeIn('slow');
        $('#soundPowerLevel1').hide().val(parseInt(Signal1.soundPowerLevel())).fadeIn('slow');
        $('#soundPressureLevel1').hide().val(parseInt(Signal1.soundPressureLevel())).fadeIn('slow');
        $('#soundPressure1').hide().val(parseFloat(Signal1.soundPressure()).toFixed(2)).fadeIn('slow');
        $('#soundPowerLevel2').hide().val(parseInt(Signal2.soundPowerLevel())).fadeIn('slow');
        $('#soundPressureLevel2').hide().val(parseInt(Signal2.soundPressureLevel())).fadeIn('slow');
        $('#soundPressure2').hide().val(parseFloat(Signal2.soundPressure()).toFixed(2)).fadeIn('slow');

        //Valores de y para el gráfico
        signalSamples = [];
        for (let i = 0; i < samplerate; i++) {
            let lowestFrequency1 = parseFloat(Signal1.frequencies.sort(compareNumbers)[0])
            let phase1 = 2*Math.PI*lowestFrequency1*Signal1.timeDelay + ((Signal1.distance) % (soundSpeed/lowestFrequency1));
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
        
            let y1 = (y1f1 + y1f2 + y1f3 + y1f4);
            
            if (y1==0) {
                y1 = Math.sin(2 * Math.PI * 3 * timeVector[i]);
            }

            let lowestFrequency2 = parseFloat(Signal2.frequencies.sort(compareNumbers)[0])
            let phase2 = 2*Math.PI*lowestFrequency2*Signal2.timeDelay + ((Signal2.distance) % (soundSpeed/lowestFrequency2));
            
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
        
            let y2 = (y2f1 + y2f2 + y2f3 + y2f4);
         
            if (y2==0) {
                y2 = Math.sin(2 * Math.PI * 7 * timeVector[i]);
            }

            let y = y1 + y2;
            signalSamples.push(y);
        }
        
        //Normalización y Ajuste de Amplitud

        let rmsPressure = CalculateRMS(signalSamples);
        let signalPeff = ( (10**((parseFloat(signalsum(Signal1,Signal2)))/20))*referencePressure );
        let pressureNormalizer = ( 1/(Math.sqrt(2)*rmsPressure) ) * signalPeff;

        for (let i = 0; i < signalSamples.length; i++) {
            signalSamples[i] = pressureNormalizer*signalSamples[i];
        }

        rmsPressure = CalculateRMS(signalSamples);

        //Grafico
        var layout = { 
            title: 'Suma de Señales',
            font: {size: 10},
            autosize: true,
        };
        var config = {responsive: true}
        SIGNAL = document.getElementById('signalPlot');
        Plotly.newPlot( SIGNAL, [{
        x: timeVector,
        y: signalSamples }],
        layout, config);

        if ($(window).width()<400) {
            var update = {
                width: $('.indexsection').width(),
                height: 300
            };  
        }
        else if ($(window).width()<655) {
            var update = {
                width: $('.indexsection').width(),
                height: 375
            };  
        }
        else if ($(window).width()<755) {
            var update = {
                width: $('.indexsection').width(),
                height: $('.indexsection').width()*0.65
            };  
        }
        else{
            var update = {
                width: 700,
                height: 450
            };
        }    
        Plotly.relayout(SIGNAL, update);

        $('#signalPlot').slideDown("slow");
    }
}

//Variables de usuario predeterminadas (para el botón userVariables):

let userSoundSpeed = 343;
let userReferencePressure = 0.00002;
let userReferencePower = 10**(-12);

//Selector de Medios (Aquí se encuentran las llamadas AJAX):

$(document).ready(function(){
    $("#air").click(function(){
        $.ajax({url: "./data/variables.json", success: function(result){
            soundSpeed = parseInt(result[0].soundSpeed);
            referencePressure = parseFloat(result[0].referencePressure);
            referencePower = parseFloat(result[0].referencePower);
            calculateCallback();
        }});
        $('#air').addClass('active');
        $('#water').removeClass('active');
        $('#buenosAires').removeClass('active');
        $('#userVariables').removeClass('active');
    });
    $("#water").click(function(){
        $.ajax({url: "./data/variables.json", success: function(result){
            soundSpeed = parseInt(result[1].soundSpeed);
            referencePressure = parseFloat(result[1].referencePressure);
            referencePower = ((result[1].referencePressure)**2)/(result[1].density*result[1].soundSpeed);
            calculateCallback();
        }});
        $('#air').removeClass('active');
        $('#water').addClass('active');
        $('#buenosAires').removeClass('active');
        $('#userVariables').removeClass('active');
    });
    $("#buenosAires").click(function(){
        referencePressure = 0.00002;
        referencePower = 10**(-12);
        $.ajax({url: "http://api.openweathermap.org/data/2.5/weather?id=3433955&appid=d3d34bb65620f96bf05067412ce15b4a", success: function(result){
            soundSpeed = 20.05*Math.sqrt(parseFloat(result.main.temp));
            calculateCallback();
        }});
        $('#air').removeClass('active');
        $('#water').removeClass('active');
        $('#buenosAires').addClass('active');
        $('#userVariables').removeClass('active');
    });
    $("#userVariables").click(function(){
        referencePressure = userReferencePressure;
        referencePower = userReferencePower;
        soundSpeed = userSoundSpeed;
        calculateCallback();
        $('#air').removeClass('active');
        $('#water').removeClass('active');
        $('#buenosAires').removeClass('active');
        $('#userVariables').addClass('active');
    });
    $("#submitVars").click(function(){
        if (isNaN(parseFloat($('#userSoundSpeed').val())) || isNaN(parseFloat($('#userReferencePressure').val())) || isNaN(parseFloat($('#userReferencePower').val())) || parseFloat($('#userSoundSpeed').val())<=0 || parseFloat($('#userReferencePressure').val())<=0 || parseFloat($('#userReferencePower').val())<=0) {
            if (isNaN(parseFloat($('#userSoundSpeed').val())) || parseFloat($('#userSoundSpeed').val())<=0) {
                $("#userSoundSpeed").addClass('appTable_Input--error').hide().fadeIn('slow');
            }
            if (isNaN(parseFloat($('#userReferencePressure').val())) || parseFloat($('#userReferencePressure').val())<=0) {
                $("#userReferencePressure").addClass('appTable_Input--error').hide().fadeIn('slow');
            }
            if (isNaN(parseFloat($('#userReferencePower').val())) || parseFloat($('#userReferencePower').val())<=0) {
                $("#userReferencePower").addClass('appTable_Input--error').hide().fadeIn('slow');
            }
        }
        else{
            $("#userSoundSpeed").removeClass('appTable_Input--error').hide().fadeIn('slow');
            $("#userReferencePressure").removeClass('appTable_Input--error').hide().fadeIn('slow');
            $("#userReferencePower").removeClass('appTable_Input--error').hide().fadeIn('slow');
            userReferencePressure = parseFloat($('#userReferencePressure').val())*(10**(-6));
            userReferencePower = parseFloat($('#userReferencePower').val())*(10**(-12));
            userSoundSpeed = parseFloat($('#userSoundSpeed').val());
        }
    });

    // Ejecutar cálculos con 'Enter'
    document.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            $("#calculate").click();
        }
    })  

    //Redimensionamiento automático de gráfico

    window.onresize = function() {
        if ($(window).width()<400) {
            var update = {
                width: $('.indexsection').width(),
                height: 300
            };  
        }
        else if ($(window).width()<655) {
            var update = {
                width: $('.indexsection').width(),
                height: 375
            };  
        }
        else if ($(window).width()<755) {
            var update = {
                width: $('.indexsection').width(),
                height: $('.indexsection').width()*0.65
            };  
        }
        else{
            var update = {
                width: 700,
                height: 450
            };
        }    
        Plotly.relayout(SIGNAL, update);
    };

    //Chequeo dinámico de correcciones de datos:

    $("#soundPower1").change(function(){
        if (parseFloat($('#soundPower1').val())>=0) {
            $("#soundPower1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#distance1").change(function(){
        if (parseFloat($('#distance1').val())>0) {
            $("#distance1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#Qfactor1").change(function(){
        if (parseFloat($('#Qfactor1').val())>0) {
            $("#Qfactor1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#timeDelay1").change(function(){
        if (parseFloat($('#timeDelay1').val())>=0) {
            $("#timeDelay1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#frequency1signal1").change(function(){
        if (parseFloat($('#frequency1signal1').val())>0) {
            $("#frequency1signal1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency1signal1').val()<=0){
            $('#frequency1signal1').val('')
        }    
    });
    $("#frequency2signal1").change(function(){
        if (parseFloat($('#frequency2signal1').val())>0) {
            $("#frequency2signal1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency2signal1').val()<=0){
            $('#frequency2signal1').val('')
        }    
    });
    $("#frequency3signal1").change(function(){
        if (parseFloat($('#frequency3signal1').val())>0) {
            $("#frequency3signal1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency3signal1').val()<=0){
            $('#frequency3signal1').val('')
        }    
    });
    $("#frequency4signal1").change(function(){
        if (parseFloat($('#frequency4signal1').val())>0) {
            $("#frequency4signal1").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency4signal1').val()<=0){
            $('#frequency4signal1').val('')
        }    
    });
    $("#soundPower2").change(function(){
        if (parseFloat($('#soundPower2').val())>=0) {
            $("#soundPower2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#distance2").change(function(){
        if (parseFloat($('#distance2').val())>0) {
            $("#distance2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#Qfactor2").change(function(){
        if (parseFloat($('#Qfactor2').val())>0) {
            $("#Qfactor2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#timeDelay2").change(function(){
        if (parseFloat($('#timeDelay2').val())>=0) {
            $("#timeDelay2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#frequency1signal2").change(function(){
        if (parseFloat($('#frequency1signal2').val())>0) {
            $("#frequency1signal2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency1signal2').val()<=0){
            $('#frequency1signal2').val('')
        }    
    });
    $("#frequency2signal2").change(function(){
        if (parseFloat($('#frequency2signal2').val())>0) {
            $("#frequency2signal2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency2signal2').val()<=0){
            $('#frequency2signal2').val('')
        }    
    });
    $("#frequency3signal2").change(function(){
        if (parseFloat($('#frequency3signal2').val())>0) {
            $("#frequency3signal2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency3signal2').val()<=0){
            $('#frequency3signal2').val('')
        }    
    });
    $("#frequency4signal2").change(function(){
        if (parseFloat($('#frequency4signal2').val())>0) {
            $("#frequency4signal2").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
        if ($('#frequency4signal2').val()<=0){
            $('#frequency4signal2').val('')
        }    
    });
    $("#userSoundSpeed").change(function(){
        if (parseFloat($('#userSoundSpeed').val())>0) {
            $("#userSoundSpeed").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#userReferencePressure").change(function(){
        if (parseFloat($('#userReferencePressure').val())>0) {
            $("#userReferencePressure").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
    $("#userReferencePower").change(function(){
        if (parseFloat($('#userReferencePower').val())>0) {
            $("#userReferencePower").removeClass('appTable_Input--error').hide().fadeIn('fast');
        }
    });
});