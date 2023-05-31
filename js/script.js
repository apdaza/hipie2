
var jugando;

$(document).ready(inicio);
$(document).keydown(capturaTeclado);

function inicio(){
	jugando = true;
	miCanvas = $("#mi_canvas")[0];
	tip_hippie = $("#tip")[0];
	contexto = miCanvas.getContext("2d");
	buffer = document.createElement("canvas");
	hippie = new Hippie();
	flowers = [];
	enemies = [];
	flowerInterval = 500; // Intervalo en milisegundos para generar nuevas flores
	flowerTimer = 0;
	enemiesInterval = 1000; // Intervalo en milisegundos para generar nuevas flores
	enemiesTimer = 0;
	run();	
	
	$('#instrucciones').click(function(){
        $('#popup').fadeIn('slow');
        $('.popup-overlay').fadeIn('slow');
        $('.popup-overlay').height($(window).height());
        return false;
    });
    
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
    
    $("#iniciar").click(function(){	
		if(jugando==false)
			inicio();	
	});
}

function capturaTeclado(event){
	if(event.which==38 || event.which==87)
		hippie.actualizar('arriba');
	if(event.which==40 || event.which==83)
		hippie.actualizar('abajo');
	if(event.which==39 || event.which==68)
		hippie.actualizar('derecha');
	if(event.which==37 || event.which==65)
		hippie.actualizar('izquierda');
	
}

function run(){ 
	buffer.width = miCanvas.width;
	buffer.height = miCanvas.height;
	contextoBuffer = buffer.getContext("2d");
		 
	if(jugando){  
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);

		hippie.dibujar(contextoBuffer);
		// Generar nuevas flores cada flowerInterval milisegundos
        flowerTimer += 16; // Aproximadamente 60 FPS
        if (flowerTimer >= flowerInterval) {
          flowers.push(new Flower(miCanvas));
          flowerTimer = 0;
        }
		// Generar nuevos enemigos cada enemiesInterval milisegundos
        enemiesTimer += 16; // Aproximadamente 60 FPS
		if (enemiesTimer >= enemiesInterval) {
			enemies.push(new Tank(miCanvas));
			enemiesTimer = 0;
		}
		for(i=0;i<flowers.length;i++){
			flowers[i].dibujar(contextoBuffer);
			flowers[i].actualizar();
			if(hippie.colision(flowers[i].x,flowers[i].y)){
				hippie.sprite = 2;
				hippie.puntos++;
				flowers.splice(i, 1);
				//$('#pierde')[0].play();
			}
			if (flowers[i].x + flowers[i].size < 0) {
				flowers.splice(i, 1);
			}
		}

		for(i=0;i<enemies.length;i++){
			enemies[i].dibujar(contextoBuffer);
			enemies[i].actualizar();
			if(hippie.colision(enemies[i].x,enemies[i].y)){
				hippie.sprite = 2;
				hippie.vida-= 10;
				enemies.splice(i, 1);
				//$('#pierde')[0].play();
			}
			if (enemies[i].x + enemies[i].size < 0) {
				enemies.splice(i, 1);
			}
		}
		
		if(hippie.vida <= 0)
			jugando = false;
		
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
		setTimeout("run()",20);
		
	}else{
		contextoBuffer.clearRect(0,0,buffer.width,buffer.height);
		contextoBuffer.fillStyle = "#ffffff";
		hippie.sprite = 3;
		hippie.vida = 0;
		hippie.dibujar(contextoBuffer);
		contextoBuffer.font = "50px sans-serif";
		contextoBuffer.fillText("GAMEOVER", 300, 440);
		contextoBuffer.fillStyle = "#ff0000";
		contextoBuffer.font = "15px sans-serif";
		contextoBuffer.fillText("try again", 550, 460);
		contexto.clearRect(0,0,miCanvas.width,miCanvas.height);
		contexto.drawImage(buffer, 0, 0);
	}
	
}


