import { resolve } from 'path';
import { WebSocketServer } from 'ws';
export const connect = (server) => {
    let socketServer = new WebSocketServer({ server });
    let currentConnection;
    socketServer === null || socketServer === void 0 ? void 0 : socketServer.on('connection', (socket) => {
        console.log('[websocket] connection established on port: ', server);
        currentConnection = socket;
        resolve();
    });
    socketServer.on('close', () => {
        currentConnection = undefined;
    });
    return {
        send(message, encoding = JSON.stringify) {
            if (!currentConnection)
                return;
            currentConnection === null || currentConnection === void 0 ? void 0 : currentConnection.send(encoding(message));
        },
        disconnect() {
            socketServer.close();
        }
    };
};
