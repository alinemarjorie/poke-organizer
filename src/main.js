let pokemons = [];

window.onload = function () {
    pokemons = POKEMON.pokemon;
    showPokemons();
}

function showPokemons() {
    document.getElementById("pokemons").innerHTML = `${pokemons.map(pokemon => `
        <div class="each-pokemon">
        <img src="${pokemon.img}" class="pokemon-img" data-name="${pokemon.name}"/>
        <div class="text-name">
            <h3 class="pokemon-name">${pokemon.name}</h3>
        </div>
        </div>
   `).join('')}`
    getPokemonOnClick()
}

function showPercent() {
    let number = pokemons.length / 151 * 100;
    document.getElementById("math-pokemons").innerHTML =
        `<div class="math"> ${Math.round(number)}% 
    </div>
`
}

const selectTypeElement = document.getElementById("select-type");
const selectWeaknessesElement = document.getElementById("select-weaknesses");
const filterButtonElement = document.getElementById("filter")
filterButtonElement.addEventListener("click", callFilter)

function callFilter() {
    let type = selectTypeElement.value;
    let weaknesses = selectWeaknessesElement.value;
    pokemons = POKEMON.pokemon.filter(pokemon => {
        if (type != "" && weaknesses != "") {
            return (pokemon.weaknesses.includes(weaknesses) && pokemon.type.includes(type));
        }
        if (type != "") {
            return (pokemon.type.includes(type));
        }
        if (weaknesses != "") {
            return (pokemon.weaknesses.includes(weaknesses));
        }
    })
    showPercent();
    showPokemons();
    resetSelectElement();
}

function resetSelectElement() {
    selectTypeElement.selectedIndex = 0;
    selectWeaknessesElement.selectedIndex = 0;
}

const pokeSearchElement = document.getElementById("poke-search");
pokeSearchElement.addEventListener("keyup", pokemonSearch);

function pokemonSearch() {
    let searchUpper = pokeSearchElement.value.toUpperCase();
    pokemons = POKEMON.pokemon.filter(pokemon => {
        let nameUpper = pokemon.name.toUpperCase();
        return (nameUpper.includes(searchUpper));
    })
    showPokemons();
    document.getElementById("math-pokemons").style.display = "none";
}

function getPokemonOnClick() {
    let pokemonList = document.querySelectorAll('.pokemon-img');

    for (let pokemonImg of pokemonList) {
        pokemonImg.addEventListener('click', function () {
            const nome = pokemonImg.dataset.name;
            showFullPokemon(nome);
        })
    }
}

const modal = document.getElementById("my-modal");

function showFullPokemon(nome) {
    modal.style.display = "block";
    const onePokemon = POKEMON.pokemon.find(pokemon => pokemon.name === nome)
    document.getElementById("contentModal").innerHTML = `
    <div class="each-full-pokemon">
    <img src="${onePokemon.img}" class="pokemon-img"/>
    <div class="text-name">
        <h3 class="pokemon-number">${onePokemon.num}</h3>
        <h3 class="pokemon-name">${onePokemon.name}</h3>
        <p><strong>Tipo:</strong> ${onePokemon.type}</p>
        <p><strong>Fraquezas:</strong> ${onePokemon.weaknesses}</p>
        <p><strong>Período:</strong> ${onePokemon.spawn_time}</p>     
        <p><strong>Altura:</strong> ${onePokemon.height}</p>
        <p><strong>Peso:</strong> ${onePokemon.weight}</p>        
    </div>
    </div>
    `
}

const close = document.getElementById("close");

close.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const AZButton = document.getElementById("aToZ");
AZButton.addEventListener("click", orderAZ);

function orderAZ() {
    pokemons = pokemons.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });
    showPokemons();
}

const ZAButton = document.getElementById("zToA");
ZAButton.addEventListener("click", orderZA);

function orderZA() {
    pokemons = pokemons.sort((a, b) => {
        if (a.name < b.name) {
            return 1;
        }
        if (a.name > b.name) {
            return -1;
        }
        return 0;
    });
    showPokemons();
}