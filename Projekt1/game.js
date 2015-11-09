init();

var clickZones = document.getElementsByClassName('click-zone');
var currentClickZone = "nowhere";
var hasKey = 0; // hat man den Schlüssel gefunden? 0 = nein, 1 = ja

for (var i = 0; i < clickZones.length; i += 1) {
    clickZones[i].addEventListener("click", click);
}

function init()
{
  background_canvas = document.getElementById('background_canvas');
  background_ctx = background_canvas.getContext('2d');
  main_canvas = document.getElementById('main_canvas');
  main_ctx = main_canvas.getContext('2d');

  inventar = document.getElementById('inventar');
  inventar_ctx = inventar.getContext('2d');
  
  textfeld = document.getElementById('textfeld');
  textfeld_ctx = textfeld.getContext('2d');
  
  schluessel = document.getElementById('schluessel');
  schluessel_ctx = schluessel.getContext('2d');  
  
  load_media();
}

function load_media()
{
  hintergrund = new Image();	// Hintergrundbild laden
  hintergrund.src = 'images/hintergrund.png';
  schluesselgrafik = new Image();
  schluesselgrafik = 'images/key.png';
  inventarhg = new Image();
  inventarhg.src = 'images/inventar.png';

 }
 
function mouse(e)		// Koordinaten der Maus
{
  var x = e.pageX - document.getElementById('game_object').offsetLeft;
  var y = e.pageY - document.getElementById('game_object').offsetTop;
  document.getElementById('x').innerHTML = x;
  document.getElementById('y').innerHTML = y;
}

function start()
{
  background_ctx.drawImage(hintergrund, 0, 0);	// Hintergrundbild
  inventar_ctx.drawImage(inventarhg, 0,0);		// Inventarbild
  schluessel_ctx.drawImage(schluesselgrafik, 0,0);  // Bild vom Schlüssel, funktioniert aber nicht...:/
  textfeld_ctx.fillText("Du wachst alleine in diesem Raum auf. Die Tür ist verschlossen. Finde einen Weg hinaus.", 25, 25);
}


function changeText()
{
 	if(currentClickZone == "Bild"){
	textfeld_ctx.fillText("Du schaust dir das Bild an. Aus irgendeinem Grund gefällt dir das Bild nicht, du kannst aber nicht sagen warum. Ansonsten entdeckst du nichts ungewöhnliches.", 25, 25);
	} else if(currentClickZone == "Schubladen"){
	textfeld_ctx.fillText("Du öffnest die Schubladen...und la-di-da du findest einen Schlüssel!", 25, 25);
	hasKey = 1;

	} 
	  else if(currentClickZone == "Key1"){
		if(hasKey==0){
	textfeld_ctx.fillText(hasKey + "Du schaust dir den Schlüssel an, die Frage ist bloß...hast du ihn schon oder noch nicht?!", 25, 25);
	}
		if(hasKey==1){
		textfeld_ctx.fillText("Ja! Du hast den Schlüssel gefunden!", 25, 25);
		}
	} 	
	else {
	textfeld_ctx.fillText("Hmm..gar nicht gut.", 25, 25);
	}
}


function click() {
	currentClickZone = this.dataset.zone;
 // alert('Clicked: ' + this.dataset.zone);
	// um das Textfeld erstmal zu resetten:
	textfeld_ctx.clearRect(0, 0, 800, 75);
	changeText();
	
}