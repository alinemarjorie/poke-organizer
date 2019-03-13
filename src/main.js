let pokemons = [];

window.onload = () => {
    pokemons = POKEMON.pokemon;
    showPokemons();
}

function showPokemons() {
    document.getElementById("pokemons").innerHTML = `${pokemons.map(pokemon => `
        <div class="each-pokemon">
        <img src="${pokemon.img}" class="pokemon-img" data-name="${pokemon.name}"/>
        <div class="text-name">
            <span class="pokemon-name">${pokemon.name}</span>
        </div>
        </div>
   `).join('')}`;
    getPokemonOnClick();
}

function showPercent(type, weaknesses) {
    let number = pokemons.length / 151 * 100;
    document.getElementById("math-pokemons").innerHTML = `
        <div class="math"> 
            <p> Corresponde a <strong>${Math.round(number)}%</strong> dos Pokémons.</p>
            <div> Tipo: <strong>${type}</strong><div>
            <div> Fraqueza: <strong>${weaknesses}</strong></div>
        </div>
    `;
}

const selectTypeElement = document.getElementById("select-type");
const selectWeaknessesElement = document.getElementById("select-weaknesses");
const filterButtonElement = document.getElementById("filter");
filterButtonElement.addEventListener("click", callFilter);

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
    document.getElementById("math-pokemons").style.display = "block";
    showPercent(type, weaknesses);
    showPokemons();
    resetSelectElement();
}

selectTypeElement.addEventListener("change", filterNull);
selectWeaknessesElement.addEventListener("change", filterNull);

function filterNull() {
    if (selectTypeElement.selectedIndex !== 0) {
        filterButtonElement.removeAttribute("disabled", "");
    } else if (selectWeaknessesElement.selectedIndex !== 0) {
        filterButtonElement.removeAttribute("disabled", "");
    }
}

const allButtonElement = document.getElementById("showAll");
allButtonElement.addEventListener("click", showAll);

function showAll() {
    pokemons = POKEMON.pokemon;
    showPokemons();
    document.getElementById("math-pokemons").style.display = "none";
}

function resetSelectElement() {
    selectTypeElement.selectedIndex = 0;
    selectWeaknessesElement.selectedIndex = 0;
    filterButtonElement.setAttribute("disabled", "");
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
        pokemonImg.addEventListener('click', () => showFullPokemon(pokemonImg.dataset.name));
    }
}

const modal = document.getElementById("my-modal");

function showFullPokemon(nome) {
    modal.style.display = "block";
    const onePokemon = POKEMON.pokemon.find(pokemon => pokemon.name === nome);

    let nextEvolution = "";
    if(onePokemon.next_evolution) {
        nextEvolution = `<p><strong>Próxima evolução:</strong> ${onePokemon.next_evolution.map(elem => ` ${elem.name}`)} </p>`;
    }
    let prevEvolution = "";
    if(onePokemon.prev_evolution) {
        prevEvolution = `<p><strong>Evolução anterior:</strong> ${onePokemon.prev_evolution.map(elem => ` ${elem.name}`)} </p>`;
    }
    document.getElementById("text-modal").innerHTML = `
        <div>
            <img src="${onePokemon.img}"/>
            <h3>${onePokemon.num}</h3>
            <h3 class="pokemon-name">${onePokemon.name}</h3>
            <p><strong>Tipo:</strong> ${onePokemon.type}</p>
            <p><strong>Fraquezas:</strong> ${onePokemon.weaknesses}</p>
            <p><strong>Período:</strong> ${onePokemon.spawn_time}</p>     
            <p><strong>Altura:</strong> ${onePokemon.height}</p>
            <p><strong>Peso:</strong> ${onePokemon.weight}</p>
            ${prevEvolution}
            ${nextEvolution}
        </div>
    `;
}

const close = document.getElementById("close");

close.onclick = () => modal.style.display = "none";

window.onclick = (event) => {
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
