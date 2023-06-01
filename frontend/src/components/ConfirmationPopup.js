import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmationPopup({ onClose, isOpen, onCardDelete, card, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="confirmation"
      title="Вы уверены?"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonIsLoading="Удаление..."
      isLoading={isLoading}
    />
  );
}

export default ConfirmationPopup;
