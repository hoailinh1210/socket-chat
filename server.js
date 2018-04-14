var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/',function(req,res,next){
    res.sendfile(__dirname + '/index.html');
});
io.on('connection',function(socket){
    console.log('a user connected');
    socket.on('chat message',msg => {
        console.log(msg);
    })
    socket.on('disconnect',function(){
        console.log('user disconnected');
    })
})

http.listen(8032,'localhost',function(){
    console.log(`Server is running at http://localhost:8032`);
})
