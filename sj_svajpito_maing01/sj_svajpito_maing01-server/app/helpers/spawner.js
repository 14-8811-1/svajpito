const SPAWNS = [
  [140, 200],
  [480, 280],
  [1400, 270],
  [170, 440],
  [765, 410],
  [1150, 465],
  [1700, 400],
  [160, 750],
  [460, 570],
  [785, 630],
  [1250, 720],
  [1600, 550],
  [460, 830],
  [815, 820],
  [1450, 850],
  [1740, 770],
];

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pickSpawnPoint() {
  let index = randomIntFromInterval(0, SPAWNS.length - 1);
  let spawnPoint = SPAWNS[index];
  console.log({ spawnPoint, index });
  spawnPoint[0] = randomIntFromInterval(spawnPoint[0] - 30, spawnPoint[0] + 30);
  return { x: spawnPoint[0], y: spawnPoint[1] };
}

module.exports = pickSpawnPoint;
