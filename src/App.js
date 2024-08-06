import './App.css';
import DragNDrop from './components/DragNDrop';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ClaimInit from './pages/claimInit';
import DocUpload from './pages/docUpload';
import Login from  './pages/Login';
import ReportPage from './pages/reportPage1';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
      <ReportPage/>
      <h2>Page 1</h2>
    </div>
  );
}

export default App;
