import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import rock from "./img/rock.png";
import paper from "./img/paper.png";
import scissors from "./img/scissors.png";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

function App() {
  const [selected, setSelected] = useState("");
  const [pcSelected, setPcSelected] = useState("");
  const [score, setScore] = useState(0);
  const [gameStatus, setGameStatus] = useState("idle");
  const [winner, setWinner] = useState("");
  const [tours, setTours] = useState([]);

  const options = ["rock", "paper", "scissors"];

  const [isUserTurn, setIsUserTurn] = useState(true);

  const handleClick = (opt) => {
    if (gameStatus === "idle") {
      setGameStatus("started");
    }
    if (isUserTurn) {
      setSelected(opt);
      console.log("selected ", opt);

      setTimeout(() => {
        setIsUserTurn(false);
        handlePcChoice(opt);
      }, 2000);
    }
  };

  const handlePcChoice = (opt) => {
    const choice = options[Math.floor(Math.random() * options.length)];
    setPcSelected(choice);
    console.log("pc selected ", choice);

    setTimeout(() => {
      check(opt, choice);
    }, 100);

    setTimeout(() => {
      setIsUserTurn(true);
      setPcSelected("");
    }, 2000);
  };

  const check = (opt, pcOpt) => {
    console.log("selected ", opt, " pc selected ", pcOpt);
    if (opt === pcOpt) {
      console.log("equal");
    } else if (opt === "rock") {
      if (pcOpt === "paper") {
        console.log("pc won");
        setScore(parseInt(score) - 1);
      } else if (pcOpt === "scissors") {
        console.log("you won");
        setScore(parseInt(score) + 1);
      }
    } else if (opt === "paper") {
      if (pcOpt === "scissors") {
        console.log("pc won");
        setScore(parseInt(score) - 1);
      } else if (pcOpt === "rock") {
        console.log("you won");
        setScore(parseInt(score) + 1);
      }
    } else if (opt === "scissors") {
      if (pcOpt === "rock") {
        console.log("pc won");
        setScore(parseInt(score) - 1);
      } else if (pcOpt === "paper") {
        console.log("you won");
        setScore(parseInt(score) + 1);
      }
    }

    setSelected("");

    if (gameStatus !== "gameOver") {
      if (score <= -3) {
        console.log("finish pc won");
        setWinner("pc");
        setGameStatus("gameOver");

        const tour = {
          winner: "pc",
          score: score,
        };

        setTours((prev) => [tour, ...prev]);
      } else if (score >= 3) {
        console.log("finish you won");
        setWinner("user");
        setGameStatus("gameOver");

        const tour = {
          winner: "user",
          score: score,
        };

        setTours((prev) => [tour, ...prev]);
      }
    }
  };

  const resetGame = () => {
    setSelected("");
    setPcSelected("");
    setGameStatus("idle");
    setIsUserTurn(true);
    setScore(0);
    setWinner("");
  };

  return (
    <div className="App">
      <div className="header">
        <Heading textAlign="center">Rock Paper Scissors</Heading>
      </div>

      <div className="gameContainer">
        <div className="gameHeaderBox">
          {isUserTurn && (
            <>
              <Text fontSize="30px">Your turn</Text>{" "}
              {selected && (
                <Text className="selectedOptionText">
                  You selected: {selected}
                </Text>
              )}
            </>
          )}
          {!isUserTurn && (
            <>
              <Text fontSize="30px">Computer turn</Text>{" "}
              {pcSelected && (
                <Text className="selectedOptionText">
                  Computer selected: {pcSelected}
                </Text>
              )}
            </>
          )}

          <Text className="scoreText">Score: {score}</Text>
        </div>

        <button
          disabled={!isUserTurn}
          onClick={() => handleClick("rock")}
          name="rock"
          className="optionButtons"
        >
          {" "}
          <img src={rock} alt="rock" className="optionImg" />
        </button>
        <button
          disabled={!isUserTurn}
          onClick={() => handleClick("paper")}
          name="paper"
          className="optionButtons"
        >
          <img src={paper} alt="paper" className="optionImg" />
        </button>
        <button
          disabled={!isUserTurn}
          onClick={() => handleClick("scissors")}
          name="scissors"
          className="optionButtons"
        >
        
          <img src={scissors} alt="scissors" className="optionImg" />
        </button>

        {gameStatus === "gameOver" && (
          <Box>
            <Text>{winner} Won!</Text>
            <Button
              mt="10px"
              textAlign="center"
              onClick={() => resetGame()}
              colorScheme="purple"
            >
              Play Again
            </Button>
          </Box>
        )}

        {tours.length > 0 && (
          <TableContainer>
            <Table variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Winner</Th>
                  <Th isNumeric>Score</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tours.map((tour) => (
                  <Tr>
                    <Td>{tour.winner}</Td>
                    <Td isNumeric>{tour.score}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>

      <div className="footer">
        This project assignment has been prepared for the 'Kodluyoruz' Frontend
        course. It is a rock paper scissors game.
      </div>
    </div>
  );
}

export default App;
