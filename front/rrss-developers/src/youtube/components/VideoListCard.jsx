import { Button, Card} from "react-bootstrap"
export const VideoListCard = ({ mediaData, typeOfMedia }) => {
    
    return (
        <Card className="shadow h-100 mw-50" border="dark">
            <Card.Img variant="top" src={mediaData.thumbnails} className="shadow col-4" />
            <Card.Body className="p-0 row-youtube-card">
                <Card.Title className="bg-secondary text-light  p-2 ">{mediaData.title}</Card.Title>
                <Card.Subtitle className="p-2"><strong>Tipo de medio:</strong> {typeOfMedia}  </Card.Subtitle>
                <Card.Text className="p-2">
                    {mediaData.description ||
                        "Este medio no dispone de descripción."
                    }
                </Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around" >
                <a href={mediaData.url} target="_blank" rel="noreferrer" ><Button variant="danger">Ver</Button></a> 
            </Card.Footer>



        </Card>
    )

}
