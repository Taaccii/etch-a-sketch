const container = document.querySelector('.grid-container');
const selectionBtn = document.getElementById('grid-size');
const colorBtn = document.getElementById('color-change');
const cleanBtn = document.getElementById('reset');

let gridSize = 16;
let isDrawing = false;
let drawMode = null;
let rbgMode = false;

container.addEventListener('mousedown', (event) => {
  if (event.button === 0) {
    isDrawing = true;
    drawMode = 'draw';
  } else if (event.button === 2) {
    isDrawing = true;
    drawMode = 'erase';
  }
});

document.addEventListener('mouseup', () => {
  isDrawing = false;
  drawMode = null;
});

container.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

colorBtn.addEventListener('click', () => {
  rbgMode = !rbgMode;
  if (rbgMode) {
    colorBtn.textContent = 'Black 🖊️';
  } else colorBtn.textContent = 'Random Color 🎨';
});

cleanBtn.addEventListener('click', () => {
  createGrid(gridSize);
});

selectionBtn.addEventListener('click', () => {
  const userInput = prompt('Insert grid size (max 100)');

  if (userInput === null) {
    return;
  }

  const newSize = +userInput;

  if (newSize >= 1 && newSize <= 100) {
    gridSize = newSize;
    createGrid(newSize);
  } else {
    alert('Number not valid! Only number from 1 to 100.');
  }
});

function handleMouseEnter(event) {
  event.target.classList.add('hover-effect');

  if (isDrawing && drawMode === 'draw') {
    // Set color one time only
    if (!event.target.dataset.colored) {
      if (rbgMode) {
        event.target.style.backgroundColor = getRandomColor();
      } else {
        event.target.style.backgroundColor = 'hsl(270, 5%, 17%)';
      }
      event.target.dataset.colored = 'true';
    }

    // Increment opacity
    let currentOpacity = parseFloat(event.target.dataset.opacity) || 0;
    currentOpacity = Math.min(currentOpacity + 0.1, 1);
    event.target.dataset.opacity = currentOpacity;
    event.target.style.opacity = currentOpacity;

  } else if (isDrawing && drawMode === 'erase') {
    event.target.style.backgroundColor = 'white';
    event.target.dataset.opacity = 0;
    event.target.style.opacity = 1;
    event.target.dataset.colored = '';
  }
}

function handleMouseLeave(event) {
  event.target.classList.remove('hover-effect');
}

function getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 50%)`;
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
    square.dataset.opacity = 0;
    square.style.opacity = 1;

    square.addEventListener('mouseenter', handleMouseEnter);
    square.addEventListener('mouseleave', handleMouseLeave);

    // Left and right click
    square.addEventListener('mousedown', (event) => {
      // Right click = erase
      if (event.button === 2) {
        square.style.backgroundColor = 'white';
        square.style.opacity = 1;
        square.dataset.opacity = 0;
        square.dataset.colored = '';
        return;
      }

      // Left click = draw
      if (!square.dataset.colored) {
        if (rbgMode) {
          square.style.backgroundColor = getRandomColor();
        } else {
            square.style.backgroundColor = 'hsl(270, 5%, 17%)';
        }
        square.dataset.colored = 'true';
      }

      let currentOpacity = parseFloat(square.dataset.opacity) || 0;
      currentOpacity = Math.min(currentOpacity + 0.1, 1);
      square.dataset.opacity = currentOpacity;
      square.style.opacity = currentOpacity;
    });

    square.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      square.style.backgroundColor = 'white';
    });

    container.appendChild(square);
  }
}

createGrid(16);
