// chargement des librairies


/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var clavier; // pour la gestion du clavier
// mise en place d'une variable groupeCibles
var musique_de_fond;

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
 this.load.image("Phaser_tuilesdejeu", "src/assets/tilesheet_complete.png");
 this.load.image("Phaser_tuilesdejeuu", "src/assets/car_red_1.png");
 this.load.image("Phaser_tuilesdejeuuu", "src/assets/car_black_3.png");
 
 // chargement de la carte
 this.load.tilemapTiledJSON("carte", "src/assets/map_principale.json");  
}

  create() {
    
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
Bordures.setCollisionByProperty({ estSolide: true }); 
  }

  update() {
    if (this.clavier.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("anim_tourne_gauche", true);
    } else if (this.clavier.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("anim_tourne_droite", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("anim_face");
    }
    if (this.clavier.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }

    if (Phaser.Input.Keyboard.JustDown(this.clavier.space) == true) {
        this.scene.switch("niveauAbdellah");
      }
  }
}
