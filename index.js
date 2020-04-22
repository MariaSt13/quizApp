const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT ? process.env.PORT : 3000;

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => res.sendFile('index.html', {
    root: path.join(__dirname, './')
}))

app.get('/game', (req,res)=>res.sendFile('game.html', {
    root: path.join(__dirname, './')
}))

app.get('/end', (req,res)=>res.sendFile('end.html', {
    root: path.join(__dirname, './')
}))

app.get('/highscores', (req,res)=>res.sendFile('highscores.html', {
    root: path.join(__dirname, './')
}))


app.listen(port, () => console.log("Quiz app is running"))