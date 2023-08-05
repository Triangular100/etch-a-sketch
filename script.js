
function initializeGrid() {

    slider.value = numGridCells;

    let cellSize = maxSize / numGridCells;
    cellDivs = initializeCells(numGridCells, cellSize);

    gridDiv.innerHTML = "";
    cellDivs.forEach(cell => gridDiv.appendChild(cell));

    gridDiv.style.maxWidth = `${maxSize}vmin`;

}

function initializeCells(numGridCells, cellSize) {
    const cells = [];
    let numberCells = numGridCells ** 2;
    for (let i = 0; i < numberCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = `${cellSize}vmin`;
        cell.style.height = `${cellSize}vmin`;
        cell.addEventListener("mouseover", fillCell);
        cells.push(cell);
    }

    return cells;
}

function fillCell(e) {
    const cell = e.target;
    cell.style.backgroundColor = currentColor;
}

function resetGrid(e) {
    cellDivs.forEach(cell => {
        cell.style.backgroundColor = "white";
    });
}

function updateGrid(e) {
    numGridCells = e.target.value;
    initializeGrid();
}

let currentColor = "black";
let cellDivs = {};
let numGridCells = 16;   // Creating a 16 by 16 grid
const maxSize = 70;      // percentage of the viewport
const gridDiv = document.querySelector("#sketch-container");
const resetDiv = document.querySelector(".reset");
const slider = document.querySelector("#sketch-size");
initializeGrid();

resetDiv.addEventListener("click", resetGrid);
slider.addEventListener("click", updateGrid);