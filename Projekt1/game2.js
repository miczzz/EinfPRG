/*
\xFC = ü
\xF6 = ö
\xE4 = ä
\xDF = ß
*/

init();

var clickZones = document.querySelectorAll(".click-zone");
var currentClickZone = "nowhere";
var hasCandycane = 0; 
var hasStar = 0; 
var clickCounterlvl2 = 0;
var hasLookedWindow = 0;
var hasTriedTakingStar = 0;
var sndName = "none";




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
	candycane = new Image();
	candycane.src = 'images/candycane.png'; 
	stern = new Image();
	stern.src = 'images/star.png'; 
	hintergrundohnestern = new Image();
	hintergrundohnestern.src = 'images/hintergrund2sansstar.png';
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
  hasCandycane = 0;
  hasStar = 0; 
  clickCounterlvl2 = 0;
  hasLookedWindow = 0;
  hasTriedTakingStar = 0;
  sndName = "none";
  // Reset Ende
 
  background_ctx.drawImage(hintergrund, 0, 0);	// Hintergrundbild
  inventar_ctx.drawImage(inventarhg, 0,0);		// Inventarbild
  textfeld_ctx.fillText("Du lässt die alten Schlüssel zurück, da du sie nicht mehr brauchst und kommst in dieses", 25, 25);
  textfeld_ctx.fillText("Zimmer, finde einen anderen Weg hinaus.", 25, 45);

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
		if(hasStar == 0){
		textfeld_ctx.fillText("Du versuchst das Fenster zu \xF6ffnen, es ist aber irgendwas verhakt.", 25, 25);
		textfeld_ctx.fillText("So kommst du leider nicht da ran. Wenn du etwas Spitzes hättest,", 25, 45);
		textfeld_ctx.fillText("könntest du damit die Blockage vielleicht lösen.", 25, 65);
		hasLookedWindow = 1;
		}
		if(hasStar == 1){
		textfeld_ctx.fillText("Mithilfe des Sterns gelingt es dir dich aus diesem alptraumhaften Reich zu befreien.", 25, 25);
		textfeld_ctx.fillText("Clicks: " + clickCounterlvl2, 25, 45);
		sndName = "won";
		playSound();
		}
	} 
	if(currentClickZone == "Teppich"){
	textfeld_ctx.fillText("Was du hier unter dem Teppich entdeckst erschüttert das schöne Gesamtbild des Raumes.", 25, 25);
	textfeld_ctx.fillText("Du versuchst den Anblick schnell wieder zu vergessen.", 25, 45);
	}	
	if(currentClickZone == "Kranz"){
	textfeld_ctx.fillText("Du entdeckst nichts Ungewöhnliches an diesem Kranz.", 25, 25);
	} 	
	if(currentClickZone == "Stiefel1"){
	textfeld_ctx.fillText("In diesem Stiefel sind kleine verpackte Geschenke.", 25, 25);
	} 
 	if(currentClickZone == "Stiefel2"){
	textfeld_ctx.fillText("In diesem Stiefel sind Mandarinen und Orangen.", 25, 25);
	textfeld_ctx.fillText("Ob hier jemand abnehmen soll?", 25, 45);
	} 	
	if(currentClickZone == "Stiefel3"){
		if(hasCandycane == 1){
		textfeld_ctx.fillText("Ohne die Zuckerstange ist dieser Stiefel etwas leer und es tut dir wahnsinnig leid.", 25, 25);
		}	
		if(hasCandycane == 0){
		textfeld_ctx.fillText("In diesem Stiefel sind einige Süßigkeiten, darunter eine lange Zuckerstange.", 25, 25);
			if(hasTriedTakingStar == 1){
			textfeld_ctx.fillText("Mit der Zuckerstange kommst du vielleicht an den Stern heran.", 25, 45);
			textfeld_ctx.fillText("Du erhältst eine Zuckerstange!", 25, 65);
			hasCandycane = 1;
			schluessel_ctx.drawImage(candycane, 0,0);
			sndName = "pickup";
			playSound();
			}
		}
	} 	
	if(currentClickZone == "Stiefel4"){
	textfeld_ctx.fillText("In diesem Stiefel sind Nüsse und ein paar Bonbons.", 25, 25);
	} 
	if(currentClickZone == "Feuer"){
	textfeld_ctx.fillText("Feuer!", 25, 25);
	} 	
	if(currentClickZone == "GeschenkLinks"){
	textfeld_ctx.fillText("Ein Geschenk in blauem Geschenkpapier. Ob es für einen Jungen ist?", 25, 25);
	}
	if(currentClickZone == "GeschenkRechts"){
	textfeld_ctx.fillText("Ein Geschenk in violettem Geschenkpapier. Ob es für ein Mädchen ist?", 25, 25);
	}
	if(currentClickZone == "Stern"){
			if(hasLookedWindow == 0){
			textfeld_ctx.fillText("Ein funkelnder Stern, der auffallend spitze Ecken besitzt.", 25, 25);
			}
			if(hasLookedWindow == 1 && hasCandycane == 0){
			textfeld_ctx.fillText("Mit dem Stern könntest du das Fenster vielleicht öffnen.", 25, 25);
			textfeld_ctx.fillText("Du versuchst den Stern abzunehmen, aber du kommst nicht an.", 25, 45);
			textfeld_ctx.fillText("Du musst deine Reichweite irgendwie verlängern.", 25, 65);
			hasTriedTakingStar = 1;
			}
			if(hasStar == 1){
			textfeld_ctx.fillText("Ohne Stern sieht der Baum irgendwie nackt aus.", 25, 25);
			}
			if(hasCandycane == 1 && hasStar == 0) {
			textfeld_ctx.fillText("Mit der Zuckerstange als Verlängerung deines Arms gelingt es dir den Stern", 25, 25);
			textfeld_ctx.fillText("vom Bein zu befreien.", 25, 45);
			background_ctx.drawImage(hintergrundohnestern, 0, 0);
			hasStar = 1;
			schluessel2_ctx.drawImage(stern, 0,0);
			sndName = "pickup";
			playSound();
			}
	}
		if(currentClickZone == "Weihnachtsbaum"){
	textfeld_ctx.fillText("Beim Anblick des Weihnachtsbaum wird dir richtig weihnachtlich zumute.", 25, 25);
	}
		if(currentClickZone == "Gardine"){
	textfeld_ctx.fillText("Eine wirklich flauschige Gardine. Bei genauerer Betrachtung kommt", 25, 25);
	textfeld_ctx.fillText("dir die Vermutung, dass es der gleiche Stoff wie der Teppich ist.", 25, 45);
	}
	
	if(currentClickZone == "Inventar1"){
		if(hasCandycane==0){
		textfeld_ctx.fillText("Dein Inventar ist leer.", 25, 25);
		}
		if(hasCandycane==1){
		textfeld_ctx.fillText("Lecker!", 25, 25);
		}
	} 		
	if(currentClickZone == "Inventar2"){
		if(hasStar==0){
		textfeld_ctx.fillText("Dein Inventar ist leer.", 25, 25);
		}
		if(hasStar==1){
		textfeld_ctx.fillText("Ein Stern, der dir den Weg weist.", 25, 25);
		}
	} 	
	if(currentClickZone == "Tuer"){
		textfeld_ctx.fillText("Von hier kommst du.", 25, 25);
	}	
}



function playSound() {

if(sndName == "pickup"){
	var snd = new Audio("sounds/pickup.wav"); 
	}
if(sndName == "won"){
	var snd = new Audio("sounds/won.wav"); 
	}	
if(sndName == "wrong"){
	var snd = new Audio("sounds/wrong.wav"); 
	}

snd.play();
}


function click() {
	clickCounterlvl2++;
	currentClickZone = this.dataset.zone;
 // alert('Clicked: ' + this.dataset.zone);
	// um das Textfeld erstmal zu resetten:
	textfeld_ctx.clearRect(0, 0, 800, 75);
	changeText();
}