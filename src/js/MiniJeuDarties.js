
// chargement des librairies

/***********************************************************************/
/** VARIABLES GLOBALES 
/***********************************************************************/

var player; // désigne le sprite du joueur
var groupe_plateformes; // contient toutes les plateformes
var clavier; // pour la gestion du clavier
// mise en place d'une variable boutonFeu
var boutonFeu;
// mise en place d'une variable groupeBullets
var groupeBullets;
// mise en place d'une variable groupeCibles
var groupeCibles;
var son_feu;
var codeSecret;
var CodeDecrypte;
var monArrayList = [];
var ListParcoursAleatoire = [];
var button1;
var button2;
var button3;
var button4;
var bouton_restart; 

export default class MiniJeuDarties extends Phaser.Scene {

  constructor() {
    super({ key: "MiniJeuDarties" }); // mettre le meme nom que le nom de la classe
  }

  /***********************************************************************/
  /** FONCTION PRELOAD 
  /***********************************************************************/

  /** La fonction preload est appelée une et une seule fois,
   * lors du chargement de la scene dans le jeu.
   * On y trouve surtout le chargement des assets (images, son ..)
   */
  preload() {
    // tous les assets du jeu sont placés dans le sous-répertoire src/assets/
    this.load.image("img_ciel", "src/assets/sky.png");
    this.load.image("img_plateforme", "src/assets/platform.png");
    this.load.spritesheet("img_perso", "src/assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48
    });
    // chargement de l'image balle.png
    this.load.image("bullet", "src/assets/balle.png");
    // chargement de l'image cible.png
    this.load.image("cible", "src/assets/cible.png");
    // on charge deux fichiers audio avec les identifiants coupDeFeu et background
    this.load.audio('coupDeFeu', 'src/assets/tir.mp3');
    this.load.image('livre', 'src/assets/book.png');
    this.load.image("button1", 'src/assets/bouton.png');
    this.load.image("button2", 'src/assets/bouton.png');
    this.load.image("button3", 'src/assets/bouton.png');
    this.load.image("button4", 'src/assets/bouton.png');
    this.load.image("restart", "src/assets/restart.png");

  }

  /***********************************************************************/
  /** FONCTION CREATE 
  /***********************************************************************/

  /* La fonction create est appelée lors du lancement de la scene
   * si on relance la scene, elle sera appelée a nouveau
   * on y trouve toutes les instructions permettant de créer la scene
   * placement des peronnages, des sprites, des platesformes, création des animations
   * ainsi que toutes les instructions permettant de planifier des evenements
   */
  create() {
    /*************************************
     *  CREATION DU MONDE + PLATEFORMES  *
     *************************************/
    // ajout des sons au gestionnaire sound
    // recupération de variables pour manipuler le son
    son_feu = this.sound.add('coupDeFeu');

    // On ajoute une simple image de fond, le ciel, au centre de la zone affichée (400, 300)
    // Par défaut le point d'ancrage d'une image est le centre de cette derniere
    this.add.image(400, 300, "img_ciel");

    // la création d'un groupes permet de gérer simultanément les éléments d'une meme famille
    //  Le groupe groupe_plateformes contiendra le sol et deux platesformes sur lesquelles sauter
    // notez le mot clé "staticGroup" : le static indique que ces élements sont fixes : pas de gravite,
    // ni de possibilité de les pousser.
    groupe_plateformes = this.physics.add.staticGroup();
    // une fois le groupe créé, on va créer les platesformes , le sol, et les ajouter au groupe groupe_plateformes

    // l'image img_plateforme fait 400x32. On en met 2 à coté pour faire le sol
    // la méthode create permet de créer et d'ajouter automatiquement des objets à un groupe
    // on précise 2 parametres : chaque coordonnées et la texture de l'objet, et "voila!"
    groupe_plateformes.create(200, 584, "img_plateforme");
    groupe_plateformes.create(600, 584, "img_plateforme");

    //  on ajoute 3 platesformes flottantes
    groupe_plateformes.create(600, 450, "img_plateforme");
    groupe_plateformes.create(50, 300, "img_plateforme");
    groupe_plateformes.create(750, 270, "img_plateforme");

    // création d'un groupe d'éléments vide
    groupeBullets = this.physics.add.group();

    // ajout de 8 cibles espacées de 110 pixels
    groupeCibles = this.physics.add.group({
      key: 'cible',
      repeat: 7,
      setXY: { x: 24, y: 0, stepX: 107 }
    });
    // modification des cibles créées
    groupeCibles.children.iterate(function (cibleTrouvee) {
      // définition de points de vie
      cibleTrouvee.pointsVie = Phaser.Math.Between(1, 5);;
      // modification de la position en y
      cibleTrouvee.y = Phaser.Math.Between(10, 250);
      // modification du coefficient de rebond
      cibleTrouvee.setBounce(1);
    });

    // ajout du modèle de collision entre cibles et plate-formes
    this.physics.add.collider(groupeCibles, groupe_plateformes);
    this.physics.add.overlap(groupeBullets, groupeCibles, this.hit, null, this);

    /****************************
     *  CREATION DU PERSONNAGE  *
     ****************************/

    // On créée un nouveeau personnage : player
    player = this.physics.add.sprite(100, 450, "img_perso");

    // creation d'un attribut direction pour le joueur, initialisée avec 'right'
    player.direction = 'right';

    //  propriétées physiqyes de l'objet player :
    player.setBounce(0.2); // on donne un petit coefficient de rebond
    player.setCollideWorldBounds(true); // le player se cognera contre les bords du monde

    /***************************
     *  CREATION DES ANIMATIONS *
     ****************************/
    // dans cette partie, on crée les animations, à partir des spritesheet
    // chaque animation est une succession de frame à vitesse de défilement défini
    // une animation doit avoir un nom. Quand on voudra la jouer sur un sprite, on utilisera la méthode play()
    // creation de l'animation "anim_tourne_gauche" qui sera jouée sur le player lorsque ce dernier tourne à gauche
    this.anims.create({
      key: "anim_tourne_gauche", // key est le nom de l'animation : doit etre unique poru la scene.
      frames: this.anims.generateFrameNumbers("img_perso", { start: 0, end: 3 }), // on prend toutes les frames de img perso numerotées de 0 à 3
      frameRate: 10, // vitesse de défilement des frames
      repeat: -1 // nombre de répétitions de l'animation. -1 = infini
    });

    // creation de l'animation "anim_tourne_face" qui sera jouée sur le player lorsque ce dernier n'avance pas.
    this.anims.create({
      key: "anim_face",
      frames: [{ key: "img_perso", frame: 4 }],
      frameRate: 20
    });

    // creation de l'animation "anim_tourne_droite" qui sera jouée sur le player lorsque ce dernier tourne à droite
    this.anims.create({
      key: "anim_tourne_droite",
      frames: this.anims.generateFrameNumbers("img_perso", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    /***********************
     *  CREATION DU CLAVIER *
     ************************/
    // ceci permet de creer un clavier et de mapper des touches, connaitre l'état des touches
    clavier = this.input.keyboard.createCursorKeys();
    // affectation de la touche A à boutonFeu
    boutonFeu = this.input.keyboard.addKey('A');

    /*****************************************************
     *  GESTION DES INTERATIONS ENTRE  GROUPES ET ELEMENTS *
     ******************************************************/

    //  Collide the player and the groupe_etoiles with the groupe_plateformes
    this.physics.add.collider(player, groupe_plateformes);

    // instructions pour les objets surveillés en bord de monde
    this.physics.world.on("worldbounds", function (body) {
      // on récupère l'objet surveillé
      var objet = body.gameObject;
      // s'il s'agit d'une balle
      if (groupeBullets.contains(objet)) {
        // on le détruit
        objet.destroy();
      }
    });

  }

  /***********************************************************************/
  /** FONCTION UPDATE 
  /***********************************************************************/

  update() {
    if (clavier.left.isDown) {
      player.direction = 'left';
      player.setVelocityX(-160);
      player.anims.play("anim_tourne_gauche", true);
    } else if (clavier.right.isDown) {
      player.direction = 'right';
      player.setVelocityX(160);
      player.anims.play("anim_tourne_droite", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("anim_face");
    }

    if (clavier.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }

    // déclenchement de la fonction tirer() si appui sur boutonFeu 
    if (Phaser.Input.Keyboard.JustDown(boutonFeu)) {
      this.tirer(player);
      son_feu.play();
    }

  }

  //fonction tirer( ), prenant comme paramètre l'auteur du tir
  tirer(player) {
    var coefDir;
    if (player.direction == 'left') { coefDir = -1; } else { coefDir = 1 }
    // on crée la balle a coté du joueur
    var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');
    // parametres physiques de la balle.
    bullet.setCollideWorldBounds(true);
    // on acive la détection de l'evenement "collision au bornes"
    bullet.body.onWorldBounds = true;

    bullet.body.allowGravity = false;
    bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
    son_feu.stop();
  }

  // fonction déclenchée lorsque uneBalle et uneCible se superposent
  hit(bullet, cible) {
    cible.pointsVie--;
    if (cible.pointsVie == 0) {
      cible.destroy();

      //générer un code secret aléatoire 
      codeSecret = this.genererNombreBinaire();
      //décryptage du code
      CodeDecrypte = this.binaireVersDecimal(codeSecret); //réponse correcte 
      //remplissage de l'arraylist avec la réponse correcte et 3 réponses random
      monArrayList.push(CodeDecrypte);
      for (var pas = 0; pas < 3; pas++) {
        const nbA = Phaser.Math.Between(1, 99);
        if (!monArrayList.includes(nbA)) {
          monArrayList.push(nbA);
        }
      }

      //génération de positions random et rangement dans une list 
      while (ListParcoursAleatoire.length !== 4) {
        const nbA = Phaser.Math.Between(0, 3);
        if (!ListParcoursAleatoire.includes(nbA)) {
          ListParcoursAleatoire.push(nbA);
        }
      }

      //j'ajoute l'image du livre et les instructions 
      this.add.image(400, 300, "livre").setDepth(1);
      this.add.text(72, 82, "Félicitations! \n\n Vous avez réussit à atteindre toutes les cibles, toutefois, ce n'est pas sufisant pour valider le module. \n\n Je vais vous donner un code secret en base deux que vous devrez convertir en décimal : \n" + codeSecret, {
        fontSize: '25px',
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(2); // Réglez la profondeur à une valeur plus élevée que celle des autres objets

      //j'ajoute l'image des boutons et je génère le texte qui les rempli 
      //bouton 1
      button1 = this.add.image(600, 140, "button1").setDepth(2).setScale(0.05);
      this.add.text(585, 130, "" + monArrayList[ListParcoursAleatoire[0]], {
        fontSize: '25px',
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(2);

      //bouton 2
      button2 = this.add.image(600, 240, "button2").setDepth(2).setScale(0.05);
      this.add.text(585, 230, "" + monArrayList[ListParcoursAleatoire[1]], {
        fontSize: '25px',
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(2);

      //bouton 3
      button3 = this.add.image(600, 340, "button3").setDepth(2).setScale(0.05);
      this.add.text(585, 330, "" + monArrayList[ListParcoursAleatoire[2]], {
        fontSize: '25px',
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(2);

      //bouton 4
      button4 = this.add.image(600, 440, "button4").setDepth(2).setScale(0.05);
      this.add.text(585, 430, "" + monArrayList[ListParcoursAleatoire[3]], {
        fontSize: '25px',
        fill: '#000000', //noir 
        wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
        align: 'center'
      }).setDepth(2);
    

    //on rend le bouton interratif
    console.log(button1);
    button1.setInteractive();
    button2.setInteractive();
    button3.setInteractive();
    button4.setInteractive();

    //Cas ou la souris passe sur le bouton play
    button1.on("pointerover", () => {
      button1.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    button1.on("pointerout", () => {
      button1.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    button1.on("pointerup", () => {
      if (monArrayList[ListParcoursAleatoire[0]] == CodeDecrypte) {
        this.add.text(420, 430, "Vous avez Gagné", {
          fontSize: '25px',
          fill: '#000000', //noir 
          wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
          align: 'center'
        }).setDepth(3);
      }  else {
        this.ajout_bouton_restart();
      }
    });

    //bouton 2
    //Cas ou la souris passe sur le bouton play
    button2.on("pointerover", () => {
      button2.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    button2.on("pointerout", () => {
      button2.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    button2.on("pointerup", () => {
      if (monArrayList[ListParcoursAleatoire[1]] == CodeDecrypte) {
        this.add.text(420, 530, "Vous avez Gagné", {
          fontSize: '25px',
          fill: '#000000', //noir 
          wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
          align: 'center'
        }).setDepth(3);
      } else {
        this.ajout_bouton_restart();
      }
    });

    //Cas ou la souris passe sur le bouton play
    button3.on("pointerover", () => {
      button3.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    button3.on("pointerout", () => {
      button3.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    button3.on("pointerup", () => {
      if (monArrayList[ListParcoursAleatoire[2]] == CodeDecrypte) {
        this.add.text(420, 530, "Vous avez Gagné", {
          fontSize: '25px',
          fill: '#000000', //noir 
          wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
          align: 'center'
        }).setDepth(3);
      } else {
        this.ajout_bouton_restart();
      }
    });

    //Cas ou la souris passe sur le bouton play
    button4.on("pointerover", () => {
      button4.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    button4.on("pointerout", () => {
      button4.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    button4.on("pointerup", () => {
      if (monArrayList[ListParcoursAleatoire[3]] == CodeDecrypte) {
        this.add.text(420, 530, "Vous avez Gagné", {
          fontSize: '25px',
          fill: '#000000', //noir 
          wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
          align: 'center'
        }).setDepth(3);
      } else {
        this.ajout_bouton_restart();
      }
    });

    bullet.destroy();
  }
  }

  genererNombreBinaire() {
    var nombreBinaire = '';
    for (var i = 0; i < 6; i++) {
      var bit = Math.round(Math.random()); // Génère aléatoirement 0 ou 1
      nombreBinaire += bit;
    }
    return nombreBinaire;
  }

  binaireVersDecimal(nombreBinaire) {
    var nombreDecimal = parseInt(nombreBinaire, 2);
    return nombreDecimal;
  }

  ajout_bouton_restart(){
    this.add.text(470, 500, "Vous avez Perdu !", {
      fontSize: '25px',
      fill: '#000000', //noir 
      wordWrap: { width: 300, useAdvancedWrap: true }, // Définissez la largeur maximale ici (300 pixels dans cet exemple)
      align: 'center'
    }).setDepth(3);
    //creation btn restart
    bouton_restart = this.add.image(400, 300, "restart").setDepth(3).setScale(0.05);
    
    bouton_restart.setInteractive();
    bouton_restart.on("pointerover", () => {
      bouton_restart.setTint(0xC0C0C0);
    });
    //Cas ou la souris ne passe plus sur le bouton play
    bouton_restart.on("pointerout", () => {
      bouton_restart.clearTint();
    });
    //Cas ou la souris clique sur le bouton play :
    bouton_restart.on("pointerup", () => {
      this.scene.stop(MiniJeuDarties); 
      //this.scene.switch(principal);
    });
}
}
