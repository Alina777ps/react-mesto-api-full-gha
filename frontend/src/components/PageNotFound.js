import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1, { replace: true });
  }
  return (
    <div className="not-found">
      <h3 className="not-found__title">
        <span>404</span> - Страница не найдена
      </h3>
      <p className="not-found__text">Ой, здесь ничего нет</p>
      <button className="not-found__button-back" tupe="button" onClick={goBack}>
        Назад
      </button>
    </div>
  );
}

export default PageNotFound;
