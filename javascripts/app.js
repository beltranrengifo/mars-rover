/* ======================
Rover
====================== */

var rovers = [
    {
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
console.log(rovers);

var rover;

function checkRover() {
    var radio0 = document.getElementById("radio0");
    var radio1 = document.getElementById("radio1");
    var RoverASelected = radio0.checked;
    var RoverBSelected = radio1.checked;
    if(radio0.checked) {
        rover = rovers[0];
        console.log(rover);
    }
    else if (radio1.checked) {
        rover = rovers[1];
        console.log(rover);
    }
    movementHistory('default D: ' + dir, rover);
    movementHistory('default X: ' + Xpos, rover);
    movementHistory('default Y: ' + Ypos, rover);
}


// var rover = {
//     direction: 'N',
//     position: {
//         x: 0,
//         y: 0
//     },
//     travelLog: []
// };
// cargar historia por defecto después del load inicial y comprobar el rover seleccionado por defecto
document.addEventListener('DOMContentLoaded', function() {
    checkRover();
}, false);

var dir = rover.direction;
var Xpos = rover.position.x;
var Ypos = rover.position.y;
console.log('dirección por defecto: ' + dir);
console.log('posición por defecto X: ' + Xpos);
console.log('posición por defecto Y: ' + Ypos);



/* ======================
funciones de movimiento
====================== */
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

function moveForward(rover,grid) {
    console.log('moveForward / posición previa: X ' + Xpos + ', Y ' + Ypos);
    // movementHistory('moveForward / previous pos: X ' + Xpos + ', Y ' + Ypos, rover);
    if (dir === 'N' && Ypos < 10) {
        if (grid[Xpos][Ypos+1] != 'obstacle') {
            Ypos += 1;
        } else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else if (dir === 'S' && Ypos > 0) {
        if (grid[Xpos][Ypos-1] != 'obstacle') {
            Ypos -= 1;
        } else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else if (dir === 'E' && Xpos < 10) {
        if (grid[Xpos+1][Ypos] != 'obstacle') {
            Xpos += 1;
        } else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else if (dir === 'W' && Xpos > 0) {
        if (grid[Xpos-1][Ypos] != 'obstacle') {
            Xpos -= 1;
        } else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else {
        movementHistory('Rover is beyond limits', rover);
    }
    console.log('moveForward / posición reasignada: X ' + Xpos + ', Y ' + Ypos);
    movementHistory('moveForward X ' + Xpos + ', Y ' + Ypos, rover);
}

function moveBackward(rover) {
    console.log('moveBackward / posición previa: X ' + Xpos + ', Y ' + Ypos);
    var obstacle = grid[Xpos][Ypos];
    // movementHistory('moveBackward / previous pos: X ' + Xpos + ', Y ' + Ypos, rover);
    if (dir === 'N' && Ypos > 0) {
        if (grid[Xpos][Ypos-1] != 'obstacle') {
            Ypos -= 1;
        }
        else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else if (dir === 'S' && Ypos < 10) {
        if (grid[Xpos][Ypos+1] != 'obstacle') {
            Ypos += 1;
        }
        else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else if (dir === 'E' && Xpos > 0) {
        if (grid[Xpos][Ypos-1] != 'obstacle') {
            Xpos -= 1;
        }
        else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else if (dir === 'W' && Xpos < 10) {
        if (grid[Xpos][Ypos+1] != 'obstacle') {
            Xpos += 1;
        }
        else {
            movementHistory('Rover has encountered an obstacle. Try another direction!', rover);
        }
    } else {
        movementHistory('Rover is beyond limits', rover);
    }
    console.log('moveBackward / posición reasignada: X ' + Xpos + ', Y ' + Ypos);
    movementHistory('moveBackward X ' + Xpos + ', Y ' + Ypos, rover);
}

/* ======================
procesar sequencia de texto / movimientos
====================== */
function processTextSequence() {
    var movementSequence = document.getElementById('movement-sequence').value;
    var movementSequenceLowercase = movementSequence.toLowerCase();
    for (var i = 0; i < movementSequenceLowercase.length; i++) {
        var command = movementSequenceLowercase.charAt(i);
        if (command === 'f') {
            moveForward(rover);
        } else if (command === 'b') {
            moveBackward(rover);
        } else if (command === 'l') {
            turnLeft(rover);
        } else if (command === 'r') {
            turnRight(rover);
        } else {
            modalAviso();
        }
    }
}



/* ======================
eventos de teclado
====================== */
window.addEventListener("keyup", function(event) {
    var key = event.key;
    console.log(key);
    switch (key) {
        case 'ArrowUp':
            moveForward(rover,grid);
            break;
        case 'ArrowDown':
            moveBackward(rover,grid);
            break;
        case 'ArrowLeft':
            turnLeft(rover,grid);
            break;
        case 'ArrowRight':
            turnRight(rover,grid);
            break;
    }
});

/* ======================
crear history y print travel log
====================== */
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

/* ======================
lanzar modal aviso
====================== */
function modalAviso() {
    var modal = document.getElementById('modal-aviso')
    modal.style.display = 'block';
}
/* ======================
abort mission
====================== */
function reloadApp() {
    location.reload();
}

/* ======================
GRID
====================== */
var grid = [
    [false, false, 'obstacle', false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, 'obstacle', false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, 'obstacle', false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, 'obstacle', false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, 'obstacle', false, false],
    ['obstacle', false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false, false],
    [false, false, false, 'obstacle', false, false, false, false, false, false]
];

// function createGridMap(grid) {
//     var gridWrapper = document.getElementById("grid-wrapper");
//     var sector = document.createElement("div");
//     for (var i = 0; i < gird.length; i++) {
//         gird[i]
//     }
//     gridWrapper.appendChild(sector);
// }
