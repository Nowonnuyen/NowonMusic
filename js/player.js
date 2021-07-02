const iframeElement = document.querySelector("iframe");
const iframeElementID = iframeElement.id;
const widget1 = SC.Widget(iframeElement); //viens de l'api voir arboressence a gauche qui va interagir avec soundcloud
//const widget2 = SC.Widget(iframeElementID);
//commande D pour selectionner
console.log(widget1);

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
  duration.textContent = sound.duration;
  element.appendChild(duration);

  element.addEventListener("click", () => {
    console.log("click", sound.title);
    widget1.getCurrentSoundIndex((currentindex) => {
      console.log(currentindex, index);
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
      widget1.play();
    });
  });

  listDiv.appendChild(element);
}

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

/* durée, volume, barre de progression état
 */


