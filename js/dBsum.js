let soundPressureLevel1 = parseFloat(prompt("Ingrese el nivel de presión sonora en decibeles de la primera señal:"));
while (isNaN(soundPressureLevel1)) {
    soundPressureLevel1 = parseFloat(prompt("Ingrese el nivel de presión sonora en decibeles de la primera señal (Debe ser un número!):"));
}
let soundPressureLevel2 = parseFloat(prompt("Ingrese el nivel de presión sonora en decibeles de la segunda señal:"));
while (isNaN(soundPressureLevel2)) {
    soundPressureLevel2 = parseFloat(prompt("Ingrese el nivel de presión sonora en decibeles de la segunda señal (Debe ser un número!):"));
}
let phaseDifference = parseFloat(prompt("Ingrese la diferencia de fase (sólo necesaria si desea realizar una suma correlacionada):"));
while (isNaN(phaseDifference)) {
    phaseDifference = parseFloat(prompt("Ingrese la diferencia de fase (sólo necesaria si desea realizar una suma correlacionada) (Debe ser un número!):"));
}
