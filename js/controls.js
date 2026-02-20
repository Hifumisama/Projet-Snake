/*
    Cette partie du code JS, permet de gérer les contrôles du jeu, du bouton au contrôle des touches.
    Et pour cela on utilise le système d'évènements pour gérer tout cela :D.
*/

(function (document, drawModule) {

    // On relie le bouton du HTML au javacript par l'intermédiaire de cette fonction.

    btn = document.getElementById('btn');
    btn.addEventListener("click", function () {
        drawModule.init();
    });

    document.onkeydown = function (event) {
        keyCode = event.keyCode;

        switch (keyCode) {

        case 37:
            if (direction != 'right') {
                direction = 'left';
            }
            console.log('left');
            break;

        case 39:
            if (direction != 'left') {
                direction = 'right';
                console.log('right');
            }
            break;

        case 38:
            if (direction != 'down') {
                direction = 'up';
                console.log('up');
            }
            break;

        case 40:
            if (direction != 'up') {
                direction = 'down';
                console.log('down');
            }
            break;
        }
    }
})(document, drawModule);