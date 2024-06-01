

function Point(xCoor, yCoor){
    this.xCoor = xCoor;
    this.yCoor = yCoor;
    this.color = "#d4c3c3"; 
    this.r = 5;
}

Point.prototype.display = function(){
    fill(this.color);
    circle(this.xCoor,this.yCoor,this.r);
}

Point.prototype.getXCoord = function(){
    return this.xCoor;
}

Point.prototype.getyCoord = function(){
    return this.yCoor;
}

Point.prototype.setColor = function(newColor){
    this.color = newColor;
}