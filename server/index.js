var port = process.env.PORT || 9000
var io = require('socket.io')(port)

var players = {}
var powerups={}
var carrot={}

powerups[id] = carrot

io.on('connection', function (socket) {
  socket.broadcast.emit('hi')
  console.log('connection', socket.id)

  for (var playerId in players) {
    var playerPos = players[playerId]
    socket.emit('update_position', playerPos)
  }
  
  for(var powerId in powerups){
    var powerPos=powerups[powerId]
    socket.emit('poner_powerups',powerPos)
  }

  socket.on('disconnect', function () {
    console.log('disconnection', socket.id)
    delete players[socket.id]
    socket.broadcast.emit('player_disconnected', socket.id)

 })
  socket.on('update_position', function (pos) {
    pos.id = socket.id
    players[socket.id] = pos
    socket.broadcast.emit('update_position', pos)
  })


})

console.log('server started on port', port)
