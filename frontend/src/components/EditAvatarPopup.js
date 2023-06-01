import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      buttonIsLoading="Сохранить..."
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_avatar"
          ref={avatarRef}
          type="url"
          placeholder="Ссылка на картинку"
          id="avatar"
          name="avatar"
          required
        />
        <span className="avatar-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
