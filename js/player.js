const iframeElement = document.querySelector("iframe");
const widget = SC.Widget(iframeElement); //viens de l'api voir arboressence a gauche qui va interagir avec soundcloud
//commande D pour selectionner
const listDiv = document.querySelector(".tracklist");
const progressBar = document.querySelector("#progress");
const playButton = document.querySelector("#play");
const playButtonInner = document.querySelector("#play .inner-circle");

let soundList = [];
let trackIndex = 0;

//initialisation du composant Soundcloud
widget.bind(SC.Widget.Events.READY, () => { //fonction anonyme tu met fonction a la place de () meme chose, on utilise ca 
  //pour les callback pour raccourir le code et plus expressif la fleche nous donne l'idee d un truc qui va se porduire un effet
  //tout ce qui est widget vient de l'api.js

  //obtention des données des pistes
  widget.getSounds((list) => {
    //méthode provenant de l'api
    soundList = list;
    //création des éléments pour la liste
    soundList.forEach((sound, index) => {
      //for each permet de prendre a la fois la piste et l'index ce que ne permet pas le for of (besoin de creer une variable etc)
      createTrack(sound, index);
    });
    setTrackIndex(0); //selectionner automatiquement la premiere piste
    resetProgressBar(); //initialiser la barre de progression en fonction de la premiere piste
  });
});

widget.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
  setProgressFromWidget();
});

function setProgressFromWidget() {
  //met a jour la barre à partir du lecteur Soundcloud
  widget.getPosition((position) => {
    progressBar.value = position;
  });
}

function setProgressFromInput(ms) {
  //met a jour la barre manuellement
  widget.seekTo(ms);
}

function togglePlay() {
  widget.isPaused((bool) => {
    if (bool) {
      widget.play();
      setPlayButtonIcon(true);
    } else {
      widget.pause();
      setPlayButtonIcon(false);
    }
  });
}

function setPlayButtonIcon(isPlaying) {
  if (isPlaying) {
    playButtonInner.innerHTML = "<i class='fas fa-pause'></i>";
    playButton.classList.add("playing");
  } else {
    playButtonInner.innerHTML = "<i class='fas fa-play'></i>";
    playButton.classList.remove("playing");
  }
}

function setTrackIndex(newIndex) {
  trackIndex = newIndex;
  widget.getCurrentSoundIndex((currentindex) => {
    const tracks = listDiv.children;
    tracks.item(currentindex).classList.remove("selected");
    tracks.item(newIndex).classList.add("selected");
  });
}

function changeTrack(e, index) {
  setTrackIndex(index);
  widget.getCurrentSoundIndex((currentindex) => {
    const diff = Math.abs(currentindex - index);
    if (index > currentindex) {
      //si celui qu'on veut choisir est > que celui qu'on est ene train de jouer
      for (let i = 0; i < diff; i++) {
        widget.next();
      }
    } else {
      for (let i = 0; i < diff; i++) {
        widget.prev();
      }
    }
    widget.seekTo(0); //force la reinitialisation de la piste a 0 au lieu de reprendre a l endroit de la denriere lecture
    resetProgressBar(); //reinitialiser la barre de progression
  });
}

function resetProgressBar() {
  widget.getCurrentSound((sound) => {
    progressBar.setAttribute("max", sound.duration);
    setProgressFromWidget(); //appel pour forcer le refresh de la barre
  });
}

function createTrack(sound, index) {
  const element = document.createElement("div");
  element.classList.add("track");

  const title = document.createElement("p");
  title.classList.add("track-title");
  title.textContent = sound.title;
  element.appendChild(title);

  const duration = document.createElement("p");
  duration.classList.add("track-duration");
  duration.textContent = getDisplayTime(sound.duration); //convertisseur ms en minute
  element.appendChild(duration);

  element.addEventListener("click", (e) => changeTrack(e, index));

  listDiv.appendChild(element);
}

function getDisplayTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  let hour = Math.floor(totalSec / (60 * 60));
  let min = Math.floor(totalSec / 60) % 60;
  let sec = totalSec % 60;
  let str = "";
  if (hour > 0) {
    if (hour < 10) hour = "0" + hour;
    str += hour + ":";
  }
  if (min < 10) min = "0" + min;
  str += min + ":";

  if (sec < 10) sec = "0" + sec;
  str += sec;

  return str;
  //return [hour, min, sec].join(":");
  //join creer une chaine de caractere avec separateur
}

/* getVolume(callback) — returns the current volume, in the range of [0, 100].
getDuration(callback) — returns current sound duration in milliseconds.
getPosition(callback) — returns current sound position in milliseconds.
getSounds(callback) — returns the list of sound objects.
getCurrentSound(callback) — returns current sound object.
getCurrentSoundIndex(callback) — returns the index of current sound.
isPaused(callback) — whether the widget is paused. */

/* durée, volume, barre de progression état
 */
