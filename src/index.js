import Level from './level';
import Timer from './timer';

const advanceButton = document.querySelector('.game-advance-button');
const advanceButtonText = document.querySelector('.game-advance-button__text');
const canvas = document.querySelector('.game-canvas');
const gl = canvas.getContext('webgl', {preserveDrawingBuffer: true});
const timer = new Timer();
const timerDisplay = document.querySelector('.game-timer');
const explanation = document.querySelector('.game-explanation');
let buttonDown = false;

advanceButton.addEventListener('click', ()=>{
  buttonDown = true;
})

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

gl.clearColor(0, 0, 0, 1);

gl.viewport(0, 0, canvas.width, canvas.height);
gl.enable(gl.DEPTH_TEST);

let currentLvl = 0;
const level = new Level(gl, canvas.width, canvas.height);
level.start(currentLvl);

timer.startCountDown(30);
lose();

function loop() {
  const timeLeft = timer.getTimeLeft();
  timerDisplay.textContent = timeLeft;
  if (timeLeft <= 0) {
    if (level.getCurrentScore() > currentLvl * 10 * currentLvl + 50) {
      win();
    } else {
      lose();
    }
  } else {
    level.update();
    requestAnimationFrame(loop);
  }

}

function winLoop() {
  level.update();
  if (buttonDown) {
    level.start(currentLvl);
    timer.startCountDown(30);
    advanceButton.style.display = 'none';
    buttonDown = false;
    requestAnimationFrame(loop);
  }
  else {
    requestAnimationFrame(winLoop);
  }
}

function loseLoop() {
  level.update();
  if (buttonDown) {
    explanation.style.display = 'none';
    currentLvl = 0;
    level.start(currentLvl);
    timer.startCountDown(30);

    buttonDown = false;
    advanceButton.style.display = 'none';
    requestAnimationFrame(loop);
  } else {
    requestAnimationFrame(loseLoop);
  }
}

function win() {
  currentLvl++;
  advanceButton.style.display = 'block';

  advanceButtonText.textContent = 'next level';
  level.stop();
  // level.start(currentLvl);
  // timer.startCountDown(30);
  requestAnimationFrame(winLoop);
}

function lose() {
  level.stop();
  advanceButtonText.textContent = 'restart';
  advanceButton.style.display = 'block';

  requestAnimationFrame(loseLoop);

}
