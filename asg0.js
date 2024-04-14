// DrawRectangle.js
var canvas;
var ctx;
function main() {
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }
    ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height); 

    var drawButton1 = document.getElementById("button1");
    drawButton1.addEventListener("click", handleDrawEvent);
    document.getElementById('button2').addEventListener('click', handleDrawOperationEvent);
}
function drawVector(v, color) {
    ctx.strokeStyle = color;

    var x1 = 200;
    var y1 = 200;

    var x2 = x1 + v.elements[0] * 20; 
    var y2 = y1 - v.elements[1] * 20; 

    
    ctx.beginPath();
    ctx.moveTo(x1, y1); 
    ctx.lineTo(x2, y2); 
    ctx.stroke();
}
function handleDrawEvent() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;

    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);

    drawVector(v1, 'red');
    drawVector(v2, 'blue');
}
function handleDrawOperationEvent() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var x1 = document.getElementById('x1').value;
    var y1 = document.getElementById('y1').value;
    var x2 = document.getElementById('x2').value;
    var y2 = document.getElementById('y2').value;

    var v1 = new Vector3([x1, y1, 0]);
    var v2 = new Vector3([x2, y2, 0]);

    drawVector(v1, 'red');
    drawVector(v2, 'blue');

    var selectedOp = document.getElementById('op-select').value;
    if (selectedOp === "add") {
        var v3 = new Vector3([x1 + x2, y1 + y2, 0]);
        drawVector(v3, 'green');
    } else if (selectedOp === "subtract") {
        var v3 = new Vector3([x1 - x2, y1 - y2, 0]);
        drawVector(v3, 'green');
    } else if (selectedOp === "multiply") {
        var scalar = document.getElementById('scalar').value;
        var v3 = new Vector3([x1 * scalar, y1 * scalar, 0]);
        var v4 = new Vector3([x2 * scalar, y2 * scalar, 0]);
        drawVector(v3, 'green');
        drawVector(v4, 'green');
    } else if (selectedOp === "divide") {
        var scalar = document.getElementById('scalar').value;
        var v3 = new Vector3([x1 / scalar, y1 / scalar, 0]);
        var v4 = new Vector3([x2 / scalar, y2 / scalar, 0]);
        drawVector(v3, 'green');
        drawVector(v4, 'green');
    } else if (selectedOp === "angleBetween") {
        angleBetween(v1, v2);
    } else if (selectedOp === "area") {
        areaTriangle(v1, v2);
    } else if (selectedOp === "magnitude") {
        console.log('Magnitude of v1:', v1.magnitude());
        console.log('Magnitude of v2:', v2.magnitude());
    } else if (selectedOp === "normalize") {
        drawVector(v1.normalize(), 'green');
        drawVector(v2.normalize(), 'green');
    }
}
function angleBetween(v1, v2) {
    var dotProduct = Vector3.dot(v1, v2);

    var magnitudeV1 = v1.magnitude();
    var magnitudeV2 = v2.magnitude();

    var cosAngle = dotProduct / (magnitudeV1 * magnitudeV2);

    var angle = Math.acos(cosAngle);
    var angleDegrees = angle * (180 / Math.PI);
    console.log('Angle:', angleDegrees);
    return angle;
}
function areaTriangle(v1, v2) {
    var crossProduct = Vector3.cross(v1, v2);
    var areaParallelogram = crossProduct.magnitude();
    var areaTriangle = areaParallelogram / 2;

    console.log('Area of the triangle:', areaTriangle);
    return areaTriangle;
}