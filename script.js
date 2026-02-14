
const container = document.querySelector('.grid-container');
const button = document.querySelector('.grid-selection');

let gridSize = 16;

function createGrid(size) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const totalSquares = size * size;

  for (let i = 0; i < totalSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('grid-square');

    const squareSize = 960 / size;
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';

    square.addEventListener('mouseenter', () => {
      square.classList.add('hover-effect');
      
      setTimeout(() => {
        square.classList.remove('hover-effect');
      }, 300);
    });

    

    container.appendChild(square);
  }



}

createGrid(16);