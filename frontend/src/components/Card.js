import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({
  card,
  onCardClick,
  onCardLike,
  onConfirmationPopup,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${
    isLiked && "element__like-button_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
    onConfirmationPopup(true);
  }

  return (
    <article className="element">
      <img
        className="element__mask-group"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="element__trash"
          type="button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        />
      )}
      <div className="element__rectangle">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__container-like">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
