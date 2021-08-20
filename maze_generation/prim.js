let Prim = {
    walls: [],
    wall_stack: [],
    naked_cells: [],
    current_wall: {
        i1: -1,
        j1: -1,
        i2: -1,
        j2: -1,
    }
}

function updatePrim() {
    if (Prim.wall_stack.length > 0) {
        let random_wall = randomElement(Prim.wall_stack);
        setCurrentWall(random_wall);
        let i1, j1, i2, j2;
        let cell1, cell2;

        if (random_wall.i1 == random_wall.i2) {
            i1 = random_wall.i1 - 1;
            j1 = random_wall.j1;
            i2 = random_wall.i1;
            j2 = random_wall.j1;
        }
        else if (random_wall.j1 == random_wall.j2) {
            i1 = random_wall.i1;
            j1 = random_wall.j1 - 1;
            i2 = random_wall.i1;
            j2 = random_wall.j1;
        }
        
        cell1 = getPrimCell(i1, j1);
        cell2 = getPrimCell(i2, j2);

        console.log(cell1, cell2, random_wall);

        if (cell1.visited && !cell2.visited) {
            deletePrimWall(random_wall);
            cell2.visited = true;
            addSurroundWalls(cell2);
        }
        else if (!cell1.visited && cell2.visited) {
            deletePrimWall(random_wall);
            cell1.visited = true;
            addSurroundWalls(cell1);
        }
        Prim.wall_stack = removeElement(Prim.wall_stack, random_wall);
    }
    else {
        Prim.current_wall.i1 = -1;
        Prim.current_wall.j1 = -1;
        Prim.current_wall.i2 = -1;
        Prim.current_wall.j2 = -1;
    }
}

function renderPrim() {
    for(let cell of Prim.naked_cells) {
        cell.render();
    }
    for (let wall of Prim.walls) {
        wall.render();
    }
    drawPrimCurrentWall();
}

function initPrim() {
    clearPrim();

    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            Prim.naked_cells.push(new NakedCell(i, j));
        }
    }

    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j <= num_cols; j++) {
            Prim.walls.push(new Wall(i, j, i + 1, j));
        }
    }

    for (let j = 0; j < num_cols; j++) {
        for (let i = 0; i <= num_rows; i++) {
            Prim.walls.push(new Wall(i, j, i, j + 1));
        }
    }

    let random_cell = randomElement(Prim.naked_cells);
    random_cell.visited = true;
    addSurroundWalls(random_cell);
}

function clearPrim() {
    Prim.walls = [];
    Prim.wall_stack = [];
    Prim.naked_cells = [];
}

function addSurroundWalls(cell) {
    let i = cell.i, j = cell.j;

    for (let wall of Prim.walls) {
        if(!wall.deleted && !wall.atBorder) {
            if (wall.boundsAt(i, j, i, j + 1) || wall.boundsAt(i, j + 1, i + 1, j + 1) || wall.boundsAt(i + 1, j + 1, i + 1, j) || wall.boundsAt(i + 1, j, i, j)) {
                Prim.wall_stack.push(wall);
            }
        }
    }
}

function getPrimCell(i, j) {
    return Prim.naked_cells[i * num_cols + j];
}

function deletePrimWall(wall) {
    for(let prim_wall of Prim.walls) {
        if(prim_wall.boundsAt(wall.i1, wall.j1, wall.i2, wall.j2)) {
            console.log("Wall deleted");
            prim_wall.deleted = true;
        }
    }
}

function setCurrentWall(wall) {
    Prim.current_wall.i1 = wall.i1;
    Prim.current_wall.j1 = wall.j1;
    Prim.current_wall.i2 = wall.i2;
    Prim.current_wall.j2 = wall.j2;
}

function drawPrimCurrentWall() {
    context.strokeStyle = "#ffff00";
    drawLine(Prim.current_wall.j1 * length, Prim.current_wall.i1 * length, Prim.current_wall.j2 * length, Prim.current_wall.i2 * length);
}