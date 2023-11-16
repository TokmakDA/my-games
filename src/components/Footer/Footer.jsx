import React from 'react';
import './Footer.css';
import { ReactComponent as TelegramSVG } from '../../images/icons/telegram.svg';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="page__footer footer">
      <div className="footer__items">
        <p className="foote__item">© {currentYear} TokmakDA</p>
        <a
          className="foote__item foote__item_link"
          href="https://github.com/TokmakDA"
          target="_blank">
          GitHub
        </a>
        <a
          className="foote__item foote__item_link"
          href="https://t.me/TokmakDA"
          target="_blank">
          <TelegramSVG />
          telegram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
