import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { Card } from "../../components/Card/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { FaPerson } from "react-icons/fa6";
import { TbTournament } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { LuTrafficCone } from "react-icons/lu";
import { IoMdPersonAdd } from "react-icons/io";
import { GiPodium } from "react-icons/gi";

const AdminHome = () => {
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

  const goto_Pagos = () => {
    navigate(ROUTES.PAGOS.path, { replace: true });
  };

  const goto_Participacion = () => {
    navigate(ROUTES.PARTICIPACION.path, { replace: true });
  };

  const goto_RegForm = () => {
    navigate(ROUTES.REGISTER.path, { replace: true });
  };

  const goto_RegStaff = () => {
    navigate(ROUTES.REGSTAFF.path, { replace: true });
  };

  return (
    <>
      <Container fluid gap={3}>
        <Row className="mb-3">
          <Col sm={3}>
            <Card
              title="Gestión de Personas"
              description="Gestione la información de los afiliados al club"
              handleClick={goto_Personas}
              icon={FaPerson}
              color="#4A90E2"
            />
          </Col>
          <Col sm={3}>
            <Card
              title="Gestión de Torneos"
              description="Gestione la información de los torneos en juego"
              handleClick={goto_Torneos}
              icon={TbTournament}
              color="#F5A623"
            />
          </Col>
          <Col sm={3}>
            <Card
              title="Gestión de pagos"
              description="Gestione los pagos hechos o pendientes de los afiliados"
              handleClick={goto_Pagos}
              icon={MdOutlinePayment}
              color="#7ED321"
            />
          </Col>
          <Col sm={3}>
            <Card
              title="Gestión de Entrenamientos"
              description="Gestione la información de los torneos en juego"
              handleClick={goto_Entrenamientos}
              icon={LuTrafficCone}
              color="#F8E71C"
            />
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Card
              title="Registro de afiliados"
              description="Nuevos afiliados al club"
              handleClick={goto_RegForm}
              icon={IoMdPersonAdd}
              color="#50E3C2"
            />
          </Col>
          <Col sm={3}>
            <Card
              title="Registro entrenadores"
              description="Nuevos entrenadores en el club"
              handleClick={goto_RegStaff}
              icon={IoMdPersonAdd}
              color="#9013FE"
            />
          </Col>

          <Col sm={3}>
            <Card
              title="Participación Torneos"
              description="Asigne puestos a los participantes de un torneo"
              handleClick={goto_Participacion}
              icon={GiPodium}
              color="#D0021B"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHome;
