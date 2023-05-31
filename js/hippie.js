function Hippie(){
	this.x = 25;
	this.y = 15;
	this.img = [$("#abajo")[0],$("#arriba")[0],$("#salto")[0],$("#sentado")[0]];
	this.sprite = 0;
	this.vida = 100;
	this.puntos = 0;
	this.seguro = "arriba";
	this.tip = "";
	this.tips = [
		"Paz y amor: abogamos por la paz, la no violencia y \nel amor como principios fundamentales.",
		"Espiritualidad: Nos interesamos por la espiritualidad y exploraban la meditación, \nel yoga y la búsqueda de la iluminación interior.",
		"Libertad individual: Defendemos la libertad individual y \nnos oponemos a la rigidez y la opresión social.",
		"Educación: Defendemos la educación y buscamos la educación \nen sí misma y en la vida cotidiana.",
		"Comunidad y cooperación: Promovemos la formación de comunidades \nbasadas en la cooperación, el apoyo mutuo y el compartir recursos.",
		"Ecología y respeto por la naturaleza: Abogamos por el cuidado del medio \nambiente y la conexión con la naturaleza.", 
		"Expresión artística y creatividad: Valoramos la expresión artística \ny la creatividad en todas sus formas.",
		"Rechazo a la guerra y a la violencia: Nos oponemos a la guerra \n(especialmente durante la época de la Guerra de Vietnam).",
		"Espíritu de cambio social: Somos agentes de cambio social y luchamos por \nla igualdad de derechos, la justicia social y la eliminación \nde las desigualdades.",
		"Vivir de manera simple: Preferimos un estilo de vida simple \ny minimalista.",
		"Valoramos más las experiencias y las relaciones que \nlas posesiones materiales.",
		"Tolerancia y diversidad: Abrazamos la diversidad y la tolerancia \nhacia diferentes culturas, razas, religiones \ny formas de vida.",
		"Alimentación consciente: Adoptamos una alimentación consciente, \noptando por una dieta vegetariana o vegana.",
		"Valoramos la conexión con la tierra y buscamos una alimentación más ética \ny respetuosa con los animales.",
		"Autonomía y autosuficiencia: Nos interesan la autosuficiencia \ny la capacidad de satisfacer nuestras propias necesidades básicas.",
		"Practicamos técnicas de cultivo propio, como la agricultura orgánica \ny la creación de comunidades autosuficientes.",
		"Activismo social: Nos involucramos en movimientos sociales y políticos \npara luchar por la justicia social, los derechos civiles y la igualdad de género.",
		"Soñamos con un mundo sin fronteras ni divisiones, donde todos podamos \nvivir en armonía."
	];
	
	this.dibujar = function(ctx){
		var img = this.img[this.sprite];
		var x = this.x;
		var y = this.y;
		ctx.drawImage(img, x, y);
		ctx.save();
		ctx.fillStyle = "#ffffff";
		ctx.font = "12px sans-serif";
		ctx.fillText("puntos: "+ this.puntos, x, y + 65);
		ctx.fillText("vida: "+ this.vida, x, y);
		ctx.fillText("ultimo seguro: "+ this.seguro, x, y+75);
		if(this.sprite==2){
			ctx.fillStyle = "#ff0000";
			ctx.font = "20px sans-serif";
			ctx.fillText("Peace & Love", x+65, y + 25);
		}
		ctx.fillStyle = "#aa00aa";
		ctx.font = "18px sans-serif";
		lineas = this.tip.split("\n");
		for (var i = 0; i < lineas.length; i++) {
			ctx.fillText(lineas[i], 10, 20 + i * 20);
		}
		//ctx.fillText(this.tip, 10, 20);
		ctx.restore();
	}
	
	this.actualizar = function(accion){
		if(accion=="arriba" && this.y > 15){
			this.y -= 10;
			//this.sprite = 1;
		}
		if(accion=="abajo"  && this.y < 390){
			this.y += 10;
			//this.sprite = 0;
		}
		/*if(accion=="izquierda"){
			this.x -= 10;
			this.sprite = 1;
		}
		if(accion=="derecha"){
			this.x += 10;
			this.sprite = 0;
		}*/
		this.x = (800 + this.x)%800;
		this.y = (480 + this.y)%480;
		
		if(this.y > 340 && this.seguro == "arriba"){
			this.seguro = "abajo";
			this.dar_tip();
		}
		if(this.y < 20 && this.seguro == "abajo"){
			this.seguro = "arriba";
			this.dar_tip();
		}
		
		
	}

	this.dar_tip = function(){
		indice = Math.floor(Math.random() * this.tips.length);
		this.tip = this.tips[indice];
	}
	
	this.colision = function(x,y){
		var distancia=Math.sqrt( Math.pow( (x-this.x), 2)+Math.pow( (y-this.y),2));
		if(distancia>this.img[this.sprite].width)
		   return false;
		else
		   return true;	
	}
}
