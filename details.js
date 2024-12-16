const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString); // constructor method - constructs URL search params object which passes in queryString

const pokemonID = urlParams.get('pokemonID');

const test = document.getElementById("test");

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
                id: result.id
            }
        displayStats(pokemon)})
        .catch((error) => console.error(error));
}

const displayStats = (pokemon) => {
    let pokemonString =
    `<li>${pokemon.name}
    </li>`;
    test.innerHTML = pokemonString;
}

// const pokemonStats = getPokemon();

// const test = document.getElementById("test");
// console.log(pokemonStats);
// console.log(pokemonStats.name);
// test.textContent = pokemonStats.name;

getPokemonStats();
