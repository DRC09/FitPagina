document.addEventListener('DOMContentLoaded', function() {
    const actividades = JSON.parse(localStorage.getItem('actividades')) || [];
    const contenedor = document.getElementById('resumen-actividades');
    
    // Limpiar contenedor
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild);
    }
    
    if (actividades.length === 0) {
        const div = document.createElement('div');
        div.className = 'alert alert-info';
        div.textContent = 'No hay actividades registradas';
        contenedor.appendChild(div);
        return;
    }
    
    // Calcular totales
    let totalCalorias = 0;
    let totalMinutos = 0;
    
    actividades.forEach(act => {
        totalCalorias += act.calorias;
        totalMinutos += act.duracion;
    });
    
    // Crear card de resumen
    const card = document.createElement('div');
    card.className = 'card mb-4';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const cardTitle = document.createElement('h3');
    cardTitle.className = 'card-title';
    cardTitle.textContent = 'Resumen de Actividades';
    cardBody.appendChild(cardTitle);
    
    // Total de calorías
    const pCalorias = document.createElement('p');
    const strongCalorias = document.createElement('strong');
    strongCalorias.textContent = 'Calorías totales quemadas: ';
    pCalorias.appendChild(strongCalorias);
    pCalorias.appendChild(document.createTextNode(totalCalorias));
    cardBody.appendChild(pCalorias);
    
    // Total de minutos
    const pMinutos = document.createElement('p');
    const strongMinutos = document.createElement('strong');
    strongMinutos.textContent = 'Tiempo total ejercitado: ';
    pMinutos.appendChild(strongMinutos);
    pMinutos.appendChild(document.createTextNode(totalMinutos + ' minutos'));
    cardBody.appendChild(pMinutos);
    
    // El textico
    const divMensaje = document.createElement('div');
    divMensaje.className = totalCalorias < 500 ? 'alert alert-warning mt-3' : 'alert alert-success mt-3';
    divMensaje.textContent = totalCalorias < 500 
        ? 'Puede hacerlo mejor, con toda mi parcero.'
        : 'Excelente trabajo, siga así nunca cambie';
    
    cardBody.appendChild(divMensaje);
    card.appendChild(cardBody);
    contenedor.appendChild(card);
    
    // Título para últimas actividades
    const titulo = document.createElement('h4');
    titulo.className = 'mb-3 mt-4';
    titulo.textContent = 'Últimas actividades';
    contenedor.appendChild(titulo);
    
    // Tabla de últimas actividades
    const tabla = document.createElement('table');
    tabla.className = 'table table-hover';
    
    // Crear thead
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    
    const ths = ['Ejercicio', 'Duración', 'Calorías'];
    ths.forEach(texto => {
        const th = document.createElement('th');
        th.textContent = texto;
        trHead.appendChild(th);
    });
    
    thead.appendChild(trHead);
    tabla.appendChild(thead);
    
    // Crear tbody
    const tbody = document.createElement('tbody');
    
    // Obtener últimas 3 actividades (más recientes primero)
    const ultimas = actividades.slice().reverse().slice(0, 3);
    
    ultimas.forEach(act => {
        const tr = document.createElement('tr');
        
        const tdNombre = document.createElement('td');
        tdNombre.textContent = act.nombre;
        
        const tdDuracion = document.createElement('td');
        tdDuracion.textContent = act.duracion + ' min';
        
        const tdCalorias = document.createElement('td');
        tdCalorias.textContent = act.calorias;
        
        tr.appendChild(tdNombre);
        tr.appendChild(tdDuracion);
        tr.appendChild(tdCalorias);
        tbody.appendChild(tr);
    });
    
    tabla.appendChild(tbody);
    contenedor.appendChild(tabla);
});