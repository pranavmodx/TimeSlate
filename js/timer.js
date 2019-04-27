function add(idName) {
  let hTag = document.getElementById(`${idName}`); // querySelector shows error for VSCode and Chrome. Don't ask why.
  //   console.log(`hTag : ${hTag}`);
  if (idName !== "main-timer") {
    // console.log(`hTag innerHTML : ${hTag.textContent}`);
  }
  // timeTag = hTag.innerHTML.slice(6, 14);
  //   console.log(`hTag innerHTML after : ${hTag}`);
  // let [hours, seconds, minutes] = timeTag.split(':');
  let [hours, minutes, seconds] = hTag.innerHTML.split(":");
  hours = Number(hours);
  minutes = Number(minutes);
  seconds = Number(seconds);
  // console.log(`typeof hours, minutes seconds : ${typeof hours} ${typeof minutes} ${typeof seconds}`);
  // console.log(`hours, minutes, seconds : ${hours} ${minutes} ${seconds}`);

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
  // console.log(`hTag innerHTML after: ${hTag.innerHTML}`);

  // timer(idName);
}
// function timer(idName) {
//     t = setTimeout(() => {
//         add(idName);
//     }, 1000);
// }

function clear(tagId) {
  document.getElementById(tagId).textContent = "00:00:00";
  // mainTag.textContent = "00:00:00";
  seconds = 0;
  minutes = 0;
  hours = 0;
}
