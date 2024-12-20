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
      types: data.types.map((type) => type.type.name)
    }))

    displayPokemon(pokemon)
  })
}

const displayPokemon = pokemon => {
  const pokemonString = pokemon
    .map(
      singlePokemon => `
      <li class="card ${singlePokemon.types[0]}" onclick="newPage('${singlePokemon.name}')>
        <a href="details.html?pokemonID=${singlePokemon.id}" target="">
          <img class="poke-icon" src="${singlePokemon.image}" />
        </a>
        <h3>${singlePokemon.id}. ${singlePokemon.name}</h3>
      </li>
    `
    )
    .join("")
  pokedex.innerHTML = pokemonString
}

getPokemon()

const newPage = (pokemon) => {
  console.log(pokemon + " clicked")
}
