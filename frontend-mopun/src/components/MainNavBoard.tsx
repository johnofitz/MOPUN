import { Form, Link, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNav.module.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const MainNav = () => {
  const token: any = useRouteLoaderData("root");
  if (!token) {
    return null;
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            src={require("../images/irishPoll.png")}
            alt="profile-img"
            className={classes.images}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/toc">
              Toc Home
            </Nav.Link>
            <Nav.Link as={Link} to="/commop">
              Operator
            </Nav.Link>
            <Nav.Link as={Link} to="/mop">
              Patrol Form
            </Nav.Link>    
          </Nav>
          {token && (
            <Form action="/logout" method="post">
              <button className={classes.Mainbutton}>
                Logout
              </button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
