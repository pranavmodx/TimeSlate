const activeWin = require("active-win");
const Timer = require("../js/timer");

let iter = 0,
  displayFuncID,
  addTimerID,
  mainTimerWatch,
  history = [],
  outputHTML = "";

const startBtn = document.getElementById("start-btn"),
  stopBtn = document.getElementById("stop-btn"),
  resetBtn = document.getElementById("reset-btn"),
  ulElem = document.getElementById("list");

stopBtn.disabled = true;
resetBtn.disabled = true;

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  if (ulElem.innerHTML === "") {
    displayActiveWin();
  } else {
    resume();
  }
});

function resume() {
  let call = async () => {
    let winDetails = await activeWin();

    let appWinTitle = winDetails.title;
    let appName = winDetails.owner.path.split("/")[2].split(".")[0];

    if (!history.includes(appName)) {
      clearInterval(addTimerID);
      addTimerID = setInterval(() => addTimer(`${appName}`), 1000);
      history.push(appName);
    } else {
      clearInterval(addTimerID);
      addTimerID = setInterval(() => addTimer(`${appName}`), 1000);
      history.push(appName);
    }
  };
  displayFuncID = setInterval(call, 1000);
  setTimeout(() => {
    mainTimerWatch = setInterval(() => addTimer("main-timer"), 1000);
  }, 1000);
}

function funcClearInterval() {
  clearInterval(displayFuncID);
  clearInterval(mainTimerWatch);
  clearInterval(addTimerID);
}

stopBtn.addEventListener("click", () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  funcClearInterval();
});

resetBtn.addEventListener("click", () => {
  resetBtn.disabled = true;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  funcClearInterval();
  clearTimer("main-timer");
  ulElem.innerHTML = "";
  iter = 0;
  history = [];
});

function displayActiveWin() {
  let call = async () => {
    let winDetails = await activeWin();

    let appWinTitle = winDetails.title;
    let appName = winDetails.owner.path.split("/")[2].split(".")[0];

    if (iter === 0) {
      mainTimerWatch = setInterval(() => addTimer("main-timer"), 1000);

      outputHTML = `<li class="list-group-item list-group-item-info">Window                  Title : ${appWinTitle}
                    </li>
                    <li class="list-group-item list-group-item-info">Application Name : ${appName}
                    </li>
                    <li class="list-group-item list-group-item-info" id="${appName}">00:00:00
                    </li>
                    <h6 style="color: white">Times Opened <span id="span-${appName}" class="badge">${1}</span>
                    </h6>
                    <br><br>`;

      ulElem.innerHTML = outputHTML;

      addTimerID = setInterval(() => addTimer(`${appName}`), 1000);
      history.push(appName);
    } else if (!history.includes(appName)) {
      clearInterval(addTimerID);

      outputHTML = `<li class="list-group-item list-group-item-info">Window                  Title : ${appWinTitle}
                    </li>
                    <li class="list-group-item list-group-item-info">Application Name : ${appName}
                    </li>
                    <li class="list-group-item list-group-item-info" id="${appName}">00:00:00
                    </li>
                    <h6 style="color: white">Times Opened <span id="span-${appName}" class="badge">${1}</span>
                    </h6>
                    <br><br>`;

      ulElem.innerHTML += outputHTML;
      addTimerID = setInterval(() => addTimer(`${appName}`), 1000);
      history.push(appName);
    } else if (
      history.includes(appName) &&
      appName != history[history.length - 1]
    ) {
      clearInterval(addTimerID);
      addTimerID = setInterval(() => addTimer(`${appName}`), 1000);
      history.push(appName);
      let badge = document.getElementById(`span-${appName}`);
      let badgeNum = Number(badge.innerHTML);
      badge.innerHTML = badgeNum + 1;
    }
    iter++;
  };

  displayFuncID = setInterval(call, 2000);
}
