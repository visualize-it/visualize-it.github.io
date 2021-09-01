function middleGround() {
  for(let i = 1; i < num_cells - 1; i++) {
    for(let j = 1; j < num_cells - 1; j++) {
      num_neigh = getNumNeighbours(i,j);
      neighbours[i][j] = num_neigh;
      decideState(i,j,num_neigh);
    }
  }
}

function edgeGround() {
  upperEdge();
  lowerEdge();
  leftEdge();
  rightEdge();
}

function cornerGround() {
  upperLeft();
  upperRight();
  lowerLeft();
  lowerRight();
}

function getNumNeighbours(i,j) {
  let num = 0;
  if(cells[i-1][j-1]) {
    num++;
  }
  if(cells[i-1][j]) {
    num++;
  }
  if(cells[i-1][j+1]) {
    num++;
  }
  if(cells[i][j-1]) {
    num++;
  }
  if(cells[i][j+1]) {
    num++;
  }
  if(cells[i+1][j-1]) {
    num++;
  }
  if(cells[i+1][j]) {
    num++;
  }
  if(cells[i+1][j+1]) {
    num++;
  }
  neighbours[i][j] = num_neigh;
  return num;
}

function upperEdge() {
  for(let j = 1; j < num_cells - 1; j++) {
    num_neigh = 0;
    if(cells[0][j-1]) {
      num_neigh++;
    }
    if(cells[0][j+1]) {
      num_neigh++;
    }
    if(cells[1][j-1]) {
      num_neigh++;
    }
    if(cells[1][j]) {
      num_neigh++;
    }
    if(cells[1][j+1]) {
      num_neigh++;
    }
    if(cells[num_cells-1][j-1]) {
      num_neigh++;
    }
    if(cells[num_cells-1][j]) {
      num_neigh++;
    }
    if(cells[num_cells-1][j+1]) {
      num_neigh++;
    }
    decideState(0,j,num_neigh);
  }
}

function lowerEdge() {
  for(let j = 1; j < num_cells - 1; j++) {
    num_neigh = 0;
    if(cells[num_cells-1][j-1]) {
      num_neigh++;
    }
    if(cells[num_cells-1][j+1]) {
      num_neigh++;
    }
    if(cells[num_cells-2][j-1]) {
      num_neigh++;
    }
    if(cells[num_cells-2][j]) {
      num_neigh++;
    }
    if(cells[num_cells-2][j+1]) {
      num_neigh++;
    }
    if(cells[0][j-1]) {
      num_neigh++;
    }
    if(cells[0][j]) {
      num_neigh++;
    }
    if(cells[0][j+1]) {
      num_neigh++;
    }
    neighbours[i][j] = num_neigh;
    decideState(num_cells-1,j,num_neigh);
  }
}

function leftEdge() {
  for(let i = 1; i < num_cells - 1; i++) {
    num_neigh = 0;
    if(cells[i-1][0]) {
      num_neigh++;
    }
    if(cells[i+1][0]) {
      num_neigh++;
    }
    if(cells[i-1][1]) {
      num_neigh++;
    }
    if(cells[i][1]) {
      num_neigh++;
    }
    if(cells[i+1][1]) {
      num_neigh++;
    }
    if(cells[i-1][num_cells-1]) {
      num_neigh++;
    }
    if(cells[i][num_cells-1]) {
      num_neigh++;
    }
    if(cells[i+1][num_cells-1]) {
      num_neigh++;
    }
    neighbours[i][j] = num_neigh;
    decideState(i,0,num_neigh);
  }
}

function rightEdge() {
  for(let i = 1; i < num_cells - 1; i++) {
    num_neigh = 0;
    if(cells[i-1][num_cells-1]) {
      num_neigh++;
    }
    if(cells[i+1][num_cells-1]) {
      num_neigh++;
    }
    if(cells[i-1][0]) {
      num_neigh++;
    }
    if(cells[i][0]) {
      num_neigh++;
    }
    if(cells[i+1][0]) {
      num_neigh++;
    }
    if(cells[i-1][num_cells-2]) {
      num_neigh++;
    }
    if(cells[i][num_cells-2]) {
      num_neigh++;
    }
    if(cells[i+1][num_cells-2]) {
      num_neigh++;
    }
    neighbours[i][j] = num_neigh;
    decideState(i,num_cells-1,num_neigh);
  }
}

function upperLeft() {
  num_neigh = 0;
  if(cells[0][1]) {
    num_neigh++;
  }
  if(cells[1][0]) {
    num_neigh++;
  }
  if(cells[1][1]) {
    num_neigh++;
  }
  if(cells[0][num_cells-1]) {
    num_neigh++;
  }
  if(cells[1][num_cells-1]) {
    num_neigh++;
  }
  if(cells[num_cells-1][0]) {
    num_neigh++;
  }
  if(cells[num_cells-1][1]) {
    num_neigh++;
  }
  if(cells[num_cells-1][num_cells-1]) {
    num_neigh++;
  }
  neighbours[i][j] = num_neigh;
  decideState(0,0,num_neigh);
}

function upperRight() {
  num_neigh = 0;
  if(cells[0][0]) {
    num_neigh++;
  }
  if(cells[1][0]) {
    num_neigh++;
  }
  if(cells[0][num_cells-2]) {
    num_neigh++;
  }
  if(cells[1][num_cells-2]) {
    num_neigh++;
  }
  if(cells[1][num_cells-1]) {
    num_neigh++;
  }
  if(cells[num_cells-1][num_cells-2]) {
    num_neigh++;
  }
  if(cells[num_cells-1][num_cells-1]) {
    num_neigh++;
  }
  if(cells[num_cells-1][0]) {
    num_neigh++;
  }
  neighbours[i][j] = num_neigh;
  decideState(0,num_cells-1,num_neigh);
}

function lowerLeft() {
  num_neigh = 0;
  if(cells[0][0]) {
    num_neigh++;
  }
  if(cells[0][1]) {
    num_neigh++;
  }
  if(cells[0][num_cells-1]) {
    num_neigh++;
  }
  if(cells[num_cells-2][num_cells-1]) {
    num_neigh++;
  }
  if(cells[num_cells-1][num_cells-1]) {
    num_neigh++;
  }
  if(cells[num_cells-2][0]) {
    num_neigh++;
  }
  if(cells[num_cells-2][1]) {
    num_neigh++;
  }
  if(cells[num_cells-1][1]) {
    num_neigh++;
  }
  neighbours[i][j] = num_neigh;
  decideState(num_cells-1,0,num_neigh);
}

function lowerRight() {
  num_neigh = 0;
  if(cells[0][0]) {
    num_neigh++;
  }
  if(cells[0][num_cells-1]) {
    num_neigh++;
  }
  if(cells[0][num_cells-2]) {
    num_neigh++;
  }
  if(cells[num_cells-2][num_cells-1]) {
    num_neigh++;
  }
  if(cells[num_cells-1][num_cells-2]) {
    num_neigh++;
  }
  if(cells[num_cells-2][num_cells-2]) {
    num_neigh++;
  }
  if(cells[num_cells-1][0]) {
    num_neigh++;
  }
  if(cells[num_cells-2][0]) {
    num_neigh++;
  }
  neighbours[i][j] = num_neigh;
  decideState(num_cells-1,num_cells-1,num_neigh);
}

function decideState(i,j,num_neigh) {
  if(cells[i][j]) {
    if(num_neigh < 2 || num_neigh > 3) {
      next_state[i][j] = 0;
    }
    else {
      next_state[i][j] = 1;
    }
  }
  else {
    if(num_neigh == 3) {
      next_state[i][j] = 1;
    }
    else {
      next_state[i][j] = 0;
    }
  }
}
