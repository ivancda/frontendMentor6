//verificando a quantidade de list itens
let listItens = document.querySelectorAll("li");

//Update no contador de LI e chamando uma vez a função
function updateIL() {
  listItens = document.querySelectorAll("li");
  let listItensChecked = document.querySelectorAll(".checked")
  let rI = document.querySelectorAll(".removed")
  let screen = document.getElementById("itLeft")
  let left = (listItens.length - listItensChecked.length) - rI.length
  screen.innerText = `${left}`
}
updateIL()

//Criando os botões de remover para cada LI
for (let i = 0; i < listItens.length; i++) {
  let img = document.createElement("IMG")
  img.src = "images/icon-cross.svg"
  img.className = "close"
  listItens[i].appendChild(img)
}

//Funcionalidade do botão de remover, chamando uma vez
function atribuiClose(){
  let close = document.getElementsByClassName("close")
  for (let j = 0; j < close.length; j++) {
  close[j].onclick = function(){
    let div = this.parentElement;
    div.classList.add("removed")
    div.classList.remove("checked")
    updateIL()
  }     
}
}
atribuiClose()

//Implementando o clique para marcar os LI como checked
let fullList = document.querySelector('ul');
fullList.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    updateIL()
  }
});

//Evento para adicionar coisas na lista
let leInput = document.getElementById("inpt")
leInput.addEventListener('click', function(){
  if (leInput.value !== "") {
    let li = document.createElement("LI")
    li.textContent = leInput.value
    fullList.appendChild(li)
    let img = document.createElement("IMG")
    img.src = "images/icon-cross.svg"
    img.className = "close"
    li.appendChild(img)
    atribuiClose()
    leInput.value = ""
    updateIL()
    slist("elList")
  }
})

leInput.addEventListener('keypress', function(e){
  if (e.key === 'Enter') {
    let li = document.createElement("LI")
    li.textContent = leInput.value
    fullList.appendChild(li)
    let img = document.createElement("IMG")
    img.src = "images/icon-cross.svg"
    img.className = "close"
    li.appendChild(img)
    atribuiClose()
    leInput.value = ""
    updateIL()
    slist("elList")
  }
})

//Evento do botão de clear
let clrBttn = document.getElementById("clr")
clrBttn.addEventListener('click', function(){
  let chk = document.querySelectorAll(".checked")
  for (let k = 0; k < chk.length; k++) {
      chk[k].classList.add("removed")
      chk[k].classList.remove("checked")    
  }
  updateIL()
})

//Evento dos botões de visualização.
let showB = document.querySelectorAll(".showBox")[0]
showB.addEventListener('click', function(ev){
  let btns = document.getElementsByClassName("shBttn")
  for (let k = 0; k < btns.length; k++) btns[k].classList.remove("shBttnAct")  
  listItens = document.querySelectorAll("li")
  let lC = document.querySelectorAll(".checked")
  if (ev.target.classList.contains('all')) {
    ev.target.classList.add("shBttnAct")
    for (let i = 0; i < listItens.length; i++) 
      listItens[i].classList.remove('hidden')
    for (let j = 0; j < lC.length; j++) {
      lC[j].classList.remove('hidden')      
    }
  }
  else if (ev.target.classList.contains('active')) {
    ev.target.classList.add("shBttnAct")
    for (let i = 0; i < listItens.length; i++) 
      listItens[i].classList.remove('hidden')    
    for (let j = 0; j < lC.length; j++) {
      lC[j].classList.add('hidden')      
    }
  }
  else if (ev.target.classList.contains('compl')) {
    ev.target.classList.add("shBttnAct")
    for (let i = 0; i < listItens.length; i++) 
      listItens[i].classList.add('hidden')    
    for (let j = 0; j < lC.length; j++) {
      lC[j].classList.remove('hidden')      
    }
  }
})

let showBD = document.querySelectorAll(".showBoxDois")[0]
showBD.addEventListener('click', function(ev){
  let btns = document.getElementsByClassName("shBttn")
  for (let k = 0; k < btns.length; k++) btns[k].classList.remove("shBttnAct")  
  listItens = document.querySelectorAll("li")
  let lC = document.querySelectorAll(".checked")
  if (ev.target.classList.contains('all')) {
    ev.target.classList.add("shBttnAct")
    for (let i = 0; i < listItens.length; i++) 
      listItens[i].classList.remove('hidden')
    for (let j = 0; j < lC.length; j++) {
      lC[j].classList.remove('hidden')      
    }
  }
  else if (ev.target.classList.contains('active')) {
    ev.target.classList.add("shBttnAct")
    for (let i = 0; i < listItens.length; i++) 
      listItens[i].classList.remove('hidden')    
    for (let j = 0; j < lC.length; j++) {
      lC[j].classList.add('hidden')      
    }
  }
  else if (ev.target.classList.contains('compl')) {
    ev.target.classList.add("shBttnAct")
    for (let i = 0; i < listItens.length; i++) 
      listItens[i].classList.add('hidden')    
    for (let j = 0; j < lC.length; j++) {
      lC[j].classList.remove('hidden')      
    }
  }
})

//botao de troca de tema
let themeT = document.getElementsByClassName('thTog')[0]
themeT.addEventListener('click', function(){
  if (localStorage.getItem('theme') === 'theme-dark') {
    setTheme('theme-light');
} else {
    setTheme('theme-dark');
}
})
function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}



//drag and drop daqui https://code-boxx.com/drag-drop-sortable-list-javascript/
//
function slist (target) {
  // (A) GET LIST
  target = document.getElementById(target);
  target.classList.add("slist");

  // (B) MAKE ITEMS DRAGGABLE + SORTABLE
  var items = target.getElementsByTagName("li"), current = null;
  for (let i of items) {
    // (B1) ATTACH DRAGGABLE
    i.draggable = true;
    
    // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.addEventListener("dragstart", function (ev) {
      current = this;
      for (let it of items) {
        if (it != current) { it.classList.add("hint"); }
      }
    });
    
    // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.addEventListener("dragenter", function (ev) {
      if (this != current) { this.classList.add("active"); }
    });

    // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.addEventListener("dragleave", function () {
      this.classList.remove("active");
    });

    // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
    i.addEventListener("dragend", function () {
      for (let it of items) {
        it.classList.remove("hint");
        it.classList.remove("active");
      }
    });
 
    // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.addEventListener("dragover", function (evt) {
      evt.preventDefault();
    });
 
    // (B7) ON DROP - DO SOMETHING
    i.addEventListener("drop", function (evt) {
      evt.preventDefault();
      if (this != current) {
        let currentpos = 0, droppedpos = 0;
        for (let it=0; it<items.length; it++) {
          if (current == items[it]) { currentpos = it; }
          if (this == items[it]) { droppedpos = it; }
        }
        if (currentpos < droppedpos) {
          this.parentNode.insertBefore(current, this.nextSibling);
        } else {
          this.parentNode.insertBefore(current, this);
        }
      }
    });
  }
}
slist("elList")

