import {useEffect} from "react";
import { Routes,Route } from "react-router-dom";
import Home from './pages/Home';
import Users from "./components/Users/Users";
import Contact from "./components/Contact/Contact";
import Carrer from "./components/Carrer/Carrer";
import Blog from "./components/Blog/Blog"
import BlogDetails from "./components/Blog/BlogDetials";
// import BlogEdit from "./components/Blog/BlogEdit";
import BlogCreate from "./components/Blog/BlogCreate";
import Login from "./auth/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BlogEdit from "./components/Blog/BlogEdit";
// import CareerDetails from "./components/Carrer/CarrerDetials";
import CarrerCreate from './components/Carrer/CarrerCreate'
import CareerDetails from "./components/Carrer/CarrerDetials";
import CarrerEdit from "./components/Carrer/CarrerEdit";


const App = () => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()

  useEffect(() => {
    if(user){
      navigate("/users")
    }
  },[])
  useEffect(() => {
    if(!user){
      navigate("/")
    }
  },[])


  if(!user) {
    return (
      <Login />
    )
  }
  return (
    
      <>
        
        <Home>
          <Routes>
            <Route path="/" element={<Users  />} />
            <Route path="/users" element={<Users/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/carrer" element={<Carrer/>}/>
            <Route path="/career/create" element={<CarrerCreate/>}/>
            <Route path="/career/details/:id" element={<CareerDetails  />} />
            <Route path="/career/edit/:jobId" element={<CarrerEdit/>} />
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/blog/create" element={<BlogCreate/>}/>
            <Route path="/blog/details/:id" element={<BlogDetails />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/blog/edit/:id" element={<BlogEdit />} /> */}
            <Route path="/blog/edit/:id" element={<BlogEdit />} />
            
          </Routes>
        </Home>
      </>
    
  )
}

export default App
