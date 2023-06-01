import React from "react";
import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup
      name="image"
      onClose={onClose}
      isOpen={card.link}
      className="popup__container_type_image"
    >
      <img className="popup__mask-group" src={card.link} alt={card.name} />
      <figcaption className="popup__caption">{card.name}</figcaption>
    </Popup>
  );
}

export default ImagePopup;
