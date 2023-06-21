import './App.css';
import Navbar2 from './components/Navbar2';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Switch } from "react-router";
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen.js';
import Indexscreen from './screens/Indexscreen';
import Adminscreen from './screens/Adminscreen';
import Profilescreen from './screens/Profilescreen';
import PdfGenerator from './screens/PdfGenerator';
import Reviewscreen from './screens/Reviewscreen';
import Ascreen from './screens/Ascreen';
function App() {
  return (
    <div className="App">
      
      <Navbar2 />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Indexscreen />} />
          <Route path='/bs' Component={()=>{
            window.location.href='http://localhost:4200/'  ;
            return null;
          }}/>
          <Route path='/home' element={<Homescreen />} />
          <Route path='/register' element={<Registerscreen />} />
          <Route path='/login' element={<Loginscreen />} />
          <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen/>}/> 
          <Route path='/admin' element={<Adminscreen />} />
          <Route path='/profile' element={<Profilescreen />} />
          <Route path='/review/:roomid' element={<Reviewscreen/>}/>
          <Route path='/pdf/:uname/:rname/:fdate/:tdate/:tdays/:tamount' element={<PdfGenerator/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
