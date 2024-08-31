import { useEffect, useRef } from "react";
import "./Modal.css";

export function Modal({ open, onClose, children, style = {} }) {
  const dialogRef = useRef();

  const closeModal = (event) => {
    if (dialogRef.current === event.target) {
      dialogRef.current.classList.remove("dialog-open-transition");
      setTimeout(onClose, 100);
    }
  };

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        dialogRef.current.classList.add("dialog-open-transition");
      }, 1);
    }
  }, [open]);

  return (
    <div
      ref={dialogRef}
      className={`dialog${open ? " dialog-open" : ""}`}
      onClick={closeModal}
    >
      <div className="dialog-paper" style={style}>
        {children}
      </div>
    </div>
  );
}
