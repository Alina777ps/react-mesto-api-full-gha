import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "../index.css";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import PageNotFound from "./PageNotFound";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { ProtectedRouteElement } from "./ProtectedRoute";
import * as auth from "../utils/auth";

import InfoTooltip from "./InfoTooltip";
import ImgRegisterTrue from "../images/success.svg";
import ImgRegisterFalse from "../images/error.svg";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [selectedCard, setSelectedCard] = React.useState({});

  const [deleteCard, setDeleteCard] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });

  const [cards, setCards] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userEmail, setUserEmail] = React.useState("");

  const [isRegisterTrue, setIsRegisterTrue] = React.useState(false);
  const [isRegisterFalse, setIsRegisterFalse] = React.useState(false);
  const [errorMessege, setErrorMessege] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    loggedIn &&
    api
      .getUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((error) => console.log(`Произошла ошибка: ${error}`));
  }, [loggedIn]);

  React.useEffect(() => {
    loggedIn &&
    api
      .getInitialCards()
      .then((cards) => setCards(cards))
      .catch((error) => console.log(`Произошла ошибка: ${error}`));
  }, [loggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setSelectedCard({});
    setDeleteCard({});
    setIsRegisterTrue(false);
    setIsRegisterFalse(false);
  }

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => console.log(`Произошла ошибка: ${error}`));
    } else {
      api
        .removeLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => console.log(`Произошла ошибка: ${error}`));
    }
  }

  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId._id)
      .then(() => {
        setCards((card) => card.filter((item) => item._id !== cardId._id));
        closeAllPopups();
      })
      .catch((error) => console.log(`Произошла ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .setUserInfo(currentUser)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.log(`Произошла ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .setUserAvatar(currentUser)
      .then((user) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((error) => console.log(`Произошла ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Произошла ошибка: ${error}`))
      .finally(() => setIsLoading(false));
  }

function handleSubmitRegister(password, email) {
  auth
      .register(password, email)
      .then((user) => {
        setIsRegisterTrue(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setIsRegisterFalse(true);
        setErrorMessege(err);
      });
}

function handleSubmitLogin(password, email) {
  if (!password || !email) {
    setErrorMessege(`Не заполнены поля email или пароль`);
    return;
  }
  auth
    .authorize(password, email)
    .then((user) => {
      if (user.token) {
        localStorage.setItem("jwt", user.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate("/main", { replace: true });
      }
    })
    .catch((err) => {
      setIsRegisterFalse(true);
      setErrorMessege(err);
    });
}

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserEmail(res.email);
          setLoggedIn(true);
          navigate("/main", { replace: true });
        })
        .catch((error) => console.log(`Произошла ошибка: ${error}`));
    }
  };

  React.useEffect(() => {
    //проверяем токен
    tokenCheck();
  }, []);

  function goOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Routes>
            <Route
              path="/main"
              element={
                <ProtectedRouteElement
                  element={Main}
                  cards={cards}
                  onEditProfile={setIsEditProfilePopupOpen}
                  onAddPlace={setIsAddPlacePopupOpen}
                  onEditAvatar={setIsEditAvatarPopupOpen}
                  onCardClick={setSelectedCard}
                  onCardLike={handleCardLike}
                  onCardDelete={setDeleteCard}
                  onConfirmationPopup={setIsConfirmationPopupOpen}
                  userEmail={userEmail}
                  onClick={goOut}
                  loggedIn={loggedIn}
                />
              }
            />

            <Route
              path="/sign-in"
              element={<Login 
                handleSubmitLogin={handleSubmitLogin}
                errorMessege={errorMessege} />}
            />
            <Route
              path="/sign-up"
              element={
                <Register
                errorMessege={errorMessege}
                handleSubmitRegister={handleSubmitRegister}
                />
              }
            />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/main" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <ConfirmationPopup
            onClose={closeAllPopups}
            isOpen={isConfirmationPopupOpen}
            onCardDelete={handleCardDelete}
            card={deleteCard}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <InfoTooltip
            info="Вы успешно зарегистрировались!"
            name="infoTooltip"
            img={ImgRegisterTrue}
            onClose={closeAllPopups}
            isOpen={isRegisterTrue}
          />

          <InfoTooltip
            info="Что-то пошло не так! Попробуйте ещё раз."
            name="infoTooltip"
            img={ImgRegisterFalse}
            onClose={closeAllPopups}
            isOpen={isRegisterFalse}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
