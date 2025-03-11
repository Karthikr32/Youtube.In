import React from 'react'
import './Video.css';
import PlayVideo from '../../Components/Play Video/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';

function Video() { 
  const { categoryId, videoId } = useParams();   // gets retrieved the required "categoryId & videoId" from App.js through useParams HOOK!

  return (
    <div className='play-container'>
      <PlayVideo videoId = {videoId} />
      <Recommended categoryId = {categoryId} />
    </div>
  )
}

export default Video
