import * as fct from "/src/js/fonctions.js";

var player;
var cursors;

export default class niveauMeyer extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveauMeyer" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  preload() {
    // ajout perso
    this.load.spritesheet("dude", "src/assets/dude.png", { frameWidth: 32, frameHeight: 48 });

    // chargement tuiles de jeu
    this.load.image("tuiles1", "src/assets/tilesheet_complete.png"); //verifier que ce soit celui qui a été utilisé 


    // chargement de la carte
    this.load.tilemapTiledJSON("classe", "src/assets/MapSalleCours.json");
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
   player = this.physics.add.sprite(100, 400, "dude").setScale(4.5);;
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


  }

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

