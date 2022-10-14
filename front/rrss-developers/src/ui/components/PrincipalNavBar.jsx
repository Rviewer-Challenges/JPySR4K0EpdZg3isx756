import { Container, Navbar, Nav } from "react-bootstrap"

const PrincipalNavBar = () => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" className="mt-2" variant="dark">

        <Container>

          <Navbar.Brand href="/" >RRSS Developers</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/developers">Developers</Nav.Link>
              <Nav.Link href="/youtube">Youtube</Nav.Link>
              <Nav.Link href="/github">Github</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>


      </Navbar>

      
    </>
  )
}

export default PrincipalNavBar