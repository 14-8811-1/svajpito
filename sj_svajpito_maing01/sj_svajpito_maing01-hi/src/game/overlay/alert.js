export default class AlertText {
  constructor(scene, text = "") {
    this.scene = scene;
    this.text = text;

    const screenCenterX = scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY = scene.cameras.main.worldView.y + scene.cameras.main.height / 2;

    this.alertText = scene.add
      .text(screenCenterX, screenCenterY, this.text, {
        fontSize: "64px",
        fill: "#000",
      })
      .setOrigin(0.5);
    // this.scoreText.setScrollFactor(0);
  }

  // updates score display
  update(text) {
    this.alertText.setText(text);
  }
}
