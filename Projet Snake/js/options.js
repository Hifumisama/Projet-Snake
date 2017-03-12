// Ici on a les 2 variables permettant d'initialiser le dessin dans le canvas, tout simplement

var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');

// on y ajouter la taille de base de notre petit serpent (en pixels, et il s'agit de la taille de son corps, pas de sa longueur)
var initialSizeSnake = 10;


// Ici reposent la taille du canevas
var width = 800;
var height = 400;

// La vitesse initiale du jeu est décrite ici

var gameSpeed = 100;
// Le score (pretty obvious)
var score = 0;

// Cette variable représente à quelle fréquence le jeu va augmenter la vitesse : 10 représente que la vitesse du jeu va augmenter de 10% toutes les 10 pizzas attrapés :D
var difficulty = 10;
var snake;
var pizza;
