const spawnPoints = [
  [50, 100],
  [80, 10],
  [110, 200],
];
const spawnPointRange = 100;

function pickSpawnPoint() {
  let spawnPoint = spawnPoints[Math.floor(Math.random() * spawnPoints.length)];
  spawnPoint[0] += Math.floor(Math.random() * (spawnPointRange + 1)) - spawnPointRange / 2;
  return { x: spawnPoint[0], y: spawnPoint[1] };
}

module.exports = pickSpawnPoint;
