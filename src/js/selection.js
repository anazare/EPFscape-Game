import * as fct from "/src/js/fonctions.js";

const SKY_IMAGE_KEY = "img_ciel";
const BOOK_IMAGE_KEY = "img_livre";

var clavier;
var livreTexte;
var jousset1; 
var bouton_play;


export default class selection extends Phaser.Scene {
  constructor() {
    super({ key: "selection" });
  }

  preload() {
    this.load.image(SKY_IMAGE_KEY, "src/assets/sky.png");
    this.load.image(BOOK_IMAGE_KEY, "src/assets/book.png");
    this.load.image("Start", "src/assets/bouton-start.png");
    
    this.load.audio('jousset1', 'src/assets/jousset1.mp3');
  }

  create() {
    
    //création du son : explications de jousset  
    jousset1 = this.sound.add('jousset1');
    jousset1.play();
    jousset1.setVolume(0.5);
    //ajout de l'image de fond 
    this.add.image(400, 300, SKY_IMAGE_KEY);
    //ajout du livre par dessous 
    const imageLivre = this.add.image(400, 300, BOOK_IMAGE_KEY);

    livreTexte = this.add.text(
      imageLivre.x - imageLivre.width / 2 + 70,
      imageLivre.y - imageLivre.height / 2 + 80,
      "",
      {
        fontFamily: "Caveat", // Changer la police à "Caveat"
        fontSize: "25px",
        color: "#000000",
        align : 'center',
        wordWrap: { width: 300 },
      }
      
    );

    // Ajout de la fonctionnalité d'affichage lettre par lettre
    this.time.delayedCall(50, this.afficherTexteLettreParLettre, [], this);

    // Ajouter le bouton "Start" et l'image du campus avec un délai de 18 secondes
    this.time.delayedCall(15000, this.afficherCampusEtBouton, [], this);
  }

  update() {
    // Ajouter ici des logiques de mise à jour si nécessaire
  }

  afficherTexteLettreParLettre() {
    const texteComplet = "\n\nAH! Ca faisait longtemps Redouane! \n\nIl te manque malheureusement 8 crédits pour valider ton semestre. Tu dois te rendre dans les salles M01, M02 et M03 à la rencontre de tes professeurs pour discuter de ton cas.\n\n\nBonne chance !!!";
    let textePartiel = "";
    let indexLettre = 0;

    this.time.addEvent({
      repeat: texteComplet.length - 1,
      delay: 44.5,
      callback: function () {
        textePartiel += texteComplet[indexLettre];
        livreTexte.setText(textePartiel);
        indexLettre++;
      },
      callbackScope: this,
    });
  }

  afficherCampusEtBouton() {
    bouton_play = this.add.image(580, 300, "Start").setDepth(1).setScale(0.5);
    bouton_play.setInteractive();

    bouton_play.on("pointerover", () => {
      bouton_play.setTint(0xC0C0C0);
    });

    bouton_play.on("pointerout", () => {
      bouton_play.clearTint();
    });

    bouton_play.on("pointerup", () => {
      jousset1.stop();
      this.scene.start("principal");
    });
  }
}
