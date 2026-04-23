export const state = {
    canvasWidth: 800,
    canvasHeight: 600,
    
    ship: { x: 400, y: 300, radius: 15, angle: Math.PI / 2, velX: 0, velY: 0, invulnerable: 0 },
    bullets: [],
    asteroids: [],
    score: 0,
    lives: 3, 
    gameOver: false
};

const friction = 0.98;
const thrustPower = 0.15;
const turnSpeed = 0.1;

export function generarVertices(radioBase, numPuntos, aleatoriedad) {
    let vertices = [];
    for (let i = 0; i < numPuntos; i++) {
        let theta = (i / numPuntos) * Math.PI * 2;
        let r = radioBase * (1 + (Math.random() - 0.5) * 2 * aleatoriedad);
        vertices.push({ x: r * Math.cos(theta), y: r * Math.sin(theta) });
    }
    return vertices;
}

export function shoot() {
    if (!state.gameOver) {
        state.bullets.push({
            x: state.ship.x + state.ship.radius * Math.cos(state.ship.angle),
            y: state.ship.y - state.ship.radius * Math.sin(state.ship.angle),
            velX: 7 * Math.cos(state.ship.angle),
            velY: -7 * Math.sin(state.ship.angle),
            life: 60
        });
    }
}

export function createAsteroids() {
    state.asteroids = [];
    for(let i = 0; i < 6; i++) {
        let ax, ay;
        do {
            ax = Math.random() * state.canvasWidth;
            ay = Math.random() * state.canvasHeight;
        } while (Math.sqrt(Math.pow(ax - state.ship.x, 2) + Math.pow(ay - state.ship.y, 2)) < 150);

        let radio = 40;
        state.asteroids.push({
            x: ax, y: ay,
            velX: (Math.random() - 0.5) * 2,
            velY: (Math.random() - 0.5) * 2,
            radioBase: radio, level: 3,
            vertices: generarVertices(radio, 12, 0.4)
        });
    }
}

export function resetGame() {
    state.ship = { x: state.canvasWidth / 2, y: state.canvasHeight / 2, radius: 15, angle: Math.PI / 2, velX: 0, velY: 0, invulnerable: 0 };
    state.bullets = [];
    state.score = 0;
    state.lives = 3;
    state.gameOver = false;
    createAsteroids();
}

export function updatePhysics(keys) {
    if (state.gameOver) return;

    
    if (state.ship.invulnerable > 0) state.ship.invulnerable--;

    if (keys["ArrowLeft"]) state.ship.angle += turnSpeed;
    if (keys["ArrowRight"]) state.ship.angle -= turnSpeed;
    if (keys["ArrowUp"]) {
        state.ship.velX += thrustPower * Math.cos(state.ship.angle);
        state.ship.velY -= thrustPower * Math.sin(state.ship.angle);
    }

    state.ship.velX *= friction;
    state.ship.velY *= friction;
    state.ship.x += state.ship.velX;
    state.ship.y += state.ship.velY;

    if (state.ship.x < 0) state.ship.x = state.canvasWidth;
    if (state.ship.x > state.canvasWidth) state.ship.x = 0;
    if (state.ship.y < 0) state.ship.y = state.canvasHeight;
    if (state.ship.y > state.canvasHeight) state.ship.y = 0;

    for (let i = state.bullets.length - 1; i >= 0; i--) {
        state.bullets[i].x += state.bullets[i].velX;
        state.bullets[i].y += state.bullets[i].velY;
        state.bullets[i].life--;
        
        if (state.bullets[i].x < 0) state.bullets[i].x = state.canvasWidth;
        if (state.bullets[i].x > state.canvasWidth) state.bullets[i].x = 0;
        if (state.bullets[i].y < 0) state.bullets[i].y = state.canvasHeight;
        if (state.bullets[i].y > state.canvasHeight) state.bullets[i].y = 0;

        if (state.bullets[i].life <= 0) state.bullets.splice(i, 1);
    }

    for (let i = 0; i < state.asteroids.length; i++) {
        state.asteroids[i].x += state.asteroids[i].velX;
        state.asteroids[i].y += state.asteroids[i].velY;

        if (state.asteroids[i].x < 0) state.asteroids[i].x = state.canvasWidth;
        if (state.asteroids[i].x > state.canvasWidth) state.asteroids[i].x = 0;
        if (state.asteroids[i].y < 0) state.asteroids[i].y = state.canvasHeight;
        if (state.asteroids[i].y > state.canvasHeight) state.asteroids[i].y = 0;
    }

    for (let i = state.asteroids.length - 1; i >= 0; i--) {
        for (let j = state.bullets.length - 1; j >= 0; j--) {
            let dx = state.asteroids[i].x - state.bullets[j].x;
            let dy = state.asteroids[i].y - state.bullets[j].y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < state.asteroids[i].radioBase) {
                let a = state.asteroids[i];
                if (a.level > 1) {
                    let nuevoRadio = a.radioBase / 2;
                    for (let k = 0; k < 2; k++) {
                        state.asteroids.push({
                            x: a.x, y: a.y,
                            velX: (Math.random() - 0.5) * (6 - a.level),
                            velY: (Math.random() - 0.5) * (6 - a.level),
                            radioBase: nuevoRadio, level: a.level - 1,
                            vertices: generarVertices(nuevoRadio, Math.floor(8 + Math.random() * 4), 0.4)
                        });
                    }
                }
                state.score += (4 - a.level) * 100;
                state.asteroids.splice(i, 1);
                state.bullets.splice(j, 1);
                
                if (state.asteroids.length === 0) createAsteroids();
                break;
            }
        }
    }

    if (state.ship.invulnerable === 0) {
        for (let a of state.asteroids) {
            let dx = state.ship.x - a.x;
            let dy = state.ship.y - a.y;
            if (Math.sqrt(dx * dx + dy * dy) < state.ship.radius + a.radioBase * 0.8) {
                state.lives--; // Restar vida
                
                if (state.lives <= 0) {
                    state.gameOver = true; // Si llegas a 0, Game Over
                } else {
                    // Si quedan vidas, reaparecer en el centro y ser invulnerable por 2 segundos (120 frames)
                    state.ship.x = state.canvasWidth / 2;
                    state.ship.y = state.canvasHeight / 2;
                    state.ship.velX = 0;
                    state.ship.velY = 0;
                    state.ship.angle = Math.PI / 2;
                    state.ship.invulnerable = 120; 
                }
                break;
            }
        }
    }
}