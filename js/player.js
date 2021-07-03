const iframeElement = document.querySelector("iframe");
const iframeElementID = iframeElement.id;
const widget1 = SC.Widget(iframeElement); //viens de l'api voir arboressence a gauche qui va interagir avec soundcloud
//const widget2 = SC.Widget(iframeElementID);
//commande D pour selectionner
console.log(widget1);
const progressBar = document.querySelector("#progress");
 

//const playButton = document.querySelector("#play")

let soundList = [];

//initialisation du composant Soundcloud
widget1.bind(SC.Widget.Events.READY, () => {
  //tout ce qui est widget vient de l'api.js

  //obtention des données des pistes
  widget1.getSounds((list) => {
    //méthode provenant de l'api
    soundList = list;
    //création des éléments pour la liste
    //for (const sound of soundList) {

    // }

    soundList.forEach((sound, index) => {
      //for each permet de prendre a la fois la piste et l'index ce que ne permet pas le for of (besoin de creer une variable etc)
      createTrack(sound, index);
    });
  });
});
widget1.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
 
  widget1.getPosition((position)=>{
    progressBar.setAttribute("value",position);
  });
});
function createTrack(sound, index) {
  console.log(sound);
  const listDiv = document.querySelector(".tracklist");

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

  element.addEventListener("click", () => {
    widget1.getCurrentSoundIndex((currentindex) => {
      const diff = Math.abs(currentindex - index);
      if (index > currentindex) {
        //si celui qu'on veut choisir est > que celui qu'on est ene train de jouer
        for (let i = 0; i < diff; i++) {
          widget1.next();
        }
      } else {
        for (let i = 0; i < diff; i++) {
          widget1.prev();
        }
      }
      playMusic();
    });
  });

  listDiv.appendChild(element);
}

function playMusic() {
;
  
  
  widget1.getCurrentSound((sound)=>{
    progressBar.setAttribute("value", 0);
  progressBar.setAttribute("min", 0);
    progressBar.setAttribute("max", sound.duration); 
    setPosition(0)
    widget1.play();
    widget1.getPosition((position)=>{
     console.log(position);
    });
    
  });
 

}
function setPosition(ms) {
widget1.seekTo(ms)
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
