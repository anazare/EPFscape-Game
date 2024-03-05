import * as fct from "/src/js/fonctions.js";

const SKY_IMAGE_KEY = "img_ciel";
var groupeBullets;
var cannon;
var cursors;
var boutonFeu;
var multiplicateur;
var multiplicande;
var resultat;
var questionText;


export default class minijeuAbdellah extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "minijeuAbdellah" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

preload() {
  this.load.image(SKY_IMAGE_KEY, "src/assets/sky.png");
    this.load.image('cannon', 'src/assets/cannon.png');
    this.load.image('bullet', 'src/assets/balle.png');

}

genererMultiplication() {
  // Générer deux nombres aléatoires pour la multiplication
  multiplicateur = Phaser.Math.Between(12, 23);
  multiplicande = Phaser.Math.Between(8, 16);

  // Calculer le résultat de la multiplication
  resultat = multiplicateur * multiplicande;
}

create() {
  this.add.image(400, 300, SKY_IMAGE_KEY);
    // Création du canon
    cannon = this.physics.add.sprite(100, 300, 'cannon').setScale(0.02);
    cannon.setCollideWorldBounds(true);
    cannon.body.allowGravity = false;

    groupeBullets = this.physics.add.group();
   

    // Création des contrôles au clavier
    cursors = this.input.keyboard.createCursorKeys();

    // Configuration de la collision entre les balles et les bords de l'écran
    this.physics.world.setBoundsCollision(true, true, true, true);

    boutonFeu = this.input.keyboard.addKey('A');

    // instructions pour les objets surveillés en bord de monde
  this.physics.world.on("worldbounds", function (body) {
    // on récupère l'objet surveillé
    var objet = body.gameObject;
    // s'il s'agit d'une balle
    if (groupeBullets.contains(objet)) {
      // on le détruit
      objet.destroy();
    }
  });
      // Générer une multiplication mathématique aléatoire
      this.genererMultiplication();

      // Afficher la question à l'écran
      questionText = this.add.text(400, 100, `${multiplicateur} x ${multiplicande} = ?`, { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
  
}

update() {
  cannon.body.allowGravity = false;
    // Déplacement du canon
    if (cursors.up.isDown && cannon.y > 200)  {
        cannon.setVelocityY(-200);
    } else if (cursors.down.isDown && cannon.y < 500) {
        cannon.setVelocityY(200);
    } else {
        cannon.setVelocityY(0);

    }
     
    if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      this.tirer(cannon);
    }
 
}
   //fonction tirer( ), prenant comme paramètre l'auteur du tir
   tirer(cannon) {
    var coefDir = 1;
    // on crée la balle a coté du joueur
    var bullet = groupeBullets.create(cannon.x + (25 * coefDir), cannon.y - (25 * coefDir), 'bullet');
    // parametres physiques de la balle.
    bullet.setCollideWorldBounds(true);
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;

    bullet.body.allowGravity = true;
    bullet.setVelocity(400 * coefDir, -300); // vitesse en x et en y
    bullet.setGravity(100);
  }

 
}
