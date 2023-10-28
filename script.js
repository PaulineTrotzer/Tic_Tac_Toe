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

const win = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Gewinnlinien
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Gewinnlinien
    [0, 4, 8], [2, 4, 6], // Diagonale Gewinnlinien
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



