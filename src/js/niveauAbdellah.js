import * as fct from "/src/js/fonctions.js";

var player;
var cursors;

export default class niveauAbdellah extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveauAbdellah" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  preload() {
    // ajout perso
    this.load.spritesheet("dude", "src/assets/dude.png", { frameWidth: 32, frameHeight: 48 });

    // chargement tuiles de jeu
    this.load.image("tuiles1", "src/assets/tilesheet_complete.png"); //verifier que ce soit celui qui a été utilisé 


    // chargement de la carte
    this.load.tilemapTiledJSON("classe", "src/assets/MapSalleCours.json");
    this.load.image("button1", "src/assets/bouton.png");
    this.load.image("retour", "src/assets/retour.png");
    this.load.image("livre", "src/assets/book.png");

  }

  create() {
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
   player = this.physics.add.sprite(800, 400, "dude").setScale(4);;
   player.setBounce(0.2);
 
 
   // animation pour tourner à gauche
   this.anims.create({
     key: "left",
     frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
     frameRate: 10,
     repeat: -1
   });
 
   // animation lorsque le personnage n'avance pas
   this.anims.create({
     key: "turn",
     frames: [{ key: "dude", frame: 4 }],
     frameRate: 20
   });
 
   // animation pour tourner à droite
   this.anims.create({
     key: "right",
     frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
     frameRate: 10,
     repeat: -1
   });
 
   // création d'un écouteur sur le clavier
   cursors = this.input.keyboard.createCursorKeys();
   
    // ajout du modèle de collision entre le personnage et le monde
    player.setCollideWorldBounds(true);

    this.physics.world.setBounds(0, 0, 800, 640);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 800, 640);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);

    // ajout du modèle de collision entre le personnage et le monde
    player.setCollideWorldBounds(true);

    // ajout d'une collision entre le joueur et le calque plateformes
    this.physics.add.collider(player, calque_background);


  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //AJOUT TEXTE
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  this.displayDynamicText();

  }
  displayDynamicText() {
    
      const text = "Bonjour à toi, malgré tes bavardages je \n te laisse une  dernière chance pour te\n rattraper. Si tu réponds correctement à \n ces 2 enigmes  et que tu réussis \n le mini-jeu, tu pourra récuperer \n tes 3 crédits: \n\n Je suis un nombre entier positif. \n Si tu multiplies mon carré par 5, \n puis ajoute le double de mon cube, \n tu obtiendra 64. Qui suis-je?"; 
      const x = 100; // Position X du texte
      const y = 100; // Position Y du texte
      const fontSize = '25px'; // Taille de la police
      const fill = '#fff'; // Couleur du texte
      const delay = 50; // Délai entre chaque caractère en ms
  
      let dynamicText = this.add.text(x, y, '', { fontSize: fontSize, fill: fill });
      
  
      // Fonction pour afficher le texte de manière progressive
      function typeWriter(text, index) {
          if (index < text.length) {
              dynamicText.setText(dynamicText.text + text[index]);
              index++;
              setTimeout(function() {
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
this.add.image(400, 325, 'livre').setDepth(8);
this.add.text(80, 80, "BRAVO!!! \n Tu peux à présent passer au mini-jeu...\n\n\n\n\n\n PS: Cliquer sur la flèche te fera \n recommencer ce niveau.", {
  fontSize: '25px',
  fontFamily: "Caveat",
  fill: '#000000', //noir 
  wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
  align: 'center'
}).setDepth(9);
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
  this.add.image(400, 325, 'livre').setDepth(8);
  this.add.text(80, 80, "MAUVAISE REPONSE :( \n Je t'invite à cliquer sur la flèche\n et recommencer ce niveau.", {
    fontSize: '25px',
    fontFamily: "Caveat",
    fill: '#000000', //noir 
    wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
    align: 'center'
  }).setDepth(9);
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
  this.add.image(400, 325, 'livre').setDepth(8);
  this.add.text(80, 80, "MAUVAISE REPONSE :( \n Je t'invite à cliquer sur la flèche\n et recommencer ce niveau.", {
    fontSize: '25px',
    fontFamily: "Caveat",
    fill: '#000000', //noir 
    wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
    align: 'center'
  }).setDepth(9);
});
///////////////////////////////////////////////////////////////////////////////
      var bouton_return = this.add.image(740, 100, 'retour').setScale(0.1).setDepth(9);
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
        this.scene.stop("niveauAbdellah"); // Arrête la scène du mini-jeu
        this.scene.start("principal"); // Démarre la scène du niveau principal

      });
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

  update() {
    // définitinon des mouvements du personnage

  if (cursors.up.isDown) {
    player.setVelocityY(-160);
    // à droite
  } else if (cursors.down.isDown) {
    player.setVelocityY(160);
  }

  // a gauche
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);

    // à droite
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play("right", true);
  }
  // immoobile
  else {
    player.setVelocityX(0);
    player.anims.play("turn");
  }
  // en saut (important : blocked doown au lieu de tuoching down)
  if (cursors.up.isDown && player.body.blocked.down) {
    player.setVelocityY(-200);
  }
  }

}

