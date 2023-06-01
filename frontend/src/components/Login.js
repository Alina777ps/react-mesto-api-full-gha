import React from "react";
import { useForm } from '../hooks/useForm';
import Header from "./Header";

function Login({ handleSubmitLogin, errorMessege }) {
 
  const {values, handleChange, setValues} = useForm({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitLogin(values.password, values.email)
  };

  return (
    <div>
      <Header titleButtonHeader="Регистрация" path="/sign-up" userEmail="" />
      <div className="formAuth">
        <h2 className="formAuth__title">Вход</h2>
        <form
          className="formAuth__form"
          name="register"
          noValidate
          onSubmit={handleSubmit}
        >
          <fieldset className="formAuth__fieldset">
            <label className="formAuth__label">
              <input
                className="formAuth__input formAuth__input_type_email"
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                minLength={2}
                maxLength={40}
                required
                value={values.email}
                onChange={handleChange}
              />
              <span className="email-error formAuth__input-error"></span>
            </label>
            <label className="formAuth__label">
              <input
                className="formAuth__input formAuth__input_type_password"
                type="text"
                placeholder="Пароль"
                id="password"
                name="password"
                minLength={2}
                maxLength={200}
                required
                value={values.password}
                onChange={handleChange}
              />
              <span className="password-error formAuth__input-error"></span>
            </label>
            <p className="formAuth__erorr">{errorMessege}</p>
          </fieldset>
          <button className="formAuth__button" type="submit">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
