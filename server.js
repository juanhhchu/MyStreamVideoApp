const express = require('express');
const app = express();
const server = require('http').Server(app);



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    //res.status(200).send('hola mundo')
    res.render('room')
})



server.listen(3030);