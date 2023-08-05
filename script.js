
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
    if (selectedDiv.id === "rainbow-color") {
        nextColor();
    }
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

function select(option) {
    selectedDiv.classList.add("unselected");
    option.classList.remove("unselected");
    selectedDiv = option;

    randomColorDiv.style.backgroundColor = "";
    rainbowColorDiv.style.backgroundColor = "";
}

function toggleBlackWhite(e) {
    // Default to black if mode was changed to black/white
    if (selectedDiv.id !== "black-white") {
        select(e.target);
        e.target.classList.add("black");
        e.target.classList.remove("white");
        currentColor = "black";
        return;
    }

    // Toggle to black or white
    e.target.classList.toggle("white");
    if (e.target.classList.toggle("black")) {
        currentColor = "black";
        return;
    }
    currentColor = "white";
}

function toggleRandomColor(e) {
    if (selectedDiv.id !== "random-color") {
        select(e.target);
    }
    randomColor();
    e.target.style.backgroundColor = currentColor;
}

function randomColor() {
    let hue = Math.floor(Math.random() * 360);
    let sat = Math.floor(Math.random() * 61) + 40;
    let light = Math.floor(Math.random() * 81) + 20;
    currentColor = `hsl(${hue}, ${sat}%, ${light}%)`;
}

function toggleRainbowColor(e) {
    if (selectedDiv.id !== "rainbow-color") {
        select(e.target);
        currentHue = 0;
    }

    nextColor();
}

function nextColor() {
    currentHue = (currentHue + 1) % 360;
    currentColor = `hsl(${currentHue}, ${100}%, ${50}%)`;
    rainbowColorDiv.style.backgroundColor = currentColor;
}

let currentColor = "black";
let currentHue = 0;
let cellDivs = [];
let numGridCells = 16;   // Creating a 16 by 16 grid
const maxSize = 70;      // percentage of the viewport
const gridDiv = document.querySelector(".sketch-container");
const slider = document.querySelector(".sketch-size-slider");
const resetDiv = document.querySelector(".reset");
const blackWhiteDiv = document.querySelector(".black-white");
const randomColorDiv = document.querySelector(".random");
const rainbowColorDiv = document.querySelector(".rainbow");
initializeGrid();

let selectedDiv = blackWhiteDiv;
resetDiv.addEventListener("click", resetGrid);
slider.addEventListener("click", updateGrid);
blackWhiteDiv.addEventListener("click", toggleBlackWhite);
randomColorDiv.addEventListener("click", toggleRandomColor);
rainbowColorDiv.addEventListener("click", toggleRainbowColor);