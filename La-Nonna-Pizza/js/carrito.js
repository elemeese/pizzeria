// carrito.js

document.addEventListener('DOMContentLoaded', function() {
    actualizarCarrito();
    
    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', realizarCompra);
    }
});

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const totalCarrito = document.getElementById('total-carrito');
    const carrito = obtenerCarrito();
    
    carritoItems.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="text-center">Tu carrito está vacío</p>';
    } else {
        carrito.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('carrito-item', 'mb-2', 'd-flex', 'justify-content-between', 'align-items-center');
            
            let itemDetails = `<span>${item.producto} - $${item.precio}`;
            
            if (item.ingredientes) {
                itemDetails += `<br><small>Ingredientes: ${item.ingredientes.join(', ')}`;
                if (item.oregano) itemDetails += ', orégano';
                itemDetails += '</small>';
            }
            
            if (item.instrucciones) {
                itemDetails += `<br><small>Instrucciones: ${item.instrucciones}</small>`;
            }
            
            itemDetails += '</span>';
            
            itemElement.innerHTML = `
                ${itemDetails}
                <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">Eliminar</button>
            `;
            
            carritoItems.appendChild(itemElement);
            total += item.precio;
        });
    }

    totalCarrito.textContent = total;
    actualizarContadorCarrito();
}

function eliminarDelCarrito(index) {
    let carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    actualizarCarrito();
    mostrarMensaje('Producto eliminado del carrito', 'alert-success');
}

function realizarCompra() {
    const carrito = obtenerCarrito();
    if (carrito.length === 0) {
        mostrarMensaje('Tu carrito está vacío', 'alert-warning');
        return;
    }

    // Aquí iría la lógica para procesar el pago
    // Por ahora, solo limpiamos el carrito y mostramos un mensaje

    localStorage.removeItem('carrito');
    actualizarCarrito();
    mostrarMensaje('¡Gracias por tu compra!', 'alert-success');
}

function mostrarMensaje(mensaje, tipo = 'alert-info') {
    const mensajeElement = document.createElement('div');
    mensajeElement.textContent = mensaje;
    mensajeElement.className = `alert ${tipo} mensaje-flotante`;
    document.body.appendChild(mensajeElement);

    setTimeout(() => {
        mensajeElement.remove();
    }, 3000);
}

function actualizarContadorCarrito() {
    let carrito = obtenerCarrito();
    let contadorElement = document.getElementById('contador-carrito');
    if (contadorElement) {
        contadorElement.textContent = carrito.length;
    }
}