import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.settings({
  position: "topRight",
  timeout: 2500,
});

document.querySelector(".form").addEventListener("submit", onSubmit);

function onSubmit(event) {
  event.preventDefault();

  const { amount, step, delay } = event.target.elements;

  amount.setAttribute("disabled", "");
  step.setAttribute("disabled", "");
  delay.setAttribute("disabled", "");
  event.target.lastElementChild.setAttribute("disabled", "");

  if (Number(amount.value) < 0) {
    amount.value = (Number(amount.value) * -1).toString();
  }
  if (Number(step.value) < 0) {
    step.value = (Number(step.value) * -1).toString();
  }
  if (Number(delay.value) < 0) {
    delay.value = (Number(delay.value) * -1).toString();
  }

  for (let i = 0; i < Number(amount.value); i += 1) {
    const realDelay = Number(step.value) * i + Number(delay.value);
    createPromise(i + 1, realDelay)
      .then(res => {
        iziToast.success({
          message: res,
        });
        console.log(`✅ ${res}`);
      })
      .catch(err => {
        iziToast.error({
          message: err,
        });
        console.log(`❌ ${err}`);
      })
      .finally(() => {
        if (Number(amount.value) - i === 1) {
          event.target.lastElementChild.removeAttribute("disabled");
          amount.removeAttribute("disabled");
          step.removeAttribute("disabled");
          delay.removeAttribute("disabled");
          event.target.reset();
        }
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res(`Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(`Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
