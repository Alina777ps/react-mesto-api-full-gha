import React from "react";
import Header from "./Header";
import vector from "../images/Vector.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <Header
        titleButtonHeader="Выйти"
        path="/sign-in"
        onClick={props.onClick}
        userEmail={props.userEmail}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__container">
            <div className="profile__container-avatar">
              <img
                className="profile__avatar"
                alt="Аватар"
                src={currentUser.avatar}
              />
              <button
                className="profile__avatar-edit"
                type="button"
                aria-label="Редактировать"
                onClick={() => {
                  props.onEditAvatar(true);
                }}
              >
                <img className="profile__avatar-pen" src={vector} alt="Ручка" />
              </button>
            </div>
            <div className="profile__info">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                type="button"
                aria-label="Редактировать"
                onClick={() => {
                  props.onEditProfile(true);
                }}
              ></button>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
          </div>
          <button
            className="profile__add-button"
            type="button"
            aria-label="Добавить"
            onClick={() => {
              props.onAddPlace(true);
            }}
          ></button>
        </section>
        <section className="elements">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onConfirmationPopup={props.onConfirmationPopup}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;
