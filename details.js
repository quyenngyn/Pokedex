const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString); // constructor method - constructs URL search params object which passes in queryString

const pokemonID = urlParams.get('pokemonID');

const card = document.getElementById("card");
const cardTitle = document.getElementById("card-title");
const cardID = document.getElementById("card-id");
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
    cardID.textContent = `#${String(pokemon.id).padStart(3, '0')}`;
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
    const attributesCard = document.getElementById("attributes-card")
    attributesCard.innerHTML = `<span class="attribute-span"> Height ${(pokemon.height * 0.1).toFixed(1)} m </span><span class="attribute-span"> Weight ${pokemon.weight * 0.1} kg </span>`;
    const statsItems = document.createElement("div");
    const statsString = pokemon.stats.map((stat) => {
        return `<p><span class="stat-span"> ${renameStats(stat.name)} </span> <span class="stat-span"> ${stat.baseStat} </span></p>`;
    }).join("");
    statsItems.innerHTML = statsString;
    statCard.appendChild(statsItems);
}

getPokemonStats();

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
