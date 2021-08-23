if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    mobile = true;
}
else {
    mobile = false;
}

let ids = [];
let buttons = [];

ids.push(
    "phy",
    "math",
    "cs",
    "auto",
    "bio",
    "chem",
    "ill",
);

function initButtons() {
    for(let id of ids) {
        buttons.push(document.getElementById(id));
    }

    if(mobile) {
        for(let button of buttons) {
            button.style.width = "50%";
        }
    }
    else {
        for(let button of buttons) {
            button.style.width = "25%";
        }
    }
}

window.onload = function() {
    initButtons();
}