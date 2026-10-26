const API = "https://pokeapi.co/api/v2/pokemon";
const FIRST_PAGE = 151;
const NEXT_PAGE = 24;

const grid = document.querySelector("#pokemon-grid");
const loading = document.querySelector("#loading-state");
const loadMoreButton = document.querySelector("#load-more-button");
const detailsModal = new bootstrap.Modal(document.querySelector("#pokemon-modal"));
const detailsCache = new Map();

let nextOffset = 0;
let pokemonCount = 0;
let searchText = "";
let isLoading = false;

async function getPokemon(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error de conexión (${response.status}).`);
  return response.json();
}

function getDetails(url) {
  if (!detailsCache.has(url)) {
    detailsCache.set(url, getPokemon(url).catch((error) => {
      detailsCache.delete(url);
      throw error;
    }));
  }
  return detailsCache.get(url);
}

function showTypes(container, types) {
  container.replaceChildren();
  types.forEach(({ type }) => {
    const badge = document.createElement("span");
    badge.className = "badge rounded-pill text-bg-secondary text-capitalize";
    badge.textContent = type.name;
    container.append(badge);
  });
}

function makeCard(pokemon) {
  const column = document.createElement("div");
  column.className = "col";
  column.dataset.name = pokemon.name;

  const card = document.createElement("article");
  card.className = "card h-100 shadow-sm";

  const image = document.createElement("img");
  image.className = "card-img-top bg-danger-subtle object-fit-contain p-2";
  image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
  image.alt = `Ilustración de ${pokemon.name}`;
  image.width = 180;
  image.height = 150;
  image.loading = "lazy";
  image.addEventListener("error", () => {
    image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  }, { once: true });

  const body = document.createElement("div");
  body.className = "card-body d-flex flex-column";

  const number = document.createElement("p");
  number.className = "small text-secondary fw-semibold mb-1";
  number.textContent = `#${String(pokemon.id).padStart(3, "0")}`;

  const name = document.createElement("h3");
  name.className = "h6 fw-bold text-capitalize";
  name.textContent = pokemon.name;

  const types = document.createElement("div");
  types.className = "d-flex flex-wrap gap-1 mb-3";
  types.textContent = "Cargando tipos...";
  getDetails(pokemon.url).then((details) => showTypes(types, details.types)).catch(() => {
    types.textContent = "No se pudieron cargar los tipos.";
  });

  const button = document.createElement("button");
  button.className = "btn btn-outline-danger btn-sm fw-semibold mt-auto";
  button.type = "button";
  button.textContent = "Ver detalles";
  button.addEventListener("click", () => showDetails(pokemon));

  body.append(number, name, types, button);
  card.append(image, body);
  column.append(card);
  return column;
}

async function loadPage() {
  if (isLoading) return;
  isLoading = true;
  loading.classList.remove("d-none");
  loading.classList.add("d-flex");
  loadMoreButton.classList.add("d-none");
  document.querySelector("#error-message").classList.add("d-none");

  try {
    const amount = nextOffset === 0 ? FIRST_PAGE : NEXT_PAGE;
    const page = await getPokemon(`${API}?limit=${amount}&offset=${nextOffset}`);
    page.results.forEach((pokemon, index) => {
      pokemon.id = nextOffset + index + 1;
      grid.append(makeCard(pokemon));
    });
    pokemonCount += page.results.length;
    nextOffset += page.results.length;
    document.querySelector("#pokemon-count").textContent = `${pokemonCount} Pokémon`;

    if (nextOffset < page.count) {
      loadMoreButton.classList.remove("d-none");
    } else {
      document.querySelector("#end-message").classList.remove("d-none");
    }
    filterPokemon();
  } catch (error) {
    const message = document.querySelector("#error-message");
    message.textContent = `No se pudo cargar la Pokédex. ${error.message} Comprueba tu conexión e inténtalo de nuevo.`;
    message.classList.remove("d-none");
    if (pokemonCount > 0) loadMoreButton.classList.remove("d-none");
  } finally {
    isLoading = false;
    loading.classList.add("d-none");
    loading.classList.remove("d-flex");
  }
}

async function showDetails(pokemon) {
  const modalTitle = document.querySelector("#modal-pokemon-name");
  const modalLoading = document.querySelector("#modal-loading");
  const modalError = document.querySelector("#modal-error");
  const modalContent = document.querySelector("#modal-content");

  modalTitle.textContent = pokemon.name;
  modalError.classList.add("d-none");
  modalContent.classList.add("d-none");
  modalLoading.classList.remove("d-none");
  modalLoading.classList.add("d-flex");
  detailsModal.show();

  try {
    const details = await getDetails(pokemon.url);
    const image = document.querySelector("#modal-image");
    image.src = details.sprites.other?.["official-artwork"]?.front_default || details.sprites.front_default || "";
    image.alt = `Ilustración de ${details.name}`;
    document.querySelector("#modal-number").textContent = `#${String(details.id).padStart(3, "0")}`;
    showTypes(document.querySelector("#modal-types"), details.types);

    document.querySelector("#modal-abilities").replaceChildren();
    details.abilities.forEach(({ ability }) => {
      const item = document.createElement("li");
      item.className = "badge bg-body-secondary text-dark text-capitalize fw-normal";
      item.textContent = ability.name;
      document.querySelector("#modal-abilities").append(item);
    });

    document.querySelector("#modal-moves").replaceChildren();
    details.moves.slice(0, 4).forEach(({ move }) => {
      const item = document.createElement("li");
      item.className = "badge bg-body-secondary text-dark text-capitalize fw-normal";
      item.textContent = move.name;
      document.querySelector("#modal-moves").append(item);
    });
    modalContent.classList.remove("d-none");
  } catch (error) {
    modalError.textContent = `No se pudieron cargar los detalles. ${error.message}`;
    modalError.classList.remove("d-none");
  } finally {
    modalLoading.classList.add("d-none");
    modalLoading.classList.remove("d-flex");
  }
}

function filterPokemon() {
  let visibleCount = 0;
  grid.querySelectorAll(".col").forEach((card) => {
    const matches = card.dataset.name.includes(searchText);
    card.classList.toggle("d-none", !matches);
    if (matches) visibleCount++;
  });
  document.querySelector("#empty-state").classList.toggle("d-none", visibleCount > 0 || pokemonCount === 0);
}

document.querySelector("#search-input").addEventListener("input", (event) => {
  searchText = event.target.value.trim().toLowerCase();
  filterPokemon();
});
loadMoreButton.addEventListener("click", loadPage);
loadPage();
