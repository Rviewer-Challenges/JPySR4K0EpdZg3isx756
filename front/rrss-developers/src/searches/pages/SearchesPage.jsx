import { useEffect } from "react";
import { Container, Alert, Row, Col, CardGroup, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import RepositorieAcordion from "../../github/components/RepositorieAcordion";
import { searchData } from "../../store/developer/thunks";
import { VideoListCard } from "../../youtube/components/VideoListCard";
const SearchesPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { lists, videos, repositories } = useSelector(state => state.developer)

  const youtube = (searchParams.get('youtube') === `true`
    ? true
    : false
  )
  const github = searchParams.get('github') === `true`
    ? true
    : false
  const searchText = searchParams.get('text');

  useEffect(() => {
    const searchIn = { youtube: youtube, github: github };

    dispatch(searchData(searchIn, searchText))

  }, [dispatch, youtube, github, searchText])

  if (lists.length === 0 && videos.length === 0 && repositories.length === 0) {
    return (
      <Alert variant="danger" className="mt-2 text-center w-50 m-auto">No se han encontrado resultados para la búsqueda</Alert>
    )
  }

  return (
    <Container fluid className="mt-2 mb-5">
      <h2 className="text-center">Resultados de búsqueda</h2>
      <Alert variant="dark" >Resultados de la búsqueda: Vídeos: {videos.length} Listas: {lists.length} Repositorios {repositories.length} </Alert>
      {(lists.length > 0 || videos.length > 0) &&
        <Container fluid>
          <h3 className="mb-4 text-center mt-2">Vídeos y listas Youtube</h3>

          <CardGroup >
            <Row className="d-flex justify-content-center" >
              {lists.map(list => {
                return (
                  <Col className="mb-3" xl={3} lg={4} md={6} sm={6} key={list._id}>
                    <VideoListCard mediaData={list} typeOfMedia="Lista" />
                  </Col>
                )
              })
              }
              {videos.map(video => {
                return (
                  <Col className="mb-3" xl={3} lg={4} md={6} sm={6} key={video._id}>
                    <VideoListCard mediaData={video} typeOfMedia="Vídeo" />
                  </Col>
                )
              })

              }
            </Row>
          </CardGroup>
        </Container>
      }
      {repositories.length > 0 &&
            <Container  className="mt-5 text-center">
              <h3 className="mb-4 ">Repositorios de Github</h3>
              <Accordion >
                <Row>
                  {repositories.map((repo) => {

                    return (
                      <Col lg={4} key={repo._id}>
                        <RepositorieAcordion repoData={repo} />
                      </Col>
                    )
                  })
                  }
                </Row>
              </Accordion>
            </Container>

          }

    </Container>
  )
}

export default SearchesPage