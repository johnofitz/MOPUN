import { Form, Link, useRouteLoaderData } from "react-router-dom";
import classes from "./MainNav.module.css";
import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const MainNav = () => {
  const token: any = useRouteLoaderData("root");
  const role: any = useRouteLoaderData("root");
  if (!token) {
    return null;
  }
  console.log("token:" +role)
  return (
    <Navbar bg="light" expand="lg"  className={classes["nav-link-custom"]}>
      <Container fluid>
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
          <Nav.Link as={Link} to="/toc" >
              Toc
            </Nav.Link>
            <Nav.Link as={Link} to="/commop">
              Operator
            </Nav.Link>   
            <Nav.Link as={Link} to="/message">
              Message Board
            </Nav.Link>
            <Nav.Link as={Link} to="/mop">
              Gate
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
