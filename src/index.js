// chargement des librairies
import selection from "/src/js/selection.js";
import niveauDarties from "/src/js/niveauDarties.js";
import niveauMeyer from "/src/js/niveauMeyer.js";
import niveauJousset from "/src/js/niveauJousset.js";
import niveauAbdellah from "/src/js/niveauAbdellah.js";
import principal from "/src/js/principal.js";
import minijeuAbdellah from "/src/js/minijeuAbdellah.js";
<<<<<<< HEAD
import puzzle from "/src/js/puzzle.js";
import videoggP from "/src/js/videoggP.js";

=======
import puzzle from "/src/js/puzzle.js"
>>>>>>> 114b94d9856c2241b7fef58a27e02a1862e95fa5
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
<<<<<<< HEAD
  scene: [videoggP,selection, minijeuAbdellah , principal,  niveauMeyer, niveauJousset, niveauDarties, niveauAbdellah,puzzle]
=======
  scene: [puzzle,selection, minijeuAbdellah , principal,  niveauMeyer, niveauJousset, niveauDarties, niveauAbdellah]
>>>>>>> 114b94d9856c2241b7fef58a27e02a1862e95fa5
  
};

// création et lancement du jeu
var game = new Phaser.Game(config);
<<<<<<< HEAD
game.scene.start("videoggP");
=======
game.scene.start("puzzle");
>>>>>>> 114b94d9856c2241b7fef58a27e02a1862e95fa5


