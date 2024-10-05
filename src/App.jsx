import { Routes,Route } from "react-router-dom";
import Home from './pages/Home';
import Users from "./components/Users/Users";
import Contact from "./components/Contact/Contact";
import Carrer from "./components/Carrer/Carrer";
import Blog from "./components/Blog/Blog"
import BlogDetails from "./components/Blog/BlogDetials";
// import BlogEdit from "./components/Blog/BlogEdit";
import BlogCreate from "./components/Blog/BlogCreate";

const App = () => {
  return (
    
      <>
        <Home>
          <Routes>
            {/* <Route path="/" element={<Main  />} /> */}
            <Route path="/users" element={<Users/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/carrer" element={<Carrer/>}/>
            <Route path="/blog" element={<Blog/>}/>
            <Route path="/blog/create" element={<BlogCreate/>}/>
            <Route path="/blog/details/:id" element={<BlogDetails />} />
            {/* <Route path="/blog/edit/:id" element={<BlogEdit />} /> */}
            
            
            
          </Routes>
        </Home>
      </>
    
  )
}

export default App
