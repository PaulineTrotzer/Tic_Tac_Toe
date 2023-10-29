let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];


const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
    [0, 4, 8], [2, 4, 6], // diagonal
];


let currentPlayer = 'circle';

function init() {
    render();

}


function render() {
    const content = document.getElementById('content');
    const table = document.createElement('table');
    let cellIndex = 0;

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = cellIndex;
            cell.onclick = function () {
                handleCellClick(cell, index);
            };

            if (fields[cellIndex] === 'circle') {
                cell.innerHTML = createAnimatedCircle();
            } else if (fields[cellIndex] === 'cross') {
                cell.innerHTML = createAnimatedCross();
            }

            row.appendChild(cell);
            cellIndex++;
        }
        table.appendChild(row);
    }

    content.innerHTML = '';
    content.appendChild(table);
}

function handleCellClick(cell, index) {
    if (fields[index] == null) {
        if (currentPlayer === 'circle') {
            fields[index] = 'circle';
            cell.innerHTML = createAnimatedCircle();
            currentPlayer = 'cross';
        } else if (currentPlayer === 'cross') {
            fields[index] = 'cross';
            cell.innerHTML = createAnimatedCross();
            currentPlayer = 'circle';
        }
        cell.onclick = null; // Entferne das onclick-Attribut, um weitere Klicks zu verhindern
        /*NEW*/
        if (isGameFinished()) {// nach jedem Onclick folgt die Prüfung//
            const winCombination = getWinningCombination();
            drawWinningLine(winCombination);
        }

    }


    function isGameFinished() {
        return fields.every((field) => field !== null) || getWinningCombination() !== null;
        /* Für jede Zelle aus dem Array [fields] wird die Funktion, die in den Klammern steht, ausgeführt. = every*/
        /*Diese Funktion prüft, ob das jeweilige Feld ungleich 0 ist. Wenn alle Felder gefüllt sind, gibt 'every' = 'true' zurück*/
        /* Andernfalls - false*/

        /*Wenn false= es wird nach WINNING_COMBINATIONS gesucht und diese ggf. ausgegeben - ansonsten wird NULL zurückgegeben */
    }


    function getWinningCombination() {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
            const [a, b, c] = WINNING_COMBINATIONS[i];
            if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
                return WINNING_COMBINATIONS[i];
            }
        }
        return null;
    }
}

function createAnimatedCircle() {
    // Erstelle ein SVG-Element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    // Erstelle einen Kreis im SVG
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "35");
    circle.setAttribute("cy", "35");
    circle.setAttribute("r", "30");
    circle.setAttribute("fill", "transparent");
    circle.setAttribute("stroke", "#00B0EF");
    circle.setAttribute("stroke-width", "5");


    // Füge eine Animationsklasse hinzu
    circle.classList.add("circle-fill");

    // Füge den Kreis zum SVG-Element hinzu
    svg.appendChild(circle);

    return svg.outerHTML;
}




function createAnimatedCross() {
    // Erstelle ein SVG-Element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "70");
    svg.setAttribute("height", "70");

    // Erstelle die beiden Linien, die das Kreuz bilden
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line1.setAttribute("x1", "0");
    line1.setAttribute("y1", "70");
    line1.setAttribute("x2", "70");
    line1.setAttribute("y2", "0");
    line1.setAttribute("stroke", "#FFC000"); // Ändere die Farbe auf #FFC000
    line1.setAttribute("stroke-width", "5");

    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", "0");
    line2.setAttribute("y1", "0");
    line2.setAttribute("x2", "70");
    line2.setAttribute("y2", "70");
    line2.setAttribute("stroke", "#FFC000"); // Ändere die Farbe auf #FFC000
    line2.setAttribute("stroke-width", "5");


    // Füge die beiden Linien zum SVG-Element hinzu
    svg.appendChild(line1);
    svg.appendChild(line2);

    // Füge eine Animationsklasse hinzu
    line1.classList.add("cross-fill");
    line2.classList.add("cross-fill");

    return svg.outerHTML;
}

function drawWinningLine(combination) {
    const lineColor = '#ffffff';
    const lineWidth = 5;

    const startCell = document.querySelectorAll(`td`)[combination[0]];
    const endCell = document.querySelectorAll(`td`)[combination[2]];
    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const contentRect = document.getElementById('content').getBoundingClientRect();

    const lineLength = Math.sqrt(
        Math.pow(endRect.left - startRect.left, 2) + Math.pow(endRect.top - startRect.top, 2)
    );
    const lineAngle = Math.atan2(endRect.top - startRect.top, endRect.left - startRect.left);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.top = `${startRect.top + startRect.height / 2 - lineWidth / 2 - contentRect.top}px`;
    line.style.left = `${startRect.left + startRect.width / 2 - contentRect.left}px`;
    line.style.transform = `rotate(${lineAngle}rad)`;
    line.style.transformOrigin = `top left`;
    document.getElementById('content').appendChild(line);
}

function restartGame() {
     fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ];
    render();
}