import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from './context/context';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <ContextProvider>
    <div className="App flex justify-center items-center w-full min-h-screen h-fit py-12">
    <BrowserRouter>
      <Routes> 
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<Home />} />
 
      </Routes>
    </BrowserRouter> 
    </div>
    </ContextProvider>
  );
}

export default App;
