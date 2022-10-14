# RRSS Developers
## DEMO: https://rr-sss.herokuapp.com/


## OBJETIVO:
Esta aplicación conecta con la api de Git-Hub Twitter y YouTube, a fin de conseguir las úlitmas publiaciones de una serie de personas.
Para este ejemplo hemos pensando en programadores, a fin de ayudar a  aquellos que están empezando a encontrar información gratuita en una sóla página sin necesidad de buscar en múltiples sitios distintos.

La aplicación permite con unos datos mínimos instroducidos manualmente en un JSON crear la base de datos. A partride aquí la acutaliacíón de los datos se realiza automaticamente haciendo 3 peticiones GET, una a cada API externa.

Actualmente las peticiones GET se hacen de forma manual para evitar costes y consumo de api. Por este mismo motivo tampoco se ha habilitado la posibilidad de actualizar los datos desde la home.

## TECNOLOGÍAS
- BACK
    - MongoDB y Mongoose
    - NodeJS
    - Swagger (documentación)
    - Jest (testing)
    - SuperTest (Testing)
- FRONT
    - ReactJS
    - Redux toolkit
    - Bootstrap

## INSTRUCCIONES
- Para comprobar el funcionamiento de la aplicación en loca, clonar o descargar el repositorio. y ejecutar en carpeta front y en carpeta back los comandos:
```
npm install
```

- BACK:
    - El archivo .env.example, muestra los datos necesarios para que el back funcione: Token de twitter, token de youtube...
    - Creación de la base de datos:
        - El archivo /db/json/developers.json tiene incluidos los datos y la estructura mínima para crear la base de datos en Mongo. Haciendo una petición GET a la ruta "host/api/v1/JSON. Se creará la base de datos
    - Actualización e introducción automática de datos funciona realizando peticiones GET a las siguientes rutas
        - GITHUB: host/api/v1/git-hub/update
        - YOUTUBE: host/api/v1/youtube/update
        - TWITTER: host/api/v1/twitter/update

