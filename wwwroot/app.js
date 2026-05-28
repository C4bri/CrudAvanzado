const urlProductos = "/api/Productos";
const urlMarcas = "/api/Marcas";

let productoEditando = null;
let idAEliminar = null;

async function cargarMarcas() {
    const res = await fetch(urlMarcas);
    const marcas = await res.json();

    const select = document.getElementById("marca");
    select.innerHTML = "";

    marcas.forEach(m => {
        select.innerHTML += `<option value="${m.idMarca}">${m.nombreMarca}</option>`;
    });
}

async function cargarProductos() {
    const res = await fetch(urlProductos);
    const productos = await res.json();

    const contenedor = document.getElementById("productos");
    contenedor.innerHTML = "";

    productos.forEach(p => {
        const editando = productoEditando === p.idProducto;

        contenedor.innerHTML += `
            <div>
                <input id="nombre-${p.idProducto}" value="${p.nombreProducto}" ${editando ? "" : "disabled"}>
                <input id="precio-${p.idProducto}" type="number" value="${p.precioProducto}" ${editando ? "" : "disabled"}>

                <strong>Marca:</strong> ${p.marca ? p.marca.nombreMarca : "Sin marca"}

                ${editando
                ? `<button onclick="guardarProducto(${p.idProducto})">Guardar</button>`
                : `<button onclick="habilitarEdicion(${p.idProducto})">Editar</button>`
            }

                <button onclick="eliminarProducto(${p.idProducto})">Eliminar</button>
            </div>
        `;
    });
}

async function agregarProducto() {
    const nombreProducto = document.getElementById("nombre").value;
    const precioProducto = parseFloat(document.getElementById("precio").value);
    const idMarca = parseInt(document.getElementById("marca").value);

    await fetch(urlProductos, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombreProducto,
            precioProducto,
            stockProducto: 0,
            activoProducto: true,
            idMarca
        })
    });

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";

    cargarProductos();
}

function habilitarEdicion(id) {
    productoEditando = id;
    cargarProductos();
}

async function guardarProducto(id) {
    const nombreProducto = document.getElementById(`nombre-${id}`).value;
    const precioProducto = parseFloat(document.getElementById(`precio-${id}`).value);

    await fetch(`${urlProductos}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idProducto: id,
            nombreProducto,
            precioProducto,
            stockProducto: 0,
            activoProducto: true,
            idMarca: 1
        })
    });

    productoEditando = null;
    cargarProductos();
}

function eliminarProducto(id) {
    idAEliminar = id;
    document.getElementById("modalEliminar").style.display = "flex";
}

function cerrarModal() {
    idAEliminar = null;
    document.getElementById("modalEliminar").style.display = "none";
}

async function confirmarEliminar() {
    await fetch(`${urlProductos}/${idAEliminar}`, {
        method: "DELETE"
    });

    cerrarModal();
    cargarProductos();
}

cargarMarcas();
cargarProductos();