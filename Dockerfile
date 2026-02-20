# Image légère avec nginx pour servir le site statique
FROM nginx:alpine

# Copie tous les fichiers du projet dans le dossier par défaut de nginx
COPY . /usr/share/nginx/html/

# Expose le port 80
EXPOSE 80

# nginx démarre automatiquement avec l'image
