const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/routes');
const db = require('./config/db');
var session = require('express-session')

//conectar ala bd y crear estructura definida en el modelo
db.sync()
    .then(() => console.log('Conectado al Servidor'))
    .catch(error => console.log(error));

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.set('view engine','ejs');
//app.use(express.static('public'));
//console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

//configurar sesion
app.use(session({
    secret: 'videollamada-sie7e',
    resave: false,
    saveUninitialized: true
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//crea ruta dinamica
app.use('/', routes());

app.use(require('./routes/mail_r'));


//configuracion del room
io.on('connection',socket =>{
    socket.on('join-room',(roomId, userId, userType) =>{
        console.log(roomId, userId, userType);
        //console.log(socket.adapter.rooms)
        //console.log(socket.adapter.rooms.get(roomId).size)
        var conections=0;
        if(socket.adapter.rooms.get(roomId) != undefined){
            conections=socket.adapter.rooms.get(roomId).size;
        }

        if(userType == 'user' && conections < 1){
            var destination = '/no-disponible';
            socket.emit('redirect', destination);
        }else{
            console.log('conectado');
            socket.join(roomId);
            socket.broadcast.to(roomId).emit('user-connected', userId);
        }
        
        socket.on('message', (message,name) => {
            //send message to the same room
            var r=userId.split("-");
            io.to(roomId).emit('createMessage', message,name);
        }); 
        
        socket.on('disconnect', () => {
            console.log(roomId, userId, userType,' disconnect');
            if(userType != 'host'){
                socket.to(roomId).broadcast.emit('user-disconnected', userId);
            }else{
                console.log('leave-room');
                var destination = '/no-disponible';
                var destination2 = '/new-room';
                socket.to(roomId).emit('end-call', destination);
                socket.emit('redirect', destination2);
            }
        });
    })

    socket.on('leave-room',(roomId, userType) =>{
        if(userType == 'host'){
            console.log('leave-room');
            var destination = '/no-disponible';
            var destination2 = '/new-room';
            socket.to(roomId).emit('end-call', destination);
            socket.emit('redirect', destination2);
        }else if(userType == 'user'){
            var destination = '/user';
            socket.emit('redirect', destination);
        }
    })
});

server.listen(process.env.PORT || 3000); 