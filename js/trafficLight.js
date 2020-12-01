// import "jsdom-global/register.js";
// window.onload = function () {
  document.getElementById("stopButton").onclick = illuminateRed;
  document.getElementById("slowButton").onclick = illuminateYellow;
  document.getElementById("goButton").onclick = illuminateGreen;

  function illuminateRed() {
    secTimes = 5;
    clearLights();
    document.getElementById("stopLight").style.backgroundColor = "red";

    interval = setInterval(() => {
      if (!secTimes--) {
        clearInterval(interval);
        illuminateGreen();
      }
    }, 1000);
  }

  function illuminateYellow() {
    secTimes = 5;
    clearLights();
    document.getElementById("slowLight").style.backgroundColor = "yellow";

    interval = setInterval(() => {
      if (!secTimes--) {
        clearInterval(interval);
        illuminateRed();
      }
    }, 1000);
  }
  function illuminateGreen() {
    secTimes = 5;
    clearLights();
    document.getElementById("goLight").style.backgroundColor = "green";

    interval = setInterval(() => {
      if (!secTimes--) {
        clearInterval(interval);
        illuminateYellow();
      }
    }, 1000);
  }

  function clearLights() {
    document.getElementById("stopLight").style.backgroundColor = "black";
    document.getElementById("slowLight").style.backgroundColor = "black";
    document.getElementById("goLight").style.backgroundColor = "black";
  }

  export default function crossStreet() {
    this.clearLights();
    this.illuminateRed();
  }


  illuminateRed();
  recieveSignal();
// };
