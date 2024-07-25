const totalCards = 12;
const availableCards = ['A', 'K', 'Q', 'J'];
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let currentAttempts = 0;

let cardTemplate = '<div class="card"><div class="back"></div><div class="face"></div></div>';

function activate(e) {
    if (currentMove < 2) {
        const card = e.currentTarget;
        if ((!selectedCards[0] || selectedCards[0] !== card) && !card.classList.contains('active')) {
            card.classList.add('active');
            selectedCards.push(card);

            if (++currentMove == 2) {
                currentAttempts++;
                document.querySelector('#stats').innerHTML = currentAttempts + ' intentos';

                if (selectedCards[0].querySelector('.face').innerHTML === selectedCards[1].querySelector('.face').innerHTML) {
                    selectedCards = [];
                    currentMove = 0;
                    confetti();
                } else {
                    setTimeout(() => {
                        selectedCards.forEach(card => card.classList.remove('active'));
                        selectedCards = [];
                        currentMove = 0;
                    }, 600);
                }
            }
        }
    }
}

function randomValue() {
    while (true) {
        let rnd = Math.floor(Math.random() * (totalCards / 2));
        let count = valuesUsed.filter(value => value === rnd).length;
        if (count < 2) {
            valuesUsed.push(rnd);
            return rnd;
        }
    }
}

function getFaceValue(value) {
    return availableCards[value];
}

function setupGame() {
    const gameContainer = document.querySelector('#game');
    gameContainer.innerHTML = '';  // Limpiar el contenedor de juego

    cards = [];
    selectedCards = [];
    valuesUsed = [];
    currentMove = 0;
    currentAttempts = 0;
    document.querySelector('#stats').innerHTML = '0 intentos';

    for (let i = 0; i < totalCards; i++) {
        let div = document.createElement('div');
        div.innerHTML = cardTemplate;
        cards.push(div.firstChild);
        gameContainer.append(cards[i]);
        let value = randomValue();
        cards[i].querySelector('.face').innerHTML = getFaceValue(value);
        cards[i].addEventListener('click', activate);
    }
}

// Configurar el botón de salida
document.querySelector('#exitButton').addEventListener('click', () => {
   Swal.fire({
       title: '¿Quieres salir del juego?',
       showCancelButton: true,
       confirmButtonText: 'Sí',
       cancelButtonText: 'No',
   }).then((result) => {
       if (result.isConfirmed) {
           try {
               setupGame();  // Reiniciar el juego
           } catch (error) {
               console.error('Error al reiniciar el juego:', error);
               Swal.fire('Error', 'No se pudo reiniciar el juego. Inténtalo de nuevo.', 'error');
           }
       }
   });
});

// Inicializar el juego al cargar la página
setupGame();