const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');
const counterDisplay = document.getElementById('counter');
let firstCard, secondCard;
let lockBoard = false;
let matches = 0;
let gridSize = 4; // Default grid size 4x4
let guessesLeft = calculateGuesses(gridSize);

function calculateGuesses(size) {
    const totalCards = size * size;
    let guesses = Math.round(totalCards * 1.25);
    if (guesses % 2 !== 0) {
        guesses += 1; // Ensure guessesLeft is even
    }
    return guesses;
}

async function fetchPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
    const data = await response.json();
    return data.results;
}

function getRandomPokemon(pokemonList, count) {
    const shuffled = pokemonList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createCard(content, isImage) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.pokemon = isImage ? content.name : content;

    const front = document.createElement('div');
    front.classList.add('front');

    if (isImage) {
        const img = document.createElement('img');
        img.src = content.image;
        img.alt = content.name;
        front.appendChild(img);
    } else {
        front.textContent = content;
    }

    const back = document.createElement('div');
    back.classList.add('back');

    // Set a random background color for the back of the card
    const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f', '#0ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    back.style.backgroundColor = randomColor;

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
    const totalCards = gridSize * gridSize;
    const pokemonPairs = totalCards / 2;
    const pokemon = await fetchPokemon();
    const randomPokemon = getRandomPokemon(pokemon, pokemonPairs);
    const pokemonWithImages = await Promise.all(randomPokemon.map(async p => {
        const response = await fetch(p.url);
        const data = await response.json();
        return { name: p.name, image: data.sprites.front_default };
    }));

    const cards = [];
    pokemonWithImages.forEach(pokemon => {
        cards.push(createCard(pokemon, true)); // Image card
        cards.push(createCard(pokemon.name, false)); // Name card
    });

    shuffle(cards).forEach(card => gameBoard.appendChild(card));

    // Set the grid size dynamically
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    gameBoard.style.gridTemplateRows = `repeat(${gridSize}, 100px)`;
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

    if (matches === (gridSize * gridSize) / 2) {
        setTimeout(() => {
            showConfetti();
            playWinSound();
            alert('Congratulations! You win!');
        }, 500);
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
    guessesLeft = calculateGuesses(gridSize);
    counterDisplay.textContent = `Guesses left: ${guessesLeft}`;
    lockBoard = false; // Reset lockBoard to allow playing again
    setupBoard();
}

function showConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    document.body.appendChild(confettiContainer);

    const colors = ['#ff0', '#f00', '#0f0', '#00f', '#f0f', '#0ff'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

function playWinSound() {
    const audio = new Audio('win-sound.mp3');
    audio.play();
}

document.getElementById('set-grid-size').addEventListener('click', () => {
    const newSize = parseInt(document.getElementById('grid-size').value);
    if (newSize >= 2 && newSize <= 10) {
        if ((newSize * newSize) % 2 === 0) {
            gridSize = newSize;
            resetGame();
        } else {
            alert('Please enter a grid size that results in an even number of cards.');
        }
    } else {
        alert('Please enter a grid size between 2 and 10.');
    }
});

resetButton.addEventListener('click', resetGame);

setupBoard();