import React from "react";
import Popup from "./Popup";

function InfoTooltip({ name, info, img, isOpen, onClose }) {
  return (
    <Popup
      name={name}
      onClose={onClose}
      isOpen={isOpen}
      className="popup__container"
    >
      <img className="popup__infoTooltip_img" src={img} alt={info} />
      <figcaption className="popup__infoTooltip_caption">{info}</figcaption>
    </Popup>
  );
}

export default InfoTooltip;
