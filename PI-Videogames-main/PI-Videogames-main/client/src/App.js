import './App.css';
import { Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import { useNavigate } from 'react-router-dom';
import FormIngreso from './components/Form';
import Nav from './components/Nav';
import { useLocation } from 'react-router-dom';
import Detail from './components/Detail';
import Create from './components/Create/Create';

function App() {
  
  const location = useLocation();

  return (

    <div className="App">
    {
    location.pathname !== '/' ? <Nav/>
    : null
    }

    <Routes>
      <Route path="/" element={<FormIngreso/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/create" element={<Create />} />

    </Routes>
    </div>
  );
   
}

export default App;
