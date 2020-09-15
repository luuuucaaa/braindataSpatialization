class Electrode{
  constructor(posX, posY, diameter) {
    this.posX = posX;
    this.posY = posY;
    this.diameter = diameter;
    this.alphaTheta = 0;
    this.alphaAlpha = 0;
    this.alphaLobeta = 0;
    this.alphaHibeta = 0;
  }

  display(playing) {
    this.playing = playing;
    if (this.playing) {
      noFill();
      // theta circle
      stroke(0, 122, 158, this.alphaTheta);
      strokeWeight(7);
      circle(this.posX, this.posY, this.diameter);
      // alpha circle
      stroke(177, 6, 58, this.alphaAlpha);
      strokeWeight(6);
      circle(this.posX, this.posY, this.diameter * 4);
      // lobeta circle
      stroke(221, 97, 8, this.alphaLobeta);
      strokeWeight(5);
      circle(this.posX, this.posY, this.diameter * 7);
      // hibeta circle
      stroke(246, 168, 0, this.alphaHibeta);
      strokeWeight(4);
      circle(this.posX, this.posY, this.diameter * 10);
    }
  }
}
