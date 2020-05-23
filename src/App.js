import React from 'react';
import Routes from './routes';
import Nav from './components/nav';
import './global.css';

function App() {
  return (
    <div className="App">
      {/* <Nav></Nav> */}
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
