const pokedex = document.getElementById("pokedex")

const getPokemon = () => {
  const promises = []
  for (let i = 1; i <= 16; i++) {
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
      <li onclick="newPage('${singlePokemon.name}')">
        <a href="details.html?pokemonID=${singlePokemon.id}" target="blank">
          <img src="${singlePokemon.image}" />
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
