import * as fct from "/src/js/fonctions.js";

var cursors;

export default class niveauMeyer extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveauMeyer" //  ici on précise le nom de la classe en tant qu'identifiant
    });
    this.player;
  }

  preload() {


    // ajout perso
    this.load.spritesheet("alldude1", "src/assets/alldude.png", { frameWidth: 32.25, frameHeight: 48 });

    // chargement tuiles de jeu
    this.load.image("tuiles1", "src/assets/tilesheet_complete.png"); //verifier que ce soit celui qui a été utilisé 


    // chargement de la carte
    this.load.tilemapTiledJSON("classe", "src/assets/MapSalleCours.json");
    this.load.image("fleche", "src/assets/fleche.png");

    this.load.audio("Winston", "src/assets/Winston.mp3"); 
  }

  create() {
    var son_Winston = this.sound.add("Winston"); 
    son_Winston.play(); 
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
   this.player = this.physics.add.sprite(800, 400, "alldude1").setScale(4);;
   this.player.setBounce(0.2);
 
 
   // animation pour tourner à gauche
   this.anims.create({
     key: "leftm",
     frames: this.anims.generateFrameNumbers("alldude1", { start: 0, end: 3 }),
     frameRate: 10,
     repeat: -1
   });
 
   // animation lorsque le personnage n'avance pas
   this.anims.create({
     key: "turnm",
     frames: [{ key: "alldude1", frame: 4 }],
     frameRate: 20
   });
 
   // animation pour tourner à droite
   this.anims.create({
     key: "rightm",
     frames: this.anims.generateFrameNumbers("alldude1", { start: 5, end: 8 }),
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
    
      const text = "Salut Redouane!\n Alors, pour avoir tes crédits... Je te laisse la possibilité de vérifier tes connaissances en chimie à l'aide de ce petit puzzle."; 
      const x = 100; // Position X du texte
      const y = 100; // Position Y du texte
      const fontSize = '25px'; // Taille de la police
      const fill = '#fff'; // Couleur du texte
      const delay = 50; // Délai entre chaque caractère en ms
  
      let dynamicText = this.add.text(x, y, '', {
        fontSize: fontSize,
        fill: fill,
        align: 'justify',  // Justification du texte
        wordWrap: {
          width: 600,        // Largeur maximale de la zone de texte
          useAdvancedWrap: true  // Activation du retour à la ligne automatique
        }
      });
      
  
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
      var fleche = this.add.image(650,350 , 'fleche').setScale(0.15).setDepth(9);
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
        this.scene.stop("niveauMeyer"); // Arrête la scène du mini-jeu
        this.scene.start("puzzle"); // Démarre la scène du niveau principal

      });
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

  update() {
   
    // définitinon des mouvements du personnage

  // a gauche
  if (cursors.left.isDown) {
    this.player.setVelocityX(-160);
    this.player.anims.play("leftm", true);

    // à droite
  } else if (cursors.right.isDown) {
    this.player.setVelocityX(160);
    this.player.anims.play("rightm", true);
  }
  // immoobile
  else {
    this.player.setVelocityX(0);
    this.player.anims.play("turnm");
  }
  // en saut (important : blocked doown au lieu de tuoching down)
  if (cursors.up.isDown && this.player.body.blocked.down) {
    this.player.setVelocityY(-200);
  }
  }
}

