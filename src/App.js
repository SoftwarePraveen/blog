import Home from "./pages/Home";
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./pages/NotFound";
import './style.scss'
import "./media-query.css";
import Details from "./pages/Details";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import Header from "./component/Header";
import { useEffect, useState } from "react";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

function App() {
  const [active,setActive]=useState("home")
  const [user,setUser]=useState(null)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setUser(authUser)
      }else{
        setUser(null)
      }
    }) 
  },[])
  const handleLogout=async()=>{
    signOut(auth).then(()=>{
      setUser(null)
      setActive("login")
    })
  }
  
  return (
    <div className="App">
    <ToastContainer position="top-center" />
    <BrowserRouter>
    <Header setActive={setActive} active={active} user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route path="/" element={<Home setActive={setActive} user={user}/>} />
        <Route path="/detail/:id" element={<Details setActive={setActive} />} />
        <Route path="/create" element={ user?.uid?<AddEditBlog user={user}/>:<Navigate to="/" />} />
        <Route path="/about" element={<About/>} />
        <Route path="/auth" element={<Auth setActive={setActive}/>} />
        <Route path="/update/:id" element={user?.uid?<AddEditBlog user={user}/>:<Navigate to="/"/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
