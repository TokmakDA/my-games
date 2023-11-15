import { useEffect, useState } from 'react';
import { simpsons } from '../utils/image-import';
import './App.css';

function App() {
  const { front, shirt } = simpsons;
  // const { imagesArr, front, shirt, bgImg } = simpsons;
  const [cards, setCards] = useState([]);
  const [comparisonItems, setComparisonItems] = useState([]);
  // const [isLockClick, setLockClick] = useState(false);
  const [moves, setMoves] = useState(0);
  const [win, setWin] = useState(false);
  const [residue, setResidue] = useState(0);
  const [isActiveTime, setActiveTime] = useState(false);
  const [isStopTime, setStopTime] = useState(true);
  const [time, setTime] = useState(0);
  const [isClickCard, setClickCard] = useState(false);

  const getRandomCards = (arr, count) => {
    const ArrSorting = arr.sort(() => Math.random() - 0.5);
    const ArrLimited = ArrSorting.slice(0, count);
    const newArr = ArrLimited.concat(ArrLimited)
      .sort(() => Math.random() - 0.5)
      .map((item, index) => {
        return { ...item, id: index + 1, isActiveTime: false };
      });
    console.log(newArr);

    return newArr;
  };

  // Таймер
  useEffect(() => {
    let interval = null;

    if (isActiveTime && isStopTime === false) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActiveTime, isStopTime]);

  const handleStart = () => {
    setActiveTime(true);
    setStopTime(false);
  };

  const handleStopTime = () => {
    setStopTime(!isStopTime);
  };

  const handleReset = () => {
    const newsCards = getRandomCards(front, 6);
    setCards(newsCards);
    setResidue(newsCards.length);
    setMoves(0)
    setActiveTime(false);
    setTime(0);
    setClickCard(false);
  };

  useEffect(() => {
    // const newsCards = getRandomCards(front, 6);
    // setCards(newsCards);
    // setResidue(newsCards.length);
    handleReset();
  }, []);

  useEffect(() => {
    isClickCard && handleStart();
  }, [isClickCard]);

  function handleCardCleck(e, card) {
    setClickCard(true);
    // if (!isLockClick) {
    setComparisonItems((state) =>
      !state[0] ? [...state, card] : !state[1] ? [...state, card] : state,
    );
    setCards((state) =>
      state.map((item) =>
        item.id === card.id
          ? { ...item, isActiveTime: !item.isActiveTime }
          : item,
      ),
    );
    // }
  }

  // Выигрыл
  useEffect(() => {
    if (residue === 0) {
      handleStopTime();
      setWin(true);
    }
  }, [residue]);

  useEffect(() => {
    // проверяем массив сравнения
    if (comparisonItems.length === 2) {
      // // если массив полон, то заблокировать карточки
      // setLockClick(true);
      // // Увеличить счетчик хода
      setMoves((state) => state + 1);
      // проверяем на совпадение
      if (comparisonItems[0].name !== comparisonItems[1].name) {
        setTimeout(() => {
          setCards((state) =>
            state.map((item) =>
              item.id === comparisonItems[0].id
                ? { ...item, isActiveTime: false }
                : item.id === comparisonItems[1].id
                ? { ...item, isActiveTime: false }
                : item,
            ),
          );
        }, 1000);
      } else {
        // уменьшаем количество
        setResidue((state) => state - 2);
      }
      setComparisonItems([]);
      // setLockClick(false);
    }
  }, [comparisonItems, moves]);

  const cardElement = (card) => {
    return (
      <div
        className={`card ${card.isActiveTime && 'active'}`}
        key={card.id}
        onClick={(e) => !card.isActiveTime && handleCardCleck(e, card)}>
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
          {cards?.map((card) => {
            return cardElement(card);
          })}
        </div>
        <div className="game__statistics statistics">
          <h2 className="statistics__title">Текущий счет</h2>
          <dl className="statistics__list">
            <dt className="statistics__name ">Ходов:</dt>
            <dd className="statistics__value">{moves}</dd>
            <dt className="statistics__name ">Остаток:</dt>
            <dd className="statistics__value">{residue}</dd>
            <dt className="statistics__name ">Время:</dt>
            <dd className="statistics__value">{time} c</dd>
          </dl>
          <button
            type="button"
            className="statistics__button"
            onClick={handleReset}>
            Начать сначала
          </button>
        </div>
      </main>
      <footer className="page__footer footer"></footer>
    </div>
  );
}

export default App;
