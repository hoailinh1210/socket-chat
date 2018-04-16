var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


app.get('/',function(req,res,next){
    res.sendfile(__dirname + '/index.html');
});

var count = 0;
var users = {};

io.on('connection',function(socket){
    console.log('a user connected');
    var id = socket.id;
    count++;
    io.emit('online',{count});
    socket.on('user name',na => {
        users[socket.id] = na;
        socket.name = na;
        io.emit('online',{users:users,id: socket.id});
    })

    socket.on('chat message',msg => {
        io.emit('chat message',{msg,name: socket.name});
    })
    socket.on('disconnect',function(){
        console.log('user disconnected');
        count--;
        io.emit('online',{count});
    })
})

http.listen(8032,'localhost',function(){
    console.log(`Server is running at http://localhost:8032`);
})
