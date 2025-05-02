let codigos = localStorage.getItem('ejerciciosCod')
    ? JSON.parse(localStorage.getItem('ejerciciosCod'))
    : [];
let nombres = localStorage.getItem('ejerciciosNom')
    ? JSON.parse(localStorage.getItem('ejerciciosNom'))
    : [];
let calorias = localStorage.getItem('ejerciciosCal')
    ? JSON.parse(localStorage.getItem('ejerciciosCal'))
    : [];

let actEjercicio = localStorage.getItem('actividadEj')
    ? JSON.parse(localStorage.getItem('actividadEj'))
    : [];
let actReps = localStorage.getItem('actividadReps')
    ? JSON.parse(localStorage.getItem('actividadReps'))
    : [];
let actDuracion = localStorage.getItem('actividadDur')
    ? JSON.parse(localStorage.getItem('actividadDur'))
    : [];
let actCalorias = localStorage.getItem('actividadCal')
    ? JSON.parse(localStorage.getItem('actividadCal'))
    : [];

imprimirTablaEjercicios();
imprimirTablaActividades();

const formEj = document.getElementById('formulario_ejercicio');
formEj.addEventListener('submit', (e) => {
    e.preventDefault();

const nombre = document.getElementById('nombre_ejercicio').value.trim();
const cal = parseInt(document.getElementById('calorias_ejercicio').value);

//generar código uno por uno
const codigoNuevo = codigos.length + 1;

codigos.push(codigoNuevo);
nombres.push(nombre);
calorias.push(cal);

localStorage.setItem('ejerciciosCod', JSON.stringify(codigos));
localStorage.setItem('ejerciciosNom', JSON.stringify(nombres));
localStorage.setItem('ejerciciosCal', JSON.stringify(calorias));

formEj.reset();
imprimirTablaEjercicios();
});

const formAct = document.getElementById('formulario_actividad');
formAct.addEventListener('submit', (e) => {
e.preventDefault();
const nomEj = document.getElementById('ejercicio_actividad').value.trim();
const reps = parseInt(document.getElementById('cantidad_actividad').value);
const dur = parseInt(document.getElementById('duracion_actividad').value);

let idx = -1;
nombres.forEach((n, i) => {
    if (n === nomEj) idx = i;
});

if (idx === -1) {
    alert('Ejercicio no encontrado, verifica el nombre.');
    return;
}

const totalCal = Math.round(calorias[idx] *reps);

//pa almacenar actividad
actEjercicio.push(nomEj);
actReps.push(reps);
actDuracion.push(dur);
actCalorias.push(totalCal);

// pa guardar en el localStorage
localStorage.setItem('actividadEj', JSON.stringify(actEjercicio));
localStorage.setItem('actividadReps', JSON.stringify(actReps));
localStorage.setItem('actividadDur', JSON.stringify(actDuracion));
localStorage.setItem('actividadCal', JSON.stringify(actCalorias));

//limpiar y refrescar tabla
formAct.reset();
imprimirTablaActividades();
});

//Pa imprimir
function imprimirTablaEjercicios() {
    const tabla = document.getElementById('tabla_ejercicios');
    tabla.innerHTML = '';
    codigos.forEach((c, i) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');

    td1.textContent = c;
    td2.textContent = nombres[i];
    td3.textContent = calorias[i];

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tabla.appendChild(tr);
});
}

function imprimirTablaActividades() {
    const tabla = document.getElementById('tabla_actividades');
    tabla.innerHTML = '';
    actEjercicio.forEach((ej, i) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const td4 = document.createElement('td');

    td1.textContent = ej;
    td2.textContent = actReps[i];
    td3.textContent = actDuracion[i];
    td4.textContent = actCalorias[i];

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tabla.appendChild(tr);
});

//Pa reiniciar la pagina
}
function reiniciarDatos() {
    localStorage.clear();
    alert('Datos reiniciados');
    location.reload();
}
