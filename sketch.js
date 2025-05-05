let capture;
let posenet;
let singlePose;
let skeleton;

function setup() {
    createCanvas(800, 600);
    capture = createCapture(VIDEO);
    capture.size(800, 600);
    capture.hide();

    posenet = ml5.poseNet(capture, modelLoaded);
    posenet.on('pose', receivedPoses);
}

function receivedPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('PoseNet model loaded!');
}

function draw() {
    image(capture, 0, 0, 800, 600);
    fill(255, 0, 0);

    if (singlePose) {
        for (let i = 0; i < singlePose.keypoints.length; i++) {
            let keypoint = singlePose.keypoints[i];
            ellipse(keypoint.position.x, keypoint.position.y, 15, 15);
        }

        for(let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
            stroke(255);
            strokeWeight(2);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
    }
}