const urlProductos = "/api/Productos";
const urlMarcas = "/api/Marcas";
const urlSubFamilias = "/api/SubFamilias";

let productoEditando = null;
let idAEliminar = null;

async function cargarMarcas() {
    const res = await fetch(urlMarcas);
    const marcas = await res.json();

    const select = document.getElementById("marca");
    select.innerHTML = `<option value="">Seleccione una marca</option>`; // 👈 clave

    marcas.forEach(m => {
        select.innerHTML += `<option value="${m.idMarca}">${m.nombreMarca}</option>`;
    });
}

async function cargarSubFamilias() {
    const res = await fetch(urlSubFamilias);
    const subFamilias = await res.json();

    const select = document.getElementById("subFamilia");
    select.innerHTML = `<option value="">Seleccione una subfamilia</option>`; // 👈 clave

    subFamilias.forEach(sf => {
        select.innerHTML += `
            <option value="${sf.idSubFamilia}">
                ${sf.nombreSubFamilia} - ${sf.familia?.nombreFamilia ?? ""}
            </option>
        `;
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
                <input id="sku-${p.idProducto}" value="${p.sku}" ${editando ? "" : "disabled"}>
                <input id="nombre-${p.idProducto}" value="${p.nombreProducto}" ${editando ? "" : "disabled"}>
                <input id="precio-${p.idProducto}" type="number" value="${p.precioProducto}" ${editando ? "" : "disabled"}>
                <input id="stock-${p.idProducto}" type="number" value="${p.stockProducto}" ${editando ? "" : "disabled"}>

                <p><strong>Marca:</strong> ${p.marca?.nombreMarca ?? "Sin marca"}</p>
                <p><strong>Familia:</strong> ${p.subFamilia?.familia?.nombreFamilia ?? "Sin familia"}</p>
                <p><strong>Subfamilia:</strong> ${p.subFamilia?.nombreSubFamilia ?? "Sin subfamilia"}</p>

                ${editando
                ? `<button onclick="guardarProducto(${p.idProducto}, ${p.idMarca}, ${p.idSubFamilia})">Guardar</button>`
                : `<button onclick="habilitarEdicion(${p.idProducto})">Editar</button>`
            }

                <button onclick="eliminarProducto(${p.idProducto})">Eliminar</button>
            </div>
        `;
    });
}

async function agregarProducto() {
    const sku = document.getElementById("sku").value;
    const nombreProducto = document.getElementById("nombre").value;
    const precioProducto = parseFloat(document.getElementById("precio").value);
    const stockProducto = parseInt(document.getElementById("stock").value);
    const idMarca = parseInt(document.getElementById("marca").value);
    const idSubFamilia = parseInt(document.getElementById("subFamilia").value);


    // VALIDACIÓN
    if (!sku || !nombreProducto || !precioProducto || !stockProducto || !idMarca || !idSubFamilia) {
        mostrarMensaje("Por favor, complete todos los campos");
        return;
    }

    const res = await fetch(urlProductos, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sku,
            nombreProducto,
            precioProducto,
            stockProducto,
            activoProducto: true,
            idMarca,
            idSubFamilia
        })
    });

    if (!res.ok) {
        const mensaje = await res.text();
        mostrarMensaje(mensaje);
        return;
    }

    document.getElementById("sku").value = "";
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";

    cargarProductos();
}

function mostrarMensaje(mensaje) {
    document.getElementById("textoMensaje").innerText = mensaje;
    document.getElementById("modalMensaje").style.display = "flex";
}

function cerrarMensaje() {
    document.getElementById("modalMensaje").style.display = "none";
}

function habilitarEdicion(id) {
    productoEditando = id;
    cargarProductos();
}

async function guardarProducto(id, idMarca, idSubFamilia) {
    const sku = document.getElementById(`sku-${id}`).value;
    const nombreProducto = document.getElementById(`nombre-${id}`).value;
    const precioProducto = parseFloat(document.getElementById(`precio-${id}`).value);
    const stockProducto = parseInt(document.getElementById(`stock-${id}`).value);

    const res = await fetch(`${urlProductos}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            idProducto: id,
            sku,
            nombreProducto,
            precioProducto,
            stockProducto,
            activoProducto: true,
            idMarca,
            idSubFamilia
        })
    });

    if (!res.ok) {
        const mensaje = await res.text();
        mostrarMensaje(mensaje);
        return;
    }

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
cargarSubFamilias();
cargarProductos();