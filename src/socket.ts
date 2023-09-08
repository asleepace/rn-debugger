import { resolve } from 'path'
import WebSocket, { WebSocketServer } from 'ws'


export const connect = (server: any) => {

  let socketServer: WebSocketServer = new WebSocketServer({ server })
  let currentConnection: WebSocket | undefined

  socketServer?.on('connection', (socket) => {
    console.log('[websocket] connection established!')
    currentConnection = socket
    resolve()
  })

  socketServer.on('close', () => {
    console.warn('[websocket] connection closed!')
    currentConnection = undefined
  })

  return {
    send(message: any, encoding = JSON.stringify) {
      if (!currentConnection) return
      currentConnection?.send(encoding(message))
    },
    disconnect() {
      socketServer.close()
    }
  }
}
