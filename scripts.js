


















MyStorage = window.localStorage

let misJuegos = new Collection('Juegos Santi')

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