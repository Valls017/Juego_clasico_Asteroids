const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

const friction = 0.98;
const thrustPower = 0.15;
const turnSpeed = 0.1;

let ship = { x: canvas.width / 2, y: canvas.height / 2, radius: 15, angle: Math.PI / 2, velX: 0, velY: 0 };
let bullets = [];
let asteroids = [];
let keys = {};
let score = 0;
let gameOver = false;

function generarVertices(radioBase, numPuntos, aleatoriedad) {
    let vertices = [];
    for (let i = 0; i < numPuntos; i++) {
        let theta = (i / numPuntos) * Math.PI * 2;
        let r = radioBase * (1 + (Math.random() - 0.5) * 2 * aleatoriedad);
        vertices.push({
            x: r * Math.cos(theta),
            y: r * Math.sin(theta)
        });
    }
    return vertices;
}

document.addEventListener("keydown", (e) => {
    if (gameOver && e.code === "Enter") {
        resetGame();
        return;
    }
    
    keys[e.code] = true;
    if(e.code === "Space" && !gameOver) {
        bullets.push({
            x: ship.x + ship.radius * Math.cos(ship.angle),
            y: ship.y - ship.radius * Math.sin(ship.angle),
            velX: 7 * Math.cos(ship.angle),
            velY: -7 * Math.sin(ship.angle),
            life: 60
        });
    }
});

document.addEventListener("keyup", (e) => {
    keys[e.code] = false;
});

function createAsteroids() {
    asteroids = [];
    for(let i = 0; i < 6; i++) {
        let ax, ay;
        do {
            ax = Math.random() * canvas.width;
            ay = Math.random() * canvas.height;
        } while (Math.sqrt(Math.pow(ax - ship.x, 2) + Math.pow(ay - ship.y, 2)) < 150);

        let radio = 40;
        asteroids.push({
            x: ax, y: ay,
            velX: (Math.random() - 0.5) * 2,
            velY: (Math.random() - 0.5) * 2,
            radioBase: radio,
            level: 3,
            vertices: generarVertices(radio, 12, 0.4)
        });
    }
}

function resetGame() {
    ship = { x: canvas.width / 2, y: canvas.height / 2, radius: 15, angle: Math.PI / 2, velX: 0, velY: 0 };
    bullets = [];
    score = 0;
    gameOver = false;
    createAsteroids();
}

function update() {
    if (gameOver) return;

    if (keys["ArrowLeft"]) ship.angle += turnSpeed;
    if (keys["ArrowRight"]) ship.angle -= turnSpeed;
    if (keys["ArrowUp"]) {
        ship.velX += thrustPower * Math.cos(ship.angle);
        ship.velY -= thrustPower * Math.sin(ship.angle);
    }

    ship.velX *= friction;
    ship.velY *= friction;
    ship.x += ship.velX;
    ship.y += ship.velY;

    if (ship.x < 0) ship.x = canvas.width;
    if (ship.x > canvas.width) ship.x = 0;
    if (ship.y < 0) ship.y = canvas.height;
    if (ship.y > canvas.height) ship.y = 0;

    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].x += bullets[i].velX;
        bullets[i].y += bullets[i].velY;
        bullets[i].life--;
        
        if (bullets[i].x < 0) bullets[i].x = canvas.width;
        if (bullets[i].x > canvas.width) bullets[i].x = 0;
        if (bullets[i].y < 0) bullets[i].y = canvas.height;
        if (bullets[i].y > canvas.height) bullets[i].y = 0;

        if (bullets[i].life <= 0) bullets.splice(i, 1);
    }

    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].x += asteroids[i].velX;
        asteroids[i].y += asteroids[i].velY;

        if (asteroids[i].x < 0) asteroids[i].x = canvas.width;
        if (asteroids[i].x > canvas.width) asteroids[i].x = 0;
        if (asteroids[i].y < 0) asteroids[i].y = canvas.height;
        if (asteroids[i].y > canvas.height) asteroids[i].y = 0;
    }

    for (let i = asteroids.length - 1; i >= 0; i--) {
        for (let j = bullets.length - 1; j >= 0; j--) {
            let dx = asteroids[i].x - bullets[j].x;
            let dy = asteroids[i].y - bullets[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < asteroids[i].radioBase) {
                let a = asteroids[i];
                
                if (a.level > 1) {
                    let nuevoRadio = a.radioBase / 2;
                    for (let k = 0; k < 2; k++) {
                        asteroids.push({
                            x: a.x, y: a.y,
                            velX: (Math.random() - 0.5) * (6 - a.level),
                            velY: (Math.random() - 0.5) * (6 - a.level),
                            radioBase: nuevoRadio,
                            level: a.level - 1,
                            vertices: generarVertices(nuevoRadio, Math.floor(8 + Math.random() * 4), 0.4)
                        });
                    }
                }
                
                score += (4 - a.level) * 100;
                asteroids.splice(i, 1);
                bullets.splice(j, 1);
                
                if (asteroids.length === 0) createAsteroids();
                break;
            }
        }
    }

    for (let a of asteroids) {
        let dx = ship.x - a.x;
        let dy = ship.y - a.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < ship.radius + a.radioBase * 0.8) {
            gameOver = true;
        }
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
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

    for (let b of bullets) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    for (let a of asteroids) {
        ctx.beginPath();
        for (let i = 0; i < a.vertices.length; i++) {
            let vx = a.x + a.vertices[i].x;
            let vy = a.y + a.vertices[i].y;
            if (i === 0) {
                ctx.moveTo(vx, vy);
            } else {
                ctx.lineTo(vx, vy);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Courier New";
    ctx.fillText("SCORE: " + score, 20, 30);

    if (gameOver) {
        ctx.font = "40px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Courier New";
        ctx.fillText("Presiona ENTER para reiniciar", canvas.width / 2, canvas.height / 2 + 40);
        ctx.textAlign = "left"; 
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

createAsteroids();
gameLoop();
