// Le draw module ici représente notre moteur de rendu pour notre jeu. 
// On va pouvoir y dessiner des formes (dans notre cas)mais rien n'interdit d'utiliser des sprites par exemple.


var drawModule = (function () {
    
    // on sépare chaque module par commodité et flexibilité du programme.
    // Pourquoi on utilise des fonction anonymes ? (question à répondre un peu plus tard...) (piste : voir le module pattern)
    
    var bodysnake = function(x,y){
        
        // le fill correspond à "remplir", et pour créer un rectangle rempli, il faut indiquer dans la fonction fillRect :
        /*  la position x,
            la position y,
            la hauteur,
            et la largeur de la figure.
            
            Le fillstyle correspond quand à lui à la couleur désirée.
        */
        
        context.fillStyle = 'green';
        context.fillRect(x*initialSizeSnake, y*initialSizeSnake, initialSizeSnake, initialSizeSnake);
        
        /*
            Ici la fonction est exactement la même qu'au dessus, avec une différence, c'est que cette fois on s'occupe des bordures du dessin.
        */
        
        context.strokeStyle = 'green';
        context.strokeRect(x*initialSizeSnake, y*initialSizeSnake, initialSizeSnake, initialSizeSnake);
        
        
    }
    
    var pizza = function(x,y) {
        /*
            Ici on utilise les variables de taille du snake car elles sont ducoup à l'échelle de celui-ci 
            (Question : vu qu'on utilise la même variable pour la taille du snake et de la pizza, est ce que les 2 sont liés)
        */
        
        context.fillStyle ='yellow';
        context.fillRect(x*initialSizeSnake, y*initialSizeSnake, initialSizeSnake, initialSizeSnake);
        
        
        context.fillStyle ='red';
        context.fillRect(x*initialSizeSnake+1, y*initialSizeSnake+1, initialSizeSnake-2, initialSizeSnake-2);
    
    }
    
    /*
        Au tour de la variable de score d'être représentée dans le jeu !
        pour cela, le procédé est similaire à celui des autres, sauf qu'il existe déja une méthode spécifique pour le texte.
        Celle ci a besoin de la chaine de caracère qui convient, suivi de sa position.
    */
    
    var scoreText = function(){
        var score_text = "Score: " + score;
        context.fillStyle = 'blue';
        context.fillText(score_text, 445, height-5);
    }
    
    /* Cette fois nous allons créer le plus complexe :  Le serpent en lui même. A noter que contrairement à bodySnake qui ne correspond qu'à un simple carré,
    On va dans ce cas s'attaquer à la structure du fameux snake :D'*/
    
    
    var drawSnake = function(){
        
        /*
            Pour gérer notre fameux snake, on va utiliser un tableau (ou un array c'est pareil :p). On initialise tout d'abord sa taille et le faut que ce soit un tableau.
        */
        var length = 4 ;
        snake = [];
        
        /* 
            Question :  Pourquoi on crée le tableau "à l'envers" ? (piste possible, c'est peut être parce que le snake grandit au fur et à mesure. 
            Donc la valeur d'initialisation du for sera plus simple à gérer)
        */
        
        /*
            Dans la boucle for, on envoie le chiffre 0, dans chacune des cases du tableau.
        */
        
        // Question :  à quoi correspond la notation ({x:i,y:0}) ?
        /*
            Réponse : il s'agit de la notation d'un objet, tout simplement. 
            Résultat, partout ou ya 0 dans le tableau (donc la valeur y), correspond au corps du snake sans autre distinction particulière.
            En revanche, le x lui contient la position du bloc du corps du serpent (en gros le bloc "length" correspondra à la tête, tandis que le 0 sera la queue).
        */
        
        for (var i = length; i>=0; i--){
            snake.push({x:i,y:0});
        }
    }
        /*
            Au tour de la bonne pizza d'être à crée dans le jeu.
        */
    
        var random = function () {
            /* La fonction Math.random sert à générer des nombres aléatoires, très utile pour placer la pizza sur le plateau de jeu :D
                    
                    Mais après quelques tests, on constate que n'importe quel chiffre sortant de math.random, sera approché de 30 (à l'exception de 0.99999999999999 dont le résultat sera 31)
                    Puis on ajoute le +1 pour obtenir à minima un chiffre entier.
                    puis le Mathfloor, se contente lui de découper la partie entière du nombre. 
                    Cela donne donc des coordonnées valides tout en étant parfaitement aléatoires !
            */
            var coeffrand = 30;
            var positiverand = 1;
            return Math.floor((Math.random()*coeffrand)+positiverand);
        }
        
        var createPizza= function () {
            
            // On crée les données pour rendre aléatoire le spawn de la fameuse pizza :D, et pour cela on passe par un objet pour conserver ses propriétés.
            
                pizzaCoords = {
                    x: random(),
                    y: random()
                }
            /*
                Techniquement on pourrait s'arrêter ici, cependant un problème subsiste... Que faire si la pizza apparaît au même endroit que notre serpent ? 
                eh bien la la pizza serait probablement instantanément ramassée, ce qui est pas vraiment un fonctionnement normal. 
                Pour y remédier on va simplement scanner l'environnement au niveau du serpent, avec une boucle, puis on va retirer des nouveaux chiffres si la position de la pizza 
                serait égale à celle du serpent.
            */
                /*
                    Pour chaque coordonnée testée concernant la position de chacun des blocs du serpent...
                */
                for(var i=0; i>snake.length; i++)
                    var snakeX = snake[i].x;
                    var snakeY = snake[i].y;
            
                        /*
                            On teste SI la coordonnée X, OU la coordonnée Y OU les 2 coordonnées sont identiques. Et si c'est le cas on réaffecte un tirage de variable, que l'on espère plus chanceux :D,
                            SINON on se contente de garder les variables trouvées.
                        */
                        if (pizzaCoords.x===snakeX || pizzaCoords.y === snakeY || pizzaCoords.y === snakeY && pizzaCoords.x===snakeX)
                            {
                                pizzaCoords.x = random();
                                pizzaCoords.y = random();
                            }
        }
        
        /* 
            Il reste désormais une fonction à réaliser, il s'agit du système de collision !
            Pour la faire on va créer une boucle vérifiant que le serpent ne s'est pas touché lui même (car cela equivaut à une défaite bien sûr).
            Cette fonction ressemble beaucoup à celle pour détecter la collision avec la pizza d'ailleurs.
            En traduit cela donne :  
            TANT QUE le tableau n'a pas des valeus identiques aux valeurs x et y entrées aux paramètres, cela retourne true, si non false.
            C'est très pratique car on va aussi pouvoir l'utiliser pour les collisions entre le serpent et la pizza :D. 
            (et plus généralement toutes sortes de collisions apparaissant dans le jeu.)
        */
        
        var checkCollision = function(x,y,array){
            for(var i = 0; i < array.length; i++){
                if(array[i].x === x && array[i].y === y){
                    return true;
                }
                return false;
            }
        }
        
        /*
            Nous avons toutes nos fonctions de prêtes, mais elles ne fonctionnent pas encore entre elles ! 
            C'est donc pour cela que nous allons créer 
            la fonction qui va les gouverner tous, 
            la fonction qui va les amener tous 
            et dans les ténèbres les lier... 
            Au pays du mordor ou s'étendent les ombres.
            
            Mouhahaha (....) hmmm reprenons...
            
            
        */
        
        var main = function() {
            // Mettons en place le fond dans lequel notre petit serpent va évoluer :) Prenons un joli bleu ciel tiens :o.
            
            context.fillStyle = 'lightblue';
            context.fillRect(0,0,width,height);
            
            // on va lui ajouter également une bordure (tant qu'à faire :D) ce sera de plus plus utile pour le joueur pour bien estimer les collisions :D
            
            context.strokeStyle = "black";
            context.strokeRect(0,0,width,height);
            
            // cette ligne est présente pour désactiver le bouton start quand on joue (à vérifier si on peut pas optimiser cela...)
            btn.setAttribute('disabled',true);
           
            // on on affecte les variables de l'objet snake, aux variables de position
            var snakeX = snake[0].x;
            var snakeY = snake[0].y;
            
            /*
                Ci dessous se trouve le système de mouvement du serpent : 
            */
            
            if (direction == 'right') {
                snakeX++;
            }else if (direction == 'left') {
                snakeX--;
            }else if(direction == 'up') {
                snakeY--;
            }else if (direction == 'down'){
                snakeY++;
            }
            
            /*
                Dans les lignes suivantes, on va utiliser le système de collision afin de déterminer les conditions de fin du jeu. Dans notre cas : 
                SI le serpent entre en contact avec le bord Haut de l'écran OU SI il entre en contact avec le bord du bas de l'écran OU SI il entre en contact avec le bord gauche OU si il entre avec le bord droit 
                OU SI il entre en contact avec lui même.
            */
            
            if (snakeX == -1 || snakeX == width / initialSizeSnake || snakeY == -1 || snakeY == height / initialSizeSnake || checkCollision(snakeX, snakeY, snake)){
                // donc si l'une de ces conditions est valide, alors on stoppe le jeu : 
                
                // en remettant en fonction le bouton de démarrage
                btn.removeAttribute('disabled',true);
                
                // mais aussi en nettoyant tout le bazar à l'écran.
                context.clearRect(0,0,width,height);
                
                // ici une fonction inédite : il s'agit du clearInterval. Elle sert à mettre fin à la boucle répétant TOUUUUUT notre programme à chaque rendu.
                // en fait pour que les animations fonctionnnent (ce qui n'est rien de plus qu'une suite d'images rendues très rapidement) on doit "tout" rendre à nouveau à chaque frame.
                // ce qui va être intéressant avec la fonction que l'on verra après :  la fonction setInterval.
                
                // On en profite aussi pour réinitialiser le score, tant qu'à faire ^^
                score = 0;
                gameloop = clearInterval(gameloop);
                return;
            }
            
            /*
                Le système ci dessous montre comment le serpent grandit : 
            */
            
            //Si le serpent se superpose aux coordonnées de la pizza, alors la queue du serpent s'allonge, le score incrémente, 
            //et on recrée une nouvelle pizza pour notre serpent toujours affamé ^^.
            
            /*
                ici nous avons une fonction permettant de booster la vitesse du jeu en fonction des performances du joueur.
                Voyons ci dessous comment cela fonctionne
            */
            var speedBoost = function() {
                
                /* 
                    On récupère la variable de score (qui nous permet de mesurer la performance de notre joueur) et on lui applique un modulo.
                    L'intérêt du modulo ici est de pouvoir incrémenter la vitesse du jeu tous les X pizzas attrapés. Dans notre cas la valeur sera 10, mais est modifiable par la variable "difficulte".
                    
                */
                var levelup  = score % difficulty;
                
                // si le résultat du modulo est nul, alors on augmente la vitesse du jeu. Pour augmenter la vitesse du jeu, on retire puis on met à jour la nouvelle intervalle de temps pour la boucle de jeu.
                if(levelup == 0){
                    gameSpeed = gameSpeed - difficulty;
                    gameloop = clearInterval(gameloop);
                    gameloop = setInterval(main, gameSpeed);
                    
                }
            }
            
            if(snakeX == pizzaCoords.x && snakeY == pizzaCoords.y){
                var tail = {
                    x:snakeX,
                    y:snakeY
                };
                score++;
                speedBoost();
                createPizza();
                
            }
            /*
                Dans l'autre cas, on fait littéralement sauter la dernière entrée du tableau, et on en recrée une juste après.
            */
            else{
                var tail = snake.pop();
                tail.x = snakeX;
                tail.y = snakeY;
            }
            
            // Queue que l'on case par la suite devant la tête, celle ci devenant le nouveau wagon de tête... (qui a parlé de tête à queue ? xD)
            snake.unshift(tail);
            
            for(var i = 0; i<snake.length; i++){
                bodysnake(snake[i].x, snake[i].y);
            }
            
            // on s'occupe de créer la pizza à proprement parler, grâce à la position de celle ci (obtenue précédemment grâce à notre fonction random()) que l'on injecte dans le module de dessin de la pizza :D.
            pizza(pizzaCoords.x, pizzaCoords.y);
            
            // pas besoin d'expliquer ici...
            scoreText();
            
        }
        // on continue avec la fonction d'initialisation, notre fameuse clé de démarrage :D ! 
        
        var init = function () {
            
            // on ajoute une impulsion par défaut à notre petit animal :D
            direction = 'down';
            
            // On Dessine notre avatar à une patte.
            drawSnake();
            
            // on y ajoute sa première nourriture.
            createPizza();
            // et voila le retour tant attendu du setInterval !!!! Applaudissez le bien fort !!! 
            /*
                Il s'agit de la fonction dont nous avons parlé précédemment et qui permet de créer la merveilleuse boucle de rafraichissement du jeu !
                A noter que l'on peut régler le taux de rafraichissement (sait on jamais si on veut un jeu fonctionnant en x3 pour les dingos du pad ! XD).
            */
            gameloop = setInterval(main, gameSpeed);
        }
        
        // Etant donné qu'il s'agit d'un module, on se sert du return ici pour faire valoir la fonction init.
        return {
            init: init
        };
        
}());