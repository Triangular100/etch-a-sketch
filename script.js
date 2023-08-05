
function createGridCells(grid, gridSize, numGridCells) {
    grid.style.height = `${gridSize}vmin`;
    grid.style.width = `${gridSize}vmin`;

    let cellSize = gridSize / numGridCells;
    const cellDivs = createCells(numGridCells, cellSize);
    cellDivs.forEach(cell => grid.appendChild(cell));
}

function createCells(numGridCells, cellSize) {
    const cells = [];
    let numberCells = numGridCells ** 2;
    for (let i = 0; i < numberCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellSize}vmin`;
        cell.style.height = `${cellSize}vmin`;
        cell.addEventListener("click", fillCell);
        cells.push(cell);
    }

    return cells;
}

function fillCell(e) {
    const cell = e.target;
    console.log(cell);
}

// Creating a 16 by 16 grid
let gridSize = 80; // 80% of the viewport
let numGridCells = 16;
const gridDiv = document.querySelector("#sketch-container");
createGridCells(gridDiv, gridSize, numGridCells);