# RN Debugger

a simple websocket server and client which can help remotely debug react-native applications.

```bash
# clone the project
git clone https://github.com/asleepace/rn-debugger.git
cd rn-debugger

# install dependencies and start server
npm install
npm run start
```

### Sending data to rn-debugger client

Once the server is running it will listen for `POST` requests on http://localhost:8082/debugger and forward the body to the connected client, below is the message format:

```TypeScript
const queue: string[] = []
const message = JSON.stringify(['hello world!', 'argument1', 'argument2', '...'])

queue.push(message)

fetch("http://localhost:8082/debugger", {
  body: JSON.stringify(quque)
  method: "POST",
})
```

