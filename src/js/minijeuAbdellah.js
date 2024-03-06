import * as fct from "/src/js/fonctions.js";

const SKY_IMAGE_KEY = "img_ciel";
var groupeBullets;
var cannon;
var balloonData;
var cursors;
var boutonFeu;
var multiplicateur;
var multiplicande;
var CodeDecrypte;
var resultat;
var questionText;
var bouton_restart;
var monArrayList = [];
var ListParcoursAleatoire = [];
var groupeBalloon; // Groupe de ballons

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
    this.load.image('balloon', 'src/assets/balloon.png');
    this.load.image("bouton_reglement", "src/assets/info.png");
    this.load.image("livre", "src/assets/book.png");
    this.load.image("retour", "src/assets/retour.png");
    this.load.image("restart", "src/assets/restart.png");

  }

  create() {
    this.enigmeVisible = false;
    this.resetVariables();
    this.add.image(400, 300, SKY_IMAGE_KEY);
    // Création du canon
    cannon = this.physics.add.sprite(100, 300, 'cannon').setScale(0.02);
    cannon.setCollideWorldBounds(true);
    cannon.body.allowGravity = false;

    // Création du groupe de balles
    groupeBullets = this.physics.add.group();


    // Création des contrôles au clavier
    cursors = this.input.keyboard.createCursorKeys();

    // Configuration de la collision entre les balles et les bords de l'écran
    this.physics.world.setBoundsCollision(true, true, true, true);

    boutonFeu = this.input.keyboard.addKey('A');

    // Générer une multiplication mathématique aléatoire
    this.genererMultiplication();

    // Afficher la question à l'écran
    questionText = this.add.text(400, 100, `${multiplicateur} x ${multiplicande} = ?`, { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);

    // Création du groupe de ballons
    groupeBalloon = this.physics.add.staticGroup();

    // Création des ballons et ajout au groupe
    this.createBalloons();
    console.log()

    // Gestion de la collision entre les balles et les ballons
    this.physics.add.overlap(groupeBullets, groupeBalloon, this.hit, null, this);
    var bouton_reg = this.add.image(750, 50, 'bouton_reglement').setScale(0.1);
    bouton_reg.setInteractive();

    //cas ou la souris ne passe plus 
    bouton_reg.on("pointerover", () => {
      bouton_reg.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    bouton_reg.on("pointerout", () => {
      bouton_reg.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    bouton_reg.on("pointerup", () => {
      this.add.image(400, 300, "livre").setDepth(2);
      this.add.text(80, 80, "Le but est de viser le ballon contenant \n la bonne réponse.", {
        fontSize: '25px',
        fontFamily: "Caveat",
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(3);

      var bouton_return = this.add.image(650, 100, 'retour').setScale(0.1).setDepth(3);
      bouton_return.setInteractive();

      bouton_return.on("pointerover", () => {
        bouton_return.setTint(0xC0C0C0);
      });
      //Cas ou la souris ne passe plus sur le bouton play
      bouton_return.on("pointerout", () => {
        bouton_return.clearTint();
      });
      //Cas ou la souris clique sur le bouton play :
      bouton_return.on("pointerup", () => {
        // enlever image et texte 
        this.add.text(80, 80, "Retour", {
          fontSize: '25px',
          fontFamily: "Caveat",
          fill: '#000000', //noir 
          wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
          align: 'center'
        }).setDepth();

      });
    });

  }

  update() {
    cannon.body.allowGravity = false;
    // Déplacement du canon
    if (cursors.up.isDown && cannon.y > 200) {
      cannon.setVelocityY(-200);
    } else if (cursors.down.isDown && cannon.y < 500) {
      cannon.setVelocityY(200);
    } else {
      cannon.setVelocityY(0);
    }


    if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      this.tirer(cannon);
    }

    if (groupeBalloon.countActive(true) === 3 && this.enigmeVisible == false) {
      this.enigmeVisible = true;
      boutonFeu = this.input.keyboard.addKey('P');
    }
  }

  // Fonction pour générer une multiplication aléatoire
  genererMultiplication() {
    multiplicateur = Phaser.Math.Between(12, 23);
    multiplicande = Phaser.Math.Between(8, 16);
    resultat = multiplicateur * multiplicande;
  }

  // Fonction pour créer les ballons
  createBalloons() {
    CodeDecrypte = resultat; //réponse correcte 
    //remplissage de l'arraylist avec la réponse correcte et 3 réponses random
    monArrayList.push(resultat);
    for (var pas = 0; pas < 3; pas++) {
      const nbA = Phaser.Math.Between(80, 300);
      if (!monArrayList.includes(nbA)) {
        monArrayList.push(nbA);
      }
    }

    //génération de positions random et rangement dans une list 
    while (ListParcoursAleatoire.length !== 4) {
      const nbA = Phaser.Math.Between(0, 3);
      if (!ListParcoursAleatoire.includes(nbA)) {
        ListParcoursAleatoire.push(nbA);
      }
    }

     balloonData = [
      { x: 750, y: 160, answer: monArrayList[ListParcoursAleatoire[0]] },
      { x: 600, y: 270, answer: monArrayList[ListParcoursAleatoire[1]] },
      { x: 720, y: 390, answer: monArrayList[ListParcoursAleatoire[2]] },
      { x: 440, y: 410, answer: monArrayList[ListParcoursAleatoire[3]] }
    ];

    balloonData.forEach(data => {
      
      let balloonText = this.add.text(data.x, data.y, data.answer, {
        fontSize: '25px',
        fill: '#000000',
        wordWrap: { width: 300, useAdvancedWrap: true },
        align: 'center'
      }).setOrigin(0.5).setDepth(2);

      groupeBalloon.add(balloonText);

      let balloon = this.add.image(data.x, data.y, 'balloon').setScale(0.05);
      balloon.pointsVie =1;
      balloon.chiffreAssocie =balloonText;
      groupeBalloon.add(balloon, true);
      
      balloon.body.allowGravity = false; 

    });
  }
  ajout_bouton_restart() {
    this.add.text(470, 500, "Vous avez Perdu !", {
      fontSize: '25px',
      fill: '#000000', //noir 
      wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
      align: 'center'
    }).setDepth(3);
    //creation btn restart
    bouton_restart = this.add.image(400, 300, "restart").setDepth(3).setScale(0.05);

    bouton_restart.setInteractive();
    bouton_restart.on("pointerover", () => {
      bouton_restart.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    bouton_restart.on("pointerout", () => {
      bouton_restart.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    bouton_restart.on("pointerup", () => {
      this.scene.restart("minijeuAbdellah");
    });
  }

  // Fonction pour tirer une balle
  tirer(cannon) {

    var coefDir = 1;
    var bullet = groupeBullets.create(cannon.x + (25 * coefDir), cannon.y - (25 * coefDir), 'bullet');
    bullet.setCollideWorldBounds(true);
    bullet.body.onWorldBounds = true;
    bullet.body.allowGravity = true;
    bullet.setVelocity(400 * coefDir, -300);
    bullet.setGravity(100);
    bullet.setScale(0.05);
  }

  // Fonction déclenchée lorsqu'une balle touche un ballon
  hit(bullet, groupeBalloon) {
    // Réduire les points de vie du ballon
    groupeBalloon.pointsVie--;

    // Détruire le ballon s'il n'a plus de points de vie
    if (groupeBalloon.pointsVie == 0) {
      groupeBalloon.chiffreAssocie.destroy();
      groupeBalloon.destroy();
      const strCodeDecrypte = CodeDecrypte.toString();

      if (groupeBalloon.chiffreAssocie.text === strCodeDecrypte) {
        this.scene.switch("videoggP");
      }
      else {
        questionText = this.add.text(400, 100, `${multiplicateur} x ${multiplicande} = ?`, { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5);
        monArrayList = [];
        ListParcoursAleatoire = [];
        multiplicateur = Phaser.Math.Between(12, 23);
        multiplicande = Phaser.Math.Between(8, 16);
        monArrayList.push(multiplicateur * multiplicande);
        this.ajout_bouton_restart();
      }
    }

    // Détruire la balle
    bullet.destroy();
  }
  resetVariables() {

    resultat = null;
    CodeDecrypte = null;
    multiplicande = null
    monArrayList = [];
    multiplicateur= null;
    ListParcoursAleatoire = [];
    balloonData = [];
    }
    
    }
