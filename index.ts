const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')

const wsLib = require('ws')

const app = express()
app.use(bodyParser.json())

const server = http.createServer(app)
const wss = new wsLib.Server({server})

wss.on('connection', (ws, request: any) => {

  ws.on('message', (message) => {
    console.log(`message received: ${message}`)
  })

})

app.post('/orderCounter', (req, res) => {
  wss.clients.forEach((client) => {
    if (client.readyState === wsLib.OPEN) {
      client.send(JSON.stringify(req.body, null, 2))
    }
  })
})

const port = process.env.PORT || 8080
server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}`)
})

