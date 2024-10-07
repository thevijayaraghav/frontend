import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from '../src/Component/Form';
import UserManagement from '../src/Component/UserManagement'; 
import Updating from "../src/Component/Parentcomponent";
import Home from '../src/Component/Home';
import '../src/App.css'




function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Form />} />
        <Route path="/register" element={<Form />} />
        <Route path="/users" element={<UserManagement />} /> 
        <Route path="/update/:UserId" element={<Updating/>} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
