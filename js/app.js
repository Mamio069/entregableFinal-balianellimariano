let productos = [];
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const listaProductos = document.getElementById("lista-productos");
const carritoItems = document.getElementById("carrito-items");
const total = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar-carrito");

fetch("data/productos.json")
  .then((response) => response.json())
  .then((data) => {
    productos = data;
    mostrarProductos();
    renderCarrito();
  })
  .catch((error) => console.error("Error cargando productos:", error));

function mostrarProductos() {
  listaProductos.innerHTML = "";

  productos.forEach((prod) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
  <img src="${prod.imagen}" alt="${prod.nombre}" class="producto-img" />
  <h3>${prod.nombre}</h3>
  <p>Precio: $${prod.precio}</p>
  <button onclick="agregarAlCarrito(${prod.id})">Agregar</button>
    `;
    listaProductos.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const prod = productos.find((p) => p.id === id);
  carrito.push(prod);
  guardarCarrito();
  renderCarrito();

  Swal.fire({
    position: "center",
    icon: "success",
    title: `${prod.nombre} agregado al carrito`,
    showConfirmButton: false,
    timer: 1200,
  });
}

function renderCarrito() {
  carritoItems.innerHTML = "";
  let totalCarrito = 0;

  carrito.forEach((prod, index) => {
    const div = document.createElement("div");
    div.classList.add("carrito-item");
    div.innerHTML = `
      <p>${prod.nombre} - $${prod.precio}</p>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    carritoItems.appendChild(div);
    totalCarrito += prod.precio;
  });

  total.innerText = `Total: $${totalCarrito}`;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  renderCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

btnVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();

  Swal.fire({
    icon: "warning",
    title: "Carrito vaciado",
    text: "Todos los productos han sido eliminados",
    confirmButtonColor: "#e74c3c",
  });
});
