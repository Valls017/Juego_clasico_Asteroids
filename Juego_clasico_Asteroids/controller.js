import { state, shoot, resetGame } from './model.js';

export const keys = {};

export function initController() {
    
    document.addEventListener("keydown", (e) => {
        if (state.gameOver && e.code === "Enter") {
            resetGame();
            return;
        }
        keys[e.code] = true;
        
        if(e.code === "Space") {
            shoot();
        }
    });
  document.addEventListener("keyup", (e) => {
        keys[e.code] = false;
    });
}
