function scanArray() {
  let temp;
  array = [];

  for(let i = 0; i < positions.length; i++) {
    for(let j = positions.length - 1; j > i; j--) {
      if(positions[j-1].x > positions[j].x) {
        temp = positions[j-1];
        positions[j-1] = positions[j];
        positions[j] = temp;
      }
    }
  }

  for(let position of positions) {
    array.push(position.number);
  }
  console.log(array);
}

function generateArray(array_size) {
  array = [];
  positions = [];

  for (let i = 0; i < array_size; i++) {
    array.push(i);
  }
}

function shuffleArray() {
  for (let i = 0; i < array.length; i++) {
    swap(i, random_int(0, array.length));
  }
}

function get_box_position(i) {
  return (2 * i + 1) * square_length;
}

function get_index_position(i) {
  return get_box_position(i) + square_length / 2;
}

function checkSorted() {
  sorted = true;
  for(let i = 1; i < array.length; i++) {
    if(array[i-1] > array[i]) {
      sorted = false;
      break;
    }
  }
}

function random_int(lower, upper) {
  return Math.floor(Math.random() * (upper - lower) + lower);
}

function swap(a, b) {
  let temp;
  temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
