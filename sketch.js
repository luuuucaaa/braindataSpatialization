// assets
let filePath = './resources/MOCK_DATA.csv'; let data; let dataArray;
let hpilogo; let hpilogoScale = 0.2; let brain; let brainScale;

// audio
let volumeFactor = 4; let fade = 0.05;
let binauralTheta = []; let binauralAlpha = []; let binauralLobeta = []; let binauralHibeta = [];
let binauralThetaLuca1 = []; let binauralAlphaLuca1 = []; let binauralLobetaLuca1 = []; let binauralHibetaLuca1 = [];
let binauralThetaLukas1 = []; let binauralAlphaLukas1 = []; let binauralLobetaLukas1 = []; let binauralHibetaLukas1 = [];
let binauralThetaTim1 = []; let binauralAlphaTim1 = []; let binauralLobetaTim1 = []; let binauralHibetaTim1 = [];

// data processing
let frameIndex = 0; let frameThreshhold; let interpolationAmount;
var valueThetaNow = [0, 0, 0, 0, 0, 0]; var valueThetaPast = [0, 0, 0, 0, 0, 0]; var valueTheta = [0, 0, 0, 0, 0, 0]; let valueThetaBuffer = [0, 0, 0, 0, 0, 0];
var valueAlphaNow = [0, 0, 0, 0, 0, 0]; var valueAlphaPast = [0, 0, 0, 0, 0, 0]; var valueAlpha = [0, 0, 0, 0, 0, 0]; let valueAlphaBuffer = [0, 0, 0, 0, 0, 0];
var valueLobetaNow = [0, 0, 0, 0, 0, 0]; var valueLobetaPast = [0, 0, 0, 0, 0, 0]; var valueLobeta = [0, 0, 0, 0, 0, 0]; let valueLobetaBuffer = [0, 0, 0, 0, 0, 0];
var valueHibetaNow = [0, 0, 0, 0, 0, 0]; var valueHibetaPast = [0, 0, 0, 0, 0, 0]; var valueHibeta = [0, 0, 0, 0, 0, 0]; let valueHibetaBuffer = [0, 0, 0, 0, 0, 0];
var valueMean = [0, 0, 0, 0, 0, 0];

// electrodes
let electrodes = []; let number = 6; let diameter = 45;
let coordinates = [[4.1/10, 1/5], [5.9/10, 1/5], [3.5/10, 1/2], [6.5/10, 1/2], [3.9/10, 4/5], [6.1/10, 4/5]];

// gui
let font;
let startStopButton; let samplerateSlider;
let playing = false;
let muteAlphaButton; let muteHibetaButton; let muteLobetaButton; let muteThetaButton;
var muteTheta = false; var muteHibeta = false; var muteLobeta = false; var muteAlpha = false;
let soundset1Button; let soundset2Button; let soundset3Button;
var soundset1 = true; var soundset2 = false; var soundset3 = false;

function preload() {
  data = loadTable(filePath, 'csv', 'header');

  hpilogo = loadImage('resources/hpilogo.png');
  brain = loadImage('resources/brain3d.png');

  font = loadFont('resources/SourceCodePro-Medium.ttf')

  soundFormats('ogg', 'mp3', 'wav');
  // binauralThetaLuca1
  binauralThetaLuca1[0] = loadSound('resources/binauralAudioLuca1/thetaAm30.wav');
  binauralThetaLuca1[1] = loadSound('resources/binauralAudioLuca1/thetaA30.wav');
  binauralThetaLuca1[2] = loadSound('resources/binauralAudioLuca1/thetaAm90.wav');
  binauralThetaLuca1[3] = loadSound('resources/binauralAudioLuca1/thetaA90.wav');
  binauralThetaLuca1[4] = loadSound('resources/binauralAudioLuca1/thetaAm150.wav');
  binauralThetaLuca1[5] = loadSound('resources/binauralAudioLuca1/thetaA150.wav');

  binauralAlphaLuca1[0] = loadSound('resources/binauralAudioLuca1/alphaAm30.wav');
  binauralAlphaLuca1[1] = loadSound('resources/binauralAudioLuca1/alphaA30.wav');
  binauralAlphaLuca1[2] = loadSound('resources/binauralAudioLuca1/alphaAm90.wav');
  binauralAlphaLuca1[3] = loadSound('resources/binauralAudioLuca1/alphaA90.wav');
  binauralAlphaLuca1[4] = loadSound('resources/binauralAudioLuca1/alphaAm150.wav');
  binauralAlphaLuca1[5] = loadSound('resources/binauralAudioLuca1/alphaA150.wav');

  binauralLobetaLuca1[0] = loadSound('resources/binauralAudioLuca1/lobetaAm30.wav');
  binauralLobetaLuca1[1] = loadSound('resources/binauralAudioLuca1/lobetaA30.wav');
  binauralLobetaLuca1[2] = loadSound('resources/binauralAudioLuca1/lobetaAm90.wav');
  binauralLobetaLuca1[3] = loadSound('resources/binauralAudioLuca1/lobetaA90.wav');
  binauralLobetaLuca1[4] = loadSound('resources/binauralAudioLuca1/lobetaAm150.wav');
  binauralLobetaLuca1[5] = loadSound('resources/binauralAudioLuca1/lobetaA150.wav');

  binauralHibetaLuca1[0] = loadSound('resources/binauralAudioLuca1/hibetaAm30.wav');
  binauralHibetaLuca1[1] = loadSound('resources/binauralAudioLuca1/hibetaA30.wav');
  binauralHibetaLuca1[2] = loadSound('resources/binauralAudioLuca1/hibetaAm90.wav');
  binauralHibetaLuca1[3] = loadSound('resources/binauralAudioLuca1/hibetaA90.wav');
  binauralHibetaLuca1[4] = loadSound('resources/binauralAudioLuca1/hibetaAm150.wav');
  binauralHibetaLuca1[5] = loadSound('resources/binauralAudioLuca1/hibetaA150.wav');

  // binauralThetaLukas1
  binauralThetaLukas1[0] = loadSound('resources/binauralAudioLukas1/thetaAm30.wav');
  binauralThetaLukas1[1] = loadSound('resources/binauralAudioLukas1/thetaA30.wav');
  binauralThetaLukas1[2] = loadSound('resources/binauralAudioLukas1/thetaAm90.wav');
  binauralThetaLukas1[3] = loadSound('resources/binauralAudioLukas1/thetaA90.wav');
  binauralThetaLukas1[4] = loadSound('resources/binauralAudioLukas1/thetaAm150.wav');
  binauralThetaLukas1[5] = loadSound('resources/binauralAudioLukas1/thetaA150.wav');

  binauralAlphaLukas1[0] = loadSound('resources/binauralAudioLukas1/alphaAm30.wav');
  binauralAlphaLukas1[1] = loadSound('resources/binauralAudioLukas1/alphaA30.wav');
  binauralAlphaLukas1[2] = loadSound('resources/binauralAudioLukas1/alphaAm90.wav');
  binauralAlphaLukas1[3] = loadSound('resources/binauralAudioLukas1/alphaA90.wav');
  binauralAlphaLukas1[4] = loadSound('resources/binauralAudioLukas1/alphaAm150.wav');
  binauralAlphaLukas1[5] = loadSound('resources/binauralAudioLukas1/alphaA150.wav');

  binauralLobetaLukas1[0] = loadSound('resources/binauralAudioLukas1/lobetaAm30.wav');
  binauralLobetaLukas1[1] = loadSound('resources/binauralAudioLukas1/lobetaA30.wav');
  binauralLobetaLukas1[2] = loadSound('resources/binauralAudioLukas1/lobetaAm90.wav');
  binauralLobetaLukas1[3] = loadSound('resources/binauralAudioLukas1/lobetaA90.wav');
  binauralLobetaLukas1[4] = loadSound('resources/binauralAudioLukas1/lobetaAm150.wav');
  binauralLobetaLukas1[5] = loadSound('resources/binauralAudioLukas1/lobetaA150.wav');

  binauralHibetaLukas1[0] = loadSound('resources/binauralAudioLukas1/hibetaAm30.wav');
  binauralHibetaLukas1[1] = loadSound('resources/binauralAudioLukas1/hibetaA30.wav');
  binauralHibetaLukas1[2] = loadSound('resources/binauralAudioLukas1/hibetaAm90.wav');
  binauralHibetaLukas1[3] = loadSound('resources/binauralAudioLukas1/hibetaA90.wav');
  binauralHibetaLukas1[4] = loadSound('resources/binauralAudioLukas1/hibetaAm150.wav');
  binauralHibetaLukas1[5] = loadSound('resources/binauralAudioLukas1/hibetaA150.wav');

  // binauralThetaTim1
  binauralThetaTim1[0] = loadSound('resources/binauralAudioTim1/thetaAm30.wav');
  binauralThetaTim1[1] = loadSound('resources/binauralAudioTim1/thetaA30.wav');
  binauralThetaTim1[2] = loadSound('resources/binauralAudioTim1/thetaAm90.wav');
  binauralThetaTim1[3] = loadSound('resources/binauralAudioTim1/thetaA90.wav');
  binauralThetaTim1[4] = loadSound('resources/binauralAudioTim1/thetaAm150.wav');
  binauralThetaTim1[5] = loadSound('resources/binauralAudioTim1/thetaA150.wav');

  binauralAlphaTim1[0] = loadSound('resources/binauralAudioTim1/alphaAm30.wav');
  binauralAlphaTim1[1] = loadSound('resources/binauralAudioTim1/alphaA30.wav');
  binauralAlphaTim1[2] = loadSound('resources/binauralAudioTim1/alphaAm90.wav');
  binauralAlphaTim1[3] = loadSound('resources/binauralAudioTim1/alphaA90.wav');
  binauralAlphaTim1[4] = loadSound('resources/binauralAudioTim1/alphaAm150.wav');
  binauralAlphaTim1[5] = loadSound('resources/binauralAudioTim1/alphaA150.wav');

  binauralLobetaTim1[0] = loadSound('resources/binauralAudioTim1/lobetaAm30.wav');
  binauralLobetaTim1[1] = loadSound('resources/binauralAudioTim1/lobetaA30.wav');
  binauralLobetaTim1[2] = loadSound('resources/binauralAudioTim1/lobetaAm90.wav');
  binauralLobetaTim1[3] = loadSound('resources/binauralAudioTim1/lobetaA90.wav');
  binauralLobetaTim1[4] = loadSound('resources/binauralAudioTim1/lobetaAm150.wav');
  binauralLobetaTim1[5] = loadSound('resources/binauralAudioTim1/lobetaA150.wav');

  binauralHibetaTim1[0] = loadSound('resources/binauralAudioTim1/hibetaAm30.wav');
  binauralHibetaTim1[1] = loadSound('resources/binauralAudioTim1/hibetaA30.wav');
  binauralHibetaTim1[2] = loadSound('resources/binauralAudioTim1/hibetaAm90.wav');
  binauralHibetaTim1[3] = loadSound('resources/binauralAudioTim1/hibetaA90.wav');
  binauralHibetaTim1[4] = loadSound('resources/binauralAudioTim1/hibetaAm150.wav');
  binauralHibetaTim1[5] = loadSound('resources/binauralAudioTim1/hibetaA150.wav');
}

function setup() {
  dataArray = data.getArray();

  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  frameRate(30);
  displayButtons();
  displaySliders();

  // load default binaural soundset (soundset1)
  for (let i = 0; i < 6; i++) {
    binauralTheta[i] = binauralThetaLuca1[i];
    binauralAlpha[i] = binauralAlphaLuca1[i];
    binauralLobeta[i] = binauralLobetaLuca1[i];
    binauralHibeta[i] = binauralHibetaLuca1[i];
  }

  for (let i = 0; i < number; i++) {
    // create electrodes
    electrodes[i] = new Electrode(width * coordinates[i][0], height * coordinates[i][1], diameter);
    // set initial volume to 0
    binauralTheta[i].setVolume(0); binauralAlpha[i].setVolume(0); binauralLobeta[i].setVolume(0); binauralHibeta[i].setVolume(0);
  }
}

function draw() {
  background(0);
  image(hpilogo, width - 160, 90, hpilogoScale * hpilogo.width, hpilogoScale * hpilogo.height);
  brainScale = 0.00045 * width; image(brain, width/2, height/2, brainScale * brain.width, brainScale * brain.height);
  displayLEDs();

  // define frameThreshhold
  frameThreshhold = map(samplerateSlider.value(), 0, 100, 60, 15);
  interpolationAmount = map(samplerateSlider.value(), 0, 100, 1/40, 1/4.5);

  if (playing) {
    // load new data-samples
    if (frameCount > frameThreshhold) {
      for (let i = 0; i < number; i++) {
        //// THETA
        valueThetaPast[i] = valueThetaNow[i];
        valueThetaNow[i] = dataArray[frameIndex][0 + i];

        //// ALPHA
        valueAlphaPast[i] = valueAlphaNow[i];
        valueAlphaNow[i] = dataArray[frameIndex][6 + i];

        //// LOBETA
        valueLobetaPast[i] = valueLobetaNow[i];
        valueLobetaNow[i] = dataArray[frameIndex][12 + i];

        //// HIBETA
        valueHibetaPast[i] = valueHibetaNow[i];
        valueHibetaNow[i] = dataArray[frameIndex][18 + i];
      }

      frameIndex += 1;
      if (frameIndex > dataArray.length - 1) {
        frameIndex = 0;
        for (let i = 0; i < number; i++) {
          //// THETA
          valueThetaNow[i] = 0;

          //// ALPHA
          valueAlphaNow[i] = 0;

          //// LOBETA
          valueLobetaNow[i] = 0;

          //// HIBETA
          valueHibetaNow[i] = 0;
        }
        play();
      }

      frameCount = 0;
    }

    // display electrodes
    for (let i = 0; i < number; i++) {
      electrodes[i].display(playing);
    }

    for (let i = 0; i < number; i++) {
      //// THETA
      // linear interpolation for smooth transitions
      valueTheta[i] = lerp(valueThetaBuffer[i], valueThetaNow[i], interpolationAmount);
      valueThetaBuffer[i] = valueTheta[i];
      if (!muteTheta) {
        // change values
        electrodes[i].alphaTheta = map(valueTheta[i], 0, 100, 0, 255);
        binauralTheta[i].setVolume(pow(valueTheta[i], volumeFactor)/pow(100, volumeFactor), fade);
      } else {
        electrodes[i].alphaTheta = 0;
        binauralTheta[i].setVolume(0, fade);
      }

      //// ALPHA
      // linear interpolation for smooth transitions
      valueAlpha[i] = lerp(valueAlphaBuffer[i], valueAlphaNow[i], interpolationAmount);
      valueAlphaBuffer[i] = valueAlpha[i];
      if (!muteAlpha) {
        // change values
        electrodes[i].alphaAlpha = map(valueAlpha[i], 0, 100, 0, 255);
        binauralAlpha[i].setVolume(pow(valueAlpha[i], volumeFactor)/pow(100, volumeFactor), fade);
      } else {
        electrodes[i].alphaAlpha = 0;
        binauralAlpha[i].setVolume(0, fade);
      }

      //// LOBETA
      // linear interpolation for smooth transitions
      valueLobeta[i] = lerp(valueLobetaBuffer[i], valueLobetaNow[i], interpolationAmount);
      valueLobetaBuffer[i] = valueLobeta[i];
      if (!muteLobeta) {
        // change values
        electrodes[i].alphaLobeta = map(valueLobeta[i], 0, 100, 0, 255);
        binauralLobeta[i].setVolume(pow(valueLobeta[i], volumeFactor)/pow(100, volumeFactor), fade);
      } else {
        electrodes[i].alphaLobeta = 0;
        binauralLobeta[i].setVolume(0, fade);
      }

      //// HIBETA
      // linear interpolation for smooth transitions
      valueHibeta[i] = lerp(valueHibetaBuffer[i], valueHibetaNow[i], interpolationAmount);
      valueHibetaBuffer[i] = valueHibeta[i];
      if (!muteHibeta) {
        // change values
        electrodes[i].alphaHibeta = map(valueHibeta[i], 0, 100, 0, 255);
        binauralHibeta[i].setVolume(pow(valueHibeta[i], volumeFactor)/pow(100, volumeFactor), fade);
      } else {
        electrodes[i].alphaHibeta = 0;
        binauralHibeta[i].setVolume(0, fade);
      }

      //// MEAN
      // change diameter of electrodes
      valueMean[i] = (valueTheta[i] + valueAlpha[i] + valueLobeta[i] + valueHibeta[i])/4;
      electrodes[i].diameter = map(valueMean[i], 0, 100, 1, diameter);
    }
  }
}

function displayButtons() {
  startStopButton = createButton('Start/Stop');
  startStopButton.style('width', '130px');
  startStopButton.position(15, 15);
  startStopButton.mousePressed(play);

  muteThetaButton = createButton('Theta');
  muteThetaButton.style('width', '130px');
  muteThetaButton.position(15, 90);
  muteThetaButton.mousePressed(mutingTheta);

  muteAlphaButton = createButton('Alpha');
  muteAlphaButton.style('width', '130px');
  muteAlphaButton.position(15, 120);
  muteAlphaButton.mousePressed(mutingAlpha);

  muteLobetaButton = createButton('Lobeta');
  muteLobetaButton.style('width', '130px');
  muteLobetaButton.position(15, 150);
  muteLobetaButton.mousePressed(mutingLobeta);

  muteHibetaButton = createButton('Hibeta');
  muteHibetaButton.style('width', '130px');
  muteHibetaButton.position(15, 180);
  muteHibetaButton.mousePressed(mutingHibeta);

  soundset1Button = createButton('Soundset 1');
  soundset1Button.style('width', '130px');
  soundset1Button.position(15, 255);
  soundset1Button.mousePressed(playingSoundset1);

  soundset2Button = createButton('Soundset 2');
  soundset2Button.style('width', '130px');
  soundset2Button.position(15, 285);
  soundset2Button.mousePressed(playingSoundset2);

  soundset3Button = createButton('Soundset 3');
  soundset3Button.style('width', '130px');
  soundset3Button.position(15, 315);
  soundset3Button.mousePressed(playingSoundset3);
}

function displaySliders() {
  samplerateSlider = createSlider(0, 100, 50);
  samplerateSlider.position(202, 15);
  samplerateSlider.style('width', '100px');
  samplerateSlider.style('color', 'red');
}

function play() {
  if (!playing) {
    playing = true;
    for (let i = 0; i < number; i++) {
      binauralTheta[i].loop(); binauralAlpha[i].loop(); binauralLobeta[i].loop(); binauralHibeta[i].loop();
    }
  } else {
    playing = false;
    for (let i = 0; i < number; i++) {
      binauralTheta[i].stop(); binauralAlpha[i].stop(); binauralLobeta[i].stop(); binauralHibeta[i].stop();
    }
  }
}

function mutingTheta() {
 if (!muteTheta) {
   muteTheta = true;
 } else {
   muteTheta = false;
 }
}

function mutingAlpha() {
  if (!muteAlpha) {
    muteAlpha = true;
  } else {
    muteAlpha = false;
  }
}

function mutingHibeta() {
  if (!muteHibeta) {
    muteHibeta = true;
  } else {
    muteHibeta = false;
  }
}

function mutingLobeta() {
  if (!muteLobeta) {
    muteLobeta = true;
  } else {
    muteLobeta = false;
  }
}

function playingSoundset1() {
  if (!soundset1) {
    if (playing) {
      play();
      for (let i = 0; i < 6; i++) {
        binauralTheta[i] = binauralThetaLuca1[i];
        binauralAlpha[i] = binauralAlphaLuca1[i];
        binauralLobeta[i] = binauralLobetaLuca1[i];
        binauralHibeta[i] = binauralHibetaLuca1[i];
        if (muteTheta) { binauralTheta[i].setVolume(0); }
        if (muteAlpha) { binauralAlpha[i].setVolume(0); }
        if (muteLobeta) { binauralLobeta[i].setVolume(0); }
        if (muteHibeta) { binauralHibeta[i].setVolume(0); }
      }
      play();
    } else {
      for (let i = 0; i < 6; i++) {
        binauralTheta[i] = binauralThetaLuca1[i];
        binauralAlpha[i] = binauralAlphaLuca1[i];
        binauralLobeta[i] = binauralLobetaLuca1[i];
        binauralHibeta[i] = binauralHibetaLuca1[i];
      }
      for (let i = 0; i < number; i++) {
        // set initial volume to 0
        binauralTheta[i].setVolume(0); binauralAlpha[i].setVolume(0); binauralLobeta[i].setVolume(0); binauralHibeta[i].setVolume(0);
      }
    }
  }
  soundset1 = true;
  soundset2 = false;
  soundset3 = false;
}

function playingSoundset2() {
  if (!soundset2) {
    if (playing) {
      play();
      for (let i = 0; i < 6; i++) {
        binauralTheta[i] = binauralThetaLukas1[i];
        binauralAlpha[i] = binauralAlphaLukas1[i];
        binauralLobeta[i] = binauralLobetaLukas1[i];
        binauralHibeta[i] = binauralHibetaLukas1[i];
        if (muteTheta) { binauralTheta[i].setVolume(0); }
        if (muteAlpha) { binauralAlpha[i].setVolume(0); }
        if (muteLobeta) { binauralLobeta[i].setVolume(0); }
        if (muteHibeta) { binauralHibeta[i].setVolume(0); }
      }
      play();
    } else {
      for (let i = 0; i < 6; i++) {
        binauralTheta[i] = binauralThetaLukas1[i];
        binauralAlpha[i] = binauralAlphaLukas1[i];
        binauralLobeta[i] = binauralLobetaLukas1[i];
        binauralHibeta[i] = binauralHibetaLukas1[i];
      }
      for (let i = 0; i < number; i++) {
        // set initial volume to 0
        binauralTheta[i].setVolume(0); binauralAlpha[i].setVolume(0); binauralLobeta[i].setVolume(0); binauralHibeta[i].setVolume(0);
      }
    }
  }
  soundset1 = false;
  soundset2 = true;
  soundset3 = false;
}

function playingSoundset3() {
  if (!soundset3) {
    if (playing) {
      play();
      for (let i = 0; i < 6; i++) {
        binauralTheta[i] = binauralThetaTim1[i];
        binauralAlpha[i] = binauralAlphaTim1[i];
        binauralLobeta[i] = binauralLobetaTim1[i];
        binauralHibeta[i] = binauralHibetaTim1[i];
        if (muteTheta) { binauralTheta[i].setVolume(0); }
        if (muteAlpha) { binauralAlpha[i].setVolume(0); }
        if (muteLobeta) { binauralLobeta[i].setVolume(0); }
        if (muteHibeta) { binauralHibeta[i].setVolume(0); }
      }
      play();
    } else {
      for (let i = 0; i < 6; i++) {
        binauralTheta[i] = binauralThetaTim1[i];
        binauralAlpha[i] = binauralAlphaTim1[i];
        binauralLobeta[i] = binauralLobetaTim1[i];
        binauralHibeta[i] = binauralHibetaTim1[i];
      }
      for (let i = 0; i < number; i++) {
        // set initial volume to 0
        binauralTheta[i].setVolume(0); binauralAlpha[i].setVolume(0); binauralLobeta[i].setVolume(0); binauralHibeta[i].setVolume(0);
      }
    }
  }
  soundset1 = false;
  soundset2 = false;
  soundset3 = true;
}

function displayLEDs() {
  noFill();
  if (!muteTheta) {
    // theta circle on
    stroke(0, 122, 158); strokeWeight(5); circle(155, 50, 104);
  } else {
    // theta circle off
    stroke(0, 122, 158, 90); strokeWeight(3); circle(155, 50, 104);
  }

  if (!muteAlpha) {
    // alpha circle on
    stroke(177, 6, 58); strokeWeight(5); circle(155, 50, 164);
  } else {
    // alpha circle off
    stroke(177, 6, 58, 90); strokeWeight(3); circle(155, 50, 164);
  }

  if (!muteLobeta) {
    // lobeta circle on
    stroke(221, 97, 8); strokeWeight(5); circle(155, 50, 224);
  } else {
    // lobeta circle off
    stroke(221, 97, 8, 90); strokeWeight(3); circle(155, 50, 224);
  }

  if (!muteHibeta) {
    // hibeta circle on
    stroke(246, 168, 0); strokeWeight(5); circle(155, 50, 284);
  } else {
    // hibeta circle off
    stroke(246, 168, 0, 90); strokeWeight(3); circle(155, 50, 284);
  }

  if (soundset1) {
    // soundset1 on
    stroke(0, 122, 158); strokeWeight(5); line(155, 267, 170, 267);
  } else {
    // soundset1 off
    stroke(0, 122, 158, 90); strokeWeight(3); line(155, 267, 170, 267);
  }

  if (soundset2) {
    // soundset2 on
    stroke(0, 122, 158); strokeWeight(5); line(155, 297, 170, 297);
  } else {
    // soundset2 off
    stroke(0, 122, 158, 90); strokeWeight(3); line(155, 297, 170, 297);
  }

  if (soundset3) {
    // soundset3 on
    stroke(0, 122, 158); strokeWeight(5); line(155, 327, 170, 327);
  } else {
    // soundset3 off
    stroke(0, 122, 158, 90); strokeWeight(3); line(155, 327, 170, 327);
  }

  // black square left
  noStroke(); fill(0); rect(0, 0, 155, 500);
  // black square above
  rect(0, 0, 500, 50);

  textSize(16);
  textFont(font);
  fill(255, 255, 255);
  text('slow', 157, 31);
  text('fast', 316, 31);
}
