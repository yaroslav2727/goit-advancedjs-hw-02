import { getRandomHexColor } from "./change-color";

const startEl = document.querySelector("[data-start]");
const stopEl = document.querySelector("[data-stop]");

stopEl.setAttribute("disabled", "");

let switchInterval;

startEl.addEventListener("click", () => {
  switchInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  stopEl.removeAttribute("disabled");
  startEl.setAttribute("disabled", "");
});

stopEl.addEventListener("click", () => {
  clearInterval(switchInterval);
  stopEl.setAttribute("disabled", "");
  startEl.removeAttribute("disabled");
});
