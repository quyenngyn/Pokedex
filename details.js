const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString); // constructor method - constructs URL search params object which passes in queryString

const pokemonID = urlParams.get('pokemonID');

const card = document.getElementById("card");
const cardTitle = document.getElementById("card-title");
const typeList = document.getElementById("type-list");

const getPokemonStats = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;

    const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
       
      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            const pokemon = {
                name: result.name,
                id: result.id,
                types: result.types.map((type) => type.type.name),
                height: result.height,
                weight: result.weight,
                image: result.sprites["front_default"],
                stats: result.stats.map((stat) => {
                    return {
                        name: stat.stat.name,
                        baseStat: stat.base_stat
                    }
                })
            }
        displayStats(pokemon)})
        .catch((error) => console.error(error));
}

const displayStats = (pokemon) => {
    cardTitle.textContent = pokemon.name;
    pokemon.types.forEach((type) => {
        const li = document.createElement("li");
        li.textContent = type;
        typeList.appendChild(li);
    });
    const img = document.getElementById("card-image");
    img.src = pokemon.image;
    img.alt = pokemon.name;
    const statCard = document.getElementById("stat-card");
    statCard.textContent = `Height: ${pokemon.height} | Weight: ${pokemon.weight}`;
    const statsItems = document.createElement("p");
    const statsString = pokemon.stats.map((stat) => {
        if (stat.name == "hp" || stat.name == "defense" || stat.name == "attack") {
        return `${stat.name}: ${stat.baseStat} | `;
        }
    }).join("");
    statsItems.textContent = statsString;
    statCard.appendChild(statsItems);
}

// const pokemonStats = getPokemon();

// const test = document.getElementById("test");
// console.log(pokemonStats);
// console.log(pokemonStats.name);
// test.textContent = pokemonStats.name;

getPokemonStats();
