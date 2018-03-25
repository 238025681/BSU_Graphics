"use strict";

	function getCordinates(){
		alert("click");
	}




var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	drawSH();


let line = {
    startX: 100,
    startY: 100,
    endX: 200,
    endY: 200
};

let color = "black";
//drawLine(line, color);


let l1 = {
    startX: 75,
    startY: 50,
    endX: 75,
    endY: 100
};

color = "cyan";
//drawLine(l1, color);

let l2 = {
    startX: 100,
    startY: 50,
    endX: 50,
    endY: 100
};
color = "orange";
//drawLine(l2, color);

let m = (l2.endY - l2.startY) / (l2.endX - l2.startX);
let b = l2.startY - (m * l2.startX);


//Y = Mx + b
let newPoint = (m * l2.startX) + b;



//alert(newPoint);


//  Транслация в направление, определено от вектор (M,N):

//color = "yellow";
//let line_3 = translationWhitVector(line, 50, 50);
//drawLine(line_3, color);

//==================•	Ротация на ъгъл :==============================//

//color = "red";
//let line_2 = rotationWhitAngle(line, 10);
//drawLine(line_2, color);

//================================================//
//======================•	Мащабиране с коефициенти Kx и Ky :==========================//

//color = "pink";
//let line_4 = scaleWhitRatio(line, 2, 2);
//drawLine(line_4, color);
//================================================//
//==============	Централна симетрия спрямо началото на координатната система ==================================//


//================================================//

//=========Ротация на ъгъл  спрямо точка C, с координати (Xc,Yc), различна от началото на координатната система:=======================================//

//color = "green";
//let point = {X: 100, Y: 100}
//let line_5 = {
 //   startX: 100,
 //   startY: 100,
 //   endX: 200,
 //   endY: 200
//};

//drawLine(rotationByPoint(line_5, point, 10), color);


//================================================//


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

//  Транслация в направление, определено от вектор (M,N):

function translationWhitVector(line, pointM, pointN) {

    let vectorLine = line;

    vectorLine.startX = vectorLine.startX + pointM;
    vectorLine.startY = vectorLine.startY + pointN;
    vectorLine.endX = vectorLine.endX + pointM;
    vectorLine.endY = vectorLine.endY + pointN;

    return line;
}

//================================================//
//======================•	Мащабиране с коефициенти Kx и Ky :==========================//
function scaleWhitRatio(line, ratioX, ratioY) {

    let lineScale = line;
    lineScale.startX = lineScale.startX * ratioX;
    lineScale.startY = lineScale.startY * ratioY;
    lineScale.endX = lineScale.startX * ratioX;
    lineScale.endY = lineScale.startY * ratioY;

    return lineScale;


}

//================================================//
//==============	Централна симетрия спрямо началото на координатната система ==================================//

function rotationByO(line) {

    let lineScale = line;
    lineScale.startX *= -1;
    lineScale.startY *= -1;
    lineScale.endX *= -1;
    lineScale.endY *= -1;

    return lineScale;


}

//================================================//
//==============		Осева симетрия спрямо оста OX: ==================================//

function symmetryByOx(line) {

    let lineScale = line;
    lineScale.startY *= -1;
    lineScale.endY *= -1;

    return lineScale;


}

//================================================//
//================================================ 	Осева симетрия спрямо оста OY: ==================================//

function symmetryByOy(line) {

    let lineScale = line;
    lineScale.startY *= -1;
    lineScale.endY *= -1;

    return lineScale;


}

//============================	Осева симетрия спрямо правата X = Y:==================================//

function symmetryByOxOy(line) {

    let lineScale = line;
    lineScale.startX = lineScale.startY;
    lineScale.startY = lineScale.startX;
    lineScale.endX = lineScale.endY;
    lineScale.endY = lineScale.endX;
    return lineScale;


}

//================================================//
//=========Ротация на ъгъл  спрямо точка C, с координати (Xc,Yc), различна от началото на координатната система:=======================================//
 
 
function rotationByPoint(line, point, angle) {

    let rotationByPointLine = line;

    rotationByPointLine = translationWhitVector(line, -point.X, -point.Y);
   
    rotationByPointLine = rotationWhitAngle(rotationByPointLine, angle);

    rotationByPointLine = translationWhitVector(rotationByPointLine, point.X, point.Y);
 
    

    return rotationByPointLine;


}
 
  
//================================================//


let rectangle = { xMin: 100, xMax: 200, yMin: 100, yMax: 200 }

ctx.rect(rectangle.xMin, rectangle.yMin, 100, 100);
//ctx.stroke();
let temp_line = { startX: 90 , startY: 90, endX: 190, endY: 190 }
//drawLine(temp_line, "red");


let startPoint = { x: temp_line.startX, y: temp_line.startY };
let endPoint = { x: temp_line.endX, y: temp_line.endY };



const inside = 0;
const left = 1 ;
const right = 2 ;
const bottom = 4;
const TOP = 8;

cohenSutherlandLineClipAndDraw(rectangle, startPoint, endPoint );

function computOutCode(rectangle, point){
   
   let code = inside  ;
   if(point.x < rectangle.xMin) {
     code |= left;
 
 }else if(point.x > rectangle.xMax){
  
  code |= right;

}

if(point.y < rectangle.yMin ){

  code |= bottom;

}else if(point.y > rectangle.yMax ){
  
  code |= TOP;

}

return code;

};


function cohenSutherlandLineClipAndDraw(rectangle, startPoint, endPoint ){

   let startPointCode = computOutCode(rectangle, startPoint);
   let endPointCode = computOutCode(rectangle, endPoint);
  
   let accept = false;
  // console.log(startPointCode);
//   console.log(endPointCode);
  
   while(true){
    if(! (startPointCode | endPointCode )){
   
      accept = true ;
      break;
    }else if ( startPointCode & endPointCode ){
      break;
    }else {
   
      let x, y;
      let outcodeOut = startPointCode ? startPointCode : endPointCode;
 
 
 //console.log(endPointCode);

      if (outcodeOut & TOP) {           // point is above the clip window
         x = startPoint.x + (endPoint.x - startPoint.x) * (rectangle.yMax - startPoint.y) / (endPoint.y - startPoint.y);
         y = rectangle.yMax;
      }else if (outcodeOut & bottom) { // point is below the clip window
         x = startPoint.x  + (endPoint.x  - startPoint.x ) * (rectangle.yMin - startPoint.y) / (endPoint.y  - startPoint.y );
         y = rectangle.yMin;
      }else if (outcodeOut & right ) {  // point is to the right of clip window
         y = startPoint.y  + (endPoint.y  - startPoint.y ) * (rectangle.xMax  - startPoint.x ) / (endPoint.x - startPoint.x );
         x = rectangle.xMax ;
      }else if (outcodeOut & left ) {   // point is to the left of clip window
         y = startPoint.y  + (endPoint.y  - startPoint.y ) * (rectangle.xMin  - startPoint.x ) / (endPoint.x  - startPoint.x );
         x = rectangle.xMin ;
      }
     
    
      if (outcodeOut === startPointCode ) {
         startPoint.x  = x;
         startPoint.y  = y;
         startPointCode  = computOutCode(rectangle, startPoint);
      } else {
      endPoint.x = x;
      endPoint.y  = y;
      endPointCode  = computOutCode(rectangle , endPoint );
      }
    }
    
 
 
   }
  
  if (accept) {
  // Following functions are left for implementation by user based on
  // their platform (OpenGL/graphics.h etc.)
  
  temp_line = { startX: startPoint.x , startY: startPoint.y , endX: endPoint.x, endY: endPoint.y }
  //console.log (JSON.stringify(temp_line) );
  
  
  
 // drawLine(temp_line, "red");
  
  }
   

}


    







//================================================//



function drawSH() {


    let s_line = { startX: 50, startY: 100, endX: 100, endY: 100 };
  
    let array = [4, 2, 2, 2];

    let k1 = 0;
    let l_length = Math.pow(Math.pow(s_line.endX - s_line.startX,2) + Math.pow(s_line.endY - s_line.startY,0.5),0.5);
    
    let k2 = array[1] / l_length;
    let count = Math.round(l_length / array.length);
        let x0 = s_line.startX;
        let y0 = s_line.startY;
        let x1 = Math.round(((1 - k2) * s_line.startX) + (k2 * s_line.endX)); //x0+4
        let y1 = Math.round(((1 - k2) * s_line.startY) + (k2 * s_line.endY));

  

    for (let i = 2  ; i <= count; i++) {

        //	o	Ако k1  > 1, полагаме k1  = 1  /Q1  ?  P2/ и излизаме от цикъла.
        //o	Ако k2  > 1, полагаме k2  = 1  /Q2  ?  P1/ и излизаме от цикъла.

        let color = "pink";

        
        
        drawLine({startX: x0, startY: y0, endX: x1, endY: y1}, color)

       
       
        k1 = (k2 + array[(2 * i - 2) % array.length]) / l_length;
        k2 = (k1 + array[(2 * i - 1) % array.length]) / l_length;
        
        
        

       
        
        x0 += Math.round(((k1) * s_line.endX));
        y0 = Math.round(((1 - k1) * s_line.startY) + (k1 * s_line.endY));
        x1 += Math.round( (k2 * s_line.endX)); 
        y1 = Math.round(((1 - k2) * s_line.startY) + (k2 * s_line.endY));
        

       
        console.log("X0 Start01 - " + x0);
        
        console.log("End x01 - " +  x1);
        
       
       

        if (k1 > 1) {
            k1 = 1;
            break;
        }
        if (k2 > 1) {
            k2 = 1;
            break;
        }

    }
    

}














/*-----------------------------------------------------------------------------------*/