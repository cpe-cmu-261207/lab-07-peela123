import React, { useState } from "react";
import {
  IconCheck,
  IconTrash,
  IconArrowUp,
  IconArrowDown,
} from "@tabler/icons";

export default function Todo(props) {
  const [buttonStyle, setButtonStyle] = useState({display:"none"})

  return (
    <div>
      <div
        className="border-bottom p-1 py-2 fs-2 d-flex gap-2"
        onMouseOver={() => {
          setButtonStyle({ display: "" });
        }}
        onMouseOut={() => {
          setButtonStyle({ display: "none" });
        }}
      >
        <span
          className="me-auto"
          style={
            props.completed
              ? {
                  textDecoration: "line-through",
                }
              : null
          }
        >
          {props.title}
        </span>

        <button
          className="btn btn-success"
          style={buttonStyle}
          onClick={() => props.onMark()}
        >
          <IconCheck />
        </button>
        <button
          className="btn btn-secondary"
          style={buttonStyle}
          onClick={() => props.moveUp()}
        >
          <IconArrowUp />
        </button>
        <button
          className="btn btn-secondary"
          style={buttonStyle}
          onClick={() => props.moveDown()}
        >
          <IconArrowDown />
        </button>
        <button
          className="btn btn-danger"
          style={buttonStyle}
          onClick={() => props.onDelete()}
        >
          <IconTrash />
        </button>
      </div>
    </div>
  );
}
