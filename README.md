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

## How to send data

Send a `POST` request to http://localhost:8082/debugger with the following format

```TypeScript
const queue: string[] = []
const message = ['hello world!', 'argument1', 123, { foo: 'bar' }]

queue.push(message)

const encodedMessages = queue.map(item => JSON.stringify(item))
const encodedBody = JSON.stringify(encodedMessages)

fetch("http://localhost:8082/debugger", {
  body: encodedBody,
  method: "POST",
})
```

## How to view data

Open http://localhost:8082 in your browser and open the chrome devtools to see the following