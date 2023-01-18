let physics, computer, math, complex;

let physicsContent, computerContent, mathContent, complexContent;

function toggle(topic) {
    if (topic == "physics") {
        physics = !physics
    }
    if (topic == "computer") {
        computer = !computer
    }
    if (topic == "math") {
        math = !math
    }
    if (topic == "complex") {
        complex = !complex
    }

    changeContents();
}

function changeContents() {
    if (physics) {
        for (let i = 0; i < physicsContent.length; i++) {
            physicsContent[i].style.display = "block";
        }
    } else {
        for (let i = 0; i < physicsContent.length; i++) {
            physicsContent[i].style.display = "none";
        }
    } 

    if (computer) {
        for (let i = 0; i < computerContent.length; i++) {
            computerContent[i].style.display = "block";
        }
    }
    else {
        for (let i = 0; i < computerContent.length; i++) {
            computerContent[i].style.display = "none";
        }
    }

    if (math) {
        for (let i = 0; i < mathContent.length; i++) {
            mathContent[i].style.display = "block";
        }
    }
    else {
        for (let i = 0; i < mathContent.length; i++) {
            mathContent[i].style.display = "none";
        }
    }

    if (complex) {
        for (let i = 0; i < complexContent.length; i++) {
            complexContent[i].style.display = "block";
        }
    }
    else {
        for (let i = 0; i < complexContent.length; i++) {
            complexContent[i].style.display = "none";
        }
    }
}

window.onload = function () {
    physics = document.getElementById("physics-check").checked;
    computer = document.getElementById("computer-check").checked;
    math = document.getElementById("math-check").checked;
    complex = document.getElementById("complex-check").checked;

    physicsContent = document.getElementsByClassName("physics");
    computerContent = document.getElementsByClassName("computer");
    mathContent = document.getElementsByClassName("math");
    complexContent = document.getElementsByClassName("complex");

    changeContents();
}