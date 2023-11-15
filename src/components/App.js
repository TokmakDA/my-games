import './App.css';
import { images } from '../constants/simpsons';

function App() {
  const { imagesArr, front, shirt, bgImg } = images;
  // console.log(front, shirt, bgImg, imagesArr);
  const cardElement = (card) => {
    return (
      <div
        className="card"
        key={card.id}>
        <div className="card__front">
          <img
            src={card.src}
            alt="Лицевая сторона карточки"
            className="card__img"
          />
        </div>
        <div className="card__shirt">
          <img
            src={shirt[0].src}
            alt="Рубашка карточки"
            className="card__img"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <header className="page__header header">
        <h1 className="header__title">Memory Game: The Simpsons</h1>
      </header>
      <main className="page__main main">
        <div className="game__cards cards">
          {front.slice(0, 12).map((card) => {
            return cardElement(card);
          })}
        </div>
        <div className="game__statistics statistics">
          <h2 className="statistics__title">Текущий счет</h2>
          <dl className="statistics__list">
            <dt className="statistics__name ">Ходов:</dt>
            <dd className="statistics__value">25</dd>
            <dt className="statistics__name ">Время:</dt>
            <dd className="statistics__value">60 c</dd>
          </dl>
          <button type="button" className="statistics__button">Начать сначала</button>
        </div>
      </main>
      <footer className="page__footer footer"></footer>
    </div>
  );
}

export default App;
