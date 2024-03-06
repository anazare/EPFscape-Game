import * as fct from "/src/js/fonctions.js";
export default class videoggP extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "videoggP" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  preload(){
    this.load.audio("jousset2", "src/assets/jousset2.mp3");
  }
  create() {
    // Create a video element dynamically
    this.videoElement = document.createElement('video');
    this.videoElement.src = 'src/assets/videogg.mp4';
    this.videoElement.width = 1200; // Set the width according to your needs
    this.videoElement.height = 1200; // Set the height according to your needs

    // Add styles to position the video at the center of the screen
    this.videoElement.style.position = 'fixed';
    this.videoElement.style.top = '50%';
    this.videoElement.style.left = '50%';
    this.videoElement.style.transform = 'translate(-50%, -50%)';
    this.videoElement.style.zIndex = '9999';

    // Add event listener for when the video ends
    this.videoElement.addEventListener('ended', this.onVideoEnded.bind(this));

    // Add the video to your document
    document.body.appendChild(this.videoElement);

    // Start playing the video
    this.videoElement.play();

    // ajout du son de jousset 
    var jousset2 = this.sound.add('jousset2');
    jousset2.play();
  }

  update() {
    // Update logic if needed
  }

  onVideoEnded() {
    // Transition to the next scene
    this.scene.switch("chargementP");
    this.videoElement.parentNode.removeChild(this.videoElement);  }
}