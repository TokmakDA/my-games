import { useEffect, useState } from 'react';
import { simpsons } from '../utils/image-import';
import './App.css';
import Footer from './Footer/Footer';
import Game from './Game/Game';
import Header from './Header/Header';
import { useResize } from '../utils/useResize';

function App() {
  const { bgDesctop, bgMobile } = simpsons;
  const [currentBgDesctop, setBgDesctop] = useState(null);
  const [currentBgMobile, setBgMobile] = useState(null);
  const { isScreenLg } = useResize();

  console.log(bgDesctop, bgMobile, currentBgDesctop, currentBgMobile);

  const getRandomElement = (arr) => {
    let randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
  };

  useEffect(() => {
    setBgDesctop(() => getRandomElement(bgDesctop));
    setBgMobile(() => getRandomElement(bgMobile));
  }, []);

  useEffect(() => {
    console.log(isScreenLg);
  }, [isScreenLg]);
  useEffect(() => {
    console.log(currentBgDesctop, currentBgMobile);

    console.log(currentBgDesctop, currentBgMobile);
  }, [currentBgDesctop, currentBgMobile]);

  return (
    <div
      className="page"
      style={{
        backgroundImage: `url(${
          isScreenLg ? currentBgDesctop?.src : currentBgMobile?.src
        })`,
      }}>
      <Header />
      <main className="page__main main">
        <Game />
      </main>
      <Footer />
    </div>
  );
}

export default App;
