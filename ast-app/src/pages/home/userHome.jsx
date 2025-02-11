import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import { useAuth } from "../../components/AuthContext";
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

const UserHome = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <>
      <Container fluid gap={3}>
        <Row className="mb-3">
          <Col sm={4}>
            <Card
              title="Pagos"
              description="Revise el estado de sus pagos"
              handleClick={goto_Pagos}
              icon={MdOutlinePayment}
              color="#7ED321"
            />
          </Col>
          <Col sm={4}>
            <Card
              title="Entrenamientos"
              description="Revise las asistencias a los entrenamientos registradas"
              handleClick={goto_Entrenamientos}
              icon={LuTrafficCone}
              color="#F8E71C"
            />
          </Col>
          <Col sm={4}>
            <Card
              title="Participación en Torneos"
              description="Revise su historial de participación en torneos"
              handleClick={goto_Participacion}
              icon={GiPodium}
              color="#D0021B"
            />
          </Col>
          <Col sm={4}>
            <Card
              title="Torneos"
              description="Ver todos los torneos"
              handleClick={goto_Torneos}
              icon={TbTournament}
              color="#D0021B"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserHome;
