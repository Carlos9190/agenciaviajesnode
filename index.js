import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

//conectar db
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error));

//Definir puerto
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener año act
app.use((req, res, next) => { //next para enviar al siguiente middleware
    const year = new Date();
    res.locals.ActualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes';
    next();
});

//Agregar body parser para leer los datos del form
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor está funcionando en el puerto ${port}`)
});