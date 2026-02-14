
const container = document.querySelector('.grid-container');
const selectionBtn = document.querySelector('.grid-selection');

let gridSize = 16;
let isDrawing = false;


container.addEventListener('mousedown', () => {
  isDrawing = true;   
});

document.addEventListener('mouseup', () => {
  isDrawing = false;
});


selectionBtn.addEventListener('click', () => {
  const userInput = prompt('Insert grid size (max 100)')

  if (userInput === null) {
    return;
  }

  const newSize = +userInput;

  if (newSize >= 1 && newSize <= 100) {
    createGrid(newSize);
  } else {
    alert("Number not valid! Only number from 1 to 100.")
  }

});

function handleMouseEnter(event) {
  event.target.classList.add('hover-effect');

  if (isDrawing) {
    event.target.style.backgroundColor = 'hsl(270, 5%, 17%)'
  }
}

function handleMouseLeave(event) {
  event.target.classList.remove('hover-effect');
}

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

    square.addEventListener('mouseenter', handleMouseEnter);
    square.addEventListener('mouseleave', handleMouseLeave);

    square.addEventListener('mousedown', () => {
      square.style.backgroundColor = 'hsl(270, 5%, 17%)';
    });
    
    container.appendChild(square);
  }
}




createGrid(16);