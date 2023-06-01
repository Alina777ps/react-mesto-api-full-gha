import React from "react";

// создаем отдельный компонент `Popup` для обертки любых попапов
const Popup = ({ isOpen, name, onClose, children, className }) => {
  // внутри указываем `useEffect` для обработчика `Escape`
  React.useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEscape);
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener("keydown", closeByEscape);
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);

  // создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`.
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup__type_${name}`}
      // добавляем обработчик оверлея
      onClick={handleOverlay}
    >
      <div className={className}>
        {children}
        <button className="popup__close-icon" type="button" onClick={onClose} />
      </div>
    </div>
  );
};

export default Popup;
