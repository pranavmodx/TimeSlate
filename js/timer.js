function addTimer(idName) {
  let hTag = document.getElementById(`${idName}`);
  let [hours, minutes, seconds] = hTag.innerHTML.split(":");
  hours = Number(hours);
  minutes = Number(minutes);
  seconds = Number(seconds);

  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  hTag.textContent =
    (hours ? (hours > 9 ? hours : "0" + hours) : "00") +
    ":" +
    (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") +
    ":" +
    (seconds > 9 ? seconds : "0" + seconds);
}

function clearTimer(tagId) {
  document.getElementById(tagId).textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
}
