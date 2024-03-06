import * as fct from "/src/js/fonctions.js";
var musique_de_fond;
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
    this.load.image("Exit", "src/assets/exitjeu.png");
    this.load.audio('background', 'src/assets/sonambiance.mp3');
  }

  create() {
    //création de la musique de fond et mise en boucle 
    musique_de_fond = this.sound.add('background', { loop: true });
    musique_de_fond.play();
    musique_de_fond.setVolume(0.1);

    // Ajouter l'image de fond
    this.add.image(400, 300, "EPF").setScale(0.57);

    const bouton_play1 = this.add.image(750, 50, "Exit").setScale(0.1); // Réglez la valeur selon vos besoins
    bouton_play1.setInteractive();

    bouton_play1.on("pointerover", () => {
      bouton_play1.setTint(0xC0C0C0);
    });

    bouton_play1.on("pointerout", () => {
      bouton_play1.clearTint();
    });

    bouton_play1.on("pointerup", () => {
      this.scene.stop("pagedelancement");
      window.close();
    });
    // Appeler la méthode pour afficher le bouton
    this.afficherBouton();
  }

  update() { }

  afficherBouton() {
    // Déclarer la variable bouton_play
    const bouton_play = this.add.image(400, 480, "Start1").setScale(0.3).setAlpha(0.2);; // Réglez la valeur selon vos besoins
    bouton_play.setInteractive();

    bouton_play.on("pointerover", () => {
      bouton_play.setTint(0xC0C0C0);
      bouton_play.setAlpha(0);
    });

    bouton_play.on("pointerout", () => {
      bouton_play.setAlpha(0.2);
      bouton_play.clearTint();
    });

    bouton_play.on("pointerup", () => {
      this.scene.start("chargementP1");
    });
  }
}
