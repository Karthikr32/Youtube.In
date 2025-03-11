import React, { useEffect, useState } from 'react'
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import Converter, { Api_Key } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

function PlayVideo() {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchData = async () => {
    // Fetching video data from video Id
    const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${Api_Key}`;
    const response = await fetch(video_url);
    await response.json().then(data => setApiData(data.items[0]));
  }

  const fetchChannelData = async (channelId) => {
    // Fetching Channel data from video Id
    const channel_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${Api_Key}`;
    const response = await fetch(channel_url);
    await response.json().then(data => setChannelData(data.items[0]));
  }

  const fetchComments = async () => {
    // fetching comments data
    const cmdUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${Api_Key}`;
    const response = await fetch(cmdUrl);
    await response.json().then(data => setComments(data.items));
  }
  useEffect(() => {
    fetchData();
  }, [videoId]);

  useEffect(() => {
    if(apiData) {      
      fetchChannelData(apiData.snippet.channelId);
    }
  }, [apiData]);

  useEffect(() => {
    fetchComments();
  }, [apiData])

  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted /> */}
      <iframe src={ videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : ''} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <h3>{apiData? apiData.snippet.title : 'Video Title' }</h3>

      <div className='play-video-info'>
        <p>{ apiData ? Converter(apiData.statistics.viewCount) : 'View count' } views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : 'Somedays ago'}</p>
        <div>
          <span><img src={like} alt="" />{ apiData ? Converter(apiData.statistics.likeCount) : '125' }</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>

      <hr />

      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.high.url : 'profile-picture'} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : 'Channel name'}</p>
          <span>{channelData ? Converter(channelData.statistics.subscriberCount) : '1M '} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      <div className="description-text">
        <p>{apiData ? apiData.snippet.description : 'Description list'}</p>
        <hr />
        <h4>{ apiData ? Converter(apiData.statistics.commentCount) : '125' } Comments</h4>
        
        {comments.map((item, index) => {
          return(
            <div className="comments" key={index}>
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textOriginal}</p>
                <div className="comment-action">
                  <img src={like} alt="" /><span>{Converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" /><span></span>
                </div>
              </div>
           </div>
          );
        })}
      </div>
    </div>
  )
}

export default PlayVideo;
