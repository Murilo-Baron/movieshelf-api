// app.js

const API_URL = "http://localhost:4001/api/movies";

const movieGrid = document.getElementById("movie-grid");
const movieCount = document.getElementById("movie-count");
const statusMessage = document.getElementById("status-message");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const modalBackdrop = document.getElementById("modal-backdrop");

const movieForm = document.getElementById("movie-form");
const titleInput = document.getElementById("title");
const yearInput = document.getElementById("year");
const ratingInput = document.getElementById("rating");
const tagsInput = document.getElementById("tags");

let moviesCache = [];

// ---- UI helpers ----

function showStatus(message, type = "info", autoHide = true) {
  statusMessage.textContent = message;
  statusMessage.hidden = false;
  statusMessage.className = `status-message status-message--${type}`;

  if (autoHide && type === "info") {
    setTimeout(() => {
      statusMessage.hidden = true;
    }, 3000);
  }
}

function openModal() {
  modalBackdrop.hidden = false;
  titleInput.focus();
}

function closeModal() {
  modalBackdrop.hidden = true;
  movieForm.reset();
}

// ---- API ----

async function fetchMovies() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    moviesCache = Array.isArray(data) ? data : [];
    renderMovies();
  } catch (err) {
    console.error(err);
    showStatus("Erro ao carregar filmes. Verifique se a API está rodando.", "error", false);
  }
}

async function createMovie(payload) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error("Erro ao criar filme", await res.text());
      showStatus("Erro ao criar filme. Confira os dados e tente novamente.", "error");
      return;
    }

    showStatus("Filme adicionado com sucesso! 🎉", "info");
    closeModal();
    fetchMovies();
  } catch (err) {
    console.error(err);
    showStatus("Falha de conexão com a API.", "error", false);
  }
}

async function deleteMovie(id) {
  const confirmed = confirm("Tem certeza que deseja remover este filme?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!res.ok && res.status !== 204) {
      showStatus("Erro ao remover filme.", "error");
      return;
    }

    showStatus("Filme removido.", "info");
    // Atualiza cache sem precisar refazer tudo
    moviesCache = moviesCache.filter((m) => m._id !== id);
    renderMovies();
  } catch (err) {
    console.error(err);
    showStatus("Falha de conexão com a API.", "error", false);
  }
}

// ---- Render ----

function applyFiltersAndSort(movies) {
  let result = [...movies];

  const term = searchInput.value.trim().toLowerCase();
  if (term) {
    result = result.filter((m) =>
      m.title.toLowerCase().includes(term)
    );
  }

  const sortBy = sortSelect.value;
  result.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === "rating") {
      const ar = a.rating ?? -1;
      const br = b.rating ?? -1;
      return br - ar;
    }
    if (sortBy === "year") {
      const ay = a.year ?? 0;
      const by = b.year ?? 0;
      return by - ay;
    }
    // createdAt
    const ad = new Date(a.createdAt || 0).getTime();
    const bd = new Date(b.createdAt || 0).getTime();
    return bd - ad;
  });

  return result;
}

function renderMovies() {
  const movies = applyFiltersAndSort(moviesCache);

  movieGrid.innerHTML = "";

  if (movies.length === 0) {
    movieGrid.innerHTML =
      '<p style="color:#9ca3af;font-size:0.9rem;">Nenhum filme encontrado. Adicione um novo ou altere os filtros.</p>';
    movieCount.textContent = "0 filmes";
    return;
  }

  movies.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "movie-card";

    const meta = document.createElement("div");
    meta.className = "movie-card__meta";

    const title = document.createElement("h3");
    title.className = "movie-card__title";
    title.textContent = movie.title;

    meta.appendChild(title);

    if (movie.year) {
      const year = document.createElement("span");
      year.className = "movie-card__year";
      year.textContent = movie.year;
      meta.appendChild(year);
    }

    const rating = document.createElement("div");
    rating.className = "movie-card__rating";
    if (movie.rating !== undefined && movie.rating !== null) {
      rating.textContent = `★ ${movie.rating}`;
    } else {
      rating.textContent = "★ sem nota";
      rating.style.opacity = "0.7";
      rating.style.fontWeight = "400";
    }

    const tagsWrap = document.createElement("div");
    tagsWrap.className = "movie-card__tags";
    if (Array.isArray(movie.tags) && movie.tags.length > 0) {
      movie.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "movie-tag";
        span.textContent = tag;
        tagsWrap.appendChild(span);
      });
    }

    const footer = document.createElement("div");
    footer.className = "movie-card__footer";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn-delete";
    deleteBtn.textContent = "Remover";
    deleteBtn.addEventListener("click", () => deleteMovie(movie._id));

    footer.appendChild(deleteBtn);

    card.appendChild(meta);
    card.appendChild(rating);
    card.appendChild(tagsWrap);
    card.appendChild(footer);

    movieGrid.appendChild(card);
  });

  movieCount.textContent =
    movies.length === 1 ? "1 filme" : `${movies.length} filmes`;
}

// ---- Eventos ----

movieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = titleInput.value.trim();
  if (!title) {
    showStatus("Informe pelo menos o título do filme.", "error");
    return;
  }

  const yearValue = yearInput.value ? Number(yearInput.value) : undefined;
  const ratingValue = ratingInput.value ? Number(ratingInput.value) : undefined;
  const tagsRaw = tagsInput.value.trim();

  const payload = { title };

  if (!Number.isNaN(yearValue)) payload.year = yearValue;
  if (!Number.isNaN(ratingValue)) payload.rating = ratingValue;

  if (tagsRaw) {
    payload.tags = tagsRaw
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }

  createMovie(payload);
});

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

// fecha modal clicando fora
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) closeModal();
});

// filtros
searchInput.addEventListener("input", () => renderMovies());
sortSelect.addEventListener("change", () => renderMovies());

// inicialização
document.addEventListener("DOMContentLoaded", fetchMovies);

const rating = document.createElement("div");
rating.className = "movie-card__rating";
if (movie.rating !== undefined && movie.rating !== null) {
  rating.textContent = `★ ${movie.rating}`;
} else if (movie.imdbRating) {
  rating.textContent = `IMDb ${movie.imdbRating}`;
} else {
  rating.textContent = "★ sem nota";
}

// Poster opcional (se quiser deixar ainda mais Netflix):
if (movie.posterUrl) {
  const poster = document.createElement("div");
  poster.className = "movie-card__poster";
  poster.style.backgroundImage = `url(${movie.posterUrl})`;
  card.prepend(poster); // adiciona no topo
}