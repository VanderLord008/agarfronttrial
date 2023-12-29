//set height and width of the canvas

let wWidth = window.innerWidth;
let wHeight = window.innerHeight;
const canvas = document.querySelector("#the-canvas");
const context = canvas.getContext("2d");
canvas.height = wHeight;
canvas.width = wWidth;

//this will be all thing the current player
const player = {};

// this is a global store for all non player orbs
let orbs = [];
let players = []; //this is an array of all the players
const loginModal = new bootstrap.Modal(document.querySelector("#loginModal"));
const spawnModal = new bootstrap.Modal(document.querySelector("#spawnModal"));

window.addEventListener("load", () => {
  //on page load, open the login modal
  loginModal.show();
});

document.querySelector(".name-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //console.log("submitted");
  player.name = document.querySelector("#name-input").value;
  document.querySelector(".player-name").innerHTML = player.name;
  loginModal.hide();
  spawnModal.show();
});

document.querySelector(".start-game").addEventListener("click", (e) => {
  //hide the start modal
  spawnModal.hide();
  //show hiddenOnStart elements
  const elArray = Array.from(document.querySelectorAll(".hiddenOnStart"));
  elArray.forEach((el) => el.removeAttribute("hidden"));
  init();
});
