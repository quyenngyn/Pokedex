const pokedex = document.getElementById("pokedex")

const getPokemon = () => {
  const promises = []
  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then(res => res.json()))
  }
  Promise.all(promises).then(result => {
    const pokemon = result.map(data => ({
      id: data.id,
      name: data.name,
      image: data.sprites["front_default"],
    }))

    displayPokemon(pokemon)
  })
}

const displayPokemon = pokemon => {
  const pokemonString = pokemon
    .map(
      singlePokemon => `
    <li>
      <img src="${singlePokemon.image}" />
      <h3>${singlePokemon.id}. ${singlePokemon.name}</h3>
    </li>`
    )
    .join("")
  pokedex.innerHTML = pokemonString
}

getPokemon()


let pokemon = ["Pikachu", "Bulbasaur"] // Array of pokemon 

console.log(pokemon)

pokemon.push("Charmander") // add another pokemon "Charmander"

console.log(pokemon)

pokemon = JSON.stringify(pokemon) // convert array of pokemon to String

localStorage.setItem("pokemon", pokemon) // set in local storage

console.log(localStorage.getItem("pokemon")) // returns STRING of pokemons
console.log(typeof pokemon) // returns String

pokemon = JSON.parse(pokemon) // convert String to Array 
console.log(typeof pokemon) // returns Object 
console.log(pokemon) // returns ARRAY of pokemon 
console.log(pokemon.hasOwnProperty(length))