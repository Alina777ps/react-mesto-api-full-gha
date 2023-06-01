import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useForm } from '../hooks/useForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);

  const {values, handleChange, setValues} = useForm({ name: "", about: "" });

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about })
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: values.name, about: values.about
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button="Сохранить"
      buttonIsLoading="Сохранить..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_name"
          type="text"
          placeholder="Имя"
          id="name"
          name="name"
          minLength={2}
          maxLength={40}
          required
          value={values.name}
          onChange={handleChange}
        />
        <span className="name-error popup__input-error"></span>
      </label>
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_about"
          type="text"
          placeholder="О себе"
          id="about"
          name="about"
          minLength={2}
          maxLength={200}
          required
          value={values.about}
          onChange={handleChange}
        />
        <span className="about-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
