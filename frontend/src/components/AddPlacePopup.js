import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  const {values, handleChange, setValues} = useForm({ name: "", link: "" });

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({ 
      name: values.name, link: values.link
  });
  }

  React.useEffect(() => {
    setValues({ name: "", link: "" });
  }, [isOpen]);

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonIsLoading="Создать..."
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_image-name"
          value={values.name}
          onChange={handleChange}
          type="text"
          placeholder="Название"
          id="nameImage"
          name="name"
          minLength={2}
          maxLength={30}
          required
        />
        <span className="nameImage-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_link"
          value={values.link}
          onChange={handleChange}
          type="url"
          placeholder="Ссылка на картинку"
          id="link"
          name="link"
          required
        />
        <span className="link-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
