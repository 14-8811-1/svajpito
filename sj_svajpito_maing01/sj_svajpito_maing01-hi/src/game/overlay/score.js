export default class Score {
  constructor(scene, score) {
    this.scene = scene;
    this.score = score;
    this.scoreText = scene.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#ffff",
    });
    this.scoreText.setScrollFactor(0);
  }

  // updates score display
  update(score) {
    this.scoreText.setText("Score: " + score);
  }

  increment() {
    this.score += 1;
    this.update(this.score);
  }
}
