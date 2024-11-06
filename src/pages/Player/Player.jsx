import {useEffect,useState} from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
const Player = () => {

  const {id}=useParams();
  const navigate=useNavigate();

  const [apiData,setApiData]=useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjk3ODI0YTM0ZmY0YzY0OTEyZTM5YmZmYzU3YTgyOSIsIm5iZiI6MTczMDc1MzM2NC4wMjY2OTg4LCJzdWIiOiI2NzIwZTc4MTI2ODVjYjY1NjNjMTg5NzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.o3yEWo8rVEeI8qt2Tas4tZKMMRrQTBOuP1JrElWTZpY'
    }
  };
  
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results[0]))
    .catch(err => console.error(err));

  },[])
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      <iframe src={`https://www.youtube.com/embed/Tvt6E9N7AQw&t/${apiData.key}`} width='90%' height='90%' frameBorder="0" title="trailer" allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
      
    </div>
  )
}

export default Player
