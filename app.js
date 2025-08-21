let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetbtn");
let newbtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector(".msg");

let turn0 = true;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  count = 0; // Reset count
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turn0) {
      box.innerText = "O";
      box.style.color = "rgb(122, 35, 35)"; // O's are black
      turn0 = false;
    } else {
      box.innerText = "X";
      box.style.color = "green"; // X's are green
      turn0 = true;
    }
    box.disabled = true;

    let isWinner = checkWinner();
    if (count == 9 && !isWinner) {
      gameDraw();
    }
  });
});



const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "rgb(122, 35, 35)"; // Reset color
  }
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const showWinner = (winner) => {
  // Redirect to result page with winner info
  window.location.href = `result.html?result=win&winner=${winner}`;
};

const gameDraw = () => {
  // Redirect to result page indicating a draw
  window.location.href = `result.html?result=draw`;
};


const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        return true; // Return true if winner found
      }
    }
  }
  return false; // Return false if no winner
};

newbtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
