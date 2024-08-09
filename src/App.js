import './App.css';
import DragNDrop from './components/DragNDrop';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ClaimInit from './pages/claimInit';
import DocUpload from './pages/docUpload';
import HomePage from './pages/HomePage';
import Login from  './pages/Login';
import ReportPage from './pages/reportPage1';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Hero/>
      <HomePage/>
      {/* <Login/> */}
      {/* <ClaimInit/> */}
      {/* <DocUpload/> */}
      {/* <ReportPage/> */}
      <h2 className='mt-20 bg-color-blue'>Footer</h2>
    </div>
  );
}

export default App;
