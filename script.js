// ! To do ->
// save highest score to local storage
// level up -> give less time to whac the mole

const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const timeLeftEl = document.getElementById("time");
const scoreEl = document.getElementById("score");

const hScoreEl = document.getElementById("highestScore");

let res = 0;
let hitPosition;
let currentTime = 10;
let timerId = null;

function randomSquare() {
  squares.forEach((square) => {
    // first remove mole class from each square
    square.classList.remove("mole");
  });

  // get a random square for mole
  let randomSquare = squares[Math.floor(Math.random() * 9)];
  randomSquare.classList.add("mole");

  //   pass mole id
  hitPosition = randomSquare.id;
}

squares.forEach((square) => {
  square.addEventListener("mousedown", () => {
    if (square.id == hitPosition) {
      res++;
      scoreEl.textContent = res;
      hitPosition = null;
    }
  });
});

function moveMole() {
  timerId = setInterval(randomSquare, 1080);
}

moveMole();

function countDown() {
  currentTime--;
  timeLeftEl.innerText = currentTime;

  if (currentTime == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);

    let result = res;

    localStorage.setItem("Hscore", JSON.stringify(result));

    hScoreEl.innerText = JSON.parse(localStorage.getItem("Hscore"));
    alert("Game over !! Your final score is :  " + res);
  }
}

let countDownTimerId = setInterval(countDown, 1100);
