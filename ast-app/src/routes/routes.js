import unauthorized from "../pages/unauthorized/unauthorized";

export const ROUTES = {
  ROOT: {
    path: "/",
    label: "root",
  },
  REGISTER: {
    path: "/reg",
    label: "regform",
  },
  LOGIN: {
    path: "/login",
    label: "login",
  },
  HOME: {
    path: "/home",
    label: "home",
  },
  PERSONAS: {
    path: "/personas",
    label: "personas",
  },
  TORNEOS: {
    path: "/torneos",
    label: "torneos",
  },
  ENTRENAMIENTO: {
    path: "/entrenamiento",
    label: "entrenamiento",
  },
  PAGOS: {
    path: "/pagos",
    label: "pagos",
  },
  PARTICIPACION: {
    path: "/participacion",
    label: "participacion",
  },
  REGSTAFF: {
    path: "/regstaff",
    label: "regstaff",
  },
  UNAUTHORIZED: {
    path: "/unauthorized",
    label: "unauthorized",
  },
  ERROR_404: {
    path: "/404",
    label: "not found",
  },
};
