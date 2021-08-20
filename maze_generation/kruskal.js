let kruskal = {
    walls: [],
    naked_cells: [],
    sets: [],
    index: 0,
}

function updateKruskal() {
    if (kruskal.index < kruskal.walls.length) {
        let wall = kruskal.walls[kruskal.index];

        let set1, set2;
        let i1, j1, i2, j2;
        let border = false;

        if (wall.i1 == wall.i2) {
            if (wall.i1 > 0 && wall.i1 < num_rows) {
                i1 = wall.i1 - 1;
                j1 = wall.j1;
                i2 = wall.i2;
                j2 = wall.j1;
            }
            else {
                border = true;
            }
        }
        else {
            if (wall.j1 > 0 && wall.j1 < num_cols) {
                i1 = wall.i1;
                j1 = wall.j1 - 1;
                i2 = wall.i1;
                j2 = wall.j1;
            }
            else {
                border = true;
            }
        }
        if (!border) {
            for (let set of kruskal.sets) {
                for(let element of set) {
                    if(element.i == i1 && element.j == j1) {
                        set1 = set;
                        break;
                    }
                }
            }
            for (let set of kruskal.sets) {
                for(let element of set) {
                    if(element.i == i2 && element.j == j2) {
                        set2 = set;
                        break;
                    }
                }
            }

            if (set1.disjoint(set2)) {
                getKruskalCell(i1, j1).visited = true;
                getKruskalCell(i2, j2).visited = true;

                kruskal.walls[kruskal.index].deleted = true;
                removeElement(kruskal.sets, set1);
                removeElement(kruskal.sets, set2);
                kruskal.sets.push(set1.union(set2));
            }
        }
        kruskal.index++;
    }
}

function renderKruskal() {
    for(let cell of kruskal.naked_cells) {
        cell.render();
    }
    for (let wall of kruskal.walls) {
        wall.render();
    }
    drawKruskalCurrentWall();
}

function initKruskal() {
    clearKruskal();
    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j < num_cols; j++) {
            let naked_cell = new NakedCell(i, j);
            kruskal.naked_cells.push(new NakedCell(i, j));
            kruskal.sets.push(new Set([naked_cell]));
        }
    }

    for (let i = 0; i < num_rows; i++) {
        for (let j = 0; j <= num_cols; j++) {
            kruskal.walls.push(new Wall(i, j, i + 1, j));
        }
    }

    for (let j = 0; j < num_cols; j++) {
        for (let i = 0; i <= num_rows; i++) {
            kruskal.walls.push(new Wall(i, j, i, j + 1));
        }
    }

    kruskal.walls = shuffle(kruskal.walls);
}

function drawKruskalCurrentWall() {
    context.strokeStyle = "#ffff00";
    let current_wall = kruskal.walls[kruskal.index];
    drawLine(current_wall.x1, current_wall.y1, current_wall.x2, current_wall.y2);
}

function getKruskalCell(i, j) {
    return kruskal.naked_cells[i * num_cols + j];
}

function clearKruskal() {
    kruskal.walls = [];
    kruskal.sets = [];
    kruskal.naked_cells = [];
    kruskal.index = 0;
}