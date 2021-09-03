const express = require('express')
const app = express();

const http = require('http')
const delay = require('delay')
const server = http.createServer(app)
const {Server} = require('socket.io')

const io = new Server(server)

app.get('/', (req, res) => {
    //res.sendFile(__dirname + '/index.html');
    res.sendFile(__dirname + '/client/login.html');
})

app.get("/index", (req, res) => {
    res.redirect('/index.html');
  });

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/client"));

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('on-chat', data => {
        io.emit('user-chat', data);
    });
    socket.on('on-login', data => {
        io.emit('user-login', data);
    });
});

async function getBitcoinPrice(){
    while(true){
        const price = 31490 + Math.random() * 400;
        io.emit('bitcoin-price',{
            price: parseFloat(price.toFixed(2))
        })
        await delay(1000);
    }
}

async function getBNBPrice(){
    while(true){
        const price = 480 + Math.random() * 10;
        io.emit('bnb-price',{
            price: parseFloat(price.toFixed(2))
        })
        await delay(1000);
    }
}

async function getETHPrice(){
    while(true){
        const price = 2875 + Math.random() * 20;
        io.emit('eth-price',{
            price: parseFloat(price.toFixed(2))
        })
        await delay(1000);
    }
}

getBitcoinPrice();
getBNBPrice();
getETHPrice();

server.listen(3000, () => {
    console.log('listening on port 3000');
})