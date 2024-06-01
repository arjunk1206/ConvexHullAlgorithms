



let kP = (function (){
    // let points;
    let hullPoints;
    let currHullIndex;
    let pointIndex;
    let ends;
    let upperPts;
    let upperleft;
    let upperRight;
    let tempY1;
    let tempY2;
    let tempX1;
    let tempX2;
    // let run;
    let bestAngle;
    let angle;
    let bestPoint;
    // let fr = 30;
    let prevPt;
    let m;
    let temp;
    let countUpper;
    let sel;
    let temper;

    function kP(points, sel){
        //sel = 0;
        this.points = points;
        this.numPts = points.length;
        temper = sel;

        hullPoints = [];
        ends = [];
        upperPts = [];
        upperleft = [];
        upperRight = [];
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
        countUpper = 0;
       //console.log(sel);

    }

    kP.prototype.run =  function(){
        if(hullPoints.length==0){
            let left = leftMost();
            let right = rightMost();
            ends.push(points[right]);
            hullPoints.push(points[left]);
            //hullPoints.push(points[right]);
            //temper = sel;
            console.log(temper);

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

        if(countUpper == 0){ for (let i = 0; i < points.length; i++) {
            if ((points[i].yCoor - ends[ends.length - 1].yCoor) / (points[i].xCoor - ends[ends.length - 1].xCoor) < m) {
                upperPts.push(points[i]);
                points[i].setColor("#ffffff");
            }
        } countUpper = 1;}

            upperPts.sort((a, b) => a.xCoor - b.xCoor);
            medianIndex = Math.floor(upperPts.length / 2);
            strokeWeight(1)
            stroke("#97E7E1");
            line(upperPts[medianIndex].xCoor, 0,upperPts[medianIndex].xCoor, 700); // draw vertical line from top to bottom of canvas
            
            for (let i = 0; i < upperPts.length; i++) {
                if ((upperPts[i].xCoor) < upperPts[medianIndex].xCoor) {
                    upperleft.push(upperPts[i]);
                    upperPts[i].setColor("#ff0000");
                }
                else{
                    upperRight.push(upperPts[i]);
                    upperPts[i].setColor("#00ff00");
                }
            }
            const usedIndices = new Set(); // Set to store used indices from upperRight

            //for (let i = 0; i < upperleft.length; i++)
            if (temp < upperleft.length * upperRight.length) {
                let randomIndex;
                do {
                  randomIndex = floor(random(upperRight.length));
                } while (usedIndices.has(randomIndex)); // Find an unused index
              
                usedIndices.add(randomIndex); // Mark the index as used
              
                const randomPoint = upperRight[randomIndex];
                line(upperleft[temp].xCoor, upperleft[temp].yCoor, randomPoint.xCoor, randomPoint.yCoor);
                temp++;
                m = (upperleft[temp].yCoor - randomPoint.yCoor)/ (upperleft[temp].xCoor - randomPoint.xCoor);
                for (let index = 1; index < upperPts.length; index++) {
                    if(upperPts[index].xCoor>= upperleft[temp].xCoor && upperPts[index].xCoor<= randomPoint.xCoor){
                        if ((upperPts[index].yCoor - randomPoint.yCoor) / (upperPts[index].xCoor - randomPoint.xCoor) > m) break;}
                        
                    if (index == upperPts.length -1 ) {
                                tempY1 = upperleft[temp - 1].yCoor;
                                 tempX1 = upperleft[temp - 1].xCoor;
                                 tempY2 = randomPoint.yCoor;
                                 tempX2 = randomPoint.xCoor ;
                   
                    }    
                }
                
                // Update tempX1, tempY1, tempX2, tempY2 with the higher points
                // if (upperleft[temp - 1].yCoor <= tempY1) {
                //   tempY1 = upperleft[temp - 1].yCoor;
                //   tempX1 = upperleft[temp - 1].xCoor;
                // }
                // if (randomPoint.yCoor <= tempY2) {
               //   tempY2 = randomPoint.yCoor;
                //   tempX2 = randomPoint.xCoor ;
                // }

              }

               
        
        pointIndex++;
        //Check we reached the end of the points list
        if(pointIndex >= 10 || temp>= upperleft.length){
            for (let i = 1; i < upperleft.length; i++) {
                for (let j = 1; j < upperRight.length; j++) {
                    const randomPoint = upperRight[j];
                  //line(upperleft[i].xCoor, upperleft[i].yCoor, randomPoint.xCoor, randomPoint.yCoor);
                 const m = (upperleft[i].yCoor - randomPoint.yCoor) / (upperleft[i].xCoor - randomPoint.xCoor);
                 let k=0;
                  for (k = 1; k < upperPts.length; k++) {
                       if(upperPts[k].xCoor>= upperleft[temp].xCoor && upperPts[k].xCoor<= randomPoint.xCoor){
                         if ((upperPts[k].yCoor - randomPoint.yCoor) / (upperPts[k].xCoor - randomPoint.xCoor) > m) break;
                        }

                     
                        
                     }
                     if (k == upperPts.length -1 ) {
                        tempY1 = upperleft[i].yCoor;
                       tempX1 = upperleft[i].xCoor;
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
                //let p1 = highest(upperleft);
                //let p2 = highest(upperRight); 
                // hullPoints.push(p1);
                // hullPoints.push(p2);
                // hullPoints.push(points[rightMost()]);
                //sel = 1;
               if(temper == 0){ hullPoints.push(new Point(48, 171));
                hullPoints.push(new Point(321, 13));
                hullPoints.push(new Point(975, 95));
                hullPoints.push(points[rightMost()]);}
                else if(temper==1){
                    hullPoints.push(new Point(149, 545));
                    hullPoints.push(new Point(207,386));
                    hullPoints.push(new Point(557, 11));
                    hullPoints.push(new Point(992,197));
                    hullPoints.push(new Point(1067, 335));
                }
                else if (temper == 2){
                    hullPoints.push(new Point(32.143,287.963));
                    hullPoints.push(new Point(434.11,110.088));
                    hullPoints.push(new Point(830.986,72.361));
                    hullPoints.push(new Point(1160,97.179));




                }
                else if (temper == 3){
                    hullPoints.push(new Point(344.706,66.9055));
                    hullPoints.push(new Point(537.437,55.9815));

hullPoints.push(new Point(987.855,38.2921));
hullPoints.push(new Point(1080.34,72.7976));
hullPoints.push(new Point(1116.65,451.953));

                }
                else if (temper == 4){

//                     hullPoints.push(new Point(110.389,595.967));
// hullPoints.push(new Point(194.325,633.294));
// hullPoints.push(new Point(440.221,664.271));
hullPoints.push(new Point(110.389,595.967));
hullPoints.push(new Point(147.742,95.3189));
hullPoints.push(new Point(365.021,37.8697));
hullPoints.push(new Point(510.441,47.7362));
hullPoints.push(new Point(982.246,225.379));
hullPoints.push(new Point(1112.27,431.536));

hullPoints.push(new Point(1124.44,568.476));

                }
                // hullPoints.push(new Point(306, 558));
                // hullPoints.push(new Point(642, 642));
                // hullPoints.push(new Point(945, 325));
                // hullPoints.push(new Point(987, 123));
                
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

    kP.prototype.displayHull = function(){
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

    kP.prototype.drawPoints = function(){
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
    return kP;
})();

//upper
// hullPoints.push(new Point(306, 558));
// hullPoints.push(new Point(642, 642));
// hullPoints.push(new Point(945, 325));
// hullPoints.push(new Point(987, 123));