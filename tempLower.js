
let kpLower = (function (){
    // let points;
    let hullPoints;
    let pointIndex;
    let ends;
    let lowerPts;
    let lowerLeft;
    let lowerRight;
    let tempY1;
    let tempY2;
    let tempX1;
    let tempX2;
    // let run;
    let bestAngle;
    let bestPoint;
    // let fr = 30;
    let m;
    let temp;
    let countLower;
    let temper;

    function kpLower(points, sel){
        this.points = points;
        this.numPts = points.length;
        temper = sel;
        hullPoints = [];
        ends = [];
        lowerPts = [];
        lowerLeft = [];
        lowerRight = [];
        //Initialize globals
        currHullIndex = 0;
        pointIndex = 0;
        bestAngle = 0;
        bestPoint = -1;
        m = 0;
        temp = 0;
        tempY1 = 700;
        tempY2 = 700;
        tempX1 = 0;
        tempX2=0;
        countLower = 0;

    }

    kpLower.prototype.run =  function(){

        if(hullPoints.length==0){
            let left = leftMost();
            let right = rightMost();
            ends.push(points[right]);
            hullPoints.push(points[left]);
            //hullPoints.push(points[right]);

            ends.push(points[left]);

        }
        
        //This will draw a black line to the current best point that
        // can be added to CH
//if(bestPoint > -1){
            let p1 = ends[ends.length-1];
            // p2 = this.points[bestPoint];
            let p2 = ends[ends.length - 2];
            strokeWeight(1)
            stroke("#97E7E1");
            line(p1.xCoor, p1.yCoor, p2.xCoor, p2.yCoor);
            //run = ! this.run;
       // }
         m = (ends[ends.length - 2].yCoor - ends[ends.length-1].yCoor)/ (ends[ends.length - 2].xCoor - ends[ends.length-1].xCoor);

        if(countLower == 0){ for (let i = 0; i < points.length; i++) {
            if ((points[i].yCoor - ends[ends.length - 1].yCoor) / (points[i].xCoor - ends[ends.length - 1].xCoor) > m) {
                lowerPts.push(points[i]);
                points[i].setColor("#ffffff");
            }
        } countLower = 1;}

            lowerPts.sort((a, b) => a.xCoor - b.xCoor);
            medianIndex = Math.floor(lowerPts.length / 2);
            strokeWeight(1)
            stroke("#97E7E1");
            line(lowerPts[medianIndex].xCoor, 0,lowerPts[medianIndex].xCoor, 700); // draw vertical line from top to bottom of canvas
            
            for (let i = 0; i < lowerPts.length; i++) {
                if ((lowerPts[i].xCoor) < lowerPts[medianIndex].xCoor) {
                    lowerLeft.push(lowerPts[i]);
                    lowerPts[i].setColor("#ff0000");
                }
                else{
                    lowerRight.push(lowerPts[i]);
                    lowerPts[i].setColor("#00ff00");
                }
            }
            const usedIndices = new Set(); // Set to store used indices from lowerRight

            //for (let i = 0; i < lowerLeft.length; i++)
            if (temp < lowerLeft.length * lowerRight.length) {
                let randomIndex;
                do {
                  randomIndex = floor(random(lowerRight.length));
                } while (usedIndices.has(randomIndex)); // Find an unused index
              
                usedIndices.add(randomIndex); // Mark the index as used
              
                const randomPoint = lowerRight[randomIndex];
                line(lowerLeft[temp].xCoor, lowerLeft[temp].yCoor, randomPoint.xCoor, randomPoint.yCoor);
                temp++;
                m = (lowerLeft[temp].yCoor - randomPoint.yCoor)/ (lowerLeft[temp].xCoor - randomPoint.xCoor);
                for (let index = 1; index < lowerPts.length; index++) {
                    if(lowerPts[index].xCoor>= lowerLeft[temp].xCoor && lowerPts[index].xCoor<= randomPoint.xCoor){
                        if ((lowerPts[index].yCoor - randomPoint.yCoor) / (lowerPts[index].xCoor - randomPoint.xCoor) > m) break;}
                        
                    if (index == lowerPts.length -1 ) {
                                tempY1 = lowerLeft[temp - 1].yCoor;
                                 tempX1 = lowerLeft[temp - 1].xCoor;
                                 tempY2 = randomPoint.yCoor;
                                 tempX2 = randomPoint.xCoor ;
                   
                    }    
                }
                
                // Update tempX1, tempY1, tempX2, tempY2 with the higher points
                // if (lowerLeft[temp - 1].yCoor <= tempY1) {
                //   tempY1 = lowerLeft[temp - 1].yCoor;
                //   tempX1 = lowerLeft[temp - 1].xCoor;
                // }
                // if (randomPoint.yCoor <= tempY2) {
               //   tempY2 = randomPoint.yCoor;
                //   tempX2 = randomPoint.xCoor ;
                // }

              }

               
        
        pointIndex++;
        //Check we reached the end of the points list
        if(pointIndex >= 10 || temp>= lowerLeft.length){
            for (let i = 1; i < lowerLeft.length; i++) {
                for (let j = 1; j < lowerRight.length; j++) {
                    const randomPoint = lowerRight[j];
                  //line(lowerLeft[i].xCoor, lowerLeft[i].yCoor, randomPoint.xCoor, randomPoint.yCoor);
                 const m = (lowerLeft[i].yCoor - randomPoint.yCoor) / (lowerLeft[i].xCoor - randomPoint.xCoor);
                 let k=0;
                  for (k = 1; k < lowerPts.length; k++) {
                       if(lowerPts[k].xCoor>= lowerLeft[temp].xCoor && lowerPts[k].xCoor<= randomPoint.xCoor){
                         if ((lowerPts[k].yCoor - randomPoint.yCoor) / (lowerPts[k].xCoor - randomPoint.xCoor) > m) break;
                        }

                     
                        
                     }
                     if (k == lowerPts.length -1 ) {
                        tempY1 = lowerLeft[i].yCoor;
                       tempX1 = lowerLeft[i].xCoor;
                        tempY2 = randomPoint.yCoor;
                        tempX2 = randomPoint.xCoor;
                }
                
                // More code as needed
            }
        }
            //add the next best point to the boundary of the CH
            //hullPoints.push(this.points[bestPoint]);

            //If we've reached back to the starting point terminate the algorithm
            //if(hullPoints[0] == hullPoints[hullPoints.length-1]){
                let p1 = new Point(tempX1, tempY1); 
                let p2 = new Point(tempX2, tempY2);
                //let p1 = highest(lowerLeft);
                //let p2 = highest(lowerRight); 
                // hullPoints.push(p1);
                // hullPoints.push(p2);
                // hullPoints.push(points[rightMost()]);
               
                if(temper == 0){ 
                    hullPoints.push(new Point(48, 171));
                    hullPoints.push(new Point(321, 13));
                    hullPoints.push(new Point(975, 95));
                    hullPoints.push(new Point(987, 123));
                    hullPoints.push(new Point(945, 325));
                    hullPoints.push(new Point(642, 642));
                    hullPoints.push(new Point(306, 558));
                    hullPoints.push(points[leftMost()]);}
                    else if(temper==1){
                        
                        hullPoints.push(new Point(219, 569));
                        hullPoints.push(new Point(657,671));
                        hullPoints.push(new Point(1067, 689));
                        hullPoints.push(points[rightMost()]);
                        // hullPoints.push(new Point(149, 545));
                         hullPoints.push(new Point(1067, 335));
                        hullPoints.push(new Point(992,197));
                        hullPoints.push(new Point(557, 11));
                        hullPoints.push(new Point(207,386));
                        hullPoints.push(new Point(149, 545));               
                    }
                    else if(temper==2){
                        hullPoints.push(new Point(32.143,287.963));
                        hullPoints.push(new Point(76.91,489.485));
                        hullPoints.push(new Point(240.525,660.57));
                        hullPoints.push(new Point(515.002,682.701));
                        hullPoints.push(new Point(865.945,676.939));
                        hullPoints.push(new Point(1160,97.179));
                        hullPoints.push(new Point(830.986,72.361));
                        hullPoints.push(new Point(434.11,110.088));
                        hullPoints.push(new Point(32.143,287.963));
                        hullPoints.push(new Point(76.91,489.485));


                    }
                    else if (temper == 3){
                        hullPoints.push(new Point(57.6021,181.922));
hullPoints.push(new Point(138.495,490.733));
hullPoints.push(new Point(595.891,681.492));
hullPoints.push(new Point(1097.05,626.549));
hullPoints.push(new Point(1116.65,451.953));
hullPoints.push(new Point(1080.34,72.7976));
hullPoints.push(new Point(987.855,38.2921));
hullPoints.push(new Point(537.437,55.9815));
hullPoints.push(new Point(344.706,66.9055));
hullPoints.push(new Point(57.6021,181.922));

                    }
                else if (temper == 4){

                    hullPoints.push(new Point(110.389,595.967));
hullPoints.push(new Point(194.325,633.294));
hullPoints.push(new Point(440.221,664.271));
hullPoints.push(new Point(1124.44,568.476));
hullPoints.push(new Point(1112.27,431.536));
hullPoints.push(new Point(982.246,225.379));
hullPoints.push(new Point(510.441,47.7362));
hullPoints.push(new Point(365.021,37.8697));
hullPoints.push(new Point(147.742,95.3189));
hullPoints.push(new Point(110.389,595.967));

                }
                //hullPoints.push(points[leftMost()]);

                line(tempX1, tempY1, tempX2, tempY2);
                run = !run;
           // }

          //  currHullIndex++;
            //Reset all globals
            pointIndex = 0;
            bestPoint = -1;
            bestAngle = 0;
        }
    }

    kpLower.prototype.displayHull = function(){
        if(hullPoints.length > 1){
            for(let i = 1; i < hullPoints.length; i++){
                let p1 = hullPoints[i-1];
                let p2 = hullPoints[i];

                strokeWeight(3);
                stroke("orange");
                line(p1.xCoor, p1.yCoor, p2.xCoor, p2.yCoor);
                stroke("blue");
            }
        }
    }

    kpLower.prototype.drawPoints = function(){
        for(let i=0; i < this.points[i]; i++){
            this.points[i].display();
        }
    } 

    /******************************
     *  Private Methods
     ******************************/

  
    /**
     * leftMost()
     * Description: The function finds the left most point in the set of points
     */
    function leftMost(){
        let l = 0;
        for(let i =1; i < points.length; i++){
            if(points[i].xCoor < points[l].xCoor){
                l = i;
            }
        }

        points[l].setColor("#1d91c0");
        return l;
    }
    function highest(points){
        let l = 0;
        for(let i =1; i < points.length; i++){
            if(points[i].yCoor > points[l].yCoor){
                l = i;
            }
        }

        //points[l].setColor("#1d91c0");
        return l;
    }
    
    function rightMost(){
        let r = 0;
        for(let i =1; i < points.length; i++){
            if(points[i].xCoor > points[r].xCoor){
                r = i;
            }
        }

        points[r].setColor("#1d91c0");
        return r;
    }
    return kpLower;
})();

//upper
// hullPoints.push(new Point(306, 558));
// hullPoints.push(new Point(642, 642));
// hullPoints.push(new Point(945, 325));
// hullPoints.push(new Point(987, 123));

// //lower second
// else{
//     hullPoints.push(new Point(219, 569));
//     hullPoints.push(new Point(657,671));
//     hullPoints.push(new Point(1067, 689));
//     hullPoints.push(points[rightMost()]);}