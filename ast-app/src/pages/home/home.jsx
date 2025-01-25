import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Home = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="dark"
        data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="text-white">
            AST
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav ">
            <Nav className="me-auto">
              <Form >
                <Row>
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder="Usuario"
                      className=" mr-sm-2"
                    />
                  </Col>
                  <Col xs="auto">
                    <Button type="submit">Buscar</Button>
                  </Col>
                </Row>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="container-fluid mh-100 bg-secondary ">
        <div className="row">
          <div className="col-12 col-sm-4  border">Informacion</div>
          <div className="col-12 col-sm-4 border">Torneos</div>
          <div className="col-12 col-sm-4  border">Pagos</div>
        </div>
      </section>
    </>
  );
};

export default Home;
