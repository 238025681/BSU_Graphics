
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var color = "black";




//==================================Линия===========================
function drawLine(shape, color) {
    let steep = false;

    if (Math.abs(shape.startX - shape.endX) < Math.abs(shape.startY - shape.endY)) {

        let swap = shape.startX;
        shape.startX = shape.startY;
        shape.startY = swap;

        swap = shape.endX;
        shape.endX = shape.endY;
        shape.endY = swap;
        steep = true;
    }

    if (shape.startX > shape.endX) {

        let swap = shape.startX;
        shape.startX = shape.endX;
        shape.endX = swap;

        swap = shape.startY;
        shape.startY = shape.endY;
        shape.endY = swap;
    }

    let deltaX = shape.endX - shape.startX;
    let deltaY = shape.endY - shape.startY;
    let derror2 = Math.abs(deltaY) * 2;
    let error2 = 0;
    let y = shape.startY;

    for (let x = shape.startX; x <= shape.endX; x++) {

        if (steep) {
            ctx.fillStyle = color;
            ctx.fillRect(y, x, 1, 1);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        }

        error2 += derror2;
        if (error2 > deltaX) {

            y += (shape.endY > shape.startY ? 1 : -1);
            error2 -= deltaX * 2;
        }

    }
}


let line = {
    startX: 100,
    startY: 100,
    endX: 200,
    endY: 200
};

color = "black";
drawLine(line, color);



//================================================//
//==============Централна симетрия спрямо началото на координатната система ==================================//

function rotationByO(line) {

    let lineScale = line;
    lineScale.startX *= -1;
    lineScale.startY *= -1;
    lineScale.endX *= -1;
    lineScale.endY *= -1;

    return lineScale;


}

//================================================//
//==============Осева симетрия спрямо оста OX==================================//

function symmetryByOx(line) {

    let lineScale = line;
    lineScale.startY *= -1;
    lineScale.endY *= -1;

    return lineScale;


}

//================================================//
//================================================Осева симетрия спрямо оста OY==================================//

function symmetryByOy(line) {

    let lineScale = line;
    lineScale.startY *= -1;
    lineScale.endY *= -1;

    return lineScale;


}

//============================Осева симетрия спрямо правата X = Y==================================//

function symmetryByOxOy(line) {

    let lineScale = line;
    lineScale.startX = lineScale.startY;
    lineScale.startY = lineScale.startX;
    lineScale.endX = lineScale.endY;
    lineScale.endY = lineScale.endX;
    return lineScale;


}



//================================================//

//=======================Транслация в направление, определено от вектор (M,N)=============================//
function translationWhitVector(line, pointM, pointN) {

    let vectorLine = line;

    vectorLine.startX = vectorLine.startX + pointM;
    vectorLine.startY = vectorLine.startY + pointN;
    vectorLine.endX = vectorLine.endX + pointM;
    vectorLine.endY = vectorLine.endY + pointN;

    return line;
}

 color = "yellow";
let line_0 = {
    startX: 100,
    startY: 100,
    endX: 200,
    endY: 200
};
line_0 = translationWhitVector(line_0, 50, 50);
//drawLine(line_0, color);

//====================================================//
//
//=======================Ротация на ъгъл =============================//
function rotationWhitAngle(line, angle) {

    let alpha = radians(angle);

    let cos = Math.cos(alpha);
    let sin = Math.sin(alpha);
    let lineWhitAngle = line;

    lineWhitAngle.startX = (lineWhitAngle.startX * cos) - (lineWhitAngle.startY * sin);
    lineWhitAngle.startY = (lineWhitAngle.startX * sin) + (lineWhitAngle.startY * cos);
    lineWhitAngle.endX = (lineWhitAngle.endX * cos) - (lineWhitAngle.endY * sin);
    lineWhitAngle.endY = (lineWhitAngle.endX * sin) + (lineWhitAngle.endY * cos);

    return lineWhitAngle;

}


function radians(deg)
{
    return deg * (Math.PI / 180);
}
color = "red";

let line_1 = {
    startX: 100,
    startY: 100,
    endX: 200,
    endY: 200
};
line_1 = rotationWhitAngle(line_1, 10);
//drawLine(line_1, color);
//====================================================//

//========================Мащабиране с коефициенти Kx и Ky ============================//
function scaleWhitRatio(line, ratioX, ratioY) {

    let lineScale = line;
    lineScale.startX = lineScale.startX * ratioX;
    lineScale.startY = lineScale.startY * ratioY;
    lineScale.endX = lineScale.startX * ratioX;
    lineScale.endY = lineScale.startY * ratioY;

    return lineScale;


}

color = "pink";
let  line_2 = {
    startX: 100,
    startY: 100,
    endX: 200,
    endY: 200
};
line_2 = scaleWhitRatio(line_2, 2, 2);
//drawLine(line_2, color);
//====================================================//
//=======================Ротация на ъгъл спрямо точка C=============================//


function rotationByPoint(line, point, angle) {

    let rotationByPointLine = line;

    rotationByPointLine = translationWhitVector(line, -point.X, -point.Y);

    rotationByPointLine = rotationWhitAngle(rotationByPointLine, angle);

    rotationByPointLine = translationWhitVector(rotationByPointLine, point.X, point.Y);



    return rotationByPointLine;


}

color = "green";
let point = {X: 100, Y: 100}
let line_5 = {
  startX: 100,
   startY: 100,
  endX: 200,
  endY: 200
};

//drawLine(rotationByPoint(line_5, point, 10), color);
//====================================================//
//================= ШАБЛОН =======================================
function drawSH(base_line, template, color) {


    let count = (base_line.endX - base_line.startX) > (base_line.endY - base_line.startY) ?
            Math.abs((base_line.endX - base_line.startX) / template.length) :
            Math.abs((base_line.endY - base_line.startY) / template.length);


    let scale = Math.pow(Math.pow(base_line.endX - base_line.startX, 2) + Math.pow(base_line.endY - base_line.startY, 0.5), 0.5);
    let startRatio = 0;
    let endRatio = template[1] / scale;
    let templateLine = {
        startX: base_line.startX,
        startY: base_line.startY,
        endX: Math.round(((1 - endRatio) * base_line.startX) + (endRatio * base_line.endX)),
        endY: Math.round(((1 - endRatio) * base_line.startY) + (endRatio * base_line.endY))
    };

    let i;

    for (i = 2; i < count; i++) {

        drawLine(templateLine, color);

        startRatio = endRatio + template[(2 * i - 1) % template.length] / scale;
        endRatio = startRatio + template[(2 * i - 2) % template.length] / scale;

        templateLine.startX = Math.round(((1 - startRatio) * base_line.startX) + (startRatio * base_line.endX));
        templateLine.startY = Math.round(((1 - startRatio) * base_line.startY) + (startRatio * base_line.endY));
        templateLine.endX = Math.round(((1 - endRatio) * base_line.startX) + (endRatio * base_line.endX));
        templateLine.endY = Math.round(((1 - endRatio) * base_line.startY) + (endRatio * base_line.endY));



        if (startRatio > 1) {
            startRatio = 1;
            break;
        }

        if (endRatio > 1) {

            endRatio = 1;
            break;
        }

    }


    templateLine.startX = Math.round(((1 - startRatio) * base_line.startX) + (startRatio * base_line.endX));
    templateLine.startY = Math.round(((1 - startRatio) * base_line.startY) + (startRatio * base_line.endY));
    templateLine.endX = base_line.endX;
    templateLine.endY = base_line.endY;

    drawLine(templateLine, color);

}


let base_line = {startX: 100, startY: 200, endX: 500, endY: 200};
color = "black";
let template = [6, 3, 1, 3];

//drawSH(base_line, template, color);

//================= ШАБЛОН =======================================
//========================Kоен Съдърланд============================//

let rectangle = {xMin: 100, xMax: 200, yMin: 100, yMax: 200}

ctx.rect(rectangle.xMin, rectangle.yMin, 100, 100);

let temp_line = {startX: 90, startY: 90, endX: 190, endY: 190}



let startPoint = {x: temp_line.startX, y: temp_line.startY};
let endPoint = {x: temp_line.endX, y: temp_line.endY};



const inside = 0;
const left = 1;
const right = 2;
const bottom = 4;
const TOP = 8;

//ctx.stroke();
//cohenSutherlandLineClipAndDraw(rectangle, startPoint, endPoint);

function computOutCode(rectangle, point) {

    let code = inside;
    if (point.x < rectangle.xMin) {
        code |= left;

    } else if (point.x > rectangle.xMax) {

        code |= right;

    }

    if (point.y < rectangle.yMin) {

        code |= bottom;

    } else if (point.y > rectangle.yMax) {

        code |= TOP;

    }

    return code;

}
;


function cohenSutherlandLineClipAndDraw(rectangle, startPoint, endPoint) {

    let startPointCode = computOutCode(rectangle, startPoint);
    let endPointCode = computOutCode(rectangle, endPoint);

    let accept = false;
  
    while (true) {
        if (!(startPointCode | endPointCode)) {

            accept = true;
            break;
        } else if (startPointCode & endPointCode) {
            break;
        } else {

            let x, y;
            let outcodeOut = startPointCode ? startPointCode : endPointCode;


            //console.log(endPointCode);

            if (outcodeOut & TOP) {           // point is above the clip window
                x = startPoint.x + (endPoint.x - startPoint.x) * (rectangle.yMax - startPoint.y) / (endPoint.y - startPoint.y);
                y = rectangle.yMax;
            } else if (outcodeOut & bottom) { // point is below the clip window
                x = startPoint.x + (endPoint.x - startPoint.x) * (rectangle.yMin - startPoint.y) / (endPoint.y - startPoint.y);
                y = rectangle.yMin;
            } else if (outcodeOut & right) {  // point is to the right of clip window
                y = startPoint.y + (endPoint.y - startPoint.y) * (rectangle.xMax - startPoint.x) / (endPoint.x - startPoint.x);
                x = rectangle.xMax;
            } else if (outcodeOut & left) {   // point is to the left of clip window
                y = startPoint.y + (endPoint.y - startPoint.y) * (rectangle.xMin - startPoint.x) / (endPoint.x - startPoint.x);
                x = rectangle.xMin;
            }


            if (outcodeOut === startPointCode) {
                startPoint.x = x;
                startPoint.y = y;
                startPointCode = computOutCode(rectangle, startPoint);
            } else {
                endPoint.x = x;
                endPoint.y = y;
                endPointCode = computOutCode(rectangle, endPoint);
            }
        }



    }

    if (accept) {


        temp_line = {startX: startPoint.x, startY: startPoint.y, endX: endPoint.x, endY: endPoint.y}
        



         drawLine(temp_line, "red");

    }


}

//====================================================//
//====================================================//
//====================================================//
//====================================================//
//====================================================//
//====================================================//
//====================================================//
//====================================================//
//====================================================//
//====================================================//




//RGB to HSV 
//===============================//===============================//===============================



var r=128;
var g=232;
var b=17;
var rgb=255;

var rP=r/rgb;
var gP=g/rgb;
var bP=b/rgb;

var min=0;
var max=0;
var maxColor=0;
var hue=0;
var saturation=0;
var valueCalculation=0;


if(rP>=gP && rP>=bP){
	max=rP;
}else if(gP>=rP && gP>=bP){
	max=gP;
	maxColor=1;
}else{
	max=bP;
	maxColor=2;
}

if(rP<=gP && rP<=bP){
	min=rP;
}else if(gP<=rP && gP<=bP){
	min=gP;
}else{
	min=bP;
}

delta=max-min
valueCalculation=max;


if(delta == 0){
	hue = 0;
	
}else if(maxColor==0){
	
	hue = 60*((gP-bP/delta)%6);
	
}else if(maxColor==1){

	hue = 60*((bP-rP/delta)+2);
	
}else if(maxColor==2){

	hue = 60*((rP-gP/delta)+4);
	
}

if(max != 0){
	
	saturation = delta / max;
}





//alert(" Red MAX - " + rP + "\n Green MAX - " + gP + "\n Blue MAX - " + bP
//+ "\n MAX - " + max + "\n MIN - " + min + "\n HUE - " + hue + "\n Delta - " + delta
//+ "\n Saturation - " + saturation);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//RGB TO CYMC

var red = 100;
var green = 150;
var blue = 200;
var rgb = 255;

var redPrime = red/rgb;
var greenPrime = green/rgb;
var bluePrime = blue/rgb;

var min = 0;
var max = 0;



var blackKey = 0;
var cyanColor = 0;
var magentaColor =  0;
var yellowColor = 0;


if(redPrime >= greenPrime && redPrime >= bluePrime){
	max = redPrime;
}else if(greenPrime >= redPrime && greenPrime >= bluePrime){
	max = greenPrime;
	
}else{
	max = bluePrime;
	
}

if(redPrime <= greenPrime && redPrime <= bluePrime){
	
	min = redPrime;
	
}else if( greenPrime <= redPrime && greenPrime <= bluePrime){
	
	min = greenPrime;
	
}else{
	
	min = bluePrime;
}


blackKey = 1 - max;
cyanColor = (1 - redPrime - blackKey) / (1 - blackKey);
magentaColor = (1 - greenPrime - blackKey) / (1 - blackKey);
yellowColor = (1 - bluePrime - blackKey) / (1 - blackKey);








//alert("Red MAX - " + redPrime + "\nGreen MAX - " + greenPrime + "\nBlue MAX - " + bluePrime
//+ "\nMAX - " + max + "\nMIN - " + min + "\nBlack Key - " + blackKey + "\nCyan Color - " + cyanColor
//+ "\nMagenta Color - " + magentaColor + "\nYellow Color - " + yellowColor 
//+ "\nRED - " + red + "\nGreen - " + green + "\nBLUE - " + blue);
/*
vectori

Grafika

var stroke_color = "ff0000";
var sprite = new createjs.Shape();

sprite.graphics.beginStroke(stroke_color)

	.moveTo(100,100)
		.lineTo(150,150).lineTo(100,300).lineTo(100,100)
	.moveTo(150,150)
		.lineTo(200,100).lineTo(200,300).lineTo(150,150);
	
stage.addChild(sprite);


=================================================================

3D vektor


var stroke_color = "ff0000";
var sprite = new createjs.Shape();
var xCordinate = 150;
var yCordinate = 150;

sprite.graphics.beginStroke(stroke_color)

	.moveTo(150,150)
		.lineTo(300,150).lineTo(300,300).lineTo(150,300).lineTo(150,150);
		
		for(var i = 0; i < 150; i+=5){
			
		sprite.graphics.beginStroke(stroke_color)
			.moveTo(xCordinate + i ,yCordinate ).lineTo(xCordinate*2, yCordinate + i)
			.moveTo(xCordinate ,yCordinate + i ).lineTo(xCordinate + i, yCordinate*2)
			.moveTo(xCordinate + i ,yCordinate*2 ).lineTo(xCordinate*2, yCordinate*2 - i)
			.moveTo(xCordinate*2 - i ,yCordinate ).lineTo(xCordinate, yCordinate + i);
		}
	
stage.addChild(sprite);

===================================================================================================================

Piksel


var stroke_color = "ff0000";

		
var piksel =  new createjs.Shape();
		
		piksel.graphics.beginFill(stroke_color);
		piksel.graphics.drawRect(100, 100, 5, 5);
		
		stage.addChild(piksel);


================================================================================================================


raster grafics

	
	var x0 = 200;
	var x1 = 400;
	var y0 = 200;
	var y1 = 400;
	var deltax = x1 - x0;
   	var deltay = y1 - y0;
	var error = 0;
	var deltaerr = Math.abs(deltay / deltax);    
	var y = y0;
	var x = 0;
	var stroke_color = "ff0000";
	var piksel =  new createjs.Shape();
	
	for(i=x0; i < x1; i++){

		x = i;
		y = i;
		
		
		piksel.graphics.beginFill(stroke_color);
		piksel.graphics.drawRect(x, y, 1, 1);
		
		stage.addChild(piksel);
		error = error + deltaerr;
		if(error >= 0.5){
			y = y + 1;
			error = error - 1.0;
		}

	}	

=================================================================

raster grafics 45 gr.

	var x0 = 200;
	var x1 = 300;
	var y0 = 200;
	var y1 = 400;
	var deltax = x1 - x0;
   	var deltay = y1 - y0;
	var error = 0;
	var deltaerr = Math.abs(deltay / deltax);    
	var y = y0;
	var x = 0;
	var stroke_color = "ff0000";
	var piksel =  new createjs.Shape();
	
	for(i=x0; i < x1; i++){

		x = i;
		y = y + 2;
		
		
		piksel.graphics.beginFill(stroke_color);
		piksel.graphics.drawRect(x, y, 1, 1);
		
		
		error = error + deltaerr;
		
		if(error >= 0.5){
			y = y + 1;
			error = error - 1.0;
		}

	}	
	
	stage.addChild(piksel);
=================================================================

	raster grafics reverse

	var x0 = 400;
	var x1 = 200;
	var y0 = 400;
	var y1 = 200;
	var deltax = x0 - x1;
    	var deltay = y0 - y1;
	var error = 0;
	var deltaerr = Math.abs(deltay / deltax);    
	var y = y0;
	var x = x1;
	var stroke_color = "ff0000";
	var piksel =  new createjs.Shape();
	
	for(i=x1; i < x0; i++){

		x = i;
		y = y - 1;
		
		
		piksel.graphics.beginFill(stroke_color);
		piksel.graphics.drawRect(x, y, 1, 1);
		
		stage.addChild(piksel);
		error = error + deltaerr;
		if(error >= 0.5){
			x = x + 1;
			error = error - 1.0;
		}

	}	
	
================================================================


raster grafics reverse 45

	var x0 = 400;
	var x1 = 200;
	var y0 = 400;
	var y1 = 200;
	var deltax = x0 - x1;
    	var deltay = y0 - y1;
	var error = 0;
	var deltaerr = Math.abs(deltay / deltax);    
	var y = y0;
	var x = x1;
	var stroke_color = "ff0000";
	var piksel =  new createjs.Shape();
	
	for(i=x1; i < x0; i+=0.5){

		x = i;
		y = y - 1;
		
		
		piksel.graphics.beginFill(stroke_color);
		piksel.graphics.drawRect(x, y, 1, 1);
		
		stage.addChild(piksel);
		error = error + deltaerr;
		if(error >= 0.5){
			x = x + 1;
			error = error - 1.0;
		}

	}	




//================================================================



Bresenham_circle

var stroke_color = "ff0000";
var radius = 50;
var xcenter = 200;
var ycenter = 200;
var piksel =  new createjs.Shape();
	
	piksel.graphics.beginFill(stroke_color);
	bresenham_Circle(radius, xcenter, ycenter);
		

stage.addChild(piksel);



function bresenham_Circle(radius,xcenter,ycenter){
  var xstart = 0;
  var ystart = radius;
  var sum = 3-2*radius;
  while(xstart <= ystart){
	  
      set_eight(xstart,ystart,xcenter,ycenter);
      
	  if(sum <= 0){ 
		
		  sum = sum + 4*xstart + 6;
		  
	  } else {
		 
		  sum = sum + 4*(xstart-ystart) + 10;

          ystart--;
	  }
	  
      xstart++;
    }
}

function set_eight(x,y,xcenter,ycenter){
	
	piksel.graphics.drawRect(x+xcenter,y+ycenter, 1, 1);
	piksel.graphics.drawRect(-x+xcenter,y+ycenter, 1, 1);
	piksel.graphics.drawRect(x+xcenter,-y+ycenter, 1, 1);
	piksel.graphics.drawRect(-x+xcenter,-y+ycenter, 1, 1);
	piksel.graphics.drawRect(y+xcenter,x+ycenter, 1, 1);
	piksel.graphics.drawRect(-y+xcenter,x+ycenter, 1, 1);
	piksel.graphics.drawRect(y+xcenter,-x+ycenter, 1, 1);
	piksel.graphics.drawRect(-y+xcenter,-x+ycenter, 1, 1);
	
	
}

*/

//===============================================//===============================//===============================





