const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString); // constructor method - constructs URL search params object which passes in queryString

const pokemonID = urlParams.get('pokemonID');

console.log(pokemonID);

const test = document.getElementById("test");

test.textContent = pokemonID;