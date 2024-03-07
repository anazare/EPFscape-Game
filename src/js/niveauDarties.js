import * as fct from "/src/js/fonctions.js";

var cursors;
var continuer;

export default class niveauDarties extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "niveauDarties" //  ici on précise le nom de la classe en tant qu'identifiant
    });
    var player;
  }

  preload() {
    // ajout perso
    this.load.spritesheet("alldude2", "src/assets/alldude.png", { frameWidth: 31.85, frameHeight: 48 });
    // chargement tuiles de jeu
    this.load.image("tuiles1", "src/assets/tilesheet_complete.png"); //verifier que ce soit celui qui a été utilisé 
    // chargement de la carte
    this.load.tilemapTiledJSON("classe", "src/assets/MapSalleCours.json");
    this.load.image("continuer", "src/assets/fleche.png");
    this.load.audio("consignes", "src/assets/Darties.mp3");

  }

  create() {
    var cons = this.sound.add('consignes');
    cons.play();
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
    this.player = this.physics.add.sprite(800, 400, "alldude2").setScale(4);;
    this.player.setBounce(0.2);


    // animation pour tourner à gauche
    this.anims.create({
      key: "left2",
      frames: this.anims.generateFrameNumbers("alldude2", { start: 18, end: 21 }),
      frameRate: 10,
      repeat: -1
    });

    // animation lorsque le personnage n'avance pas
    this.anims.create({
      key: "turn2",
      frames: [{ key: "alldude2", frame: 22}],
      frameRate: 20
    });

    // animation pour tourner à droite
    this.anims.create({
      key: "right2",
      frames: this.anims.generateFrameNumbers("alldude2", { start: 23, end: 26 }),
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

    continuer = this.add.image(675, 350, "continuer").setScale(0.15);
    continuer.setInteractive();

    continuer.on("pointerover", () => {
      continuer.setTint(0xC0C0C0);
    });

    continuer.on("pointerout", () => {
      continuer.clearTint();
    });

    continuer.on("pointerup", () => {
      cons.stop();
      console.log("musique finie");
      this.scene.switch("MiniJeuDarties"); 
    });

    
  }


  displayDynamicText() {
    const text = "Bonjour Redouane, je te lance un défi ! \nSi tu réussis le mini-jeu ainsi que l'enigme qui suivra je te donne tes 3 crédits restants.";
    const x = 100; // Position X du texte
    const y = 100; // Position Y du texte
    const fontSize = '25px'; // Taille de la police
    const fill = '#fff'; // Couleur du texte
    const delay = 50; // Délai entre chaque caractère en ms

    let dynamicText1 = this.add.text(x, y, '', {
      fontSize: fontSize,
      fill: fill,
      fontFamily: "Caveat",
      wordWrap: { width: 600, useAdvancedWrap: true },
      align: 'justify'
    });

    // Fonction pour afficher le texte de manière progressive
    function typeWriter(text, index) {
      if (index < text.length) {
        dynamicText1.setText(dynamicText1.text + text[index]);
        index++;
        setTimeout(function () {
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

    // a gauche
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play("left2", true);

      // à droite
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play("right2", true);
    }
    // immoobile
    else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn2");
    }
    // en saut (important : blocked doown au lieu de tuoching down)
    if (cursors.up.isDown && this.player.body.blocked.down) {
      this.player.setVelocityY(-200);
    }
  }
}

