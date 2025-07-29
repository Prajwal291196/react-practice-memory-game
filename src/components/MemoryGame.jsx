const MemoryGame = ({ images }) => {

  const shuffleArray = (array) => {
    return array.map(item => ({item, sort: Math.random()})).sort((a,b)=>(a.sort-b.sort)).map(({item}) => item)
  }

  const duplicatedImages = [...images,...images]

  const shuffledImages = shuffleArray(duplicatedImages)

  
  console.log(shuffledImages)
  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <h1>Memory Game</h1>
      <p>Build your memory game! </p>
      <p>Here are the sample images:</p>
      {shuffledImages.map((src, index) => (
        <img
          key={index}
          src={src}
          style={{ width: "250px", height: "250px", padding: "10px" }}
        />
      ))}
    </div>
  );
};

export default MemoryGame;
