let points = [];
let centroids = [];

let num_clusters;

let point_radius, exclusion_radius;

function clusterStep() {
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
    assignColors();
    console.log(points);
    console.log(centroids);
}

function initProper() {
    let group_counts = [];

    for (let i = 0; i < num_clusters; i++) {
        group_counts.push(0);
    }

    for (let point of points) {
        group_counts[point.group]++;
    }

    for (let group_count of group_counts) {
        if (group_count == 0) {
            return false
        }
    }
    return true;
}

function initialise() {
    centroids = [];
    let x, y;
    for (let i = 0; i < num_clusters; i++) {
        x = Math.random() * canvas_width;
        y = Math.random() * canvas_height;
        centroids.push({
            x: x,
            y: y
        })
    }
    assignCentroids();
    if (!initProper()) {
        initialise();
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

}

function initParams() {
    if (mobile) {
        point_radius = 5;
    }
    else {
        point_radius = 8;
    }
    exclusion_radius = point_radius;

    num_clusters = 2;
}

function assignColors() {
    for (let i = 0; i < centroids.length; i++) {
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
}

function clearPoints() {
    points = [];
    centroids = [];
}

function distanceBetweenPoints(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

function distanceBetweenCoordAndPoint(x, y, point) {
    return Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
}