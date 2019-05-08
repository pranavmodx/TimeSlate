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
  //   console.log("Start button clicked!");
  startBtn.disabled = true;
  stopBtn.disabled = false;
  resetBtn.disabled = false;
  if (ulElem.innerHTML === "") {
    displayActiveWin();
  } else {
    // console.log("Start does nothing");
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
      let aName = appName;
      addTimerID = setInterval(() => add(`${aName}`), 1000);
      history.push(appName);
    } else {
      clearInterval(addTimerID);
      let aName3 = appName;
      // console.log(`aName3 : ${aName3}`);
      addTimerID = setInterval(() => add(`${aName3}`), 1000);
      history.push(appName);
    }
    // graphData.push({ [appName]: 1 });
  };
  displayFuncID = setInterval(call, 1000);
  setTimeout(() => {
    mainTimerWatch = setInterval(() => add("main-timer"), 1000);
  }, 1000);
}

function funcClearInterval() {
  clearInterval(displayFuncID);
  clearInterval(mainTimerWatch);
  clearInterval(addTimerID);
}

stopBtn.addEventListener("click", () => {
  //   console.log("Stop button clicked!");
  startBtn.disabled = false;
  stopBtn.disabled = true;
  funcClearInterval();
  //   console.log(ulElem.innerHTML);
});

resetBtn.addEventListener("click", () => {
  //   console.log("Reset button clicked!");
  resetBtn.disabled = true;
  stopBtn.disabled = true;
  startBtn.disabled = false;
  funcClearInterval();
  clear("main-timer");
  ulElem.innerHTML = "";
  iter = 0;
  history = [];
});

function displayActiveWin() {
  let call = async () => {
    let winDetails = await activeWin();

    let appWinTitle = winDetails.title;
    let appName = winDetails.owner.path.split("/")[2].split(".")[0];

    // console.log(`Iteration no : ${iter}`);
    // console.log(`Window Title : ${appWinTitle}`);
    // console.log(`Application Name : ${appName}`);

    if (iter === 0) {
      //   console.log("first iteration");
      mainTimerWatch = setInterval(() => add("main-timer"), 1000);

      outputHTML = `<li class="list-group-item list-group-item-info">Window Title : ${appWinTitle}</li>
                          <li class="list-group-item list-group-item-info">Application Name : ${appName}</li>
                          <li class="list-group-item list-group-item-info" id="${appName}">00:00:00</li>
                          <h6 style="color: white">Times Opened <span id="span-${appName}" class="badge">${1}</span></h6><br><br>`;

      ulElem.innerHTML = outputHTML;

      let aName1 = appName;
      // console.log(`aName1 : ${aName1}`);
      addTimerID = setInterval(() => add(`${aName1}`), 1000);
      history.push(appName);
      grHistory.push(appName);
      //   graphData.push({ [appName]: 1 });
    } else if (!history.includes(appName)) {
      //   console.log("history doesn't include this app");
      //   console.log(appName);
      clearInterval(addTimerID);

      //   if (document.getElementById(`${appName}`) !== undefined) {
      outputHTML = `<li class="list-group-item list-group-item-info">Window Title : ${appWinTitle}</li>
                        <li class="list-group-item list-group-item-info">Application Name : ${appName}</li>
                        <li class="list-group-item list-group-item-info" id="${appName}">00:00:00</li>
                        <h6 style="color: white">Times Opened <span id="span-${appName}" class="badge">${1}</span></h6><br><br>`;
      //   }

      //   console.log(outputHTML);

      ulElem.innerHTML += outputHTML; // '+=' is very important (for retaining time of other apps)

      //   console.log(ulElem.innerHTML);

      let aName2 = appName;
      // console.log(`aName2 : ${aName2}`);
      addTimerID = setInterval(() => add(`${aName2}`), 1000);
      history.push(appName);
      grHistory.push(appName);
      //   graphData.push({ [appName]: usageTime });
    } else if (
      history.includes(appName) &&
      appName != history[history.length - 1]
    ) {
      // console.log(`last history item : ${history[history.length-1]}`);
      // console.log(`current app name : ${appName}`);

      //   console.log("app name and last history item not equal");
      clearInterval(addTimerID);
      let aName3 = appName;
      // console.log(`aName3 : ${aName3}`);
      addTimerID = setInterval(() => add(`${aName3}`), 1000);
      history.push(appName);
      let badge = document.getElementById(`span-${appName}`);
      let badgeNum = Number(badge.innerHTML);
      badge.innerHTML = badgeNum + 1;
    }
    iter++;
    // console.log(history);
  };

  displayFuncID = setInterval(call, 2000);
}
