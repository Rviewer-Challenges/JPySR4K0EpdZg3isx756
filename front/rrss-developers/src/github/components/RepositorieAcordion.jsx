import { Accordion, Button } from "react-bootstrap";


const RepositorieAcordion = ({repoData}) => {
    // name, html_url, description, language
    
    return (
        <>
                <Accordion.Item eventKey={repoData._id}>
                    <Accordion.Header className="h-100"><strong>{repoData.name}</strong> </Accordion.Header>
                    <Accordion.Body className="d-flex flex-column justify-content-around">
                        <p><strong>Descripción:</strong> {repoData.description}</p>
                        <p><strong>Lenguaje:</strong> {repoData.dev_language}</p> 
                        <p><strong>Usuario:</strong> {repoData.gitHub.gitUser}</p> 
                        <a href={repoData.html_url}><Button variant="dark" className="m-2">Visitar repositorio</Button></a>
                        <a href= {`https://github.com/${repoData.gitHub.gitUser}`}>
                            <Button variant="dark" className="m-2">Visitar perfil {repoData.gitHub.gitUser}</Button>
                            </a>
                    </Accordion.Body>
                </Accordion.Item>
                
        </>
    )
}

export default RepositorieAcordion