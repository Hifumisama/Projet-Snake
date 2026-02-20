# Projet Snake

Un jeu Snake classique développé en JavaScript avec HTML5 Canvas.

## Description

Ce projet est une implémentation du célèbre jeu Snake, où le joueur contrôle un serpent qui doit manger des pizzas pour grandir tout en évitant de se mordre la queue ou de percuter les murs. Le jeu devient progressivement plus rapide au fur et à mesure que le score augmente.

## Fonctionnalités

- **Gameplay classique** : Déplacez le serpent avec les flèches directionnelles
- **Système de score** : Gagnez des points en mangeant des pizzas
- **Difficulté progressive** : La vitesse du jeu augmente toutes les 10 pizzas attrapées
- **Détection de collision** : Le jeu se termine si le serpent se mord la queue ou touche les bords
- **Interface visuelle** : Rendu graphique avec HTML5 Canvas et style Bootstrap

## Comment jouer

1. Ouvrez le fichier `Projet Snake/index.html` dans votre navigateur web
2. Cliquez sur le bouton "Cliquez ici pour commencer"
3. Utilisez les touches fléchées pour diriger le serpent :
   - **←** : Gauche
   - **→** : Droite
   - **↑** : Haut
   - **↓** : Bas
4. Mangez les pizzas (carrés rouges) pour gagner des points et faire grandir votre serpent
5. Évitez de toucher les bords du terrain ou votre propre corps

## Structure du projet

```
Projet Snake/
├── index.html              # Page principale du jeu
├── css/
│   └── style.css          # Styles personnalisés
├── js/
│   ├── options.js         # Variables et paramètres du jeu
│   ├── fonctions.js       # Moteur de rendu et logique du jeu
│   └── controls.js        # Gestion des contrôles clavier
└── img/
    ├── bannière-d'accueil.gif
    ├── dessin-de-serpent-3.jpg
    └── snake.ai
```

## Détails techniques

### Architecture modulaire

Le code est organisé en trois modules JavaScript distincts :

#### `options.js`
Contient les variables globales et paramètres du jeu :
- Taille du canvas (800x400 pixels)
- Taille initiale du serpent (10 pixels)
- Vitesse de jeu de base (100ms)
- Système de difficulté (augmentation de vitesse tous les 10 points)

#### `fonctions.js`
Le moteur principal du jeu avec le pattern de module :
- `bodysnake(x, y)` : Dessine un segment du corps du serpent
- `pizza(x, y)` : Dessine la nourriture
- `drawSnake()` : Initialise le serpent avec 4 segments
- `createPizza()` : Génère aléatoirement une pizza sur le terrain
- `checkCollision(x, y, array)` : Détecte les collisions
- `speedBoost()` : Augmente la vitesse progressivement
- `main()` : Boucle de jeu principale (gère les mouvements, collisions, score)
- `init()` : Initialise et démarre le jeu

#### `controls.js`
Gère les événements utilisateur :
- Liaison du bouton de démarrage
- Capture des touches directionnelles (codes 37-40)
- Empêche les mouvements en sens inverse (ex: impossible d'aller à gauche si on va à droite)

### Technologies utilisées

- **HTML5 Canvas** : Pour le rendu graphique 2D
- **JavaScript ES5** : Logique du jeu
- **Bootstrap 3.3.7** : Mise en page et styles
- **jQuery 3.1.1** : Manipulation du DOM

### Mécaniques de jeu

- **Croissance** : Quand le serpent mange une pizza, un nouveau segment est ajouté
- **Mouvement** : Le serpent se déplace continuellement dans la direction choisie
- **Vitesse progressive** : La vitesse augmente de 10ms toutes les 10 pizzas (modifiable via la variable `difficulty`)
- **Conditions de défaite** :
  - Collision avec les bords du terrain
  - Le serpent se mord lui-même

## Déploiement Docker

Le projet inclut une configuration Docker pour un déploiement facile et rapide.

### Option 1 : Avec Docker Compose (recommandé)

```bash
# Construire et lancer le conteneur
docker-compose up -d

# Le jeu sera accessible sur http://localhost:8080
```

Pour arrêter :
```bash
docker-compose down
```

### Option 2 : Avec Docker directement

```bash
# Construire l'image
docker build -t projet-snake .

# Lancer le conteneur
docker run -d -p 8080:80 --name snake-game projet-snake

# Le jeu sera accessible sur http://localhost:8080
```

Pour arrêter :
```bash
docker stop snake-game
docker rm snake-game
```

### Caractéristiques du conteneur

- Image de base : `nginx:alpine` (très légère, ~23MB)
- Port exposé : 80 (mappé sur 8080 de l'hôte)
- Restart policy : `unless-stopped` (avec docker-compose)

## Auteur

Créé par **Mehdi Khayat** à l'occasion d'un test pour la société COTEP.

## Licence

Ce projet est un travail académique et de démonstration.
