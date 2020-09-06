const express = require('express');
const app = express();
const server = require('http').Server(app);
const { v4: uuidv4 } = require('uuid');
app.set('view engine', 'ejs');
app.use(express.static('public'));

//peticion de id con la libreria uuid para nuestras salas
app.get('/', (req, res)=> {
    res.redirect(`/${uuidv4()}`);
})
//creamos la sala con la id 
app.get('/:room', (req, res)=>{
    res.render('room', { roomId: req.params.room })
})





server.listen(3030);
