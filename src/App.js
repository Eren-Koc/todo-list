import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from './context/context';
import Home from './pages/Home';
function App() {
  return (
    <ContextProvider>
    <div className="App flex justify-center items-center bg-app-background w-full min-h-screen h-fit py-12">
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
