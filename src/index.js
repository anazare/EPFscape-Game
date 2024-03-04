// chargement des librairies
import selection from "/src/js/selection.js";
import niveauDarties from "/src/js/niveauDarties.js";
import niveauMeyer from "/src/js/niveauMeyer.js";
import niveauJousset from "/src/js/niveauJousset.js";
import niveauAbdellah from "/src/js/niveauAbdellah.js";
import principal from "/src/js/principal.js";

// configuration générale du jeu
var config = {
  type: Phaser.AUTO,
  width: 800, // largeur en pixels
  height: 600, // hauteur en pixels
   scale: {
        // Or set parent divId here
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
   },
  physics: {
    // définition des parametres physiques
    default: "arcade", // mode arcade : le plus simple : des rectangles pour gérer les collisions. Pas de pentes
    arcade: {
      // parametres du mode arcade
      gravity: {
        y: 300 // gravité verticale : acceleration ddes corps en pixels par seconde
      },
      debug: true // permet de voir les hitbox et les vecteurs d'acceleration quand mis à true
    }
  },
  scene: [principal, selection,  niveauMeyer, niveauJousset, niveauDarties, niveauAbdellah]
  
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("principal");


