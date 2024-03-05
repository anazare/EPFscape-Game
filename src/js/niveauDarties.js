import * as fct from "/src/js/fonctions.js";

var player;
var cursors;
var continuer

export default class niveauDarties extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveauDarties" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  preload() {
    // ajout perso
    this.load.spritesheet("dude", "src/assets/dude.png", { frameWidth: 32, frameHeight: 48 });
    // chargement tuiles de jeu
    this.load.image("tuiles1", "src/assets/tilesheet_complete.png"); //verifier que ce soit celui qui a été utilisé 
    // chargement de la carte
    this.load.tilemapTiledJSON("classe", "src/assets/MapSalleCours.json");
    this.load.image("continuer", "src/assets/fleche.png"); 
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

  continuer = this.add.image(700,500, "continuer").setScale(0.2); 
  continuer.setInteractive();

  continuer.on("pointerover", () => {
    continuer.setTint(0xC0C0C0);
    });

    continuer.on("pointerout", () => {
      continuer.clearTint();
    });

    continuer.on("pointerup", () => {
      this.scene.start("MiniJeuDarties");
    });

  }
  displayDynamicText() {
    
      const text = "Bonjour, je te lance un défi, \n si tu réussis le mini-jeu ainsi\n que l'enigme qui suivra \n je te donne tes 3 crédits restants."; 
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

