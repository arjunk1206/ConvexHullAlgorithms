let kP = (function () {
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
  let upperCalc;
  let temp;

  function kP(points) {
    this.points = points;
    this.numPts = points.length;
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
    temp = 1;
    tempY1 = 700;
    tempY2 = 700;
    tempX1 = 1300;
    tempX2 = 1300;
    upperCalc = 0;
  }

  kP.prototype.run = function () {
    if (hullPoints.length == 0) {
      let left = leftMost();
      let right = rightMost();
      ends.push(points[right]);
      hullPoints.push(points[left]);
      ends.push(points[left]);
    }

    computeUpperHull(ends, this.points);
  };

  function computeUpperHull(ends, points) {
    let p1 = ends[ends.length - 1];
    let p2 = ends[ends.length - 2];
    strokeWeight(1);
    stroke("black");
    line(p1.xCoor, p1.yCoor, p2.xCoor, p2.yCoor);

    m =
      (ends[ends.length - 2].yCoor - ends[ends.length - 1].yCoor) /
      (ends[ends.length - 2].xCoor - ends[ends.length - 1].xCoor);

    for (let i = 0; i < points.length; i++) {
      if (
        (points[i].yCoor - ends[ends.length - 1].yCoor) /
          (points[i].xCoor - ends[ends.length - 1].xCoor) <
        m
      ) {
        upperPts.push(points[i]);
        points[i].setColor("#ffffff");
      }
    }

    upperPts.sort((a, b) => a.xCoor - b.xCoor);
    medianIndex = Math.floor(upperPts.length / 2);
    strokeWeight(1);
    stroke("black");
    line(upperPts[medianIndex].xCoor, 0, upperPts[medianIndex].xCoor, 700); // draw vertical line from top to bottom of canvas
    if (upperCalc == 0) {
      for (let i = 0; i < upperPts.length; i++) {
        if (upperPts[i].xCoor < upperPts[medianIndex].xCoor) {
          upperleft.push(upperPts[i]);
          upperPts[i].setColor("#ff0000");
        } else {
          upperRight.push(upperPts[i]);
          upperPts[i].setColor("#00ff00");
        }
        upperCalc = 1;
      }
    }
    const usedIndices = new Set(); // Set to store used indices from upperRight

    if (temp < upperleft.length) {
      for (let randomindex = 1;randomindex < upperRight.length;randomindex++) {

        const randomPoint = upperRight[randomIndex];
        
        console.log(upperleft.length * upperRight.length);
        // Update tempX1, tempY1, tempX2, tempY2 with the higher points
        m = (upperleft[temp].yCoor - randomPoint.yCoor)/ (upperleft[temp].xCoor - randomPoint.xCoor);
            if(upperPts[index].xCoor>= upperleft[temp].xCoor && upperPts[index].xCoor<= randomPoint.xCoor){
                if ((upperPts[index].yCoor - randomPoint.yCoor) / (upperPts[index].xCoor - randomPoint.xCoor) > m) break;}
                
            if (index == upperPts.length -1 ) {
                        tempY1 = upperleft[temp - 1].yCoor;
                         tempX1 = upperleft[temp - 1].xCoor;
                         tempY2 = randomPoint.yCoor;
                         tempX2 = randomPoint.xCoor ;
           
            }    
        temp++;
      // if (randomPoint.yCoor <= tempY2) {
      //     tempY2 = randomPoint.yCoor;
      //     tempX2 = randomPoint.xCoor;
      // }
    }

    pointIndex++;
    //Check we reached the end of the points list
    if (pointIndex >= 40 || temp >= upperleft.length) {
      let p1 = new Point(tempX1, tempY1);
      let p2 = new Point(tempX2, tempY2);
      hullPoints.push(p1);
      hullPoints.push(p2);
      hullPoints.push(points[rightMost()]);

      line(tempX1, tempY1, tempX2, tempY2);

      // Reset globals and call computeUpperHull() recursively with updated ends
      pointIndex = 0;
      bestPoint = -1;
      bestAngle = 0;
      temp = 0;
      upperPts = [];
      upperleft = [];
      upperRight = [];
      ends = [p1, p2];
      // = !run;
      computeUpperHull(ends, points); // Recursive call
    }
  }

  kP.prototype.displayHull = function () {
    if (hullPoints.length > 1) {
      for (let i = 1; i < hullPoints.length; i++) {
        let p1 = hullPoints[i - 1];
        let p2 = hullPoints[i];

        strokeWeight(3);
        stroke("orange");
        line(p1.xCoor, p1.yCoor, p2.xCoor, p2.yCoor);
        stroke("blue");
      }
    }
  };

  kP.prototype.drawPoints = function () {
    for (let i = 0; i < this.points[i]; i++) {
      this.points[i].display();
    }
  };

  /******************************
   *  Private Methods
   ******************************/

 
  /**
   * leftMost()
   * Description: The function finds the left most point in the set of points
   */
  function leftMost() {
    let l = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i].xCoor < points[l].xCoor) {
        l = i;
      }
    }

    points[l].setColor("#1d91c0");
    return l;
  }
  function highest(points) {
    let l = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i].yCoor > points[l].yCoor) {
        l = i;
      }
    }

    //points[l].setColor("#1d91c0");
    return l;
  }

  function rightMost() {
    let r = 0;
    for (let i = 1; i < points.length; i++) {
      if (points[i].xCoor > points[r].xCoor) {
        r = i;
      }
    }

    points[r].setColor("#1d91c0");
    return r;
  }

  return kP;
}})();
