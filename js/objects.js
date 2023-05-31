function aleatorio(piso,techo){
	return Math.floor(Math.random() * (techo - piso + 1)) + piso;
}

function Flower(canvas){
	var opc = aleatorio(1,100) % 2;
	if(opc==1)
		this.img = $("#flor_1")[0];	
	else
		this.img = $("#flor_2")[0];		
	this.x = canvas.width;  
	this.y = aleatorio(100, canvas.height - 100);
	this.velocidad = 0;
	while(this.velocidad == 0)
		this.velocidad=5;//aleatorio(1,3);
			
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.actualizar = function(){
		this.x -= this.velocidad;
		//this.x = (640 + this.x)%640;
	}
}

function Tank(canvas){
	this.img = $("#tank")[0];	
	this.x = canvas.width;  
	this.y = aleatorio(100, canvas.height - 100);
	this.velocidad = 0;
	while(this.velocidad == 0)
		this.velocidad=aleatorio(1,3);
			
	this.dibujar = function(ctx){
		var img = this.img;
		ctx.drawImage(img,this.x,this.y);
	}
	
	this.actualizar = function(){
		this.x -= this.velocidad;
		//this.x = (640 + this.x)%640;
	}
}
