const URL_API = "https://pokeapi.co/api/v2/pokemon";
const listaPokemones = document.querySelector("#pokemones");
const modal = new bootstrap.Modal(document.querySelector("#modal"));
let pokemones = [];

async function cargarPokemones() {
  try {
    const respuesta = await fetch(`${URL_API}?limit=151`);
    if (!respuesta.ok) throw new Error("Error al consultar PokeAPI.");
    const datos = await respuesta.json();
    pokemones = datos.results;

    let tarjetas = "";

    for (let i = 0; i < pokemones.length; i++) {
      const pokemon = pokemones[i];
      const numero = i + 1;
      pokemon.id = numero;

      tarjetas += `
        <div class="col tarjeta-pokemon" data-nombre="${pokemon.name}">
          <article class="card h-100 shadow-sm">
            <img class="card-img-top bg-danger-subtle p-2" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${numero}.png" alt="${pokemon.name}">
            <div class="card-body d-flex flex-column">
              <p class="small text-secondary">#${String(numero).padStart(3, "0")}</p>
              <h3 class="h6 text-capitalize">${pokemon.name}</h3>
              <div class="mb-3" id="tipos-${numero}"></div>
              <button class="btn btn-outline-danger mt-auto" onclick="mostrarDetalles(${numero})">Ver detalles</button>
            </div>
          </article>
        </div>`;
    }

    listaPokemones.innerHTML = tarjetas;
    for (let i = 0; i < pokemones.length; i++) cargarTipos(pokemones[i]);
    buscarPokemon();
  } catch (error) {
    document.querySelector("#error").textContent = `No se pudieron cargar los Pokémon: ${error.message}`;
    document.querySelector("#error").classList.remove("d-none");
  }
}

async function cargarTipos(pokemon) {
  try {
    const respuesta = await fetch(pokemon.url);
    const datos = await respuesta.json();
    let tipos = "";

    for (let i = 0; i < datos.types.length; i++) {
      tipos += `<span class="badge rounded-pill text-bg-secondary me-1">${datos.types[i].type.name}</span>`;
    }

    document.querySelector(`#tipos-${pokemon.id}`).innerHTML = tipos;
  } catch {
    document.querySelector(`#tipos-${pokemon.id}`).textContent = "Tipos no disponibles";
  }
}

async function mostrarDetalles(numero) {
  const pokemon = pokemones[numero - 1];
  const error = document.querySelector("#error-modal");
  error.classList.add("d-none");
  document.querySelector("#detalles").classList.add("d-none");

  try {
    const respuesta = await fetch(pokemon.url);
    if (!respuesta.ok) throw new Error("Error al consultar PokeAPI.");
    const datos = await respuesta.json();

    document.querySelector("#nombre-modal").textContent = datos.name;
    document.querySelector("#imagen-modal").src =
      datos.sprites.other["official-artwork"].front_default || datos.sprites.front_default;
    document.querySelector("#numero-modal").textContent =
      `#${String(datos.id).padStart(3, "0")}`;
    let tipos = "";
    let habilidades = "";
    let movimientos = "";

    for (let i = 0; i < datos.types.length; i++) {
      tipos += `<span class="badge rounded-pill text-bg-secondary">${datos.types[i].type.name}</span>`;
    }
    for (let i = 0; i < datos.abilities.length; i++) {
      habilidades += `<li>${datos.abilities[i].ability.name}</li>`;
    }
    for (let i = 0; i < 4 && i < datos.moves.length; i++) {
      movimientos += `<li>${datos.moves[i].move.name}</li>`;
    }

    document.querySelector("#tipos-modal").innerHTML = tipos;
    document.querySelector("#habilidades-modal").innerHTML = habilidades;
    document.querySelector("#movimientos-modal").innerHTML = movimientos;

    document.querySelector("#detalles").classList.remove("d-none");
  } catch (error) {
    error.textContent = `No se pudieron cargar los detalles: ${error.message}`;
    error.classList.remove("d-none");
  }

  modal.show();
}

function buscarPokemon() {
  const texto = document.querySelector("#busqueda").value.toLowerCase();
  let encontrados = 0;
  const tarjetas = document.querySelectorAll(".tarjeta-pokemon");

  for (let i = 0; i < tarjetas.length; i++) {
    const tarjeta = tarjetas[i];
    const coincide = tarjeta.dataset.nombre.includes(texto);
    tarjeta.classList.toggle("d-none", !coincide);
    if (coincide) encontrados++;
  }

  document.querySelector("#sin-resultados").classList.toggle("d-none", encontrados > 0);
}

document.querySelector("#busqueda").addEventListener("input", buscarPokemon);
cargarPokemones();
