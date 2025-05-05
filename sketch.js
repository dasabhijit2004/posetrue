let capture;
let posenet;
let allPoses = [];

function setup() {
    createCanvas(800, 600);
    capture = createCapture(VIDEO);
    capture.size(800, 600);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    allPoses = poses;
}

function modelLoaded() {
    console.log('PoseNet model loaded!');
}

function draw() {
    image(capture, 0, 0, 800, 600);
    fill(255, 0, 0);

    for (let p = 0; p < allPoses.length; p++) {
        let pose = allPoses[p].pose;
        let skeleton = allPoses[p].skeleton;

        for (let i = 0; i < pose.keypoints.length; i++) {
            let keypoint = pose.keypoints[i];
            if (keypoint.score > 0.2) { 
                ellipse(keypoint.position.x, keypoint.position.y, 15, 15);
            }
        }

        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255);
            strokeWeight(2);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}
