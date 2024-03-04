import * as fct from "/src/js/fonctions.js";

const SKY_IMAGE_KEY = "img_ciel";
const BOOK_IMAGE_KEY = "img_livre";

var clavier;
var livreTexte;

export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" });
  }

  preload() {
    this.load.image(SKY_IMAGE_KEY, "src/assets/sky.png");
    this.load.image(BOOK_IMAGE_KEY, "src/assets/book.png");
    this.load.image(Bouton_Start, "src/assets/start.jpg");
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();

    this.add.image(400, 300, SKY_IMAGE_KEY);
    //creation d'un bouton play pour passer à la 
    var bouton_play = this.add.image(290,250, Bouton_Start).setDepth(1).setDisplaySize(50, 50); 
    //rendre le bouton interactif 
    bouton_play.setInteractive();
    //Cas ou la souris passe sur le bouton play
    bouton_play.on("pointerover", () => {
      
      bouton_play.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    bouton_play.on("pointerout", () => {
      // a remplir
      bouton_play.clearTint();
    });
    //Cas ou la sourris clique sur le bouton play :
    // on lance le niveau 1
    bouton_play.on("pointerup", () => {
      this.scene.start("selection");
    });

    // Ajout de l'image du livre
    const livreImage = this.add.image(400, 300, BOOK_IMAGE_KEY);

    // Ajout du texte sur l'image du livre
    livreTexte = this.add.text(
      livreImage.x - livreImage.width / 2 + 70,
      livreImage.y - livreImage.height / 2 + 80,
      "",
      {
        fontFamily: "Arial",
        fontSize: "17px",
        color: "#000000",
      }
    );

    // Ajout de la fonctionnalité d'affichage lettre par lettre
    this.time.delayedCall(100, this.fct.afficherTexteLettreParLettre, [], this);
  }

  update() {
    // Vous pouvez ajouter ici des logiques de mise à jour si nécessaire
  }

}

  

