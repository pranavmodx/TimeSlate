const activeWin = require('active-win');
const Timer = require('../js/timer');

let iter = 0,
    displayFuncID, addTimerID,
    mainTimerWatch,
    history = [],
    outputHTML = '';

const startBtn = document.getElementById('start-btn'),
      stopBtn = document.getElementById('stop-btn'),
      resetBtn = document.getElementById('reset-btn'),
      ulElem = document.getElementById('list');

startBtn.addEventListener('click', displayActiveWin);

function funcClearInterval() {
    clearInterval(displayFuncID);
    clearInterval(mainTimerWatch);
    clearInterval(addTimerID);
}

stopBtn.addEventListener('click', funcClearInterval);

resetBtn.addEventListener('click', () => {
    funcClearInterval();
    clear('main-timer');
})

function displayActiveWin() {
    let call = (async () => {
        let winDetails = await activeWin();

        let appWinTitle = winDetails.title;
        let appName = winDetails.owner.path.split('/')[2].split('.')[0];

        console.log(`Iteration no : ${iter}`);
        console.log(`Window Title : ${appWinTitle}`);
        console.log(`Application Name : ${appName}`);

        if (iter === 0) {
            console.log("first iteration");
            mainTimerWatch = setInterval(() => add('main-timer'), 1000);

            outputHTML = `<li class="list-group-item">Window Title : ${appWinTitle}</li>
                          <li class="list-group-item">Application Name : ${appName}</li>
                          <li class="list-group-item" id="${appName}">00:00:00</li><br><br>`;
                
                       
            ulElem.innerHTML = outputHTML;

            let aName1 = appName;
            // console.log(`aName1 : ${aName1}`);
            addTimerID = setInterval(() => add(`${aName1}`), 1000);
            history.push(appName);

        } else if (!history.includes(appName)) {

            console.log("history doesn't include this app");
            clearInterval(addTimerID);

            outputHTML = `<li class="list-group-item">Window Title : ${appWinTitle}</li>
                          <li class="list-group-item">Application Name : ${appName}</li>
                          <li class="list-group-item" id="${appName}">00:00:00</li><br><br>`;
            
            ulElem.innerHTML += outputHTML; // '+=' is very important (for retaining time of other apps)
            
            let aName2 = appName;
            // console.log(`aName2 : ${aName2}`);
            addTimerID = setInterval(() => add(`${aName2}`), 1000);
                
            history.push(appName);

        } else if (history.includes(appName)) {

            // console.log(`last history item : ${history[history.length-1]}`);
            // console.log(`current app name : ${appName}`);
            
            if (appName != history[history.length-1]) {

                console.log("app name and last history item not equal")
                clearInterval(addTimerID);
                let aName3 = appName;
                // console.log(`aName3 : ${aName3}`);
                addTimerID = setInterval(() => add(`${aName3}`), 1000);
                history.push(appName);
            }
        }
        iter++;
    });

    // console.log(history);
    displayFuncID = setInterval(call, 5000);
}
