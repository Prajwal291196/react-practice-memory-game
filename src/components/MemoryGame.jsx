import { useEffect, useState } from "react";
import "./memory-game.css"

const MemoryGame = ({ images }) => {
  const [shuffledImages, setShuffledImages] = useState([])
  const [flipped, setFlipped] = useState([])
  const [selected, setSelected] = useState([])
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false)

  const initializeGame = () => {
    const duplicated = [...images, ...images]

    if (duplicated.length > 0) {
      const shuffled = duplicated.map(item => ({ item, sort: Math.random() })).sort((a, b) => (a.sort - b.sort)).map(({ item }) => item)
      setShuffledImages(shuffled)
      setFlipped(Array(shuffled.length).fill(false))
    }

    setGameOver(false)
    setGameStarted(true);
  }

  useEffect(() => {
    
  }, [images])

  const handleFlip = (index) => {
    if (flipped[index] === true) return;

    const updated = [...flipped];
    updated[index] = !updated[index];
    setFlipped(updated);

    const checkSelected = [...selected, { "value": shuffledImages[index], "index": index }]
    setSelected(checkSelected)

    if (checkSelected.length == 2) {
      const [first, second] = checkSelected;
      if (first.value === second.value) {
        setSelected([])
      }
      else {
        checkSelected.shift()
        const reverted = [...updated]
        reverted[first.index] = false
        setFlipped(reverted)
      }
    }

    if (updated.every(val => val === true)) {
      setTimeout(() => setGameOver(true), 1000)
    }
  }

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <h1>Memory Game</h1>
      {!gameStarted ? (
        <div className="start-screen">
          <h2>Welcome to the Memory Game</h2>
          <p>Flip and match all the cards to win!</p>
          <button onClick={initializeGame} className="start-btn">
            Start Game
          </button>
        </div>
      ) : gameOver ? (
        <div className="game-over">
          <h2>🎉 Game Over! You Matched All Cards 🎉</h2>
          <button onClick={initializeGame} className="restart-btn">
            Restart Game
          </button>
        </div>) :
        (<div className="cards-container">

          {shuffledImages.map((src, index) => (
            <div
              key={index}
              className={`card ${flipped[index] ? "flipped" : ""}`}
              onClick={() => handleFlip(index)}
            >
              <div className="card-inner">
                <div className="card-front"></div>
                <div className="card-back">
                  <img
                    key={index}
                    src={src}
                    className="card-image"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>)
      }
    </div>
  );
};

export default MemoryGame;
