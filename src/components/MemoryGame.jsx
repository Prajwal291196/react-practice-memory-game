import { useEffect, useState } from "react";
import "./memory-game.css"




const MemoryGame = ({ images }) => {
  const [duplicatedImages, setDuplicatedImages] = useState([])
  const [shuffledImages, setShuffledImages] = useState([])
  const [flipped, setFlipped] = useState([])
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setDuplicatedImages([...images, ...images])

  }, [images])

  useEffect(() => {

    if (duplicatedImages.length > 0) {
      const shuffled = duplicatedImages.map(item => ({ item, sort: Math.random() })).sort((a, b) => (a.sort - b.sort)).map(({ item }) => item)

      setShuffledImages(shuffled)
      setFlipped(Array(shuffled.length).fill(false))
    }

  }, [duplicatedImages])

  const handleFlip = (index) => {
    if (flipped[index] === true) return;

    const updated = [...flipped];
    updated[index] = !updated[index];
    setFlipped(updated);

    const checkSelected = [...selected, { "value": shuffledImages[index], "index": index, "flipped": true }]
    setSelected(checkSelected)

    if (checkSelected.length == 2) {
      const [first, second] = checkSelected;
      if (first.value === second.value) {
        console.log("Match found")
        setSelected([])
      }
      else {
        console.log("No match found")
        console.log(checkSelected.shift())
        console.log("checkSelected", checkSelected)
        const reverted = [...updated]
        reverted[first.index] = false
        setFlipped(reverted)
      }
    }
    

  }
  console.log("outer checkselected", selected)
  // console.log("duplicatedImages", duplicatedImages)
  // console.log("shuffledImages", shuffledImages)
  console.log("flipped", flipped)
  console.log(selected)
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
