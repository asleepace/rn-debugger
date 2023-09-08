import express, { Express, Request, Response } from 'express'
import * as ws from './src/socket.js'
import dotenv from 'dotenv'
import http from 'http'
import path from "path"


dotenv.config()

const PORT = process.env.PORT || 8082
const STDIN = '/debugger'

const app = express()
app.use(express.static('public'))
app.use(express.static('files'))
app.use(express.json({ limit: '100mb' }))
dotenv.config()

// initialize http server
const server = http.createServer(app)
const sockets = ws.connect(server)

// define the client route
app.get('/', (request: Request, response: Response) => {
  response.sendFile(path.resolve('src', 'index.html'))
})

// define standard input route
app.post(STDIN, (request: Request, response: Response) => {
  console.log('incoming message!')
  sockets.send(request.body)
  response.sendStatus(200)
})

// start server on port
server.listen(PORT, () => {
  console.log(`[rn-debugger] listening on http://localhost:${PORT}/`)
  console.log(`[rn-debugger] POST to http://localhost:${PORT}${STDIN}`)
})