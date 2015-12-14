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
	hintergrund.src = 'images/hintergrund.png';
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
  textfeld_ctx.fillText("Du wachst alleine in diesem Raum auf. Die T\xFCr ist verschlossen. Finde einen Weg hinaus.", 25, 25);

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
	if(currentClickZone == "Pflanze"){
	textfeld_ctx.fillText("Eine Pflanze, die offensichtlich genug Wasser erh\xE4lt und gedeiht.", 25, 25);
	} 	
	if(currentClickZone == "Pflanzentopf"){
	textfeld_ctx.fillText("Du gr\xE4bst in der Erde (ja, so verzweifelt bist du), kannst aber nichts finden.", 25, 25);
	} 
 	if(currentClickZone == "Bild"){
	textfeld_ctx.fillText("Du schaust dir das Bild an. Aus irgendeinem Grund gef\xE4llt dir das Bild nicht, du kannst", 25, 25);
	textfeld_ctx.fillText("aber nicht sagen warum. Ansonsten entdeckst du nichts ungew\xF6hnliches.", 25, 45);
	textfeld_ctx.fillText("Test dritte Zeile gut lesbar? Ja, kann man sagen.", 25, 65);
	} 	
	if(currentClickZone == "Obstschale"){
	textfeld_ctx.fillText("Platzhalter Obstschale", 25, 25);
	} 	
	if(currentClickZone == "Teppich"){
	textfeld_ctx.fillText("Du hebst den Teppich an um darunter zu schauen, das ist immerhin ein h\xE4ufiges", 25, 25);
	textfeld_ctx.fillText("Versteck von Schl\xFCsseln. Au\xDFer Staub findest du hier aber nichts.", 25, 45);
	} 
	if(currentClickZone == "KommodeLinks"){
		if(hasKey==0){
	textfeld_ctx.fillText("Du \xF6ffnest die Schubladen...und du findest einen Schl\xFCssel!", 25, 25);
	hasKey = 1;
	schluessel_ctx.drawImage(schluesselgrafik, 0,0);
		}
		else if(hasKey==1){
		textfeld_ctx.fillText("Au\xDFer dem Schl\xFCssel ist hier nichts besonderes...und den hast du schon aufgehoben!", 25, 25);
		}
	} 	
	if(currentClickZone == "Regal1"){
	textfeld_ctx.fillText("Platzhalter Regal1", 25, 25);
	}
		if(currentClickZone == "Regal2"){
	textfeld_ctx.fillText("Platzhalter Regal2", 25, 25);
	}
		if(currentClickZone == "Regal3"){
	textfeld_ctx.fillText("Platzhalter Regal3", 25, 25);
	}
		if(currentClickZone == "Regal4"){
	textfeld_ctx.fillText("Platzhalter Regal4", 25, 25);
	}
		if(currentClickZone == "Regal5"){
	textfeld_ctx.fillText("Platzhalter Regal5", 25, 25);
	}
		if(currentClickZone == "Regal6"){
	textfeld_ctx.fillText("Platzhalter Regal6", 25, 25);
	}
		if(currentClickZone == "Regal7"){
	textfeld_ctx.fillText("Platzhalter Regal7", 25, 25);
	}
		if(currentClickZone == "Regal8"){
	textfeld_ctx.fillText("Platzhalter Regal8", 25, 25);
	}
		if(currentClickZone == "Regal9"){
	textfeld_ctx.fillText("Platzhalter Regal9", 25, 25);
	}
		if(currentClickZone == "Regal10"){
	textfeld_ctx.fillText("Platzhalter Regal10", 25, 25);
	}
		if(currentClickZone == "Regal11"){
	textfeld_ctx.fillText("Platzhalter Regal11", 25, 25);
	}
		if(currentClickZone == "Regal12"){
	textfeld_ctx.fillText("Platzhalter Regal12", 25, 25);
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
		if(hasKey==0){
		textfeld_ctx.fillText("Die T\xFCr ist abgeschlossen!", 25, 25);
		}
		if(hasKey==1&&hasRightKey==0){
		textfeld_ctx.fillText("Der Schl\xFCssel passt nicht, das kann doch nicht wahr sein!", 25, 25);
		}
		if(hasRightKey==1){
		textfeld_ctx.fillText("Der Schl\xFCssel passt! Du kannst dein Gl\xFCck kaum fassen und genie\xDFt die Freiheit!", 25, 25);
		textfeld_ctx.fillText("Clicks: " + clickCounter, 25, 45);
		level2.style.visibility = "visible";
		}
	}	
	if(currentClickZone == "KommodeRechts"){
	if(hasKey==0){
	textfeld_ctx.fillText("Die verdammte Kommode ist abgeschlossen!", 25, 25);
	}
		if(hasKey==1&&hasRightKey==0){
		hasRightKey=1;
		textfeld_ctx.fillText("Du \xF6ffnest die Kommode mit dem Schl\xFCssel...und du findest einen neuen Schl\xFCssel!", 25, 25);
		schluessel2_ctx.drawImage(schluesselgrafik2, 0,0);
		}
		else if(hasKey==1&&hasRightKey==1){
		textfeld_ctx.fillText("Du hast die Kommode schon durchsucht und dabei einen Schl\xFCssel gefunden...auf zur T\xFCr!", 25, 25);
		}
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