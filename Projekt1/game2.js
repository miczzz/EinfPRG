/*
\xFC = ü
\xF6 = ö
\xE4 = ä
\xDF = ß
*/

init();

var clickZones = document.querySelectorAll(".click-zone");
var currentClickZone = "nowhere";
var hasKey = 0; // hat man den Schlüssel gefunden? 0 = nein, 1 = ja
var hasRightKey = 0; // hat man den Türschlüssel gefunden?
var clickCounter = 0;


function init()
{
	background_canvas = document.getElementById('background_canvas');
	background_ctx = background_canvas.getContext('2d');
	
	inventar = document.getElementById('inventar');
	inventar_ctx = inventar.getContext('2d');
  
	textfeld = document.getElementById('textfeld');
	textfeld_ctx = textfeld.getContext('2d');
	textfeld_ctx.font = '15pt Calibri';
	textfeld_ctx.fillStyle = '#5aa4d6';
	
	schluessel = document.getElementById('schluessel');
	schluessel_ctx = schluessel.getContext('2d');  

	schluessel2 = document.getElementById('schluessel2');
	schluessel2_ctx = schluessel2.getContext('2d');  
  
	load_media();
  
	leveleins.addEventListener("load", menu, false);
}

function load_media()
{
	leveleins = new Image();	
	leveleins.src = 'images/leveleins.png';
	hintergrund = new Image();	// Hintergrundbild laden
	hintergrund.src = 'images/hintergrund2.png';
	inventarhg = new Image();	
	inventarhg.src = 'images/inventar.png';
	schluesselgrafik = new Image();
	schluesselgrafik.src = 'images/key.png'; 
	schluesselgrafik2 = new Image();
	schluesselgrafik2.src = 'images/key2.png'; 
 }
 
 function menu(){
  background_ctx.drawImage(leveleins, 0, 0);
}
 
function start()
{
  //Für Reset
  document.getElementById("startButton").innerHTML= "Reset"; // Startbutton -> Resetbutton
  schluessel_ctx.clearRect(0,0,70,63); // Schlüsselgrafiken reseten
  schluessel2_ctx.clearRect(0,0,70,63);
  textfeld_ctx.clearRect(0, 0, 800, 75); // Text vom Textfeld löschen
  //Variablen auf Default-Werte zurücksetzen
  currentClickZone = "nowhere";
  hasKey = 0;
  hasRightKey = 0; 
  clickCounter = 0;
  // Reset Ende  
  
  background_ctx.drawImage(hintergrund, 0, 0);	// Hintergrundbild
  inventar_ctx.drawImage(inventarhg, 0,0);		// Inventarbild
  textfeld_ctx.fillText("Du lässt die alten Schlüssel zurück, da du sie nicht mehr brauchst und kommst in dieses Zimmer, finde einen anderen Weg hinaus.", 25, 25);

  for (var i = 0; i < clickZones.length; i += 1) {
		clickZones[i].addEventListener("click", click);
		clickZones[i].style.visibility = "visible";
	}

	/*
	Test, so lässt sich ein CSS-Element direkt aufrufen und ändern:
	document.querySelector("header").style.color = "#5aF4F6";	
	*/
}


function changeText()
{

 	if(currentClickZone == "Fenster"){
	textfeld_ctx.fillText("Du versuchst das Fenster zu \xF6ffnen, es ist aber fest verriegelt.", 25, 25);
	textfeld_ctx.fillText("So kommst du hier nicht raus.", 25, 45);
	} 
	if(currentClickZone == "Teppich"){
	textfeld_ctx.fillText("Teppich", 25, 25);
	}	
	if(currentClickZone == "Kranz"){
	textfeld_ctx.fillText("Kranz", 25, 25);
	} 	
	if(currentClickZone == "Stiefel1"){
	textfeld_ctx.fillText("Stiefel 1", 25, 25);
	} 
 	if(currentClickZone == "Stiefel2"){
	textfeld_ctx.fillText("Stiefel2", 25, 25);
	textfeld_ctx.fillText("...", 25, 45);
	textfeld_ctx.fillText("...", 25, 65);
	} 	
	if(currentClickZone == "Stiefel3"){
	textfeld_ctx.fillText("Stifel3", 25, 25);
	} 	
	if(currentClickZone == "Stiefel4"){
	textfeld_ctx.fillText("Stifel4", 25, 25);
	} 
	if(currentClickZone == "Feuer"){
	textfeld_ctx.fillText("Feuer!", 25, 25);
	} 	
	if(currentClickZone == "GeschenkLinks"){
	textfeld_ctx.fillText("Geschenk in blau", 25, 25);
	}
		if(currentClickZone == "GeschenkRechts"){
	textfeld_ctx.fillText("Geschenk in violett", 25, 25);
	}
		if(currentClickZone == "Stern"){
	textfeld_ctx.fillText("Stern", 25, 25);
	}
		if(currentClickZone == "Weihnachtsbaum"){
	textfeld_ctx.fillText("Weihnachtsbaum", 25, 25);
	}
		if(currentClickZone == "Gardine"){
	textfeld_ctx.fillText("Gardine", 25, 25);
	}
	
	if(currentClickZone == "Inventar1"){
		if(hasKey==0){
		textfeld_ctx.fillText("Dein Inventar ist leer.", 25, 25);
		}
		if(hasKey==1){
		textfeld_ctx.fillText("Ja! Du hast den Schl\xFCssel gefunden!", 25, 25);
		}
	} 		
	if(currentClickZone == "Inventar2"){
		if(hasRightKey==0){
		textfeld_ctx.fillText("Dein Inventar ist leer.", 25, 25);
		}
		if(hasRightKey==1){
		textfeld_ctx.fillText("Ein zweiter Schl\xFCssel, der dich hoffentlich hier rausf\xFChrt!", 25, 25);
		}
	} 	
	
	if(currentClickZone == "Tuer"){
		textfeld_ctx.fillText("Von hier kommst du.", 25, 25);
		
	}	

	
}


function click() {
	clickCounter++;
	currentClickZone = this.dataset.zone;
 // alert('Clicked: ' + this.dataset.zone);
	// um das Textfeld erstmal zu resetten:
	textfeld_ctx.clearRect(0, 0, 800, 75);
	changeText();
	
}