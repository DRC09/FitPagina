document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form-perfil');
    const nombreInput = document.getElementById('nombre-perfil');
    const pesoInput = document.getElementById('peso-perfil');
    
    // Cargar datos guardados
    const perfil = JSON.parse(localStorage.getItem('perfil')) || {};
    nombreInput.value = perfil.nombre || '';
    pesoInput.value = perfil.peso || '';
    
    // Guardar cambios
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nuevoPerfil = {
            nombre: nombreInput.value.trim(),
            peso: parseFloat(pesoInput.value)
        };
        
        localStorage.setItem('perfil', JSON.stringify(nuevoPerfil));
        alert('Perfil actualizado correctamente');
    });
});