import { useState, useEffect, useCallback } from 'react';
import useWebSocket from 'react-use-websocket';

const webSocketURL = 'ws://192.168.1.15:8080/api/ws/test/'

export default function App() {
  const [log, setLog] = useState("");
  const {sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState, getWebSocket} = useWebSocket(
    webSocketURL,
    {
      onOpen: () => console.log("Opened WebSocket Connection"),
      onClose: () => console.log("Websocket Closed"),
      shouldReconnect: (closeEvent) => true,
    },
  );

  useEffect(() => {
    if (lastJsonMessage !== null && lastJsonMessage !== {}) {
      setLog((prev) => prev + lastJsonMessage['message'] + "\n");
    }
  }, [lastJsonMessage, setLog])

  return (
    <>
      <textarea rows="50" cols="100" value={log}></textarea>
      <input id="textInput" type="text" size="100"></input>
      <input onClick={useCallback(() => {
          const messageInputDom = document.querySelector('#textInput');
          const message = messageInputDom.value;
          sendJsonMessage({'message': message});
          messageInputDom.value = '';
        }, [])} type="button" value="Send"></input>
    </>
  );
}