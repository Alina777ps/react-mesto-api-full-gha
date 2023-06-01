import React from "react";
import Popup from "./Popup";

function PopupWithForm({
  name,
  onClose,
  title,
  children,
  isLoading,
  buttonIsLoading,
  button,
  onSubmit,
  isOpen,
}) {
  return (
    <Popup
      isOpen={isOpen}
      name={name}
      onClose={onClose}
      className="popup__container"
    >
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
        <fieldset className="popup__fieldset">{children}</fieldset>
        <button className="popup__button" type="submit">
          {isLoading ? buttonIsLoading : button}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
