import { useEffect, useState } from "react";
import "../CSSFiles/GameContainer.css"

const GameContainer = ({ leadPlayer, game }) => {
  const [userInput, setUserInput] = useState(0);
  const [counter, setCounter] = useState(0);
  const [message, setMessage] = useState("Guess a number");
  const [displayForm, setDisplayForm] = useState(true);

  // checks who starts the game
  useEffect(() => {
    if (game && game.currentTotal > 0) {
      setCounter(game.currentTotal);
      setMessage("Computer played " + game.currentTotal + "! your move...")  
    }
  }, [game]);

  // for playing existing game
  const handleChange = (event) => {
    setUserInput(event.target.value);
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    updateGame(game);
    setMessage("Computer thinking...");
  };

  const updateGame = async (updatedGame) => {
    const response = await fetch(
      `http://localhost:8080/games/${game.id}?playerId=${leadPlayer.id}&guess=${userInput}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);

    setTimeout(() => {
      setCounter(jsonData.gameState);
      setMessage(jsonData.message);
    }, 1500);
  };

  return (
    <section className="Game_page">
      <h3> Get ready to lose {leadPlayer.name}... </h3>
      <h2>{counter}</h2>
      <div className="message">
      {message}
      </div>

      {displayForm ? (
        <form className="form" onSubmit={handleFormSubmit}>
          <input
            type="number"
            name="userInput"
            placeholder="Enter your guess"
            value={userInput}
            onChange={handleChange}
            min="1"
            max="3"
          ></input>
          <button type="submit"> submit</button>
        </form>
      ) : null}
    </section>
  );
};

export default GameContainer;
