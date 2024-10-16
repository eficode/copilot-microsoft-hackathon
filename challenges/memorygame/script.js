const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const counterDisplay = document.getElementById('counter');
const gridSize = 4; // 4x4 grid
let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let guessesLeft = 20;

async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await response.json();
    return data.results;
}

function getRandomPokemon(pokemonList, count) {
    const shuffled = pokemonList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.pokemon = pokemon.name;

    const front = document.createElement('div');
    front.classList.add('front');
    const img = document.createElement('img');
    img.src = pokemon.image;
    img.alt = pokemon.name;
    front.appendChild(img);

    const back = document.createElement('div');
    back.classList.add('back');

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', flipCard);

    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function setupBoard() {
    const pokemon = await fetchPokemon();
    const randomPokemon = getRandomPokemon(pokemon, 8);
    const pokemonWithImages = await Promise.all(randomPokemon.map(async p => {
        const response = await fetch(p.url);
        const data = await response.json();
        return { name: p.name, image: data.sprites.front_default };
    }));
    const cards = shuffle([...pokemonWithImages, ...pokemonWithImages]).map(createCard);
    cards.forEach(card => gameBoard.appendChild(card));
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.pokemon === secondCard.dataset.pokemon;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
    matches += 1;

    if (matches === gridSize * gridSize / 2) {
        setTimeout(() => alert('You win!'), 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
        decrementCounter();
    }, 1000);
}

function decrementCounter() {
    guessesLeft -= 1;
    counterDisplay.textContent = `Guesses left: ${guessesLeft}`;

    if (guessesLeft === 0) {
        alert('You have lost the game!');
        lockBoard = true;
    }
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function resetGame() {
    console.log('Reset button clicked');
    gameBoard.innerHTML = '';
    matches = 0;
    guessesLeft = 20;
    counterDisplay.textContent = `Guesses left: ${guessesLeft}`;
    lockBoard = false; // Reset lockBoard to allow playing again
    setupBoard();
}

resetButton.addEventListener('click', resetGame);

setupBoard();