let apiPokemons;
let currentPokemon;
let pokemons = [];
let currentIndex = 0;
let nextIndex = 0;
let firstRender = false;
let searchPokemonsNameArray = [];
let resultSearchedPokemons;
let searchedPokemonsArray = [];
let openedPokemons = [];
let add = 0;
let checkIfArrayCountIsAvailable = 0;

async function loadPokemonAPI() {
    document.getElementById('more-btn').classList.add('d-none');
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    let response = await fetch(url);
    apiPokemons = await response.json();
    console.log(apiPokemons);
    await renderPokemons();
}

async function renderPokemons() {
    let main = document.getElementById('main-pokedex');
    if (!firstRender) { main.innerHTML = ''; }
    for (currentIndex = nextIndex; currentIndex < 20 + nextIndex; currentIndex++) {
        document.getElementById('more-btn').disabled = true;
        let url = `https://pokeapi.co/api/v2/pokemon/${currentIndex + 1}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokemons.push(currentPokemon);
        openedPokemons.push(currentPokemon);
        main.innerHTML += renderPokemonHTMLTemplate(pokemons, currentIndex);
        renderAllInformation(pokemons, currentIndex);
    }
    firstRender = true;
    document.getElementById('more-btn').classList.remove('d-none');
    document.getElementById('more-btn').disabled = false;
}

async function searchPokemon() {
    document.getElementById('search-button').disabled = true;
    searchPokemonsNameArray = [];
    searchedPokemonsArray = [];
    let input = document.getElementById('input-field').value;
    if (input == '') { ifSearchIsEmpty(); }
    else { ifSearchNotEmpty(input); }
}

function ifSearchNotEmpty(input) {
    document.getElementById('more-btn').classList.add('d-none');
    document.getElementById('search-button').disabled = true;
    openedPokemons = [];
    closing();
    for (let i = 0; i < apiPokemons.results.length; i++) {
        let element = apiPokemons.results[i].name;
        if (element.toLowerCase().startsWith(input)) { searchPokemonsNameArray.push(element); }
    }
    renderSearchedPokemons();
}

async function ifSearchIsEmpty() {
    nextIndex = 0;
    currentIndex = 0;
    pokemons = [];
    openedPokemons = [];
    closing();
    document.getElementById('main-pokedex').innerHTML = '';
    await renderPokemons();
    document.getElementById('search-button').disabled = false;
}

async function renderSearchedPokemons() {
    let main = document.getElementById('main-pokedex');
    main.innerHTML = '';
    for (let i = 0; i < searchPokemonsNameArray.length; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${searchPokemonsNameArray[i]}`;
        let response = await fetch(url);
        resultSearchedPokemons = await response.json();
        searchedPokemonsArray.push(resultSearchedPokemons);
        openedPokemons.push(resultSearchedPokemons);
        main.innerHTML += renderPokemonHTMLTemplate(searchedPokemonsArray, i);
        renderAllInformation(searchedPokemonsArray, i);
    }
    document.getElementById('search-button').disabled = false;
}

function renderAllInformation(pokemons, i) {
    renderTypes(pokemons, i);
    renderStats(pokemons, i);
    renderMoves(pokemons, i);
    renderAbility(pokemons, i);
}

function renderTypes(pokemons, i) {
    for (let j = 0; j < pokemons[i].types.length; j++) { document.getElementById(`types${i}`).innerHTML += `<span class="abilities">${pokemons[i].types[j].type.name}</span>`; }
}

function renderStats(pokemons, i) {
    for (let j = 0; j < pokemons[i].stats.length; j++) { document.getElementById(`stats-container${i}`).innerHTML += renderStatsHTML(pokemons, i, j) }
}
function renderStatsHTML(pokemons, i, j) {
    return `
    <div class="stats">
        <span class="stats-text">${pokemons[i].stats[j].stat.name}</span>
        <span class="stats-amount">${pokemons[i].stats[j].base_stat}</span>
        <div class="progress" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar" style="width: ${pokemons[i].stats[j].base_stat}%"></div>
        </div>
    </div>`
}

function renderMoves(pokemons, i) {
    for (let j = 0; j < pokemons[i].moves.length; j++) {
        document.getElementById(`move-container${i}`).innerHTML += `<div class="moves"> <div class="move">${pokemons[i].moves[j].move.name}</div> </div>`
    }
}

function renderAbility(pokemons, i) {
    for (let j = 0; j < pokemons[i].abilities.length; j++) {
        document.getElementById(`ability-container${i}`).innerHTML += `<span class="ability">${pokemons[i].abilities[j].ability.name}</span>`
    }
}

function managePersonalInformation(i,param1, param2, param3, param4, param5, param6, param7) {
    for (let j = 0; j < pokemons.length; j++) {
        document.getElementById(`stats-container${i}`).classList[param1]('d-none');
        document.getElementById(`stats-text${i}`).classList[param2]('base-span');
        document.getElementById(`ability-container${i}`).classList[param3]('d-none');
        document.getElementById(`ability-text${i}`).classList[param4]('base-span');
        document.getElementById(`move-container${i}`).classList[param5]('d-none');
        document.getElementById(`moves-text${i}`).classList[param6]('base-span');
        document.getElementById(`exp${i}`).classList[param7]('d-none');
    }
}

async function loadMore() {
    document.getElementById('search-button').disabled = true;
    nextIndex += 20;
    await renderPokemons();
    document.getElementById('search-button').disabled = false;
}

function showPokemon(i) {
    document.getElementById('background-onFocused').classList.add('background');
    document.getElementById('background-onFocused').classList.remove('d-none');
    for (let k = 0; k < openedPokemons.length; k++) {
        document.getElementById(`upper-card-area${i}`).classList.add('remove-box-shadow');
        let card = document.getElementById(`poke-card${i}`);
        card.classList.add('poke-card-boxShadow');
        let arrowLeft = document.getElementById(`left-arrow${i}`);
        let arrowRight = document.getElementById(`right-arrow${i}`);
        arrowLeft.classList.remove('d-none');
        arrowRight.classList.remove('d-none');
        card.classList.add('focused-card');
    }
    checkIfArrayCountIsAvailable = i;
}

function movePokemons(i, input) {
    if (input == 'right' && checkIfArrayCountIsAvailable != openedPokemons.length - 1) {
        for (let k = 0; k < openedPokemons.length; k++) { manageMovePokemons(k, i, i + 1) } checkIfArrayCountIsAvailable = i + 1;
    }
    else if (input == 'left' && checkIfArrayCountIsAvailable != 0) {
        for (let k = 0; k < openedPokemons.length; k++) { manageMovePokemons(k, i, i - 1); } checkIfArrayCountIsAvailable = i - 1;
    }
}

function manageMovePokemons(k, i, otherI) {
    document.getElementById(`upper-card-area${k}`).classList.add('remove-box-shadow');
    let card = document.getElementById(`poke-card${i}`);
    let nextCard = document.getElementById(`poke-card${otherI}`);
    let arrowLeft = document.getElementById(`left-arrow${otherI}`);
    let arrowRight = document.getElementById(`right-arrow${otherI}`);
    arrowLeft.classList.remove('d-none');
    arrowRight.classList.remove('d-none');
    card.classList.remove('focused-card');
    card.classList.remove('poke-card-boxShadow');
    nextCard.classList.add('focused-card');
    nextCard.classList.add('poke-card-boxShadow');
}

function closing() {
    document.getElementById('background-onFocused').classList.remove('background');
    document.getElementById('background-onFocused').classList.add('d-none');
    for (let k = 0; k < openedPokemons.length; k++) {
        document.getElementById(`upper-card-area${k}`).classList.remove('remove-box-shadow');
        let card = document.getElementById(`poke-card${k}`);
        card.classList.remove('poke-card-boxShadow');
        let arrowLeft = document.getElementById(`left-arrow${k}`);
        let arrowRight = document.getElementById(`right-arrow${k}`);
        arrowLeft.classList.add('d-none');
        arrowRight.classList.add('d-none');
        card.classList.remove('focused-card');
    }
}