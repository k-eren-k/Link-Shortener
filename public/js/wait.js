let countdown = 10;
let countdownInterval;

function startCountdown() {
  const countdownDisplay = document.getElementById("countdown");
  const linkGo = document.getElementById("linkGo");
  const hoco = document.getElementById("hoco");

  countdownInterval = setInterval(function () {
    countdownDisplay.textContent = countdown;
    countdown--;

    if (countdown < 0) {
      clearInterval(countdownInterval);
      countdownDisplay.style.display = "none";
      linkGo.textContent = "Link'e Git";
      linkGo.style.display = "flex";
      hoco.style.display = "flex";
    }
  }, 1000);
}

window.onblur = function () {
  clearInterval(countdownInterval);
};

window.onfocus = function () {
  if (countdown > 0) {
    startCountdown(); 
  }
};

window.onload = startCountdown;