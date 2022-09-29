const app = require('express')()
const cors = require('cors')
const http = require('http')
const { Server } = require('socket.io')

const PORT = 3030
const CLIENT_URI = '*'

const corsOptions = {
  origin: CLIENT_URI,
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const server = http.createServer(app)

const io = new Server(server, {
  cors: corsOptions,
})

io.on('connection', socket => {
  console.log(`user connected: ${ socket.id }`)

  socket.on('message_from_client', text => {
    console.log(`message received from: ${ socket.id }:`)
    console.log(` > "${ text }"`)
    io.emit('new_message_broadcast', {
      userId: socket.id,
      text: text,
      timestamp: new Date(),
    })
  })
})

server.listen(PORT, () => {
  console.log(`server is listening on port ${ PORT }...`)
})
