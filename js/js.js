//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
//NAVE
var y = 13;  //altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var modo = "dificil";

//al cargar por completo la página...
window.onload = function(){

	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");


	//definición de eventos
	//mostrar menú
    	document.getElementById("show").onclick = function () {
		document.getElementsByClassName("ayuda")[0].style.display = "table";
		stop();
	}
	//ocultar menú
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("ayuda")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en el boton de encender en movil
	var boton="nopulsado";
	document.getElementById("boton").onclick = function(){
		if(boton=="nopulsado" && y<=73){
			boton="pulsado"
			motorOn();
			cambiarImagen();
		}else if(boton=="pulsado"){
			boton="nopulsado"
			motorOff();
			cambiarImagen2();
		}
	}

	//encender al apretar una tecla,en este caso la barra espaciadora
	document.onkeydown = function(e){
		if(e.keyCode == 32 && y<=73 && c>0){
			motorOn();
			cambiarImagen();
		}
	}
	//apagar el motor al levantar dejar de pulsar la tecla
	document.onkeyup = function(e){
		if(e.keyCode == 32){
			motorOff();
			cambiarImagen2();
		}

	}
	//cambiar modo de dificultad
	document.getElementById("facil").onclick = function(){
			modo = "facil";
			reinicio();
			document.getElementById("facil").style.color="red";
			document.getElementById("dificil").style.color="green";
		}
	document.getElementById("dificil").onclick = function(){
			modo = "dificil";
			reinicio();
			document.getElementById("facil").style.color="green";
			document.getElementById("dificil").style.color="red";
		}

	//Empezar a mover la nave justo después de cargar la página
	start();
}//termina window.onload
function reinicio(){
	v=0;
	y=13;
	c=100;
	document.getElementsByClassName("ayuda")[0].style.display = "none";
	start();
}
//Empzar juego
function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}
//Parar el juego, para nave y contadores
function stop(){
	clearInterval(timer);
}

//Funcion que caiga la nave por gravedad.
function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(1);
	altura.innerHTML=y.toFixed(1);

	//la nave cae hasta que top sea un 73% de la pantalla
	if (y<=73){
		document.getElementsByClassName("nave")[0].style.top = y+"%";
	}else{
		stop();
		explosion();
	}


}
//confirmar cambio de pagina
function confirma(miurl){
	question = confirm("Va a cambiar de pagina y no se guardará el progreso. Está seguro?");
	if(question !="0"){
		top.location = miurl;
	}
}
function motorOn(){
	//el motor da aceleración a la nave
	a=-g;
	//mientras el motor esté activado gasta combustible
	if (timerFuel==null){
		timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	}else if(c <= 0){
		motorOff();
	}
}
function motorOff(){
	a=g;
	clearInterval(timerFuel);
	timerFuel=null;
}
function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c-=0.1;
	if (c < 0 ){
		 c = 0;
		 motorOff();
	}
	combustible.innerHTML=c.toFixed(1);
}

function explosion(){
	if(v>3 && modo=="dificil"){
		document.getElementsByClassName("explosion")[0].style.display = "block";
		document.getElementsByClassName("perdido")[0].style.display = "table";
	}else if(v>5 && modo=="facil"){
		document.getElementsByClassName("explosion")[0].style.display = "block";
		document.getElementsByClassName("perdido")[0].style.display = "table";
	}else{
		document.getElementsByClassName("ganado")[0].style.display = "table";
	}
}
//cambiar imagen
function cambiarImagen(){
	document.getElementById("nave").src="img/nave31a.png";
}
function cambiarImagen2(){
	document.getElementById("nave").src="img/nave32.png";
}
//evento de apagar motor cuando nos quedamos sin combustible
	/*if(c <= 0){
		motorOff();
	}*/
//evento de explosion cuando va demasiado rapido la nave
