function genCode() {
  let string = `num_cells = ${num_cells}; initCanvas();`;
  for(let i = 0; i < num_cells; i++) {
    for(let j = 0; j < num_cells; j++) {
      if(cells[i][j]) {
        string += `toggle(${i},${j});`;
      }
    }
  }
  string += "alwaysResume();configSlider()";
  console.log(string);
}

// Steady states
function beehiveState() {
  num_cells = 6;
  initCanvas();
  toggle(2,1);
  toggle(1,2);
  toggle(3,2);
  toggle(1,3);
  toggle(3,3);
  toggle(2,4);
  alwaysResume();
  configSlider();
  scrollUp();
}

function boatState() {
  num_cells = 5;
  initCanvas();
  toggle(1,1);
  toggle(1,2);
  toggle(2,1);
  toggle(2,3);
  toggle(3,2);
  alwaysResume();
  configSlider();
  scrollUp();
}

function blockState() {
  num_cells = 4;
  initCanvas();
  toggle(1,1);
  toggle(1,2);
  toggle(2,1);
  toggle(2,2);
  alwaysResume();
  configSlider();
  scrollUp();
}

function loafState() {
  num_cells = 6;
  initCanvas();
  toggle(1,2);
  toggle(1,3);
  toggle(2,1);
  toggle(2,4);
  toggle(3,2);
  toggle(3,4);
  toggle(4,3);
  alwaysResume();
  configSlider();
  scrollUp();
}

function tubState() {
  num_cells = 5;
  initCanvas();
  toggle(1,2);
  toggle(2,1);
  toggle(2,3);
  toggle(3,2);
  alwaysResume();
  configSlider();
  scrollUp();
}

// Oscillators
function beaconState() {
  num_cells = 6; initCanvas();toggle(1,1);toggle(1,2);toggle(2,1);toggle(3,4);toggle(4,3);toggle(4,4);alwaysResume();
  configSlider();
  scrollUp();
}

function blinkerState() {
  num_cells = 5; initCanvas();toggle(2,1);toggle(2,2);toggle(2,3);alwaysResume();
  configSlider();
  scrollUp();
}

function pentaState() {
  num_cells = 18; initCanvas();toggle(7,6);toggle(7,11);toggle(8,4);toggle(8,5);toggle(8,7);toggle(8,8);toggle(8,9);toggle(8,10);toggle(8,12);toggle(8,13);toggle(9,6);toggle(9,11);alwaysResume();
  configSlider();
  scrollUp();
}

function pulsarState() {
  num_cells = 17; initCanvas();toggle(2,4);toggle(2,5);toggle(2,6);toggle(2,10);toggle(2,11);toggle(2,12);toggle(4,2);toggle(4,7);toggle(4,9);toggle(4,14);toggle(5,2);toggle(5,7);toggle(5,9);toggle(5,14);toggle(6,2);toggle(6,7);toggle(6,9);toggle(6,14);toggle(7,4);toggle(7,5);toggle(7,6);toggle(7,10);toggle(7,11);toggle(7,12);toggle(9,4);toggle(9,5);toggle(9,6);toggle(9,10);toggle(9,11);toggle(9,12);toggle(10,2);toggle(10,7);toggle(10,9);toggle(10,14);toggle(11,2);toggle(11,7);toggle(11,9);toggle(11,14);
  toggle(12,2);toggle(12,7);toggle(12,9);toggle(12,14);toggle(14,4);toggle(14,5);toggle(14,6);toggle(14,10);toggle(14,11);toggle(14,12);alwaysResume();
  configSlider();
  scrollUp();
}

function toadState() {
  num_cells = 6; initCanvas();toggle(1,3);toggle(2,2);toggle(2,3);toggle(3,2);toggle(3,3);toggle(4,2);alwaysResume();
  configSlider();
  scrollUp();
}

// Spaceships
function gliderState() {
  num_cells = 20; initCanvas();toggle(1,6);toggle(2,4);toggle(2,6);toggle(3,5);toggle(3,6);alwaysResume();
  configSlider();
  enableBorder();
  scrollUp();
}

function lwssState() {
  num_cells = 20; initCanvas();toggle(1,3);toggle(1,5);toggle(2,6);toggle(3,6);toggle(4,3);toggle(4,6);toggle(5,4);toggle(5,5);toggle(5,6);alwaysResume();
  configSlider();
  enableBorder();
  scrollUp();
}

function hwssState() {
  num_cells = 20; initCanvas();toggle(3,7);toggle(3,8);toggle(3,9);toggle(4,6);toggle(4,9);toggle(5,9);toggle(6,5);toggle(6,9);toggle(7,5);toggle(7,9);toggle(8,9);toggle(9,6);toggle(9,8);alwaysResume();
  configSlider();
  enableBorder();
  scrollUp();
}

// Methulselahs
function pentaminoState() {
  num_cells = 40; initCanvas();toggle(19,18);toggle(20,17);toggle(20,18);toggle(20,19);toggle(21,17);alwaysResume();
  configSlider();
  disableBorder();
  scrollUp();
}

function diehardState() {
  num_cells = 40; initCanvas();toggle(16,19);toggle(17,19);toggle(17,20);toggle(21,20);toggle(22,18);toggle(22,20);toggle(23,20);alwaysResume();
  configSlider();
  disableBorder();
  scrollUp();
}

function acornState() {
  num_cells = 40; initCanvas();toggle(16,20);toggle(17,18);toggle(17,20);toggle(19,19);toggle(20,20);toggle(21,20);toggle(22,20);alwaysResume();
  configSlider();
  disableBorder();
  scrollUp();
}

// GLider Guns
function gosperState() {
  num_cells = 40; initCanvas();toggle(1,5);toggle(1,6);toggle(2,5);toggle(2,6);toggle(11,5);toggle(11,6);toggle(11,7);toggle(12,4);toggle(12,8);toggle(13,3);toggle(13,9);toggle(14,3);toggle(14,9);toggle(15,6);toggle(16,4);toggle(16,8);toggle(17,5);toggle(17,6);toggle(17,7);toggle(18,6);toggle(21,3);toggle(21,4);toggle(21,5);toggle(22,3);toggle(22,4);toggle(22,5);toggle(23,2);toggle(23,6);toggle(25,1);toggle(25,2);toggle(25,6);toggle(25,7);toggle(35,3);toggle(35,4);toggle(36,3);toggle(36,4);alwaysResume();
  configSlider();
  disableBorder();
  scrollUp();
}

function simkinState() {
  num_cells = 35; initCanvas();toggle(1,1);toggle(1,2);toggle(2,1);toggle(2,2);toggle(5,4);toggle(5,5);toggle(6,4);toggle(6,5);toggle(8,1);toggle(8,2);toggle(9,1);toggle(9,2);toggle(21,18);toggle(21,19);toggle(22,11);toggle(22,12);toggle(22,13);toggle(22,18);toggle(22,20);toggle(23,10);toggle(23,13);toggle(23,20);toggle(24,10);toggle(24,13);toggle(24,20);toggle(24,21);toggle(26,10);toggle(27,10);toggle(27,14);toggle(28,11);toggle(28,13);toggle(29,12);toggle(32,12);toggle(32,13);toggle(33,12);toggle(33,13);
  alwaysResume();
  configSlider();
  enableBorder();
  scrollUp();
}

// Block layers
function minimalState() {
  num_cells = 40; initCanvas();toggle(16,19);toggle(18,18);toggle(18,19);toggle(20,15);toggle(20,16);toggle(20,17);toggle(22,14);toggle(22,15);toggle(22,16);toggle(23,15);alwaysResume();
  configSlider();
  disableBorder();
  scrollUp();
}

function fivexfiveState() {
  num_cells = 40; initCanvas();toggle(16,16);toggle(16,17);toggle(16,20);toggle(17,16);toggle(17,19);toggle(18,16);toggle(18,19);toggle(18,20);toggle(19,18);toggle(20,16);toggle(20,18);toggle(20,19);toggle(20,20);alwaysResume();
  configSlider();
  disableBorder();
  scrollUp();
}
