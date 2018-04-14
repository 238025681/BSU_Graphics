"use strict";
const bodyNode = document.getElementsByTagName("BODY")[0];
const containerNode = document.createElement('div');
const canvasNode = document.createElement("canvas");
const ctx = canvasNode.getContext("2d");

const inside = 0;
const left = 1;
const right = 2;
const bottom = 4;
const TOP = 8;
let template = [6, 3, 1, 3];
let color = "black";

/*
* drawLine
* rotationWhitAngle
* translationWhitVector
* scaleWhitRatio
* rotationByO
* symmetryByOx
* symmetryByOy
* symmetryByOxOy
* rotationByPoint
* cohenSutherlandLineClipAndDraw
* drawByTemplate
* */

const MyGraphicsMethod = (function () {
    const pencil = new MyGraphicsMethod();

    function MyGraphicsMethod() {
    }

    MyGraphicsMethod.prototype.drawLine = function (shape, color) {
        let steep = false;

        if (Math.abs(shape.startX - shape.endX) < Math.abs(shape.startY - shape.endY)) {


            [shape.startX, shape.startY] = [shape.startY, shape.startX];
            [shape.endX, shape.endY] = [shape.endY, shape.endX];

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
    };

    MyGraphicsMethod.prototype.rotationWhitAngle = function (line, angle) {

        let alpha = pencil.radians(angle);
        let cos = Math.cos(alpha);
        let sin = Math.sin(alpha);
        let lineWhitAngle = line;

        lineWhitAngle.startX = (lineWhitAngle.startX * cos) - (lineWhitAngle.startY * sin);
        lineWhitAngle.startY = (lineWhitAngle.startX * sin) + (lineWhitAngle.startY * cos);
        lineWhitAngle.endX = (lineWhitAngle.endX * cos) - (lineWhitAngle.endY * sin);
        lineWhitAngle.endY = (lineWhitAngle.endX * sin) + (lineWhitAngle.endY * cos);


        return lineWhitAngle;
    };

    MyGraphicsMethod.prototype.radians = function (deg) {
        return deg * (Math.PI / 180);
    };

    MyGraphicsMethod.prototype.translationWhitVector = function (line, pointM, pointN) {

        let vectorLine = line;

        vectorLine.startX = vectorLine.startX + pointM;
        vectorLine.startY = vectorLine.startY + pointN;
        vectorLine.endX = vectorLine.endX + pointM;
        vectorLine.endY = vectorLine.endY + pointN;


        return line;
    };

    MyGraphicsMethod.prototype.scaleWhitRatio = function (line, ratioX, ratioY) {

        let lineScale = line;

        lineScale.startX = lineScale.startX * ratioX;
        lineScale.startY = lineScale.startY * ratioY;
        lineScale.endX = lineScale.startX * ratioX;
        lineScale.endY = lineScale.startY * ratioY;


        return lineScale;
    };

    MyGraphicsMethod.prototype.rotationByO = function (line) {

        let lineScale = line;
        lineScale.startX *= -1;
        lineScale.startY *= -1;
        lineScale.endX *= -1;
        lineScale.endY *= -1;


        return lineScale;
    };

    MyGraphicsMethod.prototype.symmetryByOx = function (line) {

        let lineScale = line;
        lineScale.startY *= -1;
        lineScale.endY *= -1;


        return lineScale;
    };

    MyGraphicsMethod.prototype.symmetryByOy = function (line) {

        let lineScale = line;
        lineScale.startY *= -1;
        lineScale.endY *= -1;


        return lineScale;
    };

    MyGraphicsMethod.prototype.symmetryByOxOy = function (line) {

        let lineScale = line;
        lineScale.startX = lineScale.startY;
        lineScale.startY = lineScale.startX;
        lineScale.endX = lineScale.endY;
        lineScale.endY = lineScale.endX;

        return lineScale;
    };

    MyGraphicsMethod.prototype.rotationByPoint = function (line, point, angle) {


        let rotationByPointLine;

        rotationByPointLine = pencil.translationWhitVector(line, -point.X, -point.Y);
        rotationByPointLine = pencil.rotationWhitAngle(rotationByPointLine, angle);
        rotationByPointLine = pencil.translationWhitVector(rotationByPointLine, point.X, point.Y);

        return rotationByPointLine;
    };

    MyGraphicsMethod.prototype.cohenSutherlandLineClipAndDraw = function (rectangle, startPoint, endPoint, color = 'black') {
        let startPointCode = computeOutCode(rectangle, startPoint);
        let endPointCode = computeOutCode(rectangle, endPoint);
        let accept = false;
        let currentLine;

        while (true) {

            if (!(startPointCode | endPointCode)) {
                accept = true;
                break;
            } else if (startPointCode & endPointCode) {
                break;
            }
            let x, y;
            let outcodeOut = startPointCode ? startPointCode : endPointCode;
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
                startPointCode = computeOutCode(rectangle, startPoint);
            } else {
                endPoint.x = x;
                endPoint.y = y;
                endPointCode = computeOutCode(rectangle, endPoint);
            }
        }

        if (accept) {
            currentLine = {startX: startPoint.x, startY: startPoint.y, endX: endPoint.x, endY: endPoint.y};
            pencil.drawLine(currentLine, color);
        }
    };

    MyGraphicsMethod.prototype.drawByTemplate = function (base_line, template, color) {
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
            pencil.drawLine(templateLine, color);

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
        pencil.drawLine(templateLine, color);
    };

    MyGraphicsMethod.prototype.parseLineCoordinates = function (value) {
        let line = {
            startX: Number.parseInt(value.startX),
            endX: Number.parseInt(value.endX),
            startY: Number.parseInt(value.startY),
            endY: Number.parseInt(value.endY)
        };
        return line;
    };

    function computeOutCode(rectangle, point) {

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


    return MyGraphicsMethod;

})();


(function () {
    canvasNode.setAttribute('id', 'myCanvas');
    canvasNode.setAttribute('width', '600');
    canvasNode.setAttribute('height', '600');
    canvasNode.style.border = '5px solid #d3d3d3';
    containerNode.style.margin = '30px 30px';

    containerNode.appendChild(canvasNode);
    bodyNode.appendChild(containerNode);

})();

function getCoordinates(line, color, methodName, angle, pointM, pointN, template) {
console.dir(color)
    let currentTemplate = [];
    let currentAngle = angle;
    let paintbrush = new MyGraphicsMethod();
    let shape;
    let currentM, currentN;
    if (0 === template.length) {
        currentTemplate = [4, 2, 2, 2];
    } else {
        let temp = template.split(',')
        for (let i = 0; i < temp.length; i++) {
            currentTemplate.push(Number.parseInt(temp[i]))
        }
    }

    if (checkInput(line)) {
        shape = {startX: 100, startY: 100, endX: 200, endY: 100};
    } else {
        shape = paintbrush.parseLineCoordinates(line);
    }
    if (Number.isNaN(Number.parseInt(currentAngle))) {
        currentAngle = 15;
    }

    if (Number.isNaN(Number.parseInt(pointM)) || Number.isNaN(Number.parseInt(pointM))) {
        currentM = 2;
        currentN = 2;
    } else {
        currentM = Number.parseInt(pointM);
        currentN = Number.parseInt(pointN);
    }


    switch (methodName) {
        case 'drawLine':
            paintbrush.drawLine(shape, color);
            break;
        case 'rotationWhitAngle':
            paintbrush.drawLine(paintbrush.rotationWhitAngle(shape, currentAngle), color);
            break;
        case 'translationWhitVector':

            paintbrush.drawLine(paintbrush.translationWhitVector(shape, currentM, currentN), color);
            break;
        case 'scaleWhitRatio':
            console.log(paintbrush.scaleWhitRatio(shape, currentM, currentN))
            paintbrush.drawLine(paintbrush.scaleWhitRatio(shape, currentM, currentN), color);
            break;
        case 'rotationByO':
            paintbrush.drawLine(paintbrush.rotationByO(shape), color);
            break;
        case 'symmetryByOx':

            paintbrush.drawLine(paintbrush.symmetryByOx(shape), color);
            break;
        case 'symmetryByOy':
            paintbrush.drawLine(paintbrush.symmetryByOy(shape), color);
            break;
        case 'symmetryByOxOy':
            paintbrush.drawLine(paintbrush.symmetryByOxOy(shape), color);
            break;
        case 'rotationByPoint':

            let point = {X: currentM, Y: currentN};
            let line = paintbrush.rotationByPoint(shape, point, Number.parseInt(currentAngle));
            paintbrush.drawLine(line, color);
            break;
        case 'cohenSutherlandLineClipAndDraw':
            let rectangle = {
                xMin: 200,
                xMax: 400,
                yMin: 200,
                yMax: 400
            };
            ctx.rect(rectangle.xMin, rectangle.yMin, rectangle.xMax - rectangle.xMin, rectangle.yMax - rectangle.yMin);
            ctx.stroke();

            let currentStartPoint = {
                x: shape.startX,
                y: shape.startY
            };
            let currentEndPoint = {
                x: shape.endX,
                y: shape.endY
            };
            paintbrush.cohenSutherlandLineClipAndDraw(rectangle, currentStartPoint, currentEndPoint, color);
            break;
        case 'drawByTemplate':
            paintbrush.drawByTemplate(shape, currentTemplate, color);
            break;
        default:
            paintbrush.drawLine(shape, color);
    }


}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasNode.width, canvasNode.height);
}

function changeMethod(methodName) {

    switch (methodName) {
        case 'drawLine':
            document.getElementById("nameOf").innerHTML = 'Draw line<br /> startX, startY - endX, endY';
            document.getElementById("methodName").value = 'drawLine';
            break;
        case 'rotationWhitAngle':
            document.getElementById("nameOf").innerHTML = 'Rotation whit angle<br /> startX, startY - endX, endY and angle';
            document.getElementById("methodName").value = 'rotationWhitAngle';
            break;
        case 'translationWhitVector':
            document.getElementById("nameOf").innerHTML = 'Translation whit vector<br /> startX, startY - endX, endY<br /> point M and point N';
            document.getElementById("methodName").value = 'translationWhitVector';
            break;
        case 'scaleWhitRatio':
            document.getElementById("nameOf").innerHTML = 'Scale whit ratio<br /> startX, startY - endX, endY<br /> point M and point N';
            document.getElementById("methodName").value = 'scaleWhitRatio';
            break;
        case 'rotationByO':
            document.getElementById("nameOf").innerHTML = 'Rotation by O<br /> startX, startY - endX, endY';
            document.getElementById("methodName").value = 'rotationByO';
            break;
        case 'symmetryByOx':
            document.getElementById("nameOf").innerHTML = 'Symmetry by Ox<br /> startX, startY - endX, endY';
            document.getElementById("methodName").value = 'symmetryByOx';
            break;
        case 'symmetryByOy':
            document.getElementById("nameOf").innerHTML = 'Symmetry by Oy<br /> startX, startY - endX, endY';
            document.getElementById("methodName").value = 'symmetryByOy';
            break;
        case 'symmetryByOxOy':
            document.getElementById("nameOf").innerHTML = 'Symmetry by Ox Oy<br /> startX, startY - endX, endY';
            document.getElementById("methodName").value = 'symmetryByOxOy';
            break;
        case 'rotationByPoint':
            document.getElementById("nameOf").innerHTML = 'Rotation by point<br /> startX, startY - endX, endY<br /> point M, point N and angle';
            document.getElementById("methodName").value = 'rotationByPoint';
            break;
        case 'cohenSutherlandLineClipAndDraw':
            document.getElementById("nameOf").innerHTML = 'Cohen - Sutherland line clip and draw<br /> startX, startY - endX, endY';
            document.getElementById("methodName").value = 'cohenSutherlandLineClipAndDraw';
            break;
        case 'drawByTemplate':
            document.getElementById("nameOf").innerHTML = 'Draw by template';
            document.getElementById("methodName").value = 'drawByTemplate';
            break;
        default:
            document.getElementById("nameOf").innerHTML = 'Draw line<br /> startX, startY - endX, endY';
            document.getElementById("methodName").value = 'drawLine';
    }

}

function checkInput(line) {
    let answer = false;
    for (let val in line) {
        if (!Number.isInteger(parseInt(line[val]))) {
            answer = true;
            break;
        }
    }
    return answer;
}