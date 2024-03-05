// chargement des librairies


/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var cursors; // pour la gestion du clavier
var calque_background2; 


export default class principal extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "principal" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    // ajout perso
    this.load.spritesheet("dude", "src/assets/dude.png", { frameWidth: 32, frameHeight: 48 });

    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu", "src/assets/tilesheet_complete.png", {frameWidth: 4416, frameHeight: 6400});


    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/map_principale2.json");
  }

  create() {


    // chargement de la carte
    const carteDuNiveau = this.add.tilemap("carte");

    // chargement du jeu de tuiles
    const tileset = carteDuNiveau.addTilesetImage(
      "tuiles1", "Phaser_tuilesdejeu"
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

    // création du personnage de jeu et positionnement
    player = this.physics.add.sprite(2656, 6240, "dude").setScale(4.5);
    player.setBounce(0.2);
    this.physics.add.collider(player, calque_background2);
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
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end:8}),
      frameRate: 10,
      repeat: -1
    });

    // création d'un écouteur sur le clavier
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.setBounds (0,0,4416,6400);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 4416, 6400);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(player);
    this.cameras.main.setZoom(0.2);
    


    // ajout du modèle de collision entre le personnage et le monde
    player.setCollideWorldBounds(true);


  }

  update() {

     player.setVelocity(0);

    if (cursors.up.isDown) {
      player.setVelocityY(-300);
      // à droite
    } else if (cursors.down.isDown) {

      player.setVelocityY(300);

    }



    // a gauche

    if (cursors.left.isDown) {

      player.setVelocityX(-300);

      player.anims.play("left", true);



      // à droite

    } else if (cursors.right.isDown) {

      player.setVelocityX(300);

      player.anims.play("right", true);

    }

    // immoobile

    else {

      player.setVelocityX(0);

      player.anims.play("turn");
      player.setGravity(0); // Remove gravity from the player

    }
    this.physics.world.collide(player, calque_background2);
  }
}
