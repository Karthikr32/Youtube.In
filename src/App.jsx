import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Video from './Pages/Video/Video';


function App() {
  // Creating state in App.js and passing to component through props
  const [sideBar, setSideBar] = useState(true);
  return (
    <div className=''>
      <Navbar setSidebar = {setSideBar} />
      <Routes>
        <Route path="/" element = {<Home sidebar = {sideBar} />} />
        <Route path="/video/:categoryId/:videoId" element = {<Video />} />   {/* while clicking a video it navigates to other component. in URL it looks like this path */}
      </Routes>
    </div>
  )
}

export default App;
