function renderPokemonHTMLTemplate(pokemons,i) {
    return `
    <div class="poke-card-class" id="poke-card${i}">
    <img id="left-arrow${i}" onclick="movePokemons(${i},'left')" class="left-poke d-none" src="img/left.png">
    <img id="right-arrow${i}" onclick="movePokemons(${i},'right')" class="right-poke d-none" src="img/right.png">
        <div onclick="showPokemon(${i})" class="upper-card-area ${pokemons[i].types[0].type.name}" id="upper-card-area${i}">
            <div class="name-id">
                ${pokemons[i]['species']['name']}
                <span>#${pokemons[i]['id']}</span>
            </div>
            <div id="types${i}">
            </div>
            <div class="information-poke-picture">
                <div id="heightWeight">
                    <span class="height">${(pokemons[i].height)/10} m</span> <br>
                    <span class="weight">${(pokemons[i].weight)/10} kg</span>
                </div>
                
            </div>
            <img class="poke-pic" src="${pokemons[i]['sprites']['other']['official-artwork'].front_default}">
            <img class="poke-ball-pic" src="img/pokemon-ball.png">
        </div>
        <div class="lower-card-area">
            <div class="stats-moves-text">
                <span onclick="managePersonalInformation(${i},'remove','add','add','remove','add','remove','remove')" id="stats-text${i}" class="base-span"> Base Stats </span>
                <span onclick="managePersonalInformation(${i},'add','remove','add','remove','remove','add','add')" id="moves-text${i}"> Moves </span>
                <span onclick="managePersonalInformation(${i},'add','remove','remove','add','add','remove','add')" id="ability-text${i}"> Abilities </span>
            </div>
                <div id="stats-container${i}" class="stats-container">
                </div>

                <div id="move-container${i}" class="d-none moves-display">
                </div>
                <div id="ability-container${i}" class="d-none ability-display">
                </div>
                <div class="exp-container" id="exp${i}">
                    <span class="text-container">
                        <span>Experience: <span class="exp-text"> ${ pokemons[i].base_experience}</span> </span> 
                     </span>
                </div>
        </div>
    </div>
    `
}

