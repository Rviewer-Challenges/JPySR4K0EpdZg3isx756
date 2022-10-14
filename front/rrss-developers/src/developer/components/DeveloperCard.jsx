import { Container, Card, Row, Col, Button, Nav, } from "react-bootstrap"
import youtubeLogo from "../../assets/youtube-NoBack.png"
import twitterLogo from "../../assets/twitter-NoBack.png"
import gitHubLogo from "../../assets/gitHub-NoBack.png"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { setActiveDeveloper } from "../../store/developer/developerSlice"
import { useDispatch } from "react-redux"

function DeveloperCard({ developer }) {
  const { name, gitHub, twitter, youtube } = developer;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [rrss, setRrss] = useState("GitHub");
  const onHandlerRRSSView =(e )=>{
    dispatch(setActiveDeveloper(developer._id));
    navigate(`/${e.target.value}/${developer._id}`)
  }

  return (

    <Card className="shadow h-100" border="dark"  >

      <Container className="developer-card h-100">
        <Row className="h-100">
          <Col className="p-0 bg-secondary text-light d-flex  flex-column m-0 " md={12} lg={3}>
            <Card.Img src={gitHub.avatar_url} className="shadow col-4" />
            <Card.Title className="m-2">{name}</Card.Title>
            
          </Col>
          <Col className="p-0" >
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey={`#${rrss}`}>
                <Nav.Item >
                  <Nav.Link href="#GitHub" onClick={() => { setRrss("GitHub") }}><img src={gitHubLogo} className="rrss-logos" alt="logo GitHub" />GitHub</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link href="#Youtube" onClick={() => { setRrss("Youtube") }}><img src={youtubeLogo} className="rrss-logos" alt="logo Youtube" />Youtube</Nav.Link>
                </Nav.Item>
                <Nav.Item >
                  <Nav.Link href="#Twitter" onClick={() => { setRrss("Twitter") }}><img src={twitterLogo} className="rrss-logos" alt="logo Twitter" />Twitter</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              {rrss === "GitHub" &&
                <>
                  <Card.Text className="mt-2">
                    {gitHub.bio}
                    <br />
                  </Card.Text>
                  <Card.Text className="mt-2">
                    <span>
                      <strong>Followers: </strong> {gitHub.followers} <br />
                      <strong>Url:</strong> <a href={gitHub.html_url}>{gitHub.html_url}</a>  <br />
                      <strong>Repositorios públicos:</strong> {gitHub.public_repos}
                    </span>
                  </Card.Text>
                  <Container className="text-center">
                    <Link to={`github/${gitHub._id}`}><Button variant="dark" >Repositorios</Button></Link>

                  </Container>
                </>

              }
              {rrss === "Youtube" &&
                <>
                  <Card.Text className="mt-2">
                    <strong>Título del canal:</strong> {youtube.title}
                  </Card.Text>
                  <Card.Text className="mt-2">
                    <strong>Descripción: </strong> <br />
                    {youtube.description}
                  </Card.Text>
                  <Container className="text-center d-flex justify-content-around">
                    <Button variant="danger" value="youtube" onClick={(e)=> onHandlerRRSSView(e) } >Vídeos y listas de Youtube</Button>
                    <a href={`https://www.youtube.com/c/${youtube.url_code}`} target="_blank" rel="noreferrer" ><Button variant="danger">Visitar canal</Button></a>
                  </Container>
                </>
              }

              {rrss === "Twitter" &&
                <>
                  <Card.Text className="mt-2">
                    <strong>Descripción Twitter</strong><br />
                    {twitter.description}
                  </Card.Text>
                  <Card.Text className="mt-2">
                    <strong>Followers: </strong> {twitter.followers} <br />
                  </Card.Text>
                  <Container className="text-center">
                  <Link to={`twitter/${twitter._id}`}><Button variant="primary" >Últimos tweets</Button></Link>

                  </Container>
                </>
              }
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  )
}

export default DeveloperCard