//----------------------------------------
//variables de configuration paramétrables
//----------------------------------------

var vitesse = 5;//easy : 5, normal : 10, hard : 15
var nbGameToWin = 3;//nombre de parties a faire pour qu'un joueur gagne
var nbPlayers = 1;//0 : mode demo, 1 : mode solo, 2 : mode multijoueur
var tailleRaquette = 100;//hauteur des raquettes en pixels (defaut : 100)
var canWidth = 1000;//largeur du canvas (defaut : 1000)
var canHeight = 600;//hauteur du canvas (defaut : 600)

//--------------------------------------------
//variables de configuration (ne pas modifier)
//--------------------------------------------

var yBalle;//position de la balle sur l'axe des abscisse 
var xBalle;//position de la balle sur l'axe des coordonnées
var deltaXBalle;//valeur d'incrementation de xBalle a chaque actualisation du canvas
var deltaYBalle;//valeur d'incrementation de yBalle a chaque actualisation du canvas
var yJ1;//position sur l'axe des abscisses du centre de la plateforme droite
var yJ2;//position sur l'axe des abscisses du centre de la plateforme gauche
var deltaJ1 = 0;//valeur d'incrementation de yJ1 lors d'un mouvement (pression d'une touche)
var deltaJ2 = 0;//valeur d'incrementation de yJ2 lors d'un mouvement (pression d'une touche)
var scoreJ1;//score de J1 (compris entre 0 et nbGameToWin)
var scoreJ2;//score de J2 (compris entre 0 et nbGameToWin)
var canvas;//nom du canvas créé
var ctx;//contexte du canvas
var act;//variable d'actualisation de la page
var vitesseRaquettes = canHeight/200;//coefficient de vitesse des plateformes
var ee = false;

//Gestion du menu
function demarrage(){
	var playFucus=true;
	var commandFucus=false;
	var optionFucus=false;
	var quitFucus=false;
	var Div = document.getElementById("divPrincipale");
	var titre = document.createElement("h1");
	titre.innerHTML = "Pong";
	Div.appendChild(titre);
	
	var play = document.createElement("button");
	play.innerHTML = "PLAY";
	Div.appendChild(play);

	var command = document.createElement("button");
	command.innerHTML = "COMMANDS";
	Div.appendChild(command);

	var option = document.createElement("button");
	option.innerHTML = "OPTIONS";
	Div.appendChild(option);

	var quit = document.createElement("button");
	quit.innerHTML = "EXIT";
	Div.appendChild(quit);
	
	play.addEventListener('click',debutJeu);
	quit.addEventListener('click', function(){
		window.close(); //Cette fonctionnalité ne fonctionne pas sur certains navigateurs (Mozilla) car
				//les scripts ne peuvent pas fermer une fenêtre qui n’a pas été ouverte par un script.
	})
	option.addEventListener('click',LanceEcranOption);
	command.addEventListener('click', LanceEcranCommande);
	
	
	soulignage();
	
	
	function soulignage(){
		play.style.textDecoration = (playFucus ? "underline" : "none");
		command.style.textDecoration = (commandFucus ? "underline" : "none");
		option.style.textDecoration = (optionFucus ? "underline" : "none");
		quit.style.textDecoration = (quitFucus ? "underline" : "none");
	}
	
	
	
	function LanceEcranCommande(){
		titre.remove();
		play.remove();
		command.remove();
		option.remove();
		quit.remove();
		document.addEventListener('keydown',selectionCommands);
		var txt1 = document.createElement("p");
		txt1.id = "normal";
		txt1.innerHTML = "\'Z\' and \'S\' For the Left Player";
		Div.appendChild(txt1);

		var txt2 = document.createElement("p");
		txt2.id = "normal";
		txt2.innerHTML = "\'P\' and \'M\' For the Right Player";
		Div.appendChild(txt2);

		var menu = document.createElement("button");
		menu.id = "menu";
		menu.innerHTML = "MENU";
		Div.appendChild(menu);
		function gotomenu(){
			txt1.remove();
			txt2.remove();
			menu.remove();
			document.removeEventListener('keydown',selectionCommands);
			demarrage();
		}
		menu.addEventListener('click', gotomenu);
		function selectionCommands(event){
			var key = event.key;
			if((key==="Enter" || key===" ")){
				gotomenu();
			}
		}
		
	}
	function LanceEcranOption(){
		var easyFucus=false;
		var normalFucus=false;
		var hardFucus=false;
		var menuFucus=true;
		
		var demoFucus=false;
		var soloFucus=false;
		var duoFucus=false;
		
		titre.remove();
		play.remove();
		command.remove();
		option.remove();
		quit.remove();
		
		var modeTxt1 = document.createElement("p");
		modeTxt1.id = "normal";
		modeTxt1.innerHTML = "Please choose the mode";
		Div.appendChild(modeTxt1);
		var modeOpt1 = document.createElement("button");
		var modeOpt2 = document.createElement("button");
		var modeOpt3 = document.createElement("button");
		modeOpt1.id = "option";
		modeOpt1.innerHTML = "Demo";
		Div.appendChild(modeOpt1);
		modeOpt2.id = "option";
		modeOpt2.innerHTML = "Solo";
		Div.appendChild(modeOpt2);
		modeOpt3.id = "option";
		modeOpt3.innerHTML = "Duo";
		Div.appendChild(modeOpt3);
		
		
		document.addEventListener('keydown',selectionOptions);
		var txt1 = document.createElement("p");
		txt1.id = "normal";
		txt1.innerHTML = "Please choose the speed";
		Div.appendChild(txt1);
		var opt1 = document.createElement("button");
		var opt2 = document.createElement("button");
		var opt3 = document.createElement("button");
		opt1.id = "option";
		opt1.innerHTML = "Easy";
		Div.appendChild(opt1);
		opt2.id = "option";
		opt2.innerHTML = "Normal";
		Div.appendChild(opt2);
		opt3.id = "option";
		opt3.innerHTML = "Hard";
		Div.appendChild(opt3);
		
		
		
		var menu = document.createElement("button");
		menu.id = "menu";
		menu.innerHTML = "MENU";
		Div.appendChild(menu);
		
		soulignageOption();
		
		
		function soulignageOption(){
			opt1.style.textDecoration = "none";
			opt2.style.textDecoration = "none";
			opt3.style.textDecoration = "none";
			modeOpt1.style.textDecoration = "none";
			modeOpt2.style.textDecoration = "none";
			modeOpt3.style.textDecoration = "none";
			menu.style.textDecoration = "none";
		
		    if (vitesse==5)
				opt1.style.textDecoration = "underline dotted";
			if (vitesse==10)
				opt2.style.textDecoration = "underline dotted";
			if (vitesse==15)
				opt3.style.textDecoration = "underline dotted";
			if (nbPlayers==0)
				modeOpt1.style.textDecoration = "underline dotted";
			if (nbPlayers==1)
				modeOpt2.style.textDecoration = "underline dotted";
			if (nbPlayers==2)
				modeOpt3.style.textDecoration = "underline dotted";
				
			if (easyFucus)
				opt1.style.textDecoration = "underline";
			if (normalFucus)
				opt2.style.textDecoration = "underline";
			if (hardFucus)
				opt3.style.textDecoration = "underline";
			if (menuFucus)
				menu.style.textDecoration = "underline";
			
			if (demoFucus)
				modeOpt1.style.textDecoration = "underline";
			if (soloFucus)
				modeOpt2.style.textDecoration = "underline";
			if (duoFucus)
				modeOpt3.style.textDecoration = "underline";
		}
		
		opt1.addEventListener('click', function(){
			vitesse = 5;
			soulignageOption();
		})
		opt2.addEventListener('click', function(){
			vitesse = 10;
			soulignageOption();
		})
		opt3.addEventListener('click', function(){
			vitesse = 15;
			soulignageOption();
		})
		modeOpt1.addEventListener('click', function(){
			nbPlayers = 0;
			soulignageOption();
		})
		modeOpt2.addEventListener('click', function(){
			nbPlayers = 1;
			soulignageOption();
		})
		modeOpt3.addEventListener('click', function(){
			nbPlayers = 2;
			soulignageOption();
		})

		
		function gotomenu(){
			txt1.remove();
			opt1.remove();
			opt2.remove();
			opt3.remove();
			modeTxt1.remove();
			modeOpt1.remove();
			modeOpt2.remove();
			modeOpt3.remove();
			menu.remove();
			document.removeEventListener('keydown',selectionOptions);
			demarrage();
		}
		menu.addEventListener('click', gotomenu);
		function selectionOptions(event){
			var key = event.key;
			//console.log(key);
			if(key==="ArrowUp" || key==="z" || key==="Z" || key==="p" || key==="P"){
				deplacementSelection(1);
			}
			if(key==="ArrowDown" || key==="s"|| key==="S" || key==="m" || key==="M"){
				deplacementSelection(-1);
			}
			if(key==="ArrowLeft" || key==="q" || key==="Q" || key==="l" || key==="L"){
				deplacementSelection(2);
			}
			if(key==="ArrowRight" || key==="d"|| key==="D" || key==="ù" || key==="%"){
				deplacementSelection(-2);
			}
		
			if((key==="Enter" || key===" ")){
				if(easyFucus)
					vitesse = 5;
				if(normalFucus)
					vitesse = 10;
				if(hardFucus)
					vitesse = 15;
				if(demoFucus)
					nbPlayers = 0;
				if(soloFucus)
					nbPlayers = 1;
				if(duoFucus)
					nbPlayers = 2;
				soulignageOption();
				if(menuFucus){
					gotomenu();
				}
			}
			
			function deplacementSelection(direction){
				if(normalFucus && direction==-2){
					normalFucus=false;
					hardFucus=true;
					soulignageOption();
				}
				if(easyFucus && direction==-2){
					normalFucus=true;
					easyFucus=false;
					soulignageOption();
				}
				if(normalFucus && direction==2){
					normalFucus=false;
					easyFucus=true;
					soulignageOption();
				}
				if(hardFucus && direction==2){
					hardFucus=false;
					normalFucus=true;
					soulignageOption();
				}
				
				if(soloFucus && direction==2){
					soloFucus=false;
					demoFucus=true;
					soulignageOption();
				}
				if(duoFucus && direction==2){
					duoFucus=false;
					soloFucus=true;
					soulignageOption();
				}
				
				if(soloFucus && direction==-2){
					soloFucus=false;
					duoFucus=true;
					soulignageOption();
				}
				if(demoFucus && direction==-2){
					demoFucus=false;
					soloFucus=true;
					soulignageOption();
				}
				
				if((normalFucus || easyFucus ||  hardFucus) && direction==-1){
					normalFucus=false;
					easyFucus=false;
					hardFucus=false;
					menuFucus=true;
					soulignageOption();
				}
				if((normalFucus || easyFucus ||  hardFucus) && direction==1){
					normalFucus=false;
					easyFucus=false;
					hardFucus=false;
					soloFucus=true;
					soulignageOption();
				}
				if((soloFucus || duoFucus ||  demoFucus) && direction==-1){
					soloFucus=false;
					duoFucus=false;
					demoFucus=false;
					normalFucus=true;
					soulignageOption();
				}
				
				if(menuFucus && direction==1){
					normalFucus=true;
					menuFucus=false;
					soulignageOption();
				}
			}
		}
	}
	
	document.addEventListener('keydown',selection);
	
	function selection(event){
		var key = event.key;
		if(key==="ArrowUp" || key==="z" || key==="Z" || key==="p" || key==="P"){
			deplacementSelection(1);
		}
		if(key==="ArrowDown" || key==="s"|| key==="S" || key==="m" || key==="M"){
			deplacementSelection(-1);
		}
		if((key==="Enter" || key===" ")){
			if(playFucus){
				document.removeEventListener('keydown',selection);	
				debutJeu();
			}
			if(commandFucus){
				document.removeEventListener('keydown',selection);
				LanceEcranCommande();
			}
			if(optionFucus){
				document.removeEventListener('keydown',selection);
				LanceEcranOption();
			}
			if(quitFucus){
				document.removeEventListener('keydown',selection);
				window.close();
			}
			
		}
		
		function deplacementSelection(direction){
			if(optionFucus && direction==-1){
			//console.log("optionFucus");
				optionFucus=false;
				quitFucus=true;
				soulignage();
			}
			if(commandFucus && direction==-1){
				optionFucus=true;
				commandFucus=false;
				soulignage();
			}
			if(playFucus && direction==-1){
				playFucus=false;
				commandFucus=true;
				soulignage();
			}
			if(commandFucus && direction==1){
				commandFucus=false;
				playFucus=true;
				soulignage();
			}
			if(optionFucus && direction==1){
				commandFucus=true;
				optionFucus=false;
				soulignage();
			}
			if(quitFucus && direction==1){
				quitFucus=false;
				optionFucus=true;
				soulignage();
			}

		}
	}
}

//Création du canvas
function debutJeu() {
  document.addEventListener('keypress', touche);
  document.addEventListener('keyup', toucheLache);
  var Div = document.getElementById("divPrincipale");
  var body = document.getElementById("body");

 Div.remove();
  var canvas = document.createElement("canvas");
  canvas.id = "can";
  canvas.width = canWidth;
  canvas.height = canHeight;
  body.appendChild(canvas);


  canvas = document.getElementById('can');
  ctx = canvas.getContext("2d");
  init();
}

//Initialisation des valeurs du canvas
function init(){
  yBalle=canHeight/2;
  xBalle=canWidth/2;
  yJ1=canHeight/2;
  yJ2=canHeight/2;
  scoreJ1 = 0;
  scoreJ2 = 0;

  deltaXBalle=Math.floor(Math.random()*2);
  if(deltaXBalle==0)
    deltaXBalle=-1-(vitesse/5);
  else
    deltaXBalle=1+(vitesse/5);
  deltaYBalle=Math.random()*.5 - 0.25;
  clearInterval(act);
  act = window.setInterval(actualiser,1);
}

//fonctions d'affichage des éléments
function drawStick(x,y)
{
  ctx.beginPath();
  ctx.rect(x-7.5,y- tailleRaquette/2,15, tailleRaquette);
  ctx.fillStyle = (ee ? randCol() : "white");
  ctx.fill();
}

function drawBalle(x,y)
{
  ctx.beginPath();
  ctx.arc(x,y,10,0,2*Math.PI);
  ctx.fillStyle = (ee ? randCol() : "white");
  ctx.fill();
}

function separeLine()
{
  ctx.beginPath();
  ctx.setLineDash([15, 20]);
  ctx.moveTo(canWidth/2, 0);
  ctx.lineTo(canWidth/2, canHeight);
  ctx.lineWidth = "7";
  ctx.strokeStyle = (ee ? randCol() : "white");
  ctx.stroke();
}

function displayScore()
{
  ctx.font = "50pt Verdana";
  ctx.fillStyle = (ee ? randCol() : "white");
  var taille = ctx.measureText(scoreJ1);
  ctx.fillText(scoreJ1, canWidth/2 - taille.width - 40, canHeight/5);
  ctx.fillText(scoreJ2, canWidth/2 + 40, canHeight/5);
}

//Event lorsqu'on lache la touche
function toucheLache(event)
{
   var keyr = event.key;
  if(((keyr==="ArrowUp" || keyr==="p" || keyr==="P"  ) && deltaJ2==-1)&&nbPlayers==2)
    deltaJ2=0;
  if(((keyr==="ArrowDown" || keyr==="m" || keyr==="M" ) && deltaJ2==1)&&nbPlayers==2)
    deltaJ2=0;
  if(((keyr==="z" || keyr==="Z"  )&& deltaJ1==-1)&&nbPlayers > 0)
    deltaJ1=0;
  if(((keyr==="s" || keyr==="S" )&& deltaJ1==1)&&nbPlayers > 0)
    deltaJ1=0;
}
 
//Event lorsqu'on presse sur une touche
function touche(event)
{
  var keyr = event.key;
  if((keyr==="ArrowUp" || keyr==="p" || keyr==="P")&&nbPlayers==2)
    deltaJ2=-1;
  if((keyr==="ArrowDown" || keyr==="m" || keyr==="M")&&nbPlayers==2)
    deltaJ2=1;
  if((keyr==="z" || keyr==="Z")&&nbPlayers > 0)
    deltaJ1=-1;
  if((keyr==="s" || keyr==="S")&&nbPlayers > 0)
    deltaJ1=1;
  if(keyr===" " && (scoreJ1 == nbGameToWin || scoreJ2 == nbGameToWin))
    init();
  if(keyr==="r" || keyr==="R" && (scoreJ1 == nbGameToWin || scoreJ2 == nbGameToWin)){
		var body = document.getElementById("body");
		var div=document.createElement("div");
		div.setAttribute("id","divPrincipale");
		var canvas = document.getElementsByTagName("canvas")[0];
		canvas.remove();
		body.appendChild(div);
		clearInterval(act);
		document.removeEventListener('keypress', touche);
		document.removeEventListener('keyup', toucheLache);
		demarrage();
	}
  if(keyr==="o" || keyr==="a")
  {
    if (!ee) ee = true;
    else ee = false;
  }
}

//fonctions de dplacement des raquettes
function J1up()
{
  if(yJ1>tailleRaquette/2)
  yJ1=yJ1- vitesseRaquettes;
}

function J2up()
{
  if(yJ2>tailleRaquette/2)
  yJ2=yJ2- vitesseRaquettes;
}

function J1down()
{
  if(yJ1<canHeight - tailleRaquette/2)
  yJ1=yJ1+ vitesseRaquettes;
}

function J2down()
{
  if(yJ2<canHeight - tailleRaquette/2)
  yJ2=yJ2+ vitesseRaquettes;
}

//Le joueur j a perdu la partie en cours
function perdu(j)
{
  yBalle = canHeight/2;
  xBalle = canWidth/2;
  deltaXBalle = Math.floor(Math.random()*2);
  if(deltaXBalle == 0)
    deltaXBalle = -1-(vitesse/5);
  else
    deltaXBalle = 1+(vitesse/5);
  deltaYBalle = Math.random()*2 - 1;
  yJ1 = canHeight/2;
  yJ2 = canHeight/2;

  if (j==2)
  	scoreJ1++;
  if (j==1)
  	scoreJ2++;

  if (scoreJ1 == nbGameToWin)
  	gagne(1);
  if (scoreJ2 == nbGameToWin)
  	gagne(2);
}

//le joueur j a gagné 'nbGameToWin' parties
function gagne(j)
{
  clearInterval(act);
  ctx.font = "50pt Verdana";
  ctx.fillStyle = "white";
  if (j==1)
    var text = "Left Player win";
  if (j==2)
    var text = "Right Player win";
  var taille = ctx.measureText(text);
  ctx.fillText(text, canWidth/2 - taille.width/2, canHeight/2);
}

//fonction qui modifie les valeurs à afficher à l'ecran toutes les millisecondes
function actualiser()
{
  ctx.clearRect(0, 0, canWidth, canHeight);
  xBalle=xBalle+deltaXBalle;
  yBalle=yBalle+deltaYBalle;

  if(xBalle>=canWidth-17)
  { //coté J2
    deltaXBalle=deltaXBalle*(-1);
    if((yBalle < yJ2 - tailleRaquette/2 + 2 || yBalle > yJ2 + tailleRaquette/2 + 2) && yBalle>=0 && yBalle<=canHeight){
    //J2 perdu
    perdu(2);
    }else{
      deltaYBalle = deltaYBalle + (yBalle - yJ2) / (nbPlayers<2 ? (tailleRaquette/5)*randomPosNeg() : (2*tailleRaquette/5));
    }
  }

  if(xBalle<=17){ // coté J1
    deltaXBalle = deltaXBalle*(-1);
    if((yBalle < yJ1 - tailleRaquette/2 + 2 || yBalle > yJ1 + tailleRaquette/2 + 2)&& yBalle>=0 && yBalle<=canHeight){
      //J2 perdu
      perdu(1);
    }else{
      deltaYBalle = deltaYBalle + (yBalle - yJ1) / (nbPlayers==0 ? (tailleRaquette/5)*randomPosNeg() : (2*tailleRaquette/5));
    }
  }
  if(yBalle>=canHeight-10){
    deltaYBalle=deltaYBalle*(-1);
  }
  if(yBalle<=10){
    deltaYBalle=deltaYBalle*(-1);
  }

  if (nbPlayers < 2 && deltaXBalle == 1 + vitesse/5)
  {
    if (yJ2 < yBalle + tailleRaquette/5) J2down();
    if (yJ2 > yBalle - tailleRaquette/5) J2up();
  }
  if (nbPlayers == 0 && deltaXBalle == -1 - vitesse/5)
  {
    if (yJ1 < yBalle + tailleRaquette/5) J1down();
    if (yJ1 > yBalle - tailleRaquette/5) J1up();
  }

  if(deltaJ2==-1)
      J2up();
  if(deltaJ2==1)
      J2down();
  if(deltaJ1==-1)
      J1up();
  if(deltaJ1==1)
      J1down();

  if (ee)
    document.getElementById("can").style.borderColor = randCol();
  else
    document.getElementById("can").style.borderColor = 'white';

  separeLine();
  drawBalle(xBalle,yBalle);
  drawStick(7.5,yJ1);
  drawStick(canWidth-7.5,yJ2);
  displayScore();
}

//return aleatoirement 1 ou -1
function randomPosNeg()
{
  var r = Math.floor(Math.random()*2-1);
  if (r == 0) return 1;
  return -1;
}

//genere une couleur aleatoire
function randCol()
{
  var R = Math.floor(Math.random()*255);
  var G = Math.floor(Math.random()*255);
  var B = Math.floor(Math.random()*255);

  return "rgb("+R+","+G+","+B+")";
}