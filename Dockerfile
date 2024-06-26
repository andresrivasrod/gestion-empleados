# Usa una imagen base de Node.js
FROM node:14-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias del proyecto
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install --production

# Copia el código fuente del proyecto
COPY . .

# Expone el puerto en el que corre la aplicación NestJS
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
