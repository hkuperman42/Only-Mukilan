import { useState } from 'react';

export default function App() {
  const [log, setLog] = useState("");
  const chatSocket = new WebSocket('ws://127.0.0.1:8000/api/ws/test/');
  chatSocket.onclose = () => {
    console.log("WebSocket Closed Unexpectedly");
  };
  chatSocket.onmessage = (e) => {
    const data = JSON.parse(e.data);
    setLog(log + data.message + "\n");
  }

  return (
    <>
      <textarea rows="50" cols="100" value={log}></textarea>
      <input id="textInput" type="text" size="100"></input>
      <input onClick={() => {
          const messageInputDom = document.querySelector('#textInput');
          const message = messageInputDom.value;
          chatSocket.send(JSON.stringify({
            'message': message
          }));
          messageInputDom.value = '';
        }} type="button" value="Send"></input>
    </>
  );
}