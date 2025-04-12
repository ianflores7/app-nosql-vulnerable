
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Configurar body-parser y EJS
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Conexión a la base de datos Mongodb
mongoose.connect('mongodb+srv://student:dPgF0sb0ADBUZHCI@clusterunam.6pxlppf.mongodb.net/?retryWrites=true&w=majority&appName=ClusterUNAM', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexión a la base de datos exitosa");
}).catch((err) => {
    console.error("Error al conectar a la base de datos", err);
});

// Esquema del usuario
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', UserSchema);

// Ruta principal (GET) que renderiza el formulario de login
app.get('/', (req, res) => {
    res.render('login');  
});

// Ruta de login (POST)
app.post('/login', async (req, res) => {
    console.log('Datos recibidos:', req.body);// Ver lo que llega desde Postman 

    try {
        // Vulnerabilidad deliberada
        const user = await User.findOne(req.body);

        if (user) {
            res.send('Login exitoso');
        } else {
            res.send('Usuario o contraseña incorrectos');
        }
    } catch (err) {
        console.error(err);
        res.send('Error en el servidor');
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});













