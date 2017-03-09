// Ici on a les 2 variables permettant d'initialiser le dessin dans le canvas, tout simplement

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

// on y ajouter la taille de base de notre petit serpent (en pixels, et il s'agit de la taille de son corps, pas de sa longueur)
var tailleSnake = 10;


// Ici reposent la taille du canevas
var width = 800;
var height = 400;

// Le score (pretty obvious)
var score = 0;
var snake;
var pizza;
