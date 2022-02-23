
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
    }
    
    Collection.prototype.showCollection = function(){
        return JSON.parse(MyStorage.getItem(this.name));
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