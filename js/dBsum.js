let correlatedSumButton = $("#correlatedSum");
correlatedSumButton.click(correlatedSumButtonCallback);
function correlatedSumButtonCallback() { 
    let soundPressureLevel1 = parseFloat($("#soundPLevel1").val());
    let soundPressureLevel2 = parseFloat($("#soundPLevel2").val());
    let phaseDifference = parseFloat($("#phaseDifference").val());
    if (isNaN(soundPressureLevel1) || isNaN(soundPressureLevel2) || isNaN(phaseDifference)) {
        $("#errorMessage").css('display','block');
        if (isNaN(soundPressureLevel1)) {
            $("#soundPLevel1").css({'border-color':'red','border-style':'solid'});
        }
        if (isNaN(soundPressureLevel2)) {
            $("#soundPLevel2").css({'border-color':'red','border-style':'solid'});
        }
        if (isNaN(phaseDifference)) {
            $("#phaseDifference").css({'border-color':'red','border-style':'solid'});
        }
    }
    else{
    $("#soundPLevel1").css({'border-color':'','border-style':''});
    $("#soundPLevel2").css({'border-color':'','border-style':''});
    $("#phaseDifference").css({'border-color':'','border-style':''});
    $("#errorMessage").css('display','none');
    $('#sumResult').val(correlatedsum(soundPressureLevel1,soundPressureLevel2,phaseDifference));
    }
}

let nonCorrelatedSumButton = $("#nonCorrelatedSum");
nonCorrelatedSumButton.click(nonCorrelatedSumButtonCallback);
function nonCorrelatedSumButtonCallback() { 
    let soundPressureLevel1 = parseFloat($("#soundPLevel1").val())
    let soundPressureLevel2 = parseFloat($("#soundPLevel2").val())
    if (isNaN(soundPressureLevel1) || isNaN(soundPressureLevel2)) {
        $("#errorMessage").css('display','block');
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
    $("#errorMessage").css('display','none');
    $('#sumResult').val(noncorrelatedsum(soundPressureLevel1,soundPressureLevel2));
    }
}