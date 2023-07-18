import logo from './logo.svg';
import './App.css';
import axios from 'axios'

function App() {
  axios
    .post("http://192.168.1.15:8080/api/" + "profile/", {
      name: "Axios Test",
      age: 18,
      height: "5'9\"",
      bio: "Axios Test Profile",
      pfp: null,
      user: 1,
    })
    .then(response => {
      console.log(response);
      console.log("Profile Created");
    })
    .catch(error => {
      console.log(error.request.responseText);
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
