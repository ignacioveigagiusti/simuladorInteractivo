let soundPressureLevel1 = parseFloat(document.getElementById("soundPLevel1").value);
let soundPressureLevel2 = parseFloat(document.getElementById("soundPLevel2").value);
let phaseDifference = parseFloat(document.getElementById("phaseDifference").value);

if (isNaN(soundPressureLevel1) && soundPressureLevel1 != null) {
    document.getElementById("soundPLevel1").value = 0;
}

if (isNaN(soundPressureLevel2) && soundPressureLevel2 != null) {
    document.getElementById("soundPLevel2").value = 0;
}

if (isNaN(phaseDifference) && phaseDifference != null) {
    document.getElementById("phaseDifference").value = 0;
}