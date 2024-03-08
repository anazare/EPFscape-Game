import * as fct from "/src/js/fonctions.js";
export default class chargementP1 extends Phaser.Scene {
  // constructeur de la classe
  constructor() {
    super({
      key: "chargementP1" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }
  create() {
    // Create a video element dynamically
    this.videoElement = document.createElement('video');
    this.videoElement.src = 'src/assets/chargement.mp4';
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
  }

  update() {
    // Update logic if needed
  }

  onVideoEnded() {
    // Transition to the next scene
    console.log('passage de pagedelancement à selection')
    this.scene.switch("selection");
    this.videoElement.parentNode.removeChild(this.videoElement); 
    this.scene.stop();  }
}