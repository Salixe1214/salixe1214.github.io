let menu_els = {
  'Le principal': "main_shop.html",
  'El deuxieme': "second_shop.html"
};
let head_el = document.getElementById("headers");

dictList = (dict) => {
  for(let item in dict) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.href = dict[item];
    if(document.baseURI.split('/').at(-1) === dict[item]){
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