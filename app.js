const pokedex = document.getElementById("pokedex")

const cardContainer = document.getElementById("pokecard");
const loadMoreButton = document.getElementById("load-more");
const cardCountElem = document.getElementById("card-count");
const cardTotalElem = document.getElementById("card-total");
const cardLimit = 640;
const cardIncrease = 16;
const pageCount = Math.ceil(cardLimit / cardIncrease);
let currentPage = 1;

cardTotalElem.innerHTML = cardLimit;

const handleButtonStatus = () => {
  if (pageCount === currentPage) {
    loadMoreButton.classList.add("disabled");
    loadMoreButton.setAttribute("disabled", true);
  }
};

const getPokemon = (pageIndex) => {
  currentPage = pageIndex;
  handleButtonStatus();
  const startRange = (pageIndex - 1) * cardIncrease;
  const endRange = currentPage == pageCount ? cardLimit : pageIndex * cardIncrease;
  cardCountElem.innerHTML = endRange;
  const promises = []
  for (let i = startRange + 1; i <= endRange; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then(res => res.json()))
  }
  Promise.all(promises).then(result => {
    const pokemon = result.map(data => ({
      id: data.id,
      name: data.name,
      image: data.sprites["front_default"],
      types: data.types.map((type) => type.type.name)
    }))

    displayPokemon(pokemon)
  })
}

const displayPokemon = pokemon => {
  const pokemonString = pokemon
    .map(
      singlePokemon => `
      <li class="card ${singlePokemon.types[0]}${(singlePokemon.types.length > 1) ? " secondary-"+ singlePokemon.types[1]: ""}" onclick="newPage('${singlePokemon.name}')">
        <div class="pokemon-id">#${String(singlePokemon.id).padStart(3, '0')}</div>
        <a href="details.html?pokemonID=${singlePokemon.id}" target="">
          <img class="poke-icon" src="${singlePokemon.image}" />
          </a>
          <h3>${singlePokemon.name}</h3>
      </li>
    `
    )
    .join("")

  pokedex.innerHTML += pokemonString
}

window.onload = function () {
  getPokemon(currentPage);
  loadMoreButton.addEventListener("click", () => {
    getPokemon(currentPage + 1);
  });
};

const newPage = (pokemon) => {
  console.log(pokemon + " clicked")
}

