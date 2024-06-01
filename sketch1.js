let points;
let hullPoints;
let fr = 5;
let algorithm; // Variable to store the currently selected algorithm

function setup() {
    let canvas = createCanvas(1200, 700);
    canvas.parent('canvas-container');
    
    // Set the canvas position to 'absolute'
    // canvas.position('absolute');
    
    // // Calculate the horizontal and vertical position to center the canvas
    // let x = (windowWidth - width) / 2;
    // let y = (windowHeight - height) / 2;
    
    // // Move the canvas to the center
    // canvas.position(x, y);

    
    frameRate(fr);
    points = generatePoints();
    algorithm = "JarvisMarch"; 
    if (algorithm === "JarvisMarch") {
        hullPoints = new JarvisMarch(points); 
        fr=50;// Start with Jarvis March algorithm
    }
    else if (algorithm === "kP") {
        hullPoints = new kP(points); 
        fr=1;// Start kP algorithm
    }  
    else hullPoints = new kpLower(points);
    setUpButtons();
}

function draw() {
    background('#240A34');

    for (let i = 0; i < points.length; i++) {
        points[i].display();
    }

    strokeWeight(1);
    if (algorithm === "JarvisMarch") {
        if(run){
            hullPoints.run();
        }
    } else if (algorithm === "kP") {
        if(run){
            hullPoints.run();
        } // Run Kirkpatrick-Seidel algorithm
    }else if (algorithm === "lower") {
        if(run){
            hullPoints.run();
        } 
    }
    hullPoints.displayHull();

   

    fill(0);
    textSize(20);
    textAlign(RIGHT);
    // text("Currently selected algorithm: " + algorithm, width - 20, 30);
    
    // Display frame count
    textAlign(RIGHT);
    // text("Frame: " + frameCount, width - 20, 60);
}

function generatePoints() {
    let results = [];
    for (let i = 0; i < 20; i++) {
        results.push(new Point(random(10, 1190), random(10, 690)));
        console.log(results[i].xCoor);
        console.log(results[i].yCoor);

    }
    run = false;
//     results.push(new Point(306, 558));
// results.push(new Point(987, 123));
// results.push(new Point(642, 642));
// results.push(new Point(975, 95));
// results.push(new Point(735, 275));
// results.push(new Point(385, 492));
// results.push(new Point(493, 277));
// results.push(new Point(352, 479));
// results.push(new Point(321, 13));
// results.push(new Point(519, 196));
// results.push(new Point(244, 379));
// results.push(new Point(155, 202));
// results.push(new Point(157, 179));
// results.push(new Point(574, 383));
// results.push(new Point(11, 441));
// results.push(new Point(945, 325));
// results.push(new Point(736, 375));
// results.push(new Point(512, 534));
// results.push(new Point(367, 409));
// results.push(new Point(48, 171));
// run = false;

    return results;
}

function setUpButtons() {
    // Define buttons for selecting algorithm and other functionalities
    // Modify existing buttons or add new ones
    // Example: button for switching between Jarvis March and Kirkpatrick-Seidel
   
    // algorithmButton = createButton("Switch Algorithm");
    // algorithmButton.class("btn btn-primary");
    // algorithmButton.mousePressed(function() {
    //     if (algorithm === "JarvisMarch" || algorithm === "lower") {
    //         //hullPoints = new kP(points);
    //         algorithm = "kP";
    //     } else if (algorithm === "kP" || algorithm === "lower") {
    //        // hullPoints = new JarvisMarch(points);
    //         algorithm = "JarvisMarch";
    //     }
    // });

    let buttonContainer = createDiv();

    buttonContainer.style('text-align', 'center'); // Center-align the buttons
    buttonContainer.style('margin-top', '20px'); // Add some top margin to the container

    let buttonWidth = '125px';

    // Button for start/pause
    startPauseButton = createButton("Start");
    startPauseButton.class("btn btn-primary");
    startPauseButton.style('width',buttonWidth);
    startPauseButton.mousePressed(function(){
        run = !run;
    });
    startPauseButton.parent(buttonContainer);
    buttonContainer.child(createElement('br')); // Add a line break between buttons for vertical spacing


    // startPauseButton = createButton("lower");
    // startPauseButton.class("btn btn-primary");
    // startPauseButton.mousePressed(function(){
    //     algorithm = "lower";
    //     if (algorithm === "lower") {
    //         hullPoints = new kpLower(points);
    //     }
    // });

    // Button for reset
    resetButton = createButton("Reset");
    resetButton.class("btn btn-primary"); 
    resetButton.style('width',buttonWidth);   
    resetButton.mousePressed(function(){
        points = [];
        hullPoints = [];
        points = generatePoints();
        if (algorithm === "JarvisMarch") {
            hullPoints = new JarvisMarch(points);
        } else if (algorithm === "kP") {
            hullPoints = new kP(points);
        } else hullPoints = new kpLower(points);
    });
    resetButton.parent(buttonContainer);

    // Button for speed control
    // speedUpButton = createButton("Speed Up");
    // speedUpButton.class("btn btn-secondary");
    // speedUpButton.mousePressed(function() {
    //     frameRate(fr += 10); // Increase frame rate
    // });
    // slowdownButton = createButton("Slow Down");
    // slowdownButton.class("btn btn-secondary");
    // slowdownButton.mousePressed(function() {
    //     if (fr > 10) {
    //         frameRate(fr -= 10); // Decrease frame rate
    //     }
    // });

    // Add other buttons for functionalities like start/pause, reset, speed control, etc.
}
