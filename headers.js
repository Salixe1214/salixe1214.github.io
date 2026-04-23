let menu_els = {
  'Accueil': "/index.html",
  'Wordle': "/aideWordle.html",
  'Anime': "/animePicker.html",
  'Portfolio': "/portfolio.html",
  'Wood Calculator': "/woodCalculator.html",
  'Jeu': "/game/game.html",
  'Jeu 2': "/game2/game2.html"
};
let head_el = document.getElementById("headers");

dictList = (dict) => {
  for(let item in dict) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = dict[item];
    if(document.baseURI.split('/').at(-1) === dict[item].split('/').at(-1)){
      a.className = "active";
    } else if (document.baseURI.split('/').at(-1) === "" && item === "Accueil"){
      a.className = "active";
    } else {
      a.className = "menu";
    };
    a.textContent = item;
    li.appendChild(a);
    li.className = "menu"
    head_el.appendChild(li)
  };
}

dictList(menu_els);