let points;
let hullPoints;
let fr = 5;
let sel = 0;
let algorithm; // Variable to store the currently selected algorithm

function setup() {

    let canvas = createCanvas(1200, 700);
    canvas.parent('canvas-container');
    // createCanvas(1200, 700);
    frameRate(fr);
    points = generatePoints();
    algorithm = "kP"; 
    // if (algorithm === "JarvisMarch") {
    //     hullPoints = new JarvisMarch(points); 
    //     fr=50;// Start with Jarvis March algorithm
    // }
    if (algorithm === "kP") {
        hullPoints = new kP(points, sel); 
        fr=1;// Start kP algorithm
    }  
    else hullPoints = new kpLower(points, sel);
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
    // for (let i = 0; i < 20; i++) {
    //     results.push(new Point(random(10, 1190), random(10, 690)));
    //     console.log(results[i].xCoor);
    //     console.log(results[i].yCoor);

    // }
    // run = false;
   if(sel == 0){ results.push(new Point(306, 558));
results.push(new Point(987, 123));
results.push(new Point(642, 642));
results.push(new Point(975, 95));
results.push(new Point(735, 275));
results.push(new Point(385, 492));
results.push(new Point(493, 277));
results.push(new Point(352, 479));
results.push(new Point(321, 13));
results.push(new Point(519, 196));
results.push(new Point(244, 379));
results.push(new Point(155, 202));
results.push(new Point(157, 179));
results.push(new Point(574, 383));
results.push(new Point(11, 441));
results.push(new Point(945, 325));
results.push(new Point(736, 375));
results.push(new Point(512, 534));
results.push(new Point(367, 409));
results.push(new Point(48, 171));}
else if(sel == 1)
{
    results.push(new Point(219, 569));
    results.push(new Point(845, 506));
    results.push(new Point(832, 232));
    results.push(new Point(1009, 445));
    results.push(new Point(780, 293));
    results.push(new Point(443, 597));
    results.push(new Point(586, 333));
    results.push(new Point(992, 197));
    results.push(new Point(618, 64));
    results.push(new Point(1016, 524));
    results.push(new Point(657, 671));
    results.push(new Point(675, 314));
    results.push(new Point(1067, 689));
    results.push(new Point(207, 386));
    results.push(new Point(149, 545));
    results.push(new Point(621, 409));
    results.push(new Point(1040, 496));
    results.push(new Point(557, 11));
    results.push(new Point(1067, 335));
    results.push(new Point(564, 634));

}
else if(sel == 2){
results.push(new Point(240.526,660.571));
results.push(new Point(434.11,110.088));
results.push(new Point(395.09,290.444));
results.push(new Point(984.948,109.959));
results.push(new Point(351.446,478.561));
results.push(new Point(271.258,386.233));
results.push(new Point(684.027,374.73));
results.push(new Point(515.002,682.701));
results.push(new Point(830.987,72.3618));
results.push(new Point(306.408,413.481));
results.push(new Point(357.483,574.321));
results.push(new Point(894.73,443.873));
results.push(new Point(32.1438,287.964));
results.push(new Point(294.04,505.673));
results.push(new Point(1160,97.1796));
results.push(new Point(76.9103,489.486));
results.push(new Point(612.677,634.89));
results.push(new Point(845.874,189.016));
results.push(new Point(865.945,676.939));
results.push(new Point(279.293,202.889));
}
else if(sel == 3){
    results.push(new Point(558.565,460.615));
results.push(new Point(987.855,38.2921));
results.push(new Point(816.594,172.606));
results.push(new Point(917.424,238.773));
results.push(new Point(537.437,55.9815));
results.push(new Point(1116.65,451.953));
results.push(new Point(344.706,66.9055));
results.push(new Point(1080.34,72.7976));
results.push(new Point(861.414,411.595));
results.push(new Point(57.6021,181.922));
results.push(new Point(604.354,632.609));
results.push(new Point(184.501,445.928));
results.push(new Point(654.774,444.855));
results.push(new Point(215.234,400.645));
results.push(new Point(138.495,490.733));
results.push(new Point(595.891,681.492));
results.push(new Point(490.258,634.52));
results.push(new Point(1020.4,287.315));
results.push(new Point(1097.05,626.549));
results.push(new Point(834.697,170.085));
}
else if(sel == 4){
    results.push(new Point(440.221,664.271));
results.push(new Point(166.211,197.859));
results.push(new Point(110.389,595.967));
results.push(new Point(147.742,95.3189));
results.push(new Point(1124.44,568.476));
results.push(new Point(281.402,145.635));
results.push(new Point(365.021,37.8697));
results.push(new Point(510.441,47.7362));
results.push(new Point(224.079,424.104));
results.push(new Point(220.889,584.02));
results.push(new Point(377.157,442.75));
results.push(new Point(343.458,106.8));
results.push(new Point(858.883,496.76));
results.push(new Point(629.278,617.678));
results.push(new Point(194.325,633.294));
results.push(new Point(1112.27,431.536));
results.push(new Point(982.246,225.379));
results.push(new Point(313.321,644.268));
results.push(new Point(544.713,443.255));
results.push(new Point(887.711,359.056));

}
run = false;

    return results;
}

function setUpButtons() {

    let buttonContainer = createDiv();

    buttonContainer.style('text-align', 'center'); // Center-align the buttons
    buttonContainer.style('margin-top', '20px'); // Add some top margin to the container
    let buttonWidth = '125px';

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

    // Button for start/pause
    startPauseButton = createButton("Start");
    startPauseButton.class("btn btn-primary");
    startPauseButton.style('width',buttonWidth);
    startPauseButton.mousePressed(function(){
        run = !run;
    });
    startPauseButton.parent(buttonContainer);
    buttonContainer.child(createElement('br'));

    startPauseButton = createButton("lower");
    startPauseButton.class("btn btn-primary");
    startPauseButton.style('width',buttonWidth);
    startPauseButton.mousePressed(function(){
        algorithm = "lower";
        if (algorithm === "lower") {
            hullPoints = new kpLower(points, sel);
        }
    });
    startPauseButton.parent(buttonContainer);
    buttonContainer.child(createElement('br'));

    // Button for reset
    resetButton = createButton("Reset");
    resetButton.class("btn btn-primary");    
    resetButton.mousePressed(function(){
        sel = (sel+1)%5;
        points = [];
        hullPoints = [];
        points = generatePoints();
        
        
        
            hullPoints = new kP(points, sel);

    });
    resetButton.style('width',buttonWidth);
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
