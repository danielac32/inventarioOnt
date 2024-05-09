# Utiliza una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en /app
WORKDIR /app

# Instala SQLite


# Instala Angular CLI de forma global
RUN npm install -g @angular/cli

# Expone el puerto 4200 para el servidor de desarrollo de Angular
EXPOSE 4200

# Ejecuta el comando "ng serve" por defecto cuando se inicie el contenedor
CMD ["ng", "serve", "--host", "0.0.0.0"]
