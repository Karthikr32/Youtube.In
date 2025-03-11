import React, { useEffect, useState } from 'react'
import './Feed.css';
import { Link } from 'react-router-dom';
import Converter, { Api_Key, GoToTop } from '../../data';
import moment from 'moment';

function Feed(props) {
  const { category } = props;
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const url  = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=IN&videoCategoryId=${category}&key=${Api_Key}`;
    let response = await fetch(url);
    await response.json().then(data => setData(data.items));
  }

  useEffect(() => {
    fetchData()
  }, [category]);

  return (
    <div className='feed'>
      {data.map((item, index) => {
        return(
          <Link onClick={GoToTop} to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="cards">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
             <h2>{item.snippet.title}</h2>
             <h3>{item.snippet.channelTitle}</h3>
             <p>{Converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
          </Link>
        )
      })}
    </div>
  )
}

export default Feed
