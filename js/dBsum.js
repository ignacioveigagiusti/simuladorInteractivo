let correlatedSumButton = $("#correlatedSum");
correlatedSumButton.click(correlatedSumButtonCallback);
function correlatedSumButtonCallback() { 
    let soundPressureLevel1 = parseFloat($("#soundPLevel1").val());
    let soundPressureLevel2 = parseFloat($("#soundPLevel2").val());
    let phaseDifference = (parseFloat($("#phaseDifference").val())*(Math.PI/180));
    if (isNaN(soundPressureLevel1) || isNaN(soundPressureLevel2) || isNaN(phaseDifference)) {
        $("#errorMessage").slideDown('slow');
    }
    else{
    $("#errorMessage").slideUp('slow');
    $('#sumResult').val(correlatedsum(soundPressureLevel1,soundPressureLevel2,phaseDifference));
    }
    if (isNaN(soundPressureLevel1)) {
        $("#soundPLevel1").css({'border-color':'red','border-style':'solid'}).hide().fadeIn();
    }
    else{
        $("#soundPLevel1").css({'border-color':'','border-style':''});
    }
    if (isNaN(soundPressureLevel2)) {
        $("#soundPLevel2").css({'border-color':'red','border-style':'solid'}).hide().fadeIn();
    }
    else{
        $("#soundPLevel2").css({'border-color':'','border-style':''});
    }
    if (isNaN(phaseDifference)) {
        $("#phaseDifference").css({'border-color':'red','border-style':'solid'}).hide().fadeIn();
    }
    else{
        $("#phaseDifference").css({'border-color':'','border-style':''});
    }
}

let nonCorrelatedSumButton = $("#nonCorrelatedSum");
nonCorrelatedSumButton.click(nonCorrelatedSumButtonCallback);
function nonCorrelatedSumButtonCallback() { 
    let soundPressureLevel1 = parseFloat($("#soundPLevel1").val())
    let soundPressureLevel2 = parseFloat($("#soundPLevel2").val())
    if (isNaN(soundPressureLevel1) || isNaN(soundPressureLevel2)) {
        $("#errorMessage").slideDown('slow');
        if (isNaN(soundPressureLevel1)) {
            $("#soundPLevel1").css({'border-color':'red','border-style':'solid'});
        }
        if (isNaN(soundPressureLevel2)) {
            $("#soundPLevel2").css({'border-color':'red','border-style':'solid'});
        }
    }
    else{
    $("#soundPLevel1").css({'border-color':'','border-style':''});
    $("#soundPLevel2").css({'border-color':'','border-style':''});
    $("#phaseDifference").css({'border-color':'','border-style':''});
    $("#errorMessage").slideUp('slow');
    $('#sumResult').val(noncorrelatedsum(soundPressureLevel1,soundPressureLevel2));
    }
}

//Chequeo dinámico de correcciones de datos:

$("#soundPLevel1").change(function(){
    if (parseFloat($('#soundPLevel1').val())>=0) {
        $("#soundPLevel1").css({'border-color':'','border-style':''}).hide().fadeIn('fast');
    }
});
$("#soundPLevel2").change(function(){
    if (parseFloat($('#soundPLevel2').val())>=0) {
        $("#soundPLevel2").css({'border-color':'','border-style':''}).hide().fadeIn('fast');
    }
});
$("#phaseDifference").change(function(){
    if (parseFloat($('#phaseDifference').val())>(-360) || parseFloat($('#phaseDifference').val())<(360)) {
        $("#phaseDifference").css({'border-color':'','border-style':''}).hide().fadeIn('fast');
    }
});