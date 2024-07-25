// script.js

const cardGrid = document.querySelector('.card-grid');
const startGameButton = document.querySelector('start-game');
const scoreElement = document.querySelector('#score');
let cards = [];
let flippedCards = [];
let score = 0;

// Crear cartas
for (let i = 0; i < 16; i++) {
  const card = document.createElement('div');
  card.className = 'card';
  card.dataset.id = i;
  card.innerHTML = `<img src="img/img${i % 8}.png" alt="Imagen ${i % 8}">`;
  cardGrid.appendChild(card);
  cards.push(card);
}

// Mezclar cartas
cards = cards.sort(() => Math.random() - 0.5);

// Agregar evento de click a las cartas
cards.forEach((card) => {
  card.addEventListener('click', handleCardClick);
});

// Iniciar juego
startGameButton.addEventListener('click', startGame);

function startGame() {
  // Resetear juego
  flippedCards = [];
  score = 0;
  scoreElement.textContent = `Puntaje: 0`;
  
  // Mezclar cartas nuevamente
  cards = cards.sort(() => Math.random() - 0.5);
  
  // Mostrar cartas
  cards.forEach((card) => {
    card.classList.remove('flipped');
  });
}

function handleCardClick(event) {
  const card = event.target;
  if (flippedCards.length < 2) {
    card.classList.add('flipped');
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      setTimeout(checkCards, 1000);
    }
  }
}

function checkCards() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
  if (card1.dataset.id === card2.dataset.id) {
    score++;
    flippedCards = [];
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    flippedCards = [];
  }
  scoreElement.textContent = `Puntaje: ${score}`;
}