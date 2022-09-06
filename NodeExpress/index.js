const express = require('express'); // requerimos a express
const cors = require('cors');

const routerApi = require('./routes/index');
const app = express();
const port = 3000;

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.Handler');

// rutas o endpoints
app.use(express.json());

// MEJOR CONTROL Y QUE NO TODO EL MUNDO SE CONECTE A MI API
const whitelist = [
  'https://myapp.ejemplo.co',
  'http://127.0.0.1:5500',
  'http://localhost:3000/',
]; // creamos un arreglo con los dominios o las aplicaciones que haran las peticiones
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};

//app.use(cors(options)); // configuracion para decidir quien puede solicitar la API
app.use(cors());

app.use(logErrors);
app.use(boomErrorHandler); //usando boom
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/otraruta', (req, res) => {
  res.send('Hello World otra ruta');
});

routerApi(app);

app.listen(port, () => {
  // iniciamos el server en el puerto
  console.log(`Mi port listen ${port}`);
});
