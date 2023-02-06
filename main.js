const canvas = document.querySelector("#drawing");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

const radius = 250;
const numOfPoints = 500;
var timesTableCount = 2;

var points = [];

for (var i = 0; i < numOfPoints; i++) {
  let angle = (Math.PI * 2 * i) / numOfPoints;
  let x = canvas.width / 2 + radius * Math.cos(angle);
  let y = canvas.height / 2 + radius * Math.sin(angle);
  points.push(new Point(x, y));
}

function drawTimesTable(timesTableCount, i) {
  let next = (i * timesTableCount) % numOfPoints;
  let current = points[i - 1];
  let target = next != 0 ? points[next - 1] : points[numOfPoints - 1];
  ctx.beginPath();
  ctx.moveTo(current.x, current.y);
  ctx.lineTo(target.x, target.y);

  let hue = (i / points.length) * 360;
  ctx.strokeStyle = `hsla(${hue}, 100%, 50%, 0.5)`;
  ctx.stroke();
}

function clearScreen() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  points.forEach((point) => {
    point.draw();
  });
}
clearScreen();

var i = 1;
function animate() {
  drawTimesTable(timesTableCount, i);
  if (i == points.length) {
    clearScreen();
    timesTableCount++;
    i = 1;
  } else {
    i++;
  }
  document.querySelector(
    "#info"
  ).innerHTML = `Times Table Count: ${timesTableCount}`;
}

var myInterval = setInterval(animate, 10);

document.addEventListener("keydown", function (event) {
  if (event.key == "ArrowLeft") {
    timesTableCount--;
    clearInterval(myInterval);
    clearScreen();
    for (var i = 1; i <= points.length; i++) {
      drawTimesTable(timesTableCount, i);
    }
    document.querySelector(
      "#info"
    ).innerHTML = `Times Table Count: ${timesTableCount}`;
  }
  if (event.key == "ArrowRight") {
    timesTableCount++;
    clearInterval(myInterval);
    clearScreen();
    for (var i = 1; i <= points.length; i++) {
      drawTimesTable(timesTableCount, i);
    }
    document.querySelector(
      "#info"
    ).innerHTML = `Times Table Count: ${timesTableCount}`;
  }
});
