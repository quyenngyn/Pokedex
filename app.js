const pokedex = document.getElementById("pokedex")

const getPokemon = () => {
  const promises = []
  for (let i = 1; i <= 50; i++) {
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
    <li onclick="onClick(${singlePokemon.id})">
      <img src="${singlePokemon.image}" />
      <h3>${singlePokemon.id}. ${singlePokemon.name}</h3>
    </li>`
    )
    .join("")
  pokedex.innerHTML = pokemonString
}

const onClick = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const pokemon = {
        id: data.id,
        name: data.name,
        image: data.sprites["front_default"],
        height: data.height,
        weight: data.weight,
        type: data.types.map(type => type.type.name).join(", "),
      }
      displayCard(pokemon)
    })
}

const displayCard = pokemon => {
    document.getElementById("pokecard").innerHTML = `
    <h2>${pokemon.id}. ${pokemon.name}</h2>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>
    <p>Type: ${pokemon.type}</p>`
}

getPokemon()