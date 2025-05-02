const ejercicios = [
    {nombre: "running", display: "Correr", caloriasPorMinuto: 10},
    {nombre: "walking", display: "Caminar", caloriasPorMinuto: 5},
    {nombre: "cycling", display: "Ciclismo", caloriasPorMinuto: 8},
    {nombre: "swimming", display: "Natación", caloriasPorMinuto: 12},
    {nombre: "push ups", display: "Flexiones", caloriasPorMinuto: 8},
    {nombre: "sit ups", display: "Abdominales", caloriasPorMinuto: 6},
    {nombre: "squats", display: "Sentadillas", caloriasPorMinuto: 7},
    {nombre: "jump rope", display: "Saltar cuerda", caloriasPorMinuto: 12}
];
//Variables
let actividades = localStorage.getItem('actividades') ? JSON.parse(localStorage.getItem('actividades')) : [];

//Para iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarEjercicios();
    cargarActividades();
    configurarEventos();
});

//Cargar ejercicios en select y tabla
function cargarEjercicios() {
    const select = document.getElementById('ejercicio_actividad');
    const tabla = document.getElementById('tabla_ejercicios');
    
    select.innerHTML = '<option value="">Selecciona ejercicio</option>';
    tabla.innerHTML = '';
    
    // Llenar select y tabla
    ejercicios.forEach(ej => {
        // Option para el select
        const option = document.createElement('option');
        option.value = ej.nombre;
        option.textContent = ej.display;
        select.appendChild(option);
        
        // Nueva fila para tabla
        const tr = document.createElement('tr');
        
        const tdNombre = document.createElement('td');
        tdNombre.textContent = ej.display;
        
        const tdCalorias = document.createElement('td');
        tdCalorias.textContent = ej.caloriasPorMinuto + ' cal/min';
        
        tr.appendChild(tdNombre);
        tr.appendChild(tdCalorias);
        tabla.appendChild(tr);
    });
};
// funcion configurar eventos
function configurarEventos() {
    // Calcular calorías al cambiar de ejercicio
    document.getElementById('ejercicio_actividad').addEventListener('change', calcularCalorias);
    document.getElementById('duracion_actividad').addEventListener('input', calcularCalorias);
    
    // mandar al formulario
    document.getElementById('formulario_actividad').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const ejercicio = document.getElementById('ejercicio_actividad').value;
        const duracion = parseInt(document.getElementById('duracion_actividad').value);
        //Evitar campos vacios
        if (!ejercicio || isNaN(duracion)) {
            alert('Completa todos los campos');
            return;
        }
        
        // Buscar el ejercicio
        const ej = ejercicios.find(e => e.nombre === ejercicio);
        const calorias = Math.round(ej.caloriasPorMinuto * duracion);
        
        // Crear la actividad
        const actividad = {
            nombre: ej.display,
            duracion: duracion,
            calorias: calorias,
            fecha: new Date().toLocaleDateString()
        };
        
        //Para guardar
        actividades.push(actividad);
        localStorage.setItem('actividades', JSON.stringify(actividades));
        
        // Limpiar y actualizar (This es para resetear la funcion en la q estamos)
        this.reset();
        cargarActividades();
    });
}

// Calcular calorías mas o menos
function calcularCalorias() {
    const ejercicio = document.getElementById('ejercicio_actividad').value;
    const duracion = parseInt(document.getElementById('duracion_actividad').value) || 0;
    
    if (!ejercicio) return;
    
    const ej = ejercicios.find(e => e.nombre === ejercicio);
    const calorias = Math.round(ej.caloriasPorMinuto * duracion);
    
    document.getElementById('calorias_estimadas').value = calorias;
}

// Cargar actividades en la tabla
function cargarActividades() {
    const tabla = document.getElementById('tabla_actividades');
    tabla.innerHTML = '';
    
    actividades.forEach(act => {
        const tr = document.createElement('tr');
        
        const tdEjercicio = document.createElement('td');
        tdEjercicio.textContent = act.nombre;
        
        const tdDuracion = document.createElement('td');
        tdDuracion.textContent = act.duracion + ' min';
        
        const tdCalorias = document.createElement('td');
        tdCalorias.textContent = act.calorias;
        
        const tdFecha = document.createElement('td');
        tdFecha.textContent = act.fecha;
        
        tr.appendChild(tdEjercicio);
        tr.appendChild(tdDuracion);
        tr.appendChild(tdCalorias);
        tr.appendChild(tdFecha);
        
        tabla.appendChild(tr);
    });
}

// Reiniciar datos
function reiniciarDatos() {
    if (confirm('¿Borrar todos los datos?')) {
        localStorage.removeItem('actividades');
        actividades = [];
        cargarActividades();
    }
}