const modalBg = document.querySelector("#modal-bg");
const bookInfo = document.querySelector("#book-info");
//pas de tiret en js, book info notre raccourci

//fonction fleché
modalBg.addEventListener("click", closeBook);

function openBook(bookName) {
  //modalBg.setAttribute("display", "flex") //setAttribute permet de changer une proprieté css (nom de l 'attribut et la valeur)
  const data = getBookData();
  console.log(data[bookName]);
  const title = document.querySelector("#book-info h3");
  const image = document.querySelector("#book-info img");
  const description = document.querySelector("#book-info p");
  console.log(title, image, description);
  title.textContent = data[bookName].title; //(data[bookName]); données de mon livre
  description.textContent = data[bookName].description; //(data[bookName]); données de mon livre
  image.setAttribute("src", data[bookName].image);
  image.setAttribute("alt", data[bookName].title);

  modalBg.classList.add("show"); // méthode pour ajouter une classe (au lieu de l'ajouter sur modalBg on le fait sur classlist)
  bookInfo.classList.add("show");
}

function closeBook() {
  modalBg.classList.remove("show");
  bookInfo.classList.remove("show");
}

function getBookData() {
  return {
    //clef valeur
    kubrick: {
      title: "Stanley Kubrick",
      image: "./images/inspiration/kubrick2.jpg",
      description: `I won't put any movie from Stanley Kubrick in my Top 10 favorite, still he is maybe 
      in my top 3 favorite director for his entire life's work, i loved eyes wide shut, Ai Artificial Intelligence, 2001 Space Odyssey,
      i have read all his interview, that clarity he has on his own work, and bridge he makes with 
      others langages (painting, music, chess...), disciplines amazed me...
      i have that book "The Stanley Kubrick Archives by Taschen that i bought for
       only 16 euros (a still) that i keep read  again and again, paradoxicaly 
      i think the integration of music in most of his movie could have been better, still 
      the way he talk about music separatly from Cinema is very interesting captivating."`, // " ` " pour gérer le multiligne
    },

    prince: {
      title: "Le Petit Prince",
      image: "./images/inspiration/exupery.jpg",
      description: `kid, my first school was "Ecole de Saint Exupery" everyone knows that book "le Petit prince"
      one of the most famous  book in the world, 93 pages, the story of that little blond guy crossing 
      the universe with that cheeky attitude, pretending that he doesnt understand a word of
      every character he crossed during his journey, i like to call him the little asshole because like 
      someone said once about Martha Argerich "Martha ne sait rien mais elle
      sait tout", i am not sure that i get all the meaning of that book but some passage had a big impression
      on me still now, the passage on rite, wheat fields, the same way they are related to the blond hair of the 
      the little boy, Saint Exupery and his book Le Petit Prince is related to that school full of (first) memories.`, // " ` " pour gérer le multiligne
    },

    argerich: {
      title: "Martha Argerich",
      image: "./images/inspiration/martita.jpg",
      description: `To make in short to me, she is maybe the Artist that went the furthest 
      in his craft, she is like the famous cartoon's character Obelix, to me unlike Asterix who need 
      drug to get his power, Obelix fall in the magic potion when he was kid and is always in that state 
      or longer than the ordinary mortal (like Lionel Messi, Mike Tyson we 'll 
      speak about that later) , she is the personn i admire the most, and the art that move me the most, 
      she represents something that has to do with my idea of  the absolute, she makes me wondering
      sometimes if i like Chopin or Martha playing Chopin? do i like Schumann or Martha playing Schumann? she is 
      the only interpretor that makes me doubt about that.`, // " ` " pour gérer le multiligne
    },

    parker: {
      title: "Charlie Parker",
      image: "./images/inspiration/parker.jpg",
      description: `i have never been really into jazz before my mid-20 i love the atmospehre of that
      but not really interested in the structure and the playing, Terrence Blanchards 's 25th hour atmosphere ost made a big impression on me
      but still wasn't enough to make me get deeper into that style and vision of music til the day i came a cross a short 20 min video of 
      Oscar Peterson showing the variety of jazz,  he mades a series of  kind of educationnal video in the way of Glenn Gould
       on his discipline and i must say that i start 
      to get obsess by him and by jazz in particular the swing but in reality it was neither jazz or swing
      but by Oscar Peterson (thanks to him i start to developp the sense of form and later that sens helps be to have another approach of Bach music) 
      that i develop a passion then later Nat cole , Bill Evans and....Charlie Parker...but to day
      i think i'm more into feeling than swing and who's best than Charlie Parker to incarnate that?`, // " ` " pour gérer le multiligne
    },

    zidane: {
      title: "Zinedine Zidane",
      image: "./images/inspiration/zidane.jpg",
      description: `To make in short to me, she is maybe the Artist that went the furthest 
      in his craft, she is like the famous cartoon's character Obelix, to me unlike Asterix who need 
      drug to get his power, Obelix fall in the magic potion when he was kid and is always in that state 
      or longer than the ordinary mortal (like Lionel Messi, Mike Tyson we 'll 
      speak about that later) , she is the personn i admire the most, and the art that move me the most, 
      she represents something that has to do with my idea of  theabsolute.`, // " ` " pour gérer le multiligne
    },

    duras: {
      title: "Marguerite Duras",
      image: "./images/inspiration/duras.jpg",
      description: `To make in short to me, she is maybe the Artist that went the furthest 
      in his craft, she is like the famous cartoon's character Obelix, to me unlike Asterix who need 
      drug to get his power, Obelix fall in the magic potion when he was kid and is always in that state 
      or longer than the ordinary mortal (like Lionel Messi, Mike Tyson we 'll 
      speak about that later) , she is the personn i admire the most, and the art that move me the most, 
      she represents something that has to do with my idea of  theabsolute.`, // " ` " pour gérer le multiligne
    },
    senna: {
      title: "Arton Senna",
      image: "./images/inspiration/senna.jpg",
      description: `To make in short to me, she is maybe the Artist that went the furthest 
      in his craft, she is like the famous cartoon's character Obelix, to me unlike Asterix who need 
      drug to get his power, Obelix fall in the magic potion when he was kid and is always in that state 
      or longer than the ordinary mortal (like Lionel Messi, Mike Tyson we 'll 
      speak about that later) , she is the personn i admire the most, and the art that move me the most, 
      she represents something that has to do with my idea of  theabsolute.`, // " ` " pour gérer le multiligne
    },
  };
}  
