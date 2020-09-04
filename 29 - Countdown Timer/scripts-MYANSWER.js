const buttons = document.querySelectorAll("[data-time]");
const timeInput = document.querySelector("[name=minutes]");
const timeLeft = document.querySelector(".display__time-left");
const timeEnd = document.querySelector(".display__end-time");
let countdown;

timeLeft.textContent = "00:00:00";

function timer(seconds) {
  const now = Date.now();
  const then = now + seconds * 1000;
  //clear any existing timer
  clearInterval(countdown);

  displayTime(seconds);
  timeEndDisplay(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // When timer is done, display this
    if (secondsLeft === 0) {
      timeEnd.textContent = "Time is up!";
    }
    displayTime(secondsLeft);
  }, 1000);
}

function displayTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const display = `${hours < 0 ? "0" : ""}${hours}:${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;

  //Show time on tab
  document.title = display;
  timeLeft.textContent = display;
}

function timeEndDisplay(timestemp) {
  const end = new Date(timestemp);
  const endHours = end.getHours();
  const endMins = end.getMinutes();

  const endDisplay = `Timer ends at ${endHours > 12 ? endHours - 12 : endHours}:${endMins < 10 ? "0" : ""}${endMins}`;
  timeEnd.textContent = endDisplay;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);

  timer(seconds);
}

buttons.forEach((button) => {
  button.addEventListener("click", startTimer);
});

document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value * 60;
  timer(mins);
  //clear textbox
  this.reset();
});
