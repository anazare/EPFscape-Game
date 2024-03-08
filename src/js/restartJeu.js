export default class RestartJeu extends Phaser.Scene {
  constructor() {
    super({
      key: "restartJeu"
    });
  }

  preload() {
    this.load.image("EPF1", "src/assets/fond_restart.png");
    this.load.image("Start2", "src/assets/boutonstart1.png");
    this.load.image("Exit", "src/assets/exitjeu.png");
  }

  create() {
    console.log("lecture de restartJeu en cours");
    // Ajouter l'image de fond
    this.add.image(400, 300, "EPF1").setScale(0.45, 0.5555);

    // Ajouter le bouton de sortie
    var btnClose = this.add.image(750, 50, "Exit").setScale(0.1).setDepth(10);
    btnClose.setInteractive();

    btnClose.on("pointerover", () => {
      btnClose.setTint(0xC0C0C0);
    });

    btnClose.on("pointerout", () => {
      btnClose.clearTint();
    });

    btnClose.on("pointerup", () => {
      this.scene.stop("restartJeu");
      window.close();
    });

    // Ajouter le bouton de redémarrage
    var btnRestart = this.add.image(400, 490, "Start1").setScale(0.3);
    btnRestart.setInteractive();

    btnRestart.on("pointerover", () => {
      btnRestart.setTint(0xC0C0C0);
      btnRestart.setAlpha(0.1);
      console.log('Passage sur bouton restart');
    });

    btnRestart.on("pointerout", () => {
      btnRestart.clearTint();
    });

    btnRestart.on("pointerup", () => {
      btnRestart.setAlpha(0.1);
      window.location.reload("pagedelancement");
      this.scene.start("pagedelancement");
    });
  }

  update() { }
}
