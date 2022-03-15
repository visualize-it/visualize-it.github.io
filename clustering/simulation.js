let points = [];
let centroids = [];

let num_clusters;

let point_radius, exclusion_radius;

let initialized;

function clusterStep() {
    if (points.length > 0) {
        if (!initialized) {
            initialize();
            initialized = true;
        }
        else {
            let new_centroids = [];

            let centroid_x, centroid_y, num_points;
            for (let i = 0; i < num_clusters; i++) {
                centroid_x = 0;
                centroid_y = 0;
                num_points = 0;

                for (let point of points) {
                    if (point.group == i) {
                        centroid_x += point.x;
                        centroid_y += point.y;
                        num_points++;
                    }
                }
                centroid_x /= num_points;
                centroid_y /= num_points;

                new_centroids.push({
                    x: centroid_x,
                    y: centroid_y
                })
            }
            centroids = new_centroids;
            assignCentroids();
            
        }
    }
    calcCost();
}

function assignCentroids() {
    let min_distance, nearest_centroid_index, distance;
    for (let point of points) {
        min_distance = 2 * canvas_width;
        nearest_centroid_index = -1;

        for (let i = 0; i < centroids.length; i++) {
            distance = distanceBetweenPoints(point, centroids[i]);
            if (distance < min_distance) {
                min_distance = distance;
                nearest_centroid_index = i;
            }
        }
        point.group = nearest_centroid_index;
    }

    let unassigned_centroids = [];
    for (let i = 0; i < num_clusters; i++) {
        unassigned_centroids.push(true);
    }

    for (let point of points) {
        unassigned_centroids[point.group] = false;
    }

    for (let i = 0; i < num_clusters; i++) {
        if(unassigned_centroids[i] == true) {
            return false;
        }
    }

    assignColors();
    console.log(points);
    console.log(centroids);

    return true;
}

function calcCost() {
    let cost = 0;
    for (let point of points) {
        cost += distanceBetweenPoints(point, centroids[point.group]);
    }
    cost_display.innerHTML = `Current cost: ${cost.toFixed(2)}`
}

function initialize() {
    let x, y;

    while (true) {
        centroids = [];
        for (let i = 0; i < num_clusters; i++) {
            x = Math.random() * canvas_width;
            y = Math.random() * canvas_height;
            centroids.push({
                x: x,
                y: y
            })
        }
        if (assignCentroids()) {
            break;
        }
    }
    
}

function update() {

}

function render() {
    context.fillStyle = "#000000";
    context.fillRect(0, 0, canvas_width, canvas_height);

    for (let point of points) {
        context.fillStyle = point.color;
        context.beginPath();
        context.arc(point.x, point.y, point_radius, 0, 2 * Math.PI, false);
        context.fill();
    }

    for (let centroid of centroids) {
        context.fillStyle = centroid.color;
        context.beginPath();
        context.moveTo(centroid.x - point_radius, centroid.y - point_radius);
        context.lineTo(centroid.x + point_radius, centroid.y - point_radius);
        context.lineTo(centroid.x + point_radius, centroid.y + point_radius);
        context.lineTo(centroid.x - point_radius, centroid.y + point_radius);
        context.lineTo(centroid.x - point_radius, centroid.y - point_radius);
        context.fill();
    }

    if (centroids.length > 0) {
        for (let i = 0; i < num_clusters; i++) {
            context.strokeStyle = centroids[i].color;
            for (let point of points) {
                if (point.group == i) {
                    context.beginPath();
                    context.moveTo(point.x, point.y);
                    context.lineTo(centroids[i].x, centroids[i].y)
                    context.stroke();
                }
            }
        }
    }
}

function updateParams(variable) {
    if (variable == "num") {
        num_clusters = num_input.value;
        num_display.innerHTML = `Number of Clusters: ${num_clusters}`;
        resetCentroids();
    }
}

function initParams() {
    initialized = false;

    if (mobile) {
        point_radius = 5;
    }
    else {
        point_radius = 8;
    }
    exclusion_radius = point_radius;

    num_input.value = 2;
    updateParams('num')
}

function assignColors() {
    for (let i = 0; i < num_clusters; i++) {
        centroids[i].color = getColor(i);
    }

    for (let point of points) {
        point.color = getColor(point.group);
    }
}

function getColor(group) {
    switch (group) {
        case 0:
            return "#ff0000";
        case 1:
            return "#00ff00";
        case 2:
            return "#0000ff";
        case 3:
            return "#ffa500";
        case 4:
            return "#aaaaaa";
        case 5:
            return "#ffcocb"
    }
}

function addPoint() {
    let point_removed;
    for (let point of points) {
        if (distanceBetweenCoordAndPoint(click_x, click_y, point) < exclusion_radius) {
            points = removeElement(points, point);
            point_removed = true;
            break;
        }
    }

    if (!point_removed) {
        points.push({
            x: click_x,
            y: click_y,
            group: -1,
            color: "#ffffff"
        });
    }
    initialized = false;
}

function clearPoints() {
    points = [];
    centroids = [];
    initialized = false;

    calcCost();
}

function resetCentroids() {
    centroids = [];
    for (let point of points) {
        point.group = -1;
        point.color = "#ffffff";
    }
    initialized = false;

    calcCost();
}

function distanceBetweenPoints(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function distanceBetweenCoordAndPoint(x, y, point) {
    return Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
}