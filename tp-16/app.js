const apiPokemon = "https://pokeapi.co/api/v2/pokemon?limit=151";
const contenedorPokemon = document.querySelector("#lista-pokemones");

async function obtenerListaPokemon() {
  const respuesta = await fetch(apiPokemon);

  if (!respuesta.ok) {
    throw new Error("No se pudieron cargar los pokémon.");
  }

  const datos = await respuesta.json();
  console.log("Datos de PokeAPI:", datos);

  return datos.results.map((pokemon, indice) => ({
    id: indice + 1,
    nombre: pokemon.name
  }));
}

function crearTarjetaPokemon(pokemon) {
  const columna = document.createElement("div");
  columna.className = "col";

  const tarjeta = document.createElement("article");
  tarjeta.className = "card h-100 border-0 shadow-sm rounded-4 overflow-hidden";

  const imagen = document.createElement("img");
  imagen.className = "card-img-top bg-danger-subtle p-3";
  imagen.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  imagen.alt = `Imagen de ${pokemon.nombre}`;
  imagen.loading = "lazy";
  imagen.width = 200;
  imagen.height = 200;

  const cuerpo = document.createElement("div");
  cuerpo.className = "card-body d-flex flex-column justify-content-between";

  const numero = document.createElement("p");
  numero.className = "text-secondary fw-semibold mb-2 small";
  numero.textContent = `#${String(pokemon.id).padStart(3, "0")}`;

  const nombre = document.createElement("h2");
  nombre.className = "h5 text-capitalize fw-bold mb-0";
  nombre.textContent = pokemon.nombre;

  const etiqueta = document.createElement("span");
  etiqueta.className = "badge rounded-pill bg-danger-subtle text-danger fw-semibold mt-3";
  etiqueta.textContent = "Kanto";

  cuerpo.append(numero, nombre, etiqueta);
  tarjeta.append(imagen, cuerpo);
  columna.appendChild(tarjeta);

  return columna;
}

async function cargarPokemones() {
  try {
    const listaPokemon = await obtenerListaPokemon();

    if (!contenedorPokemon) {
      throw new Error("No se encontró el contenedor #lista-pokemones");
    }

    contenedorPokemon.innerHTML = "";

    listaPokemon.forEach((pokemon) => {
      const tarjeta = crearTarjetaPokemon(pokemon);
      contenedorPokemon.appendChild(tarjeta);
    });
  } catch (error) {
    console.error(error);

    if (contenedorPokemon) {
      contenedorPokemon.innerHTML = `
        <div class="col-12">
          <div class="alert alert-danger" role="alert">
            ${error.message}
          </div>
        </div>
      `;
    }
  }
}

document.addEventListener("DOMContentLoaded", cargarPokemones);
