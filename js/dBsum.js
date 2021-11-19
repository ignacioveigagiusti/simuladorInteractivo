let correlatedSumButton = document.getElementById("correlatedSum");
correlatedSumButton.addEventListener('click',correlatedSumButtonCallback);
function correlatedSumButtonCallback() { 
    let soundPressureLevel1 = parseFloat(document.getElementById("soundPLevel1").value)
    let soundPressureLevel2 = parseFloat(document.getElementById("soundPLevel2").value)
    let phaseDifference = parseFloat(document.getElementById("phaseDifference").value)
    if (isNaN(soundPressureLevel1) || isNaN(soundPressureLevel2) || isNaN(phaseDifference)) {
        document.getElementById("errorMessage").style.display = "block";
    }
    else{
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById('sumResult').value = correlatedsum(soundPressureLevel1,soundPressureLevel2,phaseDifference);
    }
}

let nonCorrelatedSumButton = document.getElementById("nonCorrelatedSum");
nonCorrelatedSumButton.addEventListener('click',nonCorrelatedSumButtonCallback);
function nonCorrelatedSumButtonCallback() { 
    let soundPressureLevel1 = parseFloat(document.getElementById("soundPLevel1").value)
    let soundPressureLevel2 = parseFloat(document.getElementById("soundPLevel2").value)
    if (isNaN(soundPressureLevel1) || isNaN(soundPressureLevel2)) {
        document.getElementById("errorMessage").style.display = "block";
    }
    else{
    document.getElementById("errorMessage").style.display = "none";
    document.getElementById('sumResult').value = noncorrelatedsum(soundPressureLevel1,soundPressureLevel2);
    }
}