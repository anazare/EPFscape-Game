import * as fct from "/src/js/fonctions.js";

var player;
var cursors;
var bouton_restart;
export default class niveauAbdellah extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveauAbdellah" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  preload() {
    // ajout perso
    this.load.spritesheet("dudeabd", "src/assets/dudeabd.png", { frameWidth: 31.5, frameHeight: 48 });

    // chargement tuiles de jeu
    this.load.image("tuiles1", "src/assets/tilesheet_complete.png"); //verifier que ce soit celui qui a été utilisé 


    // chargement de la carte
    this.load.tilemapTiledJSON("classe", "src/assets/MapSalleCours.json");
    this.load.image("button1", "src/assets/bouton.png");
    //this.load.image("retour", "src/assets/retour.png");
    this.load.image("livre", "src/assets/book.png");
    this.load.image("livre2", "src/assets/book.png");
    this.load.image("fleche", "src/assets/fleche.png");
    this.load.image("restart", "src/assets/restart.png");

    //ajout audio enigme 1
    this.load.audio('Abdellah1', "src/assets/Abdellah1.mp3");
    this.load.audio('Abdellah2', "src/assets/Abdellah2.mp3");
    this.load.audio('bravo', 'src/assets/Bravo.mp3'); 
  }

  son2(son) {
    var audio_enigme = this.sound.add(son);
    audio_enigme.play();
  }



  create() {
    var audio_explication = this.sound.add('Abdellah1');
    audio_explication.play();

    var timerRestart = this.time.delayedCall(11000, this.son2, ["Abdellah2"], this);


    //chargement de la carte et des jeux de tuiles 
    const CarteDeLaClasse = this.add.tilemap("classe");
    const tileset = CarteDeLaClasse.addTilesetImage(
      "tuiles2",
      "tuiles1"
    );
    // chargement des calques qui constituent le background de la pièce
    const calque_background = CarteDeLaClasse.createLayer(
      "Calque de Tuiles 1",
      tileset
    );
    const calque_background2 = CarteDeLaClasse.createLayer(
      "Calque de Tuiles 2",
      tileset
    );
    const calque_background3 = CarteDeLaClasse.createLayer(
      "Calque de Tuiles 3",
      tileset
    );
    calque_background.setCollisionByProperty({ estSolide: true });



    // création du personnage de jeu et positionnement
    this.player = this.physics.add.sprite(800, 400, "dudeabd").setScale(4).setDepth(9);
    this.player.setBounce(0.2);


    // animation pour tourner à gauche
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dudeabd", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    // animation lorsque le personnage n'avance pas
    this.anims.create({
      key: "turn",
      frames: [{ key: "dudeabd", frame: 4 }],
      frameRate: 20
    });

    // animation pour tourner à droite
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dudeabd", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    // création d'un écouteur sur le clavier
    cursors = this.input.keyboard.createCursorKeys();

    // ajout du modèle de collision entre le personnage et le monde
    this.player.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, 800, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 800, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);

    // ajout du modèle de collision entre le personnage et le monde
    this.player.setCollideWorldBounds(true);

    // ajout d'une collision entre le joueur et le calque plateformes
    this.physics.add.collider(this.player, calque_background);


    ////////////////////////////////////////////////////////////////////////////////////////////////////////
    //AJOUT TEXTE
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
    this.displayDynamicText();

  }
  displayDynamicText() {

    const text = "Bonjour à toi, \nMalgré tes bavardages je te laisse une  dernière chance pour te rattraper. Si tu réponds correctement à ces 2 énigmes et que tu réussis le mini-jeu, tu pourras récuperer tes 3 crédits. \n\nLa première énigme est la suivante : \nJe suis un nombre entier positif. Si tu multiplies mon carré par 5, puis ajoutes le double de mon cube, tu obtiendras 64.\nQui suis-je?";
    const x = 100; // Position X du texte
    const y = 77; // Position Y du texte
    const fontSize = '25px'; // Taille de la police
    const fill = '#fff'; // Couleur du texte
    const delay = 50; // Délai entre chaque caractère en ms

    let dynamicText = this.add.text(x, y, '', {
      fontSize: fontSize,
      fill: fill,
      align: 'justify',  // Alignement du texte (justify, left, center, right)
      wordWrap: { width: 600, useAdvancedWrap: true },  // Largeur de l'enveloppe du texte
    });


    // Fonction pour afficher le texte de manière progressive
    function typeWriter(text, index) {
      if (index < text.length) {
        dynamicText.setText(dynamicText.text + text[index]);
        index++;
        setTimeout(function () {
          typeWriter(text, index);
        }, delay);
      }
    }

    // Lancement de la fonction pour afficher le texte progressivement
    typeWriter(text, 0);
    this.add.text(592, 485, '2', {
      fontSize: '25px',
      fill: '#000000', //noir 
      wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
      align: 'center'
    }).setDepth(6);

    this.add.text(192, 485, '4', {
      fontSize: '25px',
      fill: '#000000', //noir 
      wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
      align: 'center'
    }).setDepth(6);

    this.add.text(392, 485, '7', {
      fontSize: '25px',
      fill: '#000000', //noir 
      wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
      align: 'center'
    }).setDepth(6);
    /////////////////////////////////////////////////////////////
    var button1 = this.add.image(600, 500, 'button1').setScale(0.07).setDepth(3);
    button1.setInteractive();

    button1.on("pointerover", () => {
      button1.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    button1.on("pointerout", () => {
      button1.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    button1.on("pointerup", () => {
      var bravo = this.sound.add("bravo");
    bravo.play();
      this.add.image(400, 325, 'livre2').setDepth(9);
      this.add.text(80, 80, "BRAVO!!! \n\n\n\n Passons à la 2ème enigme...", {
        fontSize: '25px',
        fontFamily: "Caveat",
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(10);


      var fleche = this.add.image(700, 500, 'fleche').setScale(0.1).setDepth(10);
      fleche.setInteractive();

      fleche.on("pointerover", () => {
        fleche.setTint(0xC0C0C0);
      });
      //Cas ou la souris ne passe plus sur le bouton play
      fleche.on("pointerout", () => {
        fleche.clearTint();
      });
      //Cas ou la souris clique sur le bouton play :
      fleche.on("pointerup", () => {
        this.scene.stop("niveauAbdellah"); // Arrête la scène du mini-jeu
        this.scene.start("enigme2Abdellah"); // Démarre la scène du niveau principal

      });

    });
    //////////////////////////////////////////////////////////////////////////

    var button2 = this.add.image(200, 500, 'button1').setScale(0.07).setDepth(3);
    button2.setInteractive();

    button2.on("pointerover", () => {
      button2.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    button2.on("pointerout", () => {
      button2.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    button2.on("pointerup", () => {
      this.add.image(400, 325, 'livre').setDepth(9);
      this.add.text(80, 80, "MAUVAISE REPONSE :( \n Je t'invite à cliquer sur la flèche\n et recommencer ce niveau.", {
        fontSize: '25px',
        fontFamily: "Caveat",
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(10);
      this.ajout_bouton_restart();
    });
    ///////////////////////////////////////////////////////////////////////////////

    var button3 = this.add.image(400, 500, 'button1').setScale(0.07).setDepth(3);
    button3.setInteractive();

    button3.on("pointerover", () => {
      button3.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    button3.on("pointerout", () => {
      button3.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    button3.on("pointerup", () => {
      this.add.image(400, 325, 'livre').setDepth(9);
      this.add.text(80, 80, "MAUVAISE REPONSE :( \n Je t'invite à cliquer sur la flèche\n et recommencer ce niveau.", {
        fontSize: '25px',
        fontFamily: "Caveat",
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(10);
      this.ajout_bouton_restart();
    });


  }




  update() {
    // définitinon des mouvements du personnage


    // a gauche
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left", true);

      // à droite
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right", true);
    }
    // immoobile
    else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    // en saut (important : blocked doown au lieu de tuoching down)
    if (cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-200);
    }
  }
  ajout_bouton_restart() {

    //creation btn restart
    bouton_restart = this.add.image(225, 400, "restart").setDepth(11).setScale(0.05);

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
      this.scene.restart();
    });
  }
}

