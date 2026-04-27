const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

export function render(state) {

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!state.gameOver) {
        if (state.ship.invulnerable === 0 || state.ship.invulnerable % 10 < 5) {
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.moveTo(
                state.ship.x + state.ship.radius * Math.cos(state.ship.angle),
                state.ship.y - state.ship.radius * Math.sin(state.ship.angle)
            );
            ctx.lineTo(
                state.ship.x - state.ship.radius * (Math.cos(state.ship.angle) + Math.sin(state.ship.angle)),
                state.ship.y + state.ship.radius * (Math.sin(state.ship.angle) - Math.cos(state.ship.angle))
            );
            ctx.lineTo(
                state.ship.x - state.ship.radius * (Math.cos(state.ship.angle) - Math.sin(state.ship.angle)),
                state.ship.y + state.ship.radius * (Math.sin(state.ship.angle) + Math.cos(state.ship.angle))
            );
            ctx.closePath();
            ctx.stroke();
        }
    }
  for (let b of state.bullets) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    for (let a of state.asteroids) {
        ctx.beginPath();
        for (let i = 0; i < a.vertices.length; i++) {
            let vx = a.x + a.vertices[i].x;
            let vy = a.y + a.vertices[i].y;
            if (i === 0) ctx.moveTo(vx, vy);
            else ctx.lineTo(vx, vy);
        }
        ctx.closePath();
        ctx.stroke();
    }
    ctx.fillStyle = "white";
    ctx.font = "20px Courier New";
    ctx.fillText("SCORE: " + state.score, 20, 30);
    ctx.fillText("VIDAS: " + state.lives, 20, 60); 
    
    if (state.gameOver) {
        ctx.font = "40px Courier New";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        ctx.font = "20px Courier New";
        ctx.fillText("Presiona ENTER para reiniciar", canvas.width / 2, canvas.height / 2 + 40);
        ctx.textAlign = "left"; 
    }
}
