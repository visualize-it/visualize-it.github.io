let atoms = [];

let num_atoms = 100;

let distance_scaling;
let mass_factor, charge_factor;
let radius_factor, force_factor;
let dt;

let fusion_radius, exclusion_radius;

function update() {
    for (let atom of atoms) {
        atom.update();
    }

    let atom1, atom2, constant_part, force_x, force_y;
    for (let i = 0; i < atoms.length - 1; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
            atom1 = atoms[i];
            atom2 = atoms[j];
            r = distanceBetween(atom1, atom2);

            if (r < Math.min(atom1.radius, atom2.radius)) {
                atoms.splice(j, 1);
                atoms.splice(i, 1);
                new_atom = new Atom(atom1.x, atom1.y, atom1.mass + atom2.mass, atom1.charge + atom2.charge, 0);
                atoms.push(new_atom);
                console.log("Fusion! Resulting atomic number:", atom1.mass + atom2.mass);

                output_string = "Current atoms: "
                for(let atom of atoms) {
                    output_string += String(atom.mass) + " ";
                }
                console.log(output_string);
            }
            else {
                constant_part = force_factor * atom1.charge * atom2.charge / Math.pow(r, 3);
                force_x = constant_part * (atom1.x - atom2.x);
                force_y = constant_part * (atom1.y - atom2.y);
                atom1.applyForce(force_x, force_y);
                atom2.applyForce(-force_x, -force_y);
            }
        }
    }
}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let atom of atoms) {
        atom.render();
    }
}

function updateParams(variable) {

}

function initParams() {
    dt = 0.001;

    mass_factor = 1;
    charge_factor = 1;
    radius_factor = 10;
    force_factor = 1e9;
    distance_scaling = 1;
    exclusion_radius = 5;

    fusion_radius = 2;

    let x, y, passed;
    for (let i = 0; i < num_atoms; i++) {
        passed = false
        while(!passed) {
            passed = true;
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            for(let atom of atoms) {
                distance = distanceBetweenCoordAndAtom(x, y, atom);
                if(distance <= exclusion_radius) {
                    passed = false;
                    break;
                }
            }
        }
        atoms.push(new Atom(x, y, 1, 1, 100));
    }
}

function distanceBetweenCoordAndAtom(x, y, atom) {
    return distance_scaling * Math.sqrt(Math.pow(x - atom.x, 2) + Math.pow(y - atom.y, 2));
}

function distanceBetween(atom1, atom2) {
    return distance_scaling * Math.sqrt(Math.pow(atom2.x - atom1.x, 2) + Math.pow(atom2.y - atom1.y, 2));
}

function getMagn(x, y) {
    return Math.sqrt(x * x + y * y);
}

function removeElement(array, element) {
    return array.filter(function (dummy) {
        return dummy != element;
    });
}