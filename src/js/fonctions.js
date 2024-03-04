export function doNothing() {
    // cette fonction ne fait rien.
    // c'est juste un exemple pour voir comment mettre une fonction
    // dans un fichier et l'utiliser dans les autres
}


export function doAlsoNothing() {
    // cette fonction ne fait rien non plus.
}

export function afficherTexteLettreParLettre() {
    const texteComplet = "Bonjour jeune peufien,\n\nJe suis ton responsable pédagogique.\n\nIl te manque malheureusement 8 crédits\n\npour valider le semestre.Tu dois te rendre\n\ndans les salles M01,M02 et M03 à la\n\nrencontre de tes professeurs pour discuter\n\nde ton cas.\n\n\n                                                                                                  Bonne chance !!!";
    let textePartiel = "";
    let indexLettre = 0;

    this.time.addEvent({
        repeat: texteComplet.length - 1,
        delay: 50,
        callback: function () {
            textePartiel += texteComplet[indexLettre];
            livreTexte.setText(textePartiel);
            indexLettre++;
        },
        callbackScope: this,
    });
  }
