const { ipcRenderer } = require('electron');

function newGame(){
	mainScreen = document.getElementById("mainScreen");
	console.log(mainScreen);
	mainScreen.innerHTML = "<h1>Tela de novo jogo</h1>";
}

function loadGame(){
	mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = "<h1>Tela de carregar jogo</h1>";
}

function options(){
	mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = "<h1>Tela de Opções</h1>";
}

function quit() {
  ipcRenderer.send('quit-app');
}

function credits(){
	mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = "<h1>Tela de Créditos</h1>";
}