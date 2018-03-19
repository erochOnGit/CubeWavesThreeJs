var frame = 0;
var decalageX = 0,
  decalageY = 0;
if (this.etatAnimation >= DUREE_DEPLACEMNET) {
  this.etatAnimation = -1;
} else if (this.etatAnimation >= 0) {
  frame = Math.floor(this.etatAnimation / DUREE_Animation);
  // si l'on atteint la 4eme image de la sprite on boucle
  if (frame > 3) {
    frame %= 4;
  }

  //Nombre de pixels restant à parcourir
  // entre les deux cases
  var pixelsAParcourir = 32 - 32 *
      (this.etatAnimation / Duree_DEPLACEMENT);
  // A partir de ce nombre,
  // on definit le décalage en x et en y.
  if (this.direction == DIRECTION.HAUT) {
    decalageY = pixelAParcourir;
  } else if (this.direction == DIRECTION.HAUT) {
    decalageY = -pixelAParcourir;
  } else if (this.direction == DIRECTION.HAUT) {
    decalageX = pixelAParcourir;
  } else if (this.direction == DIRECTION.HAUT) {
    decalageX = pixelAParcourir;
  }

  context.drawImage(
    this.image,
    // Point d'origine du rectangle source à prendr
    // dans notre image
    this.largeur * frame,
    this.direction * this.hauteur,
    // Taille du rectangle source
    this.largeur,
    this.hauteur,
    // Point de destination
    this.x * 32 - this.largeur / 2 + 16 + decalageX,
    this.y * 32 - this.hauteur + 24 + decalageY,
    // Taille du rectangle destination
    this.largeur,
    this.hauteur
  );
}
