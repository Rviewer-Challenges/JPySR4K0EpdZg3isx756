import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { loadTweets } from "../../store/developer/thunks";
import TwitterCard from "../components/TwitterCard";

const TwitterPage = () => {
  const dispatch = useDispatch();
  const { tweets } = useSelector(state => state.developer);
  console.log(tweets)
  const { twitterId } = useParams();
  useEffect(() => {
    dispatch(loadTweets(twitterId))
  }, [dispatch, twitterId])
  console.log(tweets)
  if(Object.keys(tweets).length ===0){
    
    return(<h1>Cargando...</h1>)
  }
  return (
    <Container fluid className="p-3">
    {Object.keys(tweets).length >0 &&
      <TwitterCard tweets={tweets}/>

    }
      
    </Container>
  )
}

export default TwitterPage