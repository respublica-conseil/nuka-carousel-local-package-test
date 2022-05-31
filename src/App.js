import Carousel from "nuka-carousel";

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <main className="App">
      <Carousel>
        <img src={logo} className="App-logo" alt="logo" />
        <img src={logo} className="App-logo" alt="logo" />
      </Carousel>
    </main>
  );
}

export default App;
