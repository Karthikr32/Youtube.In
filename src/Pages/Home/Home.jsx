import React, { useState } from 'react'
import './Home.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed';

function Home(props) {
  const { sidebar } = props;
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar sideB = {sidebar} category = {category} setCategory = {setCategory} />
      <div className={`container ${sidebar ? '' : 'large-container'} `}>
        <Feed category = {category} />
      </div>
    </>
  )
}

export default Home
