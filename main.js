
status = ""
objects = []

function setup(){
canvas= createCanvas(400,400)
canvas.center()
video = createCapture(VIDEO,400,400)
video.hide()
}

function draw(){
image(video,0,0,400,400)
if(status != ""){
    objectDetector.detect(video,gotResult)
    for(i=0; i<objects.length;i++){
        document.getElementById("objects_detecdte").innerHTML = "Status : Detected Objects"   
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are :"+objects.length
        fill("red");
        song.play()
        percentage = floor(objects[i].confidence*100)
        text(objects[i].label+" "+percentage+"%",objects[i].x,objects[i].y)
        noFill()
        stroke("red");
        rect(objects[i].x, objects[i].y, objects[i].width,objects[i].height)
    }
}
}

function preload(){
    song = loadSound("ok.mp3");
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded())
    document.getElementById("objects_detecdte").innerHTML = "Status : Detecting objects"
}

function modelLoaded(){
    console.log("Model is are loaded");
    status = true;
    
}
function gotResult(error,results){
if(error){
    console.log(error);
}
console.log(results)
objects = results
}