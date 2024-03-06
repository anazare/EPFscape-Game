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
    this.score = 0; // Initialize score variable
    this.scoreText; // Declare scoreText variable
  }
  preload() {
    // ajout perso
    this.load.image("dude1", "src/assets/tetered.png");

    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu", "src/assets/tilesheet_complete.png", {frameWidth: 4416, frameHeight: 6400});


    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/map_principale2.json");
    
    //chrgmt portes
    this.load.image('img_porte1', 'src/assets/door1.png');
    this.load.image('img_porte2', 'src/assets/door2.png');
    this.load.image('img_porte3', 'src/assets/door3.png');
  }

  create() {

     // Calculate the center position of the screen
     const centerX = this.cameras.main.width / 2;
     const centerY = this.cameras.main.height / 2;
 
     // Create the score text at the center position
     this.scoreText = this.add.text(
       centerX, // X position
       centerY, // Y position
       'Score: 0', // Initial text
       { fontSize: '24px', fill: '#fff' } // Text style
     ).setOrigin(0.5); // Set origin to center
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
    player = this.physics.add.image(2656, 6240, "dude1").setScale(1);
    player.setBounce(0.2);
    this.physics.add.collider(player, calque_background2);
    // animation pour tourner à gauche
    

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
this.porte1 = this.physics.add.staticSprite(3456, 4256, "img_porte1").setScale(6);
this.porte2 = this.physics.add.staticSprite(3456, 2880, "img_porte2").setScale(6);
this.porte3 = this.physics.add.staticSprite(3456, 1984, "img_porte3").setScale(6);
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

      //player.anims.play("left", true);



      // à droite

    } else if (cursors.right.isDown) {

      player.setVelocityX(300);

      //player.anims.play("right", true);

    }

    // immoobile

    else {

      player.setVelocityX(0);

      //player.anims.play("turn");
      player.setGravity(0); // Remove gravity from the player

    }
    this.physics.world.collide(player, calque_background2);

    if (cursors.right.isDown)  {
      if (this.physics.overlap(player, this.porte2)){
        this.score += 3;
      this.scoreText.setText('Score: ' + this.score);
        this.scene.switch("niveauDarties");
        this.porte2.destroy();
      } 
      if (this.physics.overlap(player, this.porte1)) {
        this.score += 3;
      this.scoreText.setText('Score: ' + this.score);
        this.scene.switch("niveauAbdellah");
        this.porte1.destroy();
      }
      if (this.physics.overlap(player, this.porte3)) {
        this.score += 2;
      this.scoreText.setText('Score: ' + this.score);
        this.scene.switch("niveauMeyer");
        this.porte3.destroy();
      }
    } 
  
  
  }
}
