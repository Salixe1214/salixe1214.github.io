// Variables
const default_pts = 0;
const default_click = 1;
const default_tick = 0;

let pts = default_pts;
if(localStorage.getItem("pts") != null) {
  pts = Number(localStorage.getItem("pts"));
};
let click_rate = default_click;
if(localStorage.getItem("click_rate") != null) {
  click_rate = Number(localStorage.getItem("click_rate"));
};
let tick_rate = default_tick;
if(localStorage.getItem("tick_rate") != null) {
  tick_rate = Number(localStorage.getItem("tick_rate"));
};

let pts_el = document.getElementById("pts");
pts_el.textContent = pts.toFixed(0);

let tick_el = document.getElementById("tick");
tick_el.textContent = tick_rate;

let click_el = document.getElementById("click");
click_el.textContent = click_rate;

let time_save_el = document.getElementById("time_save");
saveData();

let reset_btn = document.getElementById("reset_btn");
let save_btn = document.getElementById("save_btn");

let canPress = true;

// Events
setInterval(gameTick, 100);
setInterval(saveData, 10000);

window.addEventListener("keydown", stimulusStart);
window.addEventListener("touchstart", stimulusStart);

window.addEventListener("keyup", stimulusEnd);
window.addEventListener("touchend", stimulusEnd);

reset_btn.addEventListener("click", resetGame);
save_btn.addEventListener("click", saveData);

// Functions
function stimulusStart(event){
  if(canPress){
    addPts(click_rate);
    canPress = false;
  };
};
function stimulusEnd(event){
  canPress = true;
};

function addPts(n){
  console.log("Adding " + n);
  pts = pts + n;

  pts_el.textContent = pts.toFixed(0);
};

function saveData() {
  localStorage.setItem("pts", pts);
  localStorage.setItem("click_rate", click_rate);
  localStorage.setItem("tick_rate", tick_rate);
  time_save_el.innerText = (new Date(Date.now())).toString();
};

function resetGame() {
  pts = default_pts;
  pts_el.textContent = pts.toFixed(0);

  tick_rate = default_tick;
  tick_el.textContent = tick_rate;

  click_rate = default_click;
  click_el.textContent = click_rate;

  saveData();
};

function gameTick() {
  addPts(tick_rate);
};

// Autre
tick_el.textContent = tick_rate;
click_el.textContent = click_rate;