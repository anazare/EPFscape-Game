// chargement des librairies


/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var cursors; // pour la gestion du clavier



export default class principal extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "principal" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    // ajout perso
 this.load.spritesheet("dude", "src/assets/modern-men.png", {frameWidth: 32, frameHeight: 48}); 

 // chargement tuiles de jeu
 this.load.image("Phaser_tuilesdejeu", "src/assets/tilesheet_final.png");
 this.load.image("Phaser_tuilesdejeuu", "src/assets/car_red_1.png");
 this.load.image("Phaser_tuilesdejeuuu", "src/assets/car_black_3.png");
 
 // chargement de la carte
 this.load.tilemapTiledJSON("carte", "src/assets/map_principale.json");  
}

  create() {
   
   // création du personnage de jeu et positionnement
   player = this.physics.add.sprite(100, 400, "dude");
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
   
   //  ajout du champs de la caméra de taille identique à celle du monde
   this.cameras.main.setBounds(0, 0, 4416, 6400);
   // ancrage de la caméra sur le joueur
   this.cameras.main.startFollow(player);


    // ajout du modèle de collision entre le personnage et le monde
    player.setCollideWorldBounds(true);


    
// chargement de la carte
const carteDuNiveau = this.add.tilemap("carte"); 

// chargement du jeu de tuiles
const tileset = carteDuNiveau.addTilesetImage(
          "Phaser_tuilesdejeu",
          "Phaser_tuilesdejeuu",
          "Phaser_tuilesdejeuuu"
        ); 

// chargement du calque calque_background
const calque_background = carteDuNiveau.createLayer(
  "Calque de Tuiles 1",
  tileset
);

// chargement du calque calque_background2
const calque_background2 = carteDuNiveau.createLayer(
  "Bordures",
  tileset
); 

// définition des tuiles de plateformes qui sont solides
// utilisation de la propriété estSolide
calque_background2.setCollisionByProperty({ estSolide: true }); 
  }

  update() {
   // if (this.clavier.left.isDown) {
    //  this.player.setVelocityX(-160);
      //this.player.anims.play("anim_tourne_gauche", true);
    //} else if (this.clavier.right.isDown) {
      //this.player.setVelocityX(160);
      //this.player.anims.play("anim_tourne_droite", true);
    //} else {
    //  this.player.setVelocityX(0);
    //  this.player.anims.play("anim_face");
    //}
    //if (this.clavier.up.isDown && this.player.body.touching.down) {
     // this.player.setVelocityY(-330);
    //}

    if (cursors.space.isDown) {
        this.scene.switch("niveauAbdellah");
      }
  }
}
