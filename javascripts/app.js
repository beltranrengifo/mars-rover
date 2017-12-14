/* ========================================================
ROVERS
======================================================== */
var rovers = [{
        id: 1,
        name: 'Opportunity',
        direction: 'N',
        position: {
            x: 0,
            y: 0
        },
        travelLog: []
    },
    {
        id: 2,
        name: 'Curiosity',
        direction: 'S',
        position: {
            x: 9,
            y: 9
        },
        travelLog: []
    }
];

/* ========================================================
variables globales
======================================================== */
var rover;
var roverName;
var dir;
var Xpos;
var Ypos;
var obstacleText = 'Rover has encountered an obstacle. Try another direction!';
var beyondLimitsText = 'Rover is beyond limits';
//vars para posicionar los rovers
var posRov1X = rovers[0].position.x;
var posRov1Y = rovers[0].position.y;
var posRov2X = rovers[1].position.x;
var posRov2Y = rovers[1].position.y;
//tecla
var key;

/* ========================================================
DETECTAR ROVER CON LOS BOTONES DE SELECCIÓN
======================================================== */

function activateRover(btn) {
    //borrar clase active
    var btns = document.querySelectorAll('.rover-change-button');
    for (var i = 0; i < btns.length; i++) {
        btns[i].classList.remove('active');
    }
    //add clase a this btn
    btn.classList.add("active");

    //lanza la reasignación de rover como objeto en las variables
    whichRover();
    autoScrollList();
}

/* ========================================================
ASIGNAR ROVER ACTIVO A VARIABLES + POSICIÓN POR DEFECTO
======================================================== */
function whichRover() {
    var changeRoverBtn1 = document.getElementById("select-rover-1");
    var changeRoverBtn2 = document.getElementById("select-rover-2");
    if (changeRoverBtn1.classList.contains('active')) {
        rover = rovers[0];
        dir = rover.direction;
        Xpos = rover.position.x;
        Ypos = rover.position.y;
        roverName = rover.name;
    } else if (changeRoverBtn2.classList.contains('active')) {
        rover = rovers[1];
        dir = rover.direction;
        Xpos = rover.position.x;
        Ypos = rover.position.y;
        roverName = rover.name;
    }

    console.log('dirección por defecto: ' + dir);
    console.log('Rover: ' + roverName);
    console.log('dirección por defecto: ' + dir);
    console.log('posición por defecto X: ' + Xpos);
    console.log('posición por defecto Y: ' + Ypos);
    movementHistory('Active Rover: ' + roverName, rover);
    movementHistory('default D: ' + dir, rover);
    movementHistory('default X: ' + Xpos, rover);
    movementHistory('default Y: ' + Ypos, rover);
    //print el rover activo
    var selectedRoverText = document.getElementById("selected-rover");
    selectedRoverText.innerHTML = "";
    selectedRoverText.appendChild(document.createTextNode(rover.name));
}

/* ========================================================
POSICIONAMIENTO DEL ROVER EN COORDENADAS
======================================================== */
function turnLeft(rover) {
    console.log('turnLeft / dirección previa: ' + dir);
    // movementHistory('turnLeft D: ' + dir, rover);
    switch (dir) {
        case 'N':
            dir = 'W';
            break;
        case 'S':
            dir = 'E';
            break;
        case 'E':
            dir = 'N';
            break;
        case 'W':
            dir = 'S';
            break;
    }
    console.log('turnleft / dirección reasignada: ' + dir);
    movementHistory('turnLeft D: ' + dir, rover);
}

function turnRight(rover) {
    console.log('turnRight / dirección previa: ' + dir);
    // movementHistory('turnRight / previous dir: ' + dir, rover);
    switch (dir) {
        case 'N':
            dir = 'E';
            break;
        case 'S':
            dir = 'W';
            break;
        case 'E':
            dir = 'S';
            break;
        case 'W':
            dir = 'N';
            break;
    }
    console.log('turnRight / dirección reasignada: ' + dir);
    movementHistory('turnRight D: ' + dir, rover);
}

function moveForward(rover) {
    console.log('moveForward / posición previa: X ' + Xpos + ', Y ' + Ypos);
    var obstacle = grid[Xpos][Ypos];
    // movementHistory('moveForward / previous pos: X ' + Xpos + ', Y ' + Ypos, rover);
    if (dir === 'N' && Ypos < 9) {
        if (grid[Xpos][Ypos + 1] != 'obstacle') {
            Ypos += 1;
            moveRoverGraphicFW();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else if (dir === 'S' && Ypos > 0) {
        if (grid[Xpos][Ypos - 1] != 'obstacle') {
            Ypos -= 1;
            moveRoverGraphicBW();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else if (dir === 'E' && Xpos < 9) {
        if (grid[Xpos + 1][Ypos] != 'obstacle') {
            Xpos += 1;
            moveRoverGraphicRight();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else if (dir === 'W' && Xpos > 0) {
        if (grid[Xpos - 1][Ypos] != 'obstacle') {
            Xpos -= 1;
            moveRoverGraphicLeft();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else {
        movementHistory(beyondLimitsText, rover);
    }
    console.log('moveForward / posición reasignada: X ' + Xpos + ', Y ' + Ypos);
    movementHistory('moveForward X ' + Xpos + ', Y ' + Ypos, rover);
}

function moveBackward(rover) {
    console.log('moveBackward / posición previa: X ' + Xpos + ', Y ' + Ypos);
    var obstacle = grid[Xpos][Ypos];
    // movementHistory('moveBackward / previous pos: X ' + Xpos + ', Y ' + Ypos, rover);
    if (dir === 'N' && Ypos > 0) {
        if (grid[Xpos][Ypos - 1] != 'obstacle') {
            Ypos -= 1;
            moveRoverGraphicBW();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else if (dir === 'S' && Ypos < 9) {
        if (grid[Xpos][Ypos + 1] != 'obstacle') {
            Ypos += 1;
            moveRoverGraphicFW();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else if (dir === 'E' && Xpos > 0) {
        if (grid[Xpos][Ypos - 1] != 'obstacle') {
            Xpos -= 1;
            moveRoverGraphicLeft();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else if (dir === 'W' && Xpos < 9) {
        if (grid[Xpos][Ypos + 1] != 'obstacle') {
            Xpos += 1;
            moveRoverGraphicRight();
        } else {
            movementHistory(obstacleText, rover);
        }
    } else {
        movementHistory(beyondLimitsText, rover);
    }
    console.log('moveBackward / posición reasignada: X ' + Xpos + ', Y ' + Ypos);
    movementHistory('moveBackward X ' + Xpos + ', Y ' + Ypos, rover);
}


/* ========================================================
PROCESAR SEQUENCIA DE CARACTERES
======================================================== */
function processTextSequence() {
    var movementSequence = document.getElementById('movement-sequence').value;
    var movementSequenceLowercase = movementSequence.toLowerCase();
    for (var i = 0; i < movementSequenceLowercase.length; i++) {
        var command = movementSequenceLowercase.charAt(i);
        if (command === 'f') {
            moveForward(rover, grid);
        } else if (command === 'b') {
            moveBackward(rover, grid);
        } else if (command === 'l') {
            turnLeft(rover, grid);
        } else if (command === 'r') {
            turnRight(rover, grid);
        } else {
            modalAviso();
        }
    }
    autoScrollList();
}

//autoscroll en la lista de historia
function autoScrollList() {
    var bottomList = document.getElementById("history-wrapper");
    bottomList.scrollTop = bottomList.scrollHeight;
}

/* ========================================================
LOG
======================================================== */
function movementHistory(movement, rover) {
    var ul = document.getElementById("history-ul");
    var li = document.createElement("li");
    //timestamp
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();
    today = hh + ':' + min + ':' + sec + ' | ' + dd + '/' + mm + '/' + yyyy;
    //crear nodos
    li.appendChild(document.createTextNode(movement + ' | ' + today));
    ul.appendChild(li);
    rover.travelLog.push(movement);
    // console.log(rover.travelLog);
}

function printTraveLog(rover) {
    var li = document.createElement("li");
    var travelLogContainer = document.getElementById("travel-log-print");
    li.appendChild(document.createTextNode(rover.travelLog));
    travelLogContainer.appendChild(li);
}

/* ========================================================
MODAL
======================================================== */

function modalAviso() {
    var modal = document.getElementById('modal-aviso');
    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.getElementById('modal-aviso');
    modal.style.display = 'none';
}

/* ========================================================
ABORT MISSION
======================================================== */
function reloadApp() {
    location.reload();
}

/* ========================================================
GRID
======================================================== */
var grid = [
    ['rover', false, 'obstacle', false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, 'obstacle', false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, 'obstacle', false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, 'obstacle', false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, 'obstacle', false, false],
    ['obstacle', false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, 'obstacle', false, false, false, false, false, 'rover']
];

function generateGrid() {

    //grid wrapper html object
    var gridContainer = document.getElementById('grid-wrapper');
    //loop para generar filas (x)
    for (var x = 0; x < grid.length; x++) {
        var row = document.createElement("div");
        row.className = 'grid-row';
        row.setAttribute("id", "x" + x + "");
        gridContainer.appendChild(row);
        //loop para generar columnas (y)
        for (var y = 0; y < grid[x].length; y++) {
            var rowX = document.getElementById('x' + x + '');
            var col = document.createElement("div");
            if (grid[x][y] === 'obstacle') {
                // si tiene obstaculo
                col.className = 'grid-col obstacle';
            } else if (grid[x][y] === 'rover') {
                //si hay rover definido en el objeto rovers
                col.className = 'grid-col rover';
            } else {
                col.className = 'grid-col';
            }
            col.setAttribute("id", "x" + x + "y" + y);
            rowX.appendChild(col);
        }
    }
}


/* ========================================================
MOVE THE ROVER EN GRID GRÁFICAMENTE
======================================================== */
function moveRoverGraphicFW() {
    var lastCell = document.getElementById('x' + [Xpos] + 'y' + [Ypos - 1]);
    var nextCell = document.getElementById('x' + [Xpos] + 'y' + [Ypos]);
    lastCell.classList.remove("rover");
    nextCell.classList.add("rover");
}

function moveRoverGraphicBW() {
    var lastCell = document.getElementById('x' + [Xpos] + 'y' + [Ypos + 1]);
    var nextCell = document.getElementById('x' + [Xpos] + 'y' + [Ypos]);
    lastCell.classList.remove("rover");
    nextCell.classList.add("rover");
}

function moveRoverGraphicLeft() {
    var lastCell = document.getElementById('x' + [Xpos + 1] + 'y' + [Ypos]);
    var nextCell = document.getElementById('x' + [Xpos] + 'y' + [Ypos]);
    lastCell.classList.remove("rover");
    nextCell.classList.add("rover");
}

function moveRoverGraphicRight() {
    var lastCell = document.getElementById('x' + [Xpos - 1] + 'y' + [Ypos]);
    var nextCell = document.getElementById('x' + [Xpos] + 'y' + [Ypos]);
    lastCell.classList.remove("rover");
    nextCell.classList.add("rover");
}


/* ========================================================
ON LOAD
======================================================== */
document.addEventListener('DOMContentLoaded', function() {
    whichRover();
    generateGrid();
}, false);


/* ========================================================
EVENTOS TECLADO
======================================================== */
//prevenir scroll en flechas de teclado
window.addEventListener("keydown", function(e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

// funciones en keyup para el rover

window.addEventListener("keyup", function(event) {
    key = event.key;
    console.log(key);
    switch (key) {
        case 'ArrowUp':
            moveForward(rover);
            autoScrollList();
            break;
        case 'ArrowDown':
            moveBackward(rover);
            autoScrollList();
            break;
        case 'ArrowLeft':
            turnLeft(rover);
            autoScrollList();
            break;
        case 'ArrowRight':
            turnRight(rover);
            autoScrollList();
            break;
    }
});
