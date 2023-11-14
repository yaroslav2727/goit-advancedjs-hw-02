import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.settings({
  position: "topRight",
  timeout: 2500,
});

const timeEl = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
};

const startEl = document.querySelector("[data-start]");
const inputEl = document.querySelector("#datetime-picker");
let userDate;

startEl.setAttribute("disabled", "");

flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();
    if (userDate - new Date().getTime() <= 0) {
      iziToast.warning({
        title: "Warning",
        message: "Please choose a date in the future",
      });
      startEl.setAttribute("disabled", "");
      return;
    }
    startEl.removeAttribute("disabled");
  },
});

startEl.addEventListener("click", onStart);

function onStart() {
  startEl.setAttribute("disabled", "");
  if (userDate - new Date().getTime() <= 0) {
    iziToast.warning({
      title: "Warning",
      message: "Please choose a date in the future",
    });
    return;
  }
  inputEl.setAttribute("disabled", "");
  iziToast.success({
    title: "Success",
    message: "Timer starting...",
  });
  const intervalId = setInterval(() => {
    const timeDifference = userDate - new Date();
    if (timeDifference <= 0) {
      clearInterval(intervalId);
      startEl.removeAttribute("disabled");
      inputEl.removeAttribute("disabled");
      return;
    }
    const time = convertMs(timeDifference);
    timeEl.days.textContent = addLeadingZero(time.days);
    timeEl.hours.textContent = addLeadingZero(time.hours);
    timeEl.minutes.textContent = addLeadingZero(time.minutes);
    timeEl.seconds.textContent = addLeadingZero(time.seconds);
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(number) {
  return number.toString().padStart(2, "0");
}
