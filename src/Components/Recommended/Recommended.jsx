import React, { useEffect, useState } from 'react'
import './Recommended.css';
import Converter, { Api_Key, FilterVideos } from '../../data';
import { Link } from 'react-router-dom';

function Recommended(props) {
  const { categoryId } = props;
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    const relatedVid_Url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&videoCategoryId=${categoryId}&key=${Api_Key}`;
    const response = await fetch(relatedVid_Url);
    const data = await response.json();

    const filtered = await FilterVideos(data);

    setApiData(filtered);
  }

  useEffect(() => {
    fetchData();
  }, [categoryId])

  return (
    <div className='recommended'>
      {apiData.map((item, index) => {
        return (
          <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={index}>
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <div className="video-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{Converter(item.statistics.viewCount)} views</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Recommended;
