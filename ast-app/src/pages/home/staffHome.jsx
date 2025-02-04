import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { Card } from "../../components/Card/Card";

import { FaPerson } from "react-icons/fa6";
import { TbTournament } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { LuTrafficCone } from "react-icons/lu";
import { IoMdPersonAdd } from "react-icons/io";
import { GiPodium } from "react-icons/gi";

const StaffHome = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const goto_Personas = () => {
    navigate(ROUTES.PERSONAS.path, { replace: true });
  };

  const goto_Torneos = () => {
    navigate(ROUTES.TORNEOS.path, { replace: true });
  };

  const goto_Entrenamientos = () => {
    navigate(ROUTES.ENTRENAMIENTO.path, { replace: true });
  };

  return (
    <>
      <Container fluid gap={3}>
        <Row className="mb-3">
          <Col sm={4}>
            <Card
              title="Miembros"
              description="Información de los afiliados al club"
              handleClick={goto_Personas}
              icon={FaPerson}
              color="#4A90E2"
            />
          </Col>
          <Col sm={4}>
            <Card
              title="Torneos"
              description="Información de los torneos activos"
              handleClick={goto_Torneos}
              icon={TbTournament}
              color="#F5A623"
            />
          </Col>
          <Col sm={4}>
            <Card
              title="Entrenamientos"
              description="Gestione los entrenamientos programados"
              handleClick={goto_Entrenamientos}
              icon={LuTrafficCone}
              color="#F8E71C"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default StaffHome;
