// chargement des librairies
import selection from "/src/js/selection.js";
import niveauDarties from "/src/js/niveauDarties.js";
import niveauMeyer from "/src/js/niveauMeyer.js";
import niveauJousset from "/src/js/niveauJousset.js";
import niveauAbdellah from "/src/js/niveauAbdellah.js";
import principal from "/src/js/principal.js";
import minijeuAbdellah from "/src/js/minijeuAbdellah.js";
import puzzle from "/src/js/puzzle.js";
import videoggP from "/src/js/videoggP.js";
import chargementP from "/src/js/chargementP.js";
<<<<<<< HEAD
import chargement1 from "/src/js/chargement1.js";
import chargement2 from "/src/js/chargement2.js";
import chargement3 from "/src/js/chargement3.js";
=======
import chargementP from "/src/js/chargement1.js";
import chargementP from "/src/js/chargement2.js";
import chargementP from "/src/js/chargement3.js";
>>>>>>> 9f340070861b8e176b2ca9518a46c076fb0f7671

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
  scene: [puzzle,videoggP,chargementP,chargement1, chargement2, chargement3, selection, minijeuAbdellah , principal,  niveauMeyer, niveauJousset, niveauDarties, niveauAbdellah]
=======
  scene: [puzzle,videoggP,chargementP,selection, minijeuAbdellah , principal,  niveauMeyer, niveauJousset, niveauDarties, niveauAbdellah]
>>>>>>> 9f340070861b8e176b2ca9518a46c076fb0f7671

};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start("minijeuAbdellah");


