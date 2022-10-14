import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { setActiveDeveloper } from "../../store/developer/developerSlice";
import { loadDevelopers, loadVideosAndList } from "../../store/developer/thunks";
import { VideoListCard } from "../components/VideoListCard";
import { CardGroup, Col, Container, Row } from "react-bootstrap"


const YoutubePage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { activeDeveloper, videos, lists } = useSelector(state => state.developer)

  useEffect(() => {
    dispatch(loadDevelopers());
    if (params.developer_id && params.developer_id !== "") {
      if (!activeDeveloper) {
        dispatch(setActiveDeveloper(params.developer_id));
      }
      dispatch(loadVideosAndList(params.developer_id))
    } else {
      dispatch(loadVideosAndList())
    }
  }, [activeDeveloper, params.developer_id, dispatch])



  // setActiveDeveloper()
  return (
    <>

      <Container fluid className=" p-4 d-flex align-items-center flex-column">
        <h2 className="mb-4 ">Vídeos y listas de Youtube</h2>
        <CardGroup >
          <Row className="d-flex justify-content-center" >
            {videos.length > 0 && videos.map(video => {
              return (
                <Col className="mb-3" xl={3} lg={4} md={6} sm={6} key={video.video_id}>
                  <VideoListCard mediaData={video} typeOfMedia={"Vídeo"} />
                </Col>
              )
            })

            }
            {lists.length > 0 && lists.map(list => {
              return (
                <Col className="mb-3" xl={3} lg={4} md={6} sm={6} key={list.list_id} >
                  <VideoListCard mediaData={list} typeOfMedia={"Lista de reproducción"} />
                </Col>
              )
            })

            }

          </Row>
        </CardGroup>
      </Container>



    </>
  )
}

export default YoutubePage