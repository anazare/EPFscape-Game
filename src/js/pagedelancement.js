import * as fct from "/src/js/fonctions.js";

export default class Pagedelancement extends Phaser.Scene {
  constructor() {
    super({
      key: "lancement"
    });
  }

  preload() {
    this.load.image("EPF", "src/assets/play.jpg");
    this.load.image("img_plateforme", "src/assets/platform.png");
    this.load.image("Start1", "src/assets/boutonstart1.png");
  }

  create() {
    // Ajouter l'image de fond
    this.add.image(400, 300, "EPF").setScale(0.57);
    
    // Appeler la méthode pour afficher le bouton
    this.afficherBouton();
  }

  update() {}

  afficherBouton() {
    // Déclarer la variable bouton_play
    const bouton_play = this.add.image(400, 480, "Start1").setScale(0.3).setAlpha(0.01); // Réglez la valeur selon vos besoins
    bouton_play.setInteractive();

    bouton_play.on("pointerover", () => {
      bouton_play.setTint(0xC0C0C0);
    });

    bouton_play.on("pointerout", () => {
      bouton_play.clearTint();
    });

    bouton_play.on("pointerup", () => {
      this.scene.start("selection");
    });
  }
}
