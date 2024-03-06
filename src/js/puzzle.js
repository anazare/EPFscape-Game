import * as fct from "/src/js/fonctions.js";
const IMAGE_KEY = "img_chimie";
export default class Puzzle extends Phaser.Scene {

  rows = 2;
  cols = 2;
  puzzleImages = [];
  isPuzzleSolved = false;

  // constructeur de la classe
  constructor() {
    super({
      key: "puzzle" //  ici on précise le nom de la classe en tant qu'identifiant
    });
  }

  preload() {
    this.load.image(IMAGE_KEY, "src/assets/fondchimie.jpg");
    this.load.image("image1", "src/assets/image1.png");
    this.load.image("image2", "src/assets/image2.png");
    this.load.image("image3", "src/assets/image3.png");
    this.load.image("image4", "src/assets/image4.png");
    this.load.image("image5", "src/assets/pngegg.png");
    


    
  }

  create() {
    this.add.image(400, 300, IMAGE_KEY).setScale(1.25)
    this.add.image(405, 310, "image5").setScale(1.75).setAlpha(0.2);
    this.puzzleImages.push(this.add.image(600, 200, "image1").setDisplaySize(300, 200));
    this.puzzleImages.push(this.add.image(200, 200, "image2").setDisplaySize(300, 200));
    this.puzzleImages.push(this.add.image(400, 500, "image3").setDisplaySize(300, 200));
    this.puzzleImages.push(this.add.image(175, 500, "image4").setDisplaySize(300, 200));

   
    // Ajoutez des gestionnaires d'événements pour chaque image
    this.puzzleImages.forEach((image) => {
      image.setInteractive();
      this.input.setDraggable(image);

      image.on('drag', (pointer, dragX, dragY) => {
        image.x = dragX;
        image.y = dragY;
        this.checkPuzzleSolved(); // Vérifiez après chaque déplacement
      });

      image.on('dragend', () => {
        console.log(`Image position - X: ${image.x}, Y: ${image.y}`);
      });
    });
  


  }

  update() {}

  trackCursorPosition() {
    this.input.on('pointermove', (pointer) => {
      const x = pointer.x;
      const y = pointer.y;

    });
  }

  checkPuzzleSolved() {
    const image1 = this.puzzleImages[0];
    const image2 = this.puzzleImages[1];
    const image3 = this.puzzleImages[2];
    const image4 = this.puzzleImages[3];
  
    const tolerance = 12;
  
    const isImage1InTargetArea = (
      Math.abs(image1.x - 250) < tolerance &&
      Math.abs(image1.y - 213) < tolerance
    );
  
    const isImage2InTargetArea = (
      Math.abs(image2.x - 550) < tolerance &&
      Math.abs(image2.y - 213) < tolerance
    );
  
    const isImage3InTargetArea = (
      Math.abs(image3.x - 248) < tolerance &&
      Math.abs(image3.y - 404) < tolerance
    );
  
    const isImage4InTargetArea = (
      Math.abs(image4.x - 548) < tolerance &&
      Math.abs(image4.y - 406) < tolerance
    );
  
    if (
      isImage1InTargetArea &&
      isImage2InTargetArea &&
      isImage3InTargetArea &&
      isImage4InTargetArea
    ) {
      this.scene.switch("videoggP1")
      this.isPuzzleSolved = true;
    }
  }
}



