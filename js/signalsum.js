//PARA TRABAJAR CON OBJETOS: Los objetos serán señales que incluirán:
// Nivel de Potencia o Presión / Distancia del Receptor / Factor de Directividad / Retraso Inicial

//PARA TRABAJAR CON ARRAYS: Método dentro de la clase para armar un array de frecuencias que conforman la señal

let soundPower1 = parseFloat(prompt("Ingrese el nivel de potencia sonora en Watts de la primera señal:"));
while (isNaN(soundPower1)) {
    soundPower1 = parseFloat(prompt("Ingrese el nivel de potencia sonora en Watts de la primera señal (Debe ser un número!):"));
}
let distance1 = parseFloat(prompt("Ingrese la distancia en metros de la fuente de la primera señal al receptor:"));
while (isNaN(distance1)) {
    distance1 = parseFloat(prompt("Ingrese la distancia en metros de la fuente de la primera señal al receptor (Debe ser un número!):"));
}
let Qfactor1 = parseFloat(prompt("Ingrese la directividad de la fuente de la primera señal (Q=1 - Emite en todas las direcciones, Q=2 - Emite de forma semiesférica (sólo hacia el frente), Q>2 - A mayor Q, más directiva la fuente):"));
while (isNaN(Qfactor1)) {
    Qfactor1 = parseFloat(prompt("Ingrese la directividad de la fuente de la primera señal (Q=1 - Emite en todas las direcciones, Q=2 - Emite de forma semiesférica (sólo hacia el frente), Q>2 - A mayor Q, más directiva la fuente) (Debe ser un número!):"));
}
let timeDelay1 = parseFloat(prompt("Ingrese el retraso en segundos de la primera señal:"));
while (isNaN(timeDelay1)) {
    timeDelay1 = parseFloat(prompt("Ingrese el retraso en segundos de la primera señal (Debe ser un número!):"));
}

const signal1 = new signal(soundPower1, distance1, Qfactor1, timeDelay1);

let newFrequency = parseFloat(prompt("Ingrese una frecuencia para agregarla al espectro de la señal 1, cuando quiera dejar de ingresar frecuencias ingrese 0, un valor negativo o un carácter no numérico:"));

while ( isNaN(newFrequency)==false && newFrequency>0 ) {
    signal1.addFrequency(newFrequency);    
    newFrequency = parseFloat(prompt("Ingrese una frecuencia para agregarla al espectro de la señal 1, cuando quiera dejar de ingresar frecuencias ingrese 0, un valor negativo o un carácter no numérico:"));
}

let soundPower2 = parseFloat(prompt("Ingrese el nivel de potencia sonora en Watts de la segunda señal:"));
while (isNaN(soundPower2)) {
    soundPower2 = parseFloat(prompt("Ingrese el nivel de potencia sonora en Watts de la segunda señal (Debe ser un número!):"));
}
let distance2 = parseFloat(prompt("Ingrese la distancia en metros de la fuente de la segunda señal al receptor:"));
while (isNaN(distance2)) {
    distance2 = parseFloat(prompt("Ingrese la distancia en metros de la fuente de la segunda señal al receptor (Debe ser un número!):"));
}
let Qfactor2 = parseFloat(prompt("Ingrese la directividad de la fuente de la segunda señal (Q=1 - Emite en todas las direcciones, Q=2 - Emite de forma semiesférica (sólo hacia el frente), Q>2 - A mayor Q, más directiva la fuente):"));
while (isNaN(Qfactor2)) {
    Qfactor2 = parseFloat(prompt("Ingrese la directividad de la fuente de la segunda señal (Q=1 - Emite en todas las direcciones, Q=2 - Emite de forma semiesférica (sólo hacia el frente), Q>2 - A mayor Q, más directiva la fuente) (Debe ser un número!):"));
}
let timeDelay2 = parseFloat(prompt("Ingrese el retraso en segundos de la segunda señal:"));
while (isNaN(timeDelay2)) {
    timeDelay2 = parseFloat(prompt("Ingrese el retraso en segundos de la segunda señal (Debe ser un número!):"));
}

const signal2 = new signal(soundPower2, distance2, Qfactor2, timeDelay2);

newFrequency = parseFloat(prompt("Ingrese una frecuencia para agregarla al espectro de la señal 2, cuando quiera dejar de ingresar frecuencias ingrese 0, un valor negativo o un carácter no numérico:"));

while (isNaN(newFrequency)==false && newFrequency>0 ) {
    signal2.addFrequency(newFrequency);    
    newFrequency = parseFloat(prompt("Ingrese una frecuencia para agregarla al espectro de la señal 2, cuando quiera dejar de ingresar frecuencias ingrese 0, un valor negativo o un carácter no numérico:"));
} 

