import { useEffect, useState } from "react";
import "./memory-game.css"




const MemoryGame = ({ images }) => {
  const [duplicatedImages, setDuplicatedImages] = useState([])
  const [shuffledImages, setShuffledImages] = useState([])
  const [flipped, setFlipped] = useState([])

  useEffect(() => {
    setDuplicatedImages([...images, ...images])

  }, [images])

  useEffect(() => {
    if (duplicatedImages.length > 0) {
      setShuffledImages(duplicatedImages.map(item => ({ item, sort: Math.random() })).sort((a, b) => (a.sort - b.sort)).map(({ item }) => item))
    }
  }, [duplicatedImages])


  const handleFlip = (index) => {
    const updated = [...flipped];
    updated[index] = !updated[index];
    setFlipped(updated);
  }

  console.log("duplicatedImages", duplicatedImages)
  console.log("shuffledImages", shuffledImages)
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <h1>Memory Game</h1>
      <p>Build your memory game! </p>
      <p>Here are the sample images:</p>
      <div className="cards-container">

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
      </div>
    </div>
  );
};

export default MemoryGame;
