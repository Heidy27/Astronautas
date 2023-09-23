import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./Title.css";

function Title({ text, icon }) {
  return (
    <Container fluid="md">
      <Row>
        <Col>
          <div className="title-container">
            <span className="icon">
              <img src={icon} alt="Icono personalizado" />
            </span>
            <h1 className="title">{text}</h1>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Title;
