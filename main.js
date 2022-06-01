function setup() {
    video=createCapture(VIDEO);
    video.size(600, 650);
    video.position(100, 100);

    canvas=createCanvas(600, 450);
    canvas.position(800, 200);

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose" , gotposes);
}

function modelLoaded() {
    console.log("poseNet is initialized");
}

noseX=0;
noseY=0;

leftwristX=0;
rightwristX=0;

difference=0;

function gotposes(results) {
if(results.length > 0){
    console.log(results);

    noseX=results[0].pose.nose.x;
    noseY=results[0].pose.nose.y;
    console.log("Nose X = " + noseX + "Nose Y = " + noseY);

    leftwristX=results[0].pose.leftWrist.x;
    rightwristX=results[0].pose.rightWrist.x;
    difference=floor(leftwristX - rightwristX);
    console.log("left wrist x = " + leftwristX + " ,right wrist x = " + rightwristX + " ,difference = " + difference);
}

}

function draw() {
    background("#ef71bb");
    document.getElementById("square_sides").innerHTML = "The size of the square is " + difference + " px ";
    fill("#00008b");
    stroke("#00008b");
    square(noseX, noseY, difference);
}