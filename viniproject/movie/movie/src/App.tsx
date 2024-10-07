import React from 'react'
import Navbar from './Components/Home/Navbar';
import MainHomepage from './Components/Home/MainHomepage';
import LoginComponent from './Components/Home/LoginComponent';
import Register from './Components/Home/Register';
import Adminhome from './Components/Admin/Adminhome';
import MovieForm from './Components/Admin/MovieForm';
import MovieList from './Components/Admin/MovieList';
import Viewuser from './Components/Admin/Viewuser';
import Admindashboard from './Components/Admin/Admindashboard';
import Homepage from './Components/Customer/Homepage';
import ViewMovieDetails from './Components/Customer/ViewMovieDetails';
import ViewRating from './Components/Admin/ViewRating';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Components/Customer/Profile';

const App = () => {
    
  
 
  
  
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainHomepage />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Adminhome />} >
            <Route path="addmovie" element={<MovieForm />} />
            <Route path="addmovie/:id" element={<MovieForm />} />
            <Route path="movielist" element={<MovieList />} />
            <Route path="viewuser" element={<Viewuser />} />
            <Route path="dashboard" element={<Admindashboard />} />
            <Route path="viewrating" element={<ViewRating />} />




          </Route>
          <Route path="/customer" element={<Homepage />} />
          <Route path="/viewmovie/:id" element={<ViewMovieDetails />} />
          <Route path="/profile" element={<Profile/>} />
          
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App
