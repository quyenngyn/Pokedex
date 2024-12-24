const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString); // constructor method - constructs URL search params object which passes in queryString

const pokemonID = urlParams.get('pokemonID');

const card = document.getElementById("card");
const cardTitle = document.getElementById("card-title");
const cardID = document.getElementById("card-id");
const typeList = document.getElementById("type-list");

const MAX_POKEMON = 640;

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
    cardID.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
    cardTitle.textContent = pokemon.name;
    pokemon.types.forEach((type) => {
        const li = document.createElement("li");
        li.textContent = type;
        li.classList.add(type);
        typeList.appendChild(li);
    });
    const img = document.getElementById("card-image");
    img.src = `sprites/${pokemon.id}.svg`;
    img.alt = pokemon.name;
    const statCard = document.getElementById("stat-card");
    const attributesCard = document.getElementById("attributes-card")
    attributesCard.innerHTML = `
        <span class="attribute-span">Height</span>
        <span class="attribute-value">${(pokemon.height * 0.1).toFixed(1)} m</span>
        <span class="attribute-span">Weight</span>
        <span class="attribute-value">${(pokemon.weight * 0.1).toFixed(1)} kg</span>
    `;
    const statsItems = document.createElement("div");
    const statsString = pokemon.stats.map((stat) => {
        return `
            <p><span class="stat-span"> ${renameStats(stat.name)} </span> 
            <span class="stat-span"> ${stat.baseStat} </span></p>
        `;
    }).join("");
    statsItems.innerHTML = statsString;
    statCard.appendChild(statsItems);
}

const getNextPokemon = () => {
    const nextPokemonID = (parseInt(pokemonID) + 1 < MAX_POKEMON) ? parseInt(pokemonID) + 1 : 1;
    const url = `https://pokeapi.co/api/v2/pokemon/${nextPokemonID}`;

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
                image: result.sprites["front_default"],
            }
        displayNextNav(pokemon)})
        .catch((error) => console.error(error));

}

const displayNextNav = (pokemon) => {
    const nextNav = document.getElementById("next-nav");
    const nextURL = `details.html?pokemonID=${pokemon.id}`;
    const nextNavImage = document.getElementById("next-img");
    const nextName = document.getElementById("next-name");
    const nextButton = document.getElementById("next-button");
    nextNavImage.src = pokemon.image;
    nextNavImage.alt = pokemon.name;
    nextName.textContent = pokemon.name;
    nextNav.href = nextURL;
    nextButton.classList.add(pokemon.types[0]);
    if (pokemon.types.length > 1) {
        nextButton.classList.add(`secondary-${pokemon.types[1]}`);
    }
}

const getPreviousPokemon = () => {
    const previousPokemonID = (parseInt(pokemonID) - 1 > 0) ? parseInt(pokemonID) - 1 : MAX_POKEMON;
    const url = `https://pokeapi.co/api/v2/pokemon/${previousPokemonID}`;

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
                image: result.sprites["front_default"],
            }
        displayPreviousNav(pokemon)})
        .catch((error) => console.error(error));
}

const displayPreviousNav = (pokemon) => {
    const previousNav = document.getElementById("prev-nav");
    const previousURL = `details.html?pokemonID=${pokemon.id}`;
    const previousNavImage = document.getElementById("prev-img");
    const previousName = document.getElementById("prev-name");
    const previousButton = document.getElementById("prev-button");
    previousNavImage.src = pokemon.image;
    previousNavImage.alt = pokemon.name;
    previousName.textContent = pokemon.name;
    previousNav.href = previousURL;
    previousButton.classList.add(pokemon.types[0]);
    if (pokemon.types.length > 1) {
        previousButton.classList.add(`secondary-${pokemon.types[1]}`);
    }
}

getPokemonStats();
getNextPokemon();
getPreviousPokemon();

const renameStats = (statName) => {
    switch (statName) {
        case "hp":
            return "HP";
        case "special-attack":
            return "Sp.Atk";
        case "special-defense":
            return "Sp.Def";
        default:
            return statName.charAt(0).toUpperCase() + statName.slice(1);
    }
}
