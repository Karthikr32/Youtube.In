import React from 'react'
import './Navbar.css';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/youtube-logo.svg';
import voice_icon from '../../assets/voice-search-icon.svg';
import upload_icon from '../../assets/upload.svg';
import yt_apps_icon from '../../assets/youtube-apps.svg';
import notifications_icon from '../../assets/notifications.svg';
import search_icon from '../../assets/search.png';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const { setSidebar } = props;
  return (
    <nav className='flex-box'>

      <div className="nav-left-section">
        <div className="tooltip-block">
          <img className='menu-icon' src={menu_icon} alt="" onClick={() => setSidebar(prev => prev === true ? false : true)} />
          <span className='tooltip-info collapse'>Collapse</span>
        </div>
        <Link to={'/'}>
          <img className='youtube-logo' src={logo} alt="" />
        </Link>
      </div>

      <div className="nav-middle-section">
        <input type="text" placeholder='Search' id="search-bar" />

        <div className="tooltip-block">
           <button className="search-btn">
             <img className="search-icon" src={search_icon} />
           </button>
           <span className='tooltip-info search'>Search</span>
        </div>

        <div className="tooltip-block">
           <button className='voice-btn'>
             <img className="voice-icon" src={voice_icon} alt="" />
             <span className='tooltip-info voice'>Voice Search</span>
           </button>
        </div>
      </div>

      <div className="nav-right-section"> 
        <div className="tooltip-block create-div">
           <img className='create-icon' src={upload_icon} alt="" />
           <span className='tooltip-info create'>Create</span>
        </div>  
           
        <div className="tooltip-block tool-div">
           <img className='boxes-icon' src={yt_apps_icon} alt="" />
           <span className='tooltip-info yt-apps'>Youtube Apps</span>
        </div>  

        <div className="tooltip-block notify-div">
           <img className='notification-icon' src={notifications_icon} alt="" />
           <span className='tooltip-info notify'>Notifications</span>
           <span className='notify-count'>3</span>
        </div>  

        <div className="tooltip-block">
          <div className='profile-link'>K</div>
          <span className='tooltip-info profile-k'>Profile</span>
        </div>  
      </div>
    </nav>
  )
}

export default Navbar
