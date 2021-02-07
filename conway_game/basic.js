let screen_width = window.innerWidth, screen_height = window.innerHeight;
let fps = 10;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let pause_button = document.getElementById("pause-button");
let border_toggle = document.getElementById("border-toggle");
let grid_button = document.getElementById("grid-button");
let cell_slider = document.getElementById("cell-slider");

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
    canvas.addEventListener("touchstart", function (e) {
        getTouchPosition(canvas, e);
  let touch = e.touches[0];
  let mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

} else {
    mobile = false;
    canvas.addEventListener("mousedown", function(e) {
      getMousePosition(canvas, e);
    });
}

if (mobile) {
    canvas_width = 0.95 * screen_width;
}
else {
    canvas_width = 0.35 * screen_width;
}
canvas_height = canvas_width

canvas.width = canvas_width;
canvas.height = canvas_height;

let animate = function (callback) {
        window.setTimeout(callback, 150);
};

window.onload = function() {
    initParams();
    animate(step);
}

function step() {
    if(!isPaused) {
      update();
    }
    render();
    animate(step);
}

function getMousePosition(canvas, event) {
  rect = canvas.getBoundingClientRect();
  click_x = event.clientX - rect.left;
  click_y = event.clientY - rect.top;
  manageClick();
}

function getTouchPosition(canvas, event) {
  var rect = canvas.getBoundingClientRect();
  click_x = event.touches[0].clientX - rect.left,
  click_y = event.touches[0].clientY - rect.top
  manageClick();
}

function manageClick() {
  toggle(Math.floor(click_x / cell_length), Math.floor(click_y / cell_length));
  if(!isPaused) {
    togglePause();
  }
}

function toggleGrid() {
  grid_button.innerHTML = showGrid ? "Show Grid" : "Hide Grid";
  showGrid = showGrid ? false : true;
}

function togglePause() {
  pause_button.innerHTML = isPaused ? "Pause" : "Resume";
  isPaused = isPaused ? false : true;
}

function toggleBorder() {
  borderInteract = borderInteract ? false : true
  border_toggle.innerHTML = borderInteract ? "Disable border interactions" : "Enable border interactions";
}

function delaySet(delay) {
  animate = function (callback) {
          window.setTimeout(callback, delay);
  };
  animate(step);
}

function alwaysResume() {
  if(isPaused) {
    togglePause();
  }
}

function disableBorder() {
  if(borderInteract) {
    toggleBorder();
  }
}

function enableBorder() {
  if(!borderInteract) {
    toggleBorder();
  }
}

function configSlider() {
  cell_slider.value = num_cells;
}

function scrollUp() {
  window.scrollTo(0,250);
}
