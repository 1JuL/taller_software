import React from "react";
import { FaEye } from "react-icons/fa";
import "./Card.css";

export const Card = ({
  color = "#f19646",
  icon: Icon = FaEye,
  title = "Card",
  description = "Lorem ipsum...bla bla bla...",
  handleClick,
}) => {
  return (
    <div
      className="Card"
      style={{ "--card-color": color }}
      onClick={handleClick}>
      <h1 className="Card-title">
        <Icon className="Card-icon" />
        <p className="Card-text">{title}</p>
      </h1>
      <p className="Card-subtitle">{description}</p>
    </div>
  );
};
