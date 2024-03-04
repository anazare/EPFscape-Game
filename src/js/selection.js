import * as fct from "/src/js/fonctions.js";

const SKY_IMAGE_KEY = "img_ciel";
const BOOK_IMAGE_KEY = "img_livre";

var clavier;
var livreTexte;
var musique_de_fond;
var bouton_play;
var campus_img;

export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" });
  }

  preload() {
    this.load.image(SKY_IMAGE_KEY, "src/assets/sky.png");
    this.load.image(BOOK_IMAGE_KEY, "src/assets/book.png");
    this.load.image("Start", "src/assets/bouton-start.png");
    this.load.image("campus", "src/assets/campus_montpellier_2022.png");
    this.load.audio('background', 'src/assets/sonambiance.mp3');
  }

  create() {
    fct.doNothing();
    fct.doAlsoNothing();
    musique_de_fond = this.sound.add('background');
  musique_de_fond.play();

  this.add.image(400, 300, SKY_IMAGE_KEY);

  const imageLivre = this.add.image(400, 300, BOOK_IMAGE_KEY);

  livreTexte = this.add.text(
    imageLivre.x - imageLivre.width / 2 + 70,
    imageLivre.y - imageLivre.height / 2 + 80,
    "",
    {
      fontFamily: "Caveat", // Changer la police à "Caveat"
      fontSize: "17px",
      color: "#000000",
    }
  );

  // Ajout de la fonctionnalité d'affichage lettre par lettre
  this.time.delayedCall(100, this.afficherTexteLettreParLettre, [], this);

  // Ajouter le bouton "Start" et l'image du campus avec un délai de 18 secondes
  this.time.delayedCall(18700, this.afficherCampusEtBouton, [], this);
}

  update() {
    // Ajouter ici des logiques de mise à jour si nécessaire
  }

  afficherTexteLettreParLettre() {
    const texteComplet = "Bonjour jeune peufien,\n\nJe suis ton responsable pédagogique.\n\nIl te manque malheureusement 8 crédits\n\npour valider le semestre.Tu dois te rendre\n\ndans les salles M01,M02 et M03 à la\n\nrencontre de tes professeurs pour discuter\n\nde ton cas.\n\n\n                                                                                                            Bonne chance !!!";
    let textePartiel = "";
    let indexLettre = 0;

    this.time.addEvent({
      repeat: texteComplet.length - 1,
      delay: 50,
      callback: function () {
        textePartiel += texteComplet[indexLettre];
        livreTexte.setText(textePartiel);
        indexLettre++;
      },
      callbackScope: this,
    });
  }

  afficherCampusEtBouton() {
    campus_img = this.add.image(585, 190, "campus").setDepth(1).setDisplaySize(250, 170);
    bouton_play = this.add.image(580, 490, "Start").setDepth(1).setDisplaySize(100, 70);
    bouton_play.setInteractive();

    bouton_play.on("pointerover", () => {
      bouton_play.setTint(0xC0C0C0);
    });

    bouton_play.on("pointerout", () => {
      bouton_play.clearTint();
    });

    bouton_play.on("pointerup", () => {
      this.scene.start("principal");
    });
  }
}
