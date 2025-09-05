let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let resultDiv = document.querySelector(".result");

let turnO = true; // player O
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // horizontal
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // vertical
  [0, 4, 8],
  [2, 4, 6], // diagonal
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    console.log("clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

function checkWinner() {
  let winner = null;
  winPatterns.forEach((pattern) => {
    const [a, b, c] = pattern;
    if (
      boxes[a].innerText &&
      boxes[a].innerText === boxes[b].innerText &&
      boxes[a].innerText === boxes[c].innerText
    ) {
      winner = boxes[a].innerText;
    }
  });
  if (winner) {
    resultDiv.classList.add("active");
    resultDiv.innerText = `Player ${winner} wins!`;
    boxes.forEach((box) => {
      box.disabled = true;
    });
    return;
  }
  const allBoxesFilled = Array.from(boxes).every((box) => box.innerText !== "");
  if (allBoxesFilled) {
    resultDiv.classList.add("active");
    resultDiv.innerText = `It's a draw!`;
  }
}
resetBtn.addEventListener("click", () => {
  turnO = true;
  resultDiv.classList.remove("active");
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
});
