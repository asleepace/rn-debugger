const ws = new WebSocket('ws://localhost:8082/')

function faviconUpdate(status) {
  const link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  if (status === 'connected') {
    link.href = '/online.svg'
  } else if (status === 'waiting') {
    link.href = '/waiting.svg'
  } else {
    link.href = '/offline.svg'
  }
}

// output current status to html
function setStatus(status) {
  document.getElementById('status').innerHTML = status
  faviconUpdate(status)
}

// open websocket connection
ws.addEventListener('open', () => {
  console.log('[websocket] connected to the WebSocket server!');
  setStatus('waiting')
})

// start listening for messages
ws.addEventListener('message', ({ data }) => {

  setStatus('connected')

  // parse outer rows
  const messages = JSON.parse(data)

  // outer layer is an array of messages
  messages.forEach((message) => {

    // inner layer is the json string
    const json = JSON.parse(message)

    console.log(...json)
  })
})

ws.addEventListener('close', () => {
  console.warn('[websocket] disconnected from the WebSocket server!');
  setStatus('closed')
})

ws.addEventListener('error', (error) => {
  console.warn('[websocket] error: ', error)
  setStatus('error')
})
