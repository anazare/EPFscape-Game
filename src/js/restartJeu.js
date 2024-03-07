import * as fct from "/src/js/fonctions.js";
var btn_close; 

export default class restartJeu extends Phaser.Scene {
  constructor() {
    super({
      key: "restartJeu"
    });
  }

  preload() {
    this.load.image("EPF", "src/assets/fond_restart.png");
    this.load.image("img_plateforme", "src/assets/platform.png");
    this.load.image("Start1", "src/assets/boutonstart1.png");
    this.load.image("Exit", "src/assets/exitjeu.png");
  }

  create() {
    
    // Ajouter l'image de fond
    this.add.image(400, 300, "EPF").setScale(0.45, 0.5555);

    btn_close = this.add.image(750, 50, "Exit").setScale(0.1); // Réglez la valeur selon vos besoins
    btn_close.setInteractive();

    btn_close.on("pointerover", () => {
      btn_close.setTint(0xC0C0C0);
    });

    btn_close.on("pointerout", () => {
      btn_close.clearTint();
    });

    btn_close.on("pointerup", () => {
      this.scene.stop("restartJeu");
      window.close();
    });
    // Appeler la méthode pour afficher le bouton
    this.afficherBouton();
  }

  update() { }

  afficherBouton() {
    // Déclarer la variable bouton_play
    var btn_restart = this.add.image(400, 490, "Start1").setScale(0.3); // Réglez la valeur selon vos besoins
    btn_restart.setInteractive();

    btn_restart.on("pointerover", () => {
      btn_restart.setTint(0xC0C0C0);
      btn_restart.setAlpha(0.1);
    });

    btn_restart.on("pointerout", () => {
      btn_restart.clearTint();
    });

    btn_restart.on("pointerup", () => {
      btn_restart.setAlpha(0.1);
      location.reload();
    });
  }
}
