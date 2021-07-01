const iframeElement = document.querySelector("iframe");
const iframeElementID = iframeElement.id;
const widget1 = SC.Widget(iframeElement); //viens de l'api voir arboressence a gauche qui va interagir avec soundcloud 
//const widget2 = SC.Widget(iframeElementID);
//commande D pour selectionner

//const playButton = document.querySelector("#play")

let soundList= [];
widget1.bind(SC.Widget.Events.READY, () => { //tout ce qui est widget vient de l'api.js
  console.log("ready");
  
  widget1.getSounds((list) => { //méthode provenant de l'api
    soundList = list;
    console.log(soundList);
  });
});

function playMusic() {
  widget1.play();
}



/* getVolume(callback) — returns the current volume, in the range of [0, 100].
getDuration(callback) — returns current sound duration in milliseconds.
getPosition(callback) — returns current sound position in milliseconds.
getSounds(callback) — returns the list of sound objects.
getCurrentSound(callback) — returns current sound object.
getCurrentSoundIndex(callback) — returns the index of current sound.
isPaused(callback) — whether the widget is paused. */
