const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


canvas.width = 1200;
canvas.height = 1000;


let ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 15,
    angle: 0 
};

function update() {
  } 

function draw() {
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

   
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(
        ship.x + ship.radius * Math.cos(ship.angle),
        ship.y - ship.radius * Math.sin(ship.angle)
    );
    ctx.lineTo(
        ship.x - ship.radius * (Math.cos(ship.angle) + Math.sin(ship.angle)),
        ship.y + ship.radius * (Math.sin(ship.angle) - Math.cos(ship.angle))
    );
    ctx.lineTo(
        ship.x - ship.radius * (Math.cos(ship.angle) - Math.sin(ship.angle)),
        ship.y + ship.radius * (Math.sin(ship.angle) + Math.cos(ship.angle))
    );
    ctx.closePath();
    ctx.stroke();
}


function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();