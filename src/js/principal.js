// chargement des librairies
import * as Abd from "/src/js/minijeuAbdellah.js";
import * as Drt from "/src/js/MiniJeuDarties.js";
import * as Pzl from "/src/js/puzzle.js";

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var cursors; // pour la gestion du clavier
var calque_background2;
var score;
let textBubble;


export default class principal extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "principal" //  ici on précise le nom de la classe en tant qu'identifiant
    });
    this.player;// Initialize score variable
  }
  
  preload() {
    
    // ajout perso
    this.load.image("dude1", "src/assets/tetered.png");

    // chargement tuiles de jeu
    this.load.image("Phaser_tuilesdejeu", "src/assets/tilesheet_complete.png", { frameWidth: 4416, frameHeight: 6400 });


    // chargement de la carte
    this.load.tilemapTiledJSON("carte", "src/assets/map_principale2.json");

    //chrgmt portes
    this.load.image('img_porte1', 'src/assets/door1.png');
    this.load.image('img_porte2', 'src/assets/door2.png');
    this.load.image('img_porte3', 'src/assets/door3.png');
  }

  create() {
    score = 0;
    console.log("maths : " + Abd.minijeuAbd_terminé); 
    console.log("cpo : " + Drt.minijeuDrt_terminé); 
    console.log("chimie : " + Pzl.isPuzzleSolved); 
    // Calculate the center position of the screen
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

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
    this.player = this.physics.add.image(2656, 6240, "dude1").setScale(1);
    this.player.setBounce(0.2);
    this.physics.add.collider(this.player, calque_background2);
    // animation pour tourner à gauche


    // création d'un écouteur sur le clavier
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.world.setBounds(0, 0, 4416, 6400);
    //  ajout du champs de la caméra de taille identique à celle du monde
    this.cameras.main.setBounds(0, 0, 4416, 6400);
    // ancrage de la caméra sur le joueur
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setZoom(0.2);



    // ajout du modèle de collision entre le personnage et le monde
    this.player.setCollideWorldBounds(true);
this.porte1 = this.physics.add.staticSprite(3456, 4256, "img_porte1").setScale(6);
this.porte2 = this.physics.add.staticSprite(3456, 2880, "img_porte2").setScale(6);
this.porte3 = this.physics.add.staticSprite(3456, 1984, "img_porte3").setScale(6);
  }

  update() {
    if (score == 8 && Abd.minijeuAbd_termine==true && Drt.minijeuDrt_termine==true && Pzl.isPuzzleSolved==true){
      this.scene.stop("End");
      window.close();    }
    this.initializeTextBubble();
    this.player.setVelocity(0);

    if (cursors.up.isDown) {
      this.player.setVelocityY(-400);
      // à droite
    } else if (cursors.down.isDown) {

      this.player.setVelocityY(400);

    }

    // a gauche
    if (cursors.left.isDown) {

      this.player.setVelocityX(-400);

      //player.anims.play("left", true);



      // à droite
    } else if (cursors.right.isDown) {

      this.player.setVelocityX(400);

      //player.anims.play("right", true);
    }

    // immoobile
    else {

      this.player.setVelocityX(0);

      //player.anims.play("turn");
      this.player.setGravity(0); // Remove gravity from the player

    }
    this.physics.world.collide(this.player, calque_background2);

    if (cursors.right.isDown)  {
      if (this.physics.overlap(this.player, this.porte2)){
        this.scene.switch("niveauDarties");
        this.porte2.destroy();
        score+=3; 
        console.log("score : "+score); 
      }
      if (this.physics.overlap(this.player, this.porte1)) {
        this.scene.switch("niveauAbdellah");
        score+=3; 
        console.log("score : "+score); 
        this.porte1.destroy();
      }
      if (this.physics.overlap(this.player, this.porte3)) {
      score+=2; 
        console.log("score : "+score); 
        this.scene.switch("niveauMeyer");
        this.porte3.destroy();
        
      }
    }
    

  }

  initializeTextBubble() {
    textBubble = this.add.text(this.player.x, this.player.y - 200, 'Score : ' + score, {
      fontSize: '16px',
      fill: '#ffffff',
      backgroundColor: '#000000',
      padding: {
        x: 10,
        y: 10
      },
      //borderRadius: 6,
      visible: false
    }).setOrigin(0.5).setDepth(10).setScale(3);
    console.log("ajout text bubble"); 
  }
  
}
