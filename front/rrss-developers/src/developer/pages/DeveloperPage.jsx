import { CardGroup, Col, Container, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import DeveloperCard from "../components/DeveloperCard"
import { loadDevelopers } from '../../store/developer/thunks'
import { useEffect } from "react"


const DeveloperPage = () => {
  const developers = useSelector(state => state.developer.developers)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadDevelopers());
  }, [dispatch])

  return (
    <Container fluid className=" p-4 d-flex align-items-center flex-column">
      <h2 className="mb-4 ">Developers</h2>
      {developers.length> 0 && <CardGroup >
        <Row className="d-flex justify-content-center" >
          { developers.map(dev => {return(
              <Col  md={12} lg={6} key={dev._id} className="mb-3">
                <DeveloperCard developer={dev} />
              </Col>)
          })
          }
        </Row>
      </CardGroup>}
    </Container>
  )
}

export default DeveloperPage