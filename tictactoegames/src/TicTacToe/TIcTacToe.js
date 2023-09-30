import React, { useState, useEffect } from "react";
import { Button, Col, Row, Typography } from "antd";

const { Title } = Typography;

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({
    blue: parseInt(localStorage.getItem("blueScore")) || 0,
    red: parseInt(localStorage.getItem("redScore")) || 0,
  });

  useEffect(() => {
    localStorage.setItem("blueScore", scores.blue);
    localStorage.setItem("redScore", scores.red);
  }, [scores]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    const newBoard = [...board];

    if (calculateWinner(newBoard) || newBoard[i]) return;

    newBoard[i] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner === "X" ? "Blue" : "Red"}`
    : `Player: ${isXNext ? "Blue" : "Red"}`;

  const handleReset = () => {
    setBoard(Array(9).fill(null));
  };

  const handleScoreReset = () => {
    setScores({
      blue: 0,
      red: 0,
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Title level={2}>Tic-Tac-Toe</Title>
      <Title level={3}>{status}</Title>

      <Row style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Title level={4}>Blue Score: {scores.blue}</Title>
        </Col>
        <Col span={12}>
          <Title level={4}>Red Score: {scores.red}</Title>
        </Col>
      </Row>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "5px",
          marginLeft:'40%'
        }}
      >
        {board.map((square, i) => (
          <Button
            key={i}
            type="default"
            size="large"
            onClick={() => handleClick(i)}
            disabled={square || winner}
          >
            {square}
          </Button>
        ))}
      </div>
      <Row style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Button type="primary" onClick={handleReset}>
            Reset Board
          </Button>
        </Col>
        <Col span={12}>
          <Button type="danger" onClick={handleScoreReset}>
            Reset Scores
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TicTacToe;
