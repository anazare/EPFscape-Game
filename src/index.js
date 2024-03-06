// chargement des librairies
import selection from "/src/js/selection.js";
import niveauDarties from "/src/js/niveauDarties.js";
import niveauMeyer from "/src/js/niveauMeyer.js";
import niveauAbdellah from "/src/js/niveauAbdellah.js";
import principal from "/src/js/principal.js";
import minijeuAbdellah from "/src/js/minijeuAbdellah.js";
import puzzle from "/src/js/puzzle.js";
import videoggP from "/src/js/videoggP.js";
import chargementP from "/src/js/chargementP.js";
import chargement1 from "/src/js/chargement1.js";
import chargement2 from "/src/js/chargement2.js";
import chargement3 from "/src/js/chargement3.js";
import MiniJeuDarties from "./js/MiniJeuDarties.js";
import enigme2Abdellah from "/src/js/enigme2Abdellah.js";
import videoggP2 from "./js/videoggP2.js";
import videoggP1 from "./js/videoggP1.js";
import pagedelancement from "./js/pagedelancement.js";



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


  scene: [pagedelancement,selection,niveauAbdellah,minijeuAbdellah,MiniJeuDarties,videoggP1, niveauMeyer,videoggP,videoggP2,chargementP,chargement1, chargement2, chargement3,puzzle,enigme2Abdellah , principal, niveauDarties]
};

// création et lancement du jeu
var game = new Phaser.Game(config);
game.scene.start(pagedelancement);


