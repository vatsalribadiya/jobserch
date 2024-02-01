import './App.css';
import Home from './componet/Home';
import Navbar from './componet/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from './componet/Services';
import Contact from './componet/Contact';
import LoadingBar from 'react-top-loading-bar';
import { useState } from 'react';

function App() {
  const [progress, setProgress] = useState(0);
  function setProgressBar(progress) {
    setProgress(progress);
  }
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => setProgress(0)}/>
        <Routes>
            <Route exact path="/" element={<Home setProgressBar={setProgressBar}/>} />
            <Route exact path="/service" element={<Services/>} />
            <Route exact path="/contact" element={<Contact/>} />
          </Routes>
       </Router>
    </div>
  );
}

export default App;
