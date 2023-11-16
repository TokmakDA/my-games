import React, { useEffect } from 'react';
import './Modal.css';
import { ReactComponent as CloseIconSVG } from '../../images/icons/closeIcon.svg';
import VictoryIMG from '../../images/simpsons/simpsons-vicrory.png';

const Modal = ({ handleReset, onClose, moves, time, isOpen, setOpen }) => {
  // указываем `useEffect` для обработчика `Escape`
  useEffect(() => {
    if (!isOpen) return;
    function handleEscapeKey(e) {
      if (e.code === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, setOpen]);

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.overflow = 'hidden';
  //     document.body.style.paddingRight = '15px';
  //   } else {
  //     document.body.style.overflow = 'unset';
  //     document.body.style.paddingRight = '0px';
  //   }
  // }, [isOpen]);

  // создаем обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <div className="modal__container">
      <div
        className="modal__wrapper"
        onClick={handleOverlay}>
        <h2 className="modal__title">Поздравляю!</h2>
        <img
          src={VictoryIMG}
          alt="Гамер"
          className="modal__image"
        />
        <dl className="modal__statistics">
          <dt className="modal__statistics_name ">Ходов:</dt>
          <dd className="modal__statistics_value">{moves}</dd>
          <dt className="modal__statistics_name ">Время:</dt>
          <dd className="modal__statistics_value">{time} c</dd>
        </dl>
        <button
          type="button"
          className="modal__button"
          onClick={handleReset}>
          Начать сначала
        </button>
        <button
          type="button"
          className="modal__button-close"
          onClick={onClose}>
          <CloseIconSVG />

        </button>
      </div>
    </div>
  );
};

export default Modal;
