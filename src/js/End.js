import * as fct from "/src/js/fonctions.js";
export default class End extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "End" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload() {
    this.load.audio("jousset4", "src/assets/jousset4.mp3");

  }
  create() {

    // Create a video element dynamically
    this.videoElement1 = document.createElement('video');
    this.videoElement1.src = 'src/assets/VIDfinale.mp4';
    this.videoElement1.width = 1200; // Set the width according to your needs
    this.videoElement1.height = 900; // Set the height according to your needs

    // Add styles to position the video at the center of the screen
    this.videoElement1.style.position = 'fixed';
    this.videoElement1.style.top = '50%';
    this.videoElement1.style.left = '50%';
    this.videoElement1.style.transform = 'translate(-50%, -50%)';
    this.videoElement1.style.zIndex = '9999';


    // Add event listener for when the video ends
    this.videoElement1.addEventListener('ended', this.onVideoEnded1.bind(this));

    // Add the video to your document
    document.body.appendChild(this.videoElement1);

    // Start playing the video
    this.videoElement1.play();

    // ajout du son de jousset 
    var jousset5 = this.sound.add('jousset4');
    jousset5.play();
    jousset5.setVolume(3); 


  }

  update() {
    // Update logic if needed
  }

  onVideoEnded1() {
    console.log('passage a restartJeu');
      this.scene.switch("restartJeu"); 
  }
}
