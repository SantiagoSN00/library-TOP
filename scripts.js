
MyStorage = window.localStorage

let misJuegos = new Collection('Juegos Santi')



let vistaJuegos = document.querySelectorAll('.texto-oculto')
vistaJuegos.forEach(element => {
    element.addEventListener('mouseenter',function(e){
        e.target.classList.toggle('texto-oculto')
        e.target.classList.toggle('imagebg')
        e.target.classList.toggle('texto-visible')
        e.target.classList.toggle('setAtTop')

    })
    element.addEventListener('mouseleave',function(e){
        e.target.classList.toggle('texto-oculto')
        e.target.classList.toggle('imagebg')
        e.target.classList.toggle('texto-visible')
        e.target.classList.toggle('setAtTop')
    })
})

let formulario = document.querySelector('.escondido')
let add = document.getElementById('addGame')
add.addEventListener("click",function(){
    formulario.classList.toggle('escondido')
})
let closeForm = document.querySelector('.close')
closeForm.addEventListener("click",function(){
    formulario.classList.toggle('escondido')
})

/*
let link = document.getElementById('source').value
let juegoTitulo = document.getElementById('titulo').value
let juegoDesarrolladora = document.getElementById('desarrolladora')
let juegoGenero = document.getElementById('genero')
let juegoPrecio = document.getElementById('precio')
let juegoGanado = document.getElementById('ganado')
*/
let formularioJuego = document.querySelector('#formaJuegoNuevo')
formularioJuego.addEventListener('submit',getInputs)

function getInputs(){
    
    var formData = new FormData(formularioJuego)
    let link = formData.get('link')+'---'+formData.get('titulo')+'---'+formData.get('desarrolladora')+'---'+formData.get('genero')+'---'+formData.get('precio')+'---'+formData.get('ganado');
    let valores = link.split('---')
    alert(valores)


    let juego = new Game(valores[0],valores[1],valores[2],valores[3],valores[4],valores[5])
    misJuegos.addGame(juego)
}





/*
<div class="row-flex">
                <div class="texto-oculto imagebg">
                    <div class="descrip">TITULO: </div>
                    <div class="descrip">EMPRESA: </div>
                    <div class="descrip">GENERO:</div>
                    <div class="descrip">PRECIO:</div>
                    <div class="descrip">
                        <img class="delete" src="./resources/icons/Substract.png" alt="Delete">
                        <p class="centro">COMPLETADO</p>
                        <img class="edit" src="./resources/icons/Settings.png" alt="Edit">
                    </div>
                </div>
            </div>
*/




function addGameHTML(game){
    let container = document.querySelector('.exposicion');
    let juego = document.createElement('div');
    juego.classList.add('row-flex')

    let a = document.createElement('div');
    let b = document.createElement('div');
    let c = document.createElement('div');
    let d = document.createElement('div');
    let e = document.createElement('div');
    let f = document.createElement('div');
    let g = document.createElement('div');

    let imgA = document.createElement('img')
    let p = document.createElement('p')
    let imgB = document.createElement('img')
    
    if(typeof(game.portada)==='string' && game.portada.length>10){
    a.setAttribute('style',`background-image:url("${game.portada}"); background-size:cover;`)
    a.classList.add('texto-oculto')
    a.classList.add('setAtTop')
    } else {
        a.classList.add('texto-visible')
    }
    

    b.innerHTML = `<div class="">TITULO: ${game.titulo} </div>`
    b.classList.add('descrip');
    
    c.innerHTML = `<div class="">EMPRESA: ${game.desarrolladora}</div>`
    c.classList.add('descrip');
    c.setAttribute('style','padding-left:20px')
    
    d.innerHTML = `<div class="">GENERO: ${game.genero}</div>`
    d.classList.add('descrip');
    
    e.innerHTML = `<div class="">PRECIO: ${game.precio}$</div>`
    e.classList.add('descrip');

    f.classList.add('descrip');

    imgA.innerHTML = `<img class="" >`
    imgA.classList.add('delete');
    imgA.setAttribute('style','background-image: url("./resources/icons/Substract.png")')

    p.innerHTML = ` <p class="">COMPLETADO</p>`
    p.classList.add('centro')

    imgB.innerHTML = `<img class="" >`
    imgB.classList.add('edit')
    imgB.setAttribute('style','background-image:url("./resources/icons/Settings.png")')

    f.append(imgA)
    f.append(p)
    f.append(imgB)

    a.append(g)
    a.append(b)
    a.append(c)
    a.append(d)
    a.append(e)
    a.append(f)
    juego.append(a)
    console.log(juego)
    container.append(juego)


    

let vistaJuegos = document.querySelectorAll('.texto-oculto')
vistaJuegos.forEach(element => {
    element.addEventListener('mouseenter',function(e){
        console.log(e.target.children[1].children[0].innerHTML)
        let titulo = e.target.children[1].children[0].innerHTML.slice(8,-1)
        console.log(titulo)
        e.target.classList.remove('texto-oculto')
        e.target.classList.add('texto-visible')
        e.target.setAttribute('style',`background-image: linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)), url("${misJuegos.getPortada(titulo)}");`)
        e.target.classList.remove('setAtTop')

    })
    element.addEventListener('mouseleave',function(e){
        let titulo = e.target.children[1].children[0].innerHTML.slice(8,-1)
        e.target.classList.add('texto-oculto')
        e.target.setAttribute('style',`background-image: url("${misJuegos.getPortada(titulo)}");background-size:cover`)
        e.target.classList.remove('texto-visible')
        e.target.classList.add('setAtTop')
    })
})
        container.prepend(juego)
    }







function recreateGames (){
    local = Object.keys(MyStorage)
    storage = []

    for(let j in local){
        console.log(MyStorage[local[j]])
        let x = JSON.parse(MyStorage[local[j]])

        x= new Game(x.portada,x.titulo,x.desarrolladora,x.genero,x.precio,x.ganado);
        storage.push(x)
    
}
    return storage;
}

function Collection(nombre){

    this.name = nombre
    this.storage = recreateGames();
    Collection.prototype.addGame = function(game){

        if(!JSON.parse(MyStorage.getItem(game.titulo))){
            MyStorage.setItem(game.titulo, JSON.stringify(game))
            this.storage = recreateGames(JSON.parse(MyStorage.getItem(game.titulo)))
        }
        else {
            alert("El juego ya existe en la coleccion!");
            return "ERROR, el juego ya existe en la coleccion"
        }
        this.showCollection();
    }
    Collection.prototype.getPortada = function(title){
        for(x of this.storage){
            if(x.titulo === title) return x.portada
        }
    }

    Collection.prototype.showCollection = function(){
        return JSON.parse(MyStorage.getItem(this.name));
    }
    Collection.prototype.addToHTML = function(){
        for(x of this.storage){
            addGameHTML(x);
        }
    }
    Collection.prototype.filtrar = function(){

    }
    Collection.prototype.loadCollection = function(){

    }
}

function Game(portada,titulo,desarrolladora,genero,precio,ganado){
    this.portada = portada
    this.titulo = titulo;
    this.desarrolladora = desarrolladora;
    this.genero = genero;
    this.precio = precio;
    this.ganado = ganado;

    Game.prototype.getDescripcion = function(){
        if(this.ganado){
        return (`El juego ${this.titulo} fue desarrollado por ${this.desarrolladora} es del genero ${this.genero}, cuesta ${this.precio}$ y lo ganaste`)
    } else{ 
        return (`El juego ${this.titulo} fue desarrollado por ${this.desarrolladora} es del genero ${this.genero}, cuesta ${this.precio}$ y no lo ganaste`)
    
    }
    }
    Game.prototype.getPortado = function(){
        return (this.portada)
    }
    Game.prototype.getTitulo = function(){
        return (this.titulo)
    }
    Game.prototype.getDesarrolladora = function(){
        return (this.desarrolladora)
    }
    Game.prototype.getGenero = function(){
        return (this.genero)
    }
    Game.prototype.getPrecio = function(){
        return (this.precio)
    }
    Game.prototype.isGanada = function(){
        return (this.ganado)
    }

}


function crearForma(){
    let div = document.createElement('div')
    let div2 = document.createElement('div')
    
    let form = document.createElement('form')
    div.classList.add('formulario')
    div2.classList.add('formulario-content')

    /*
    console.log(form)
    form.innerHTML = `<form action="">
    <div>
    <h1>Ingrese datos del juego</h1> <a class="close">X</a>
    </div>
    <div>
        <p>Link a imagen del juego (si no tienes, pon 0)</p>
    <label for=""></label><input type="text" name="src" value="0" required>
    </div>

    <div>
        <p>Titulo del juego:</p>
        <label for="titulo"></label><input type="text" name="titulo" required>
    </div>

    <div>
        <p>Desarrolladora del juego</p>
        <label for="desarrolladora"></label><input type="text" name="desarrolladora" required>
    </div>

    <div>
        <p>Genero del juego</p>
        <label for="genero"></label><input type="text" name="genero" required>
    </div>

    <div>
        <p>Precio del juego</p>
        <label for="precio"></label><input type="text" name="precio" required> $
    </div>
    <div>
        <p>Completaste el juego alguna vez?</p>
        <label for="ganado"></label><input type="text" name="ganado" required>
    </div>
    <button> Agregar juego! </button>
</form>`
*/
    div2.append(form)
    div.append(div2)
    document.body.append(div)

    let documento = document.querySelector('.escondido')
    documento.classList.toggle('.escondido')
    
}

window.addEventListener('DOMContentLoaded', misJuegos.addToHTML());

let DS2 = new Game(0,"Dark Souls 2","FromSoftware","ARPG","3000",true);
let Portal = new Game(0,"Portal","Valve","Puzzles","50",true)
let Factorio = new Game(0,"Factorio","IDK","Fabricas","200",false)










/*

miStorage.setItem('a',JSON.stringify(grrr))
miStorage.setItem("lista",grrr)

console.log(miStorage.getItem('a'))
let car = (miStorage.getItem('lista'))
console.log(JSON.parse(car))
miStorage.getItem('lista').split(',').forEach(element => {
    console.log(element)
});

*/