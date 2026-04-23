import { state, createAsteroids, updatePhysics } from './model.js';
import { render } from './view.js';
import { keys, initController } from './controller.js';

function gameLoop() {
    updatePhysics(keys);
    render(state);
    requestAnimationFrame(gameLoop);
}

initController();
createAsteroids();
gameLoop();