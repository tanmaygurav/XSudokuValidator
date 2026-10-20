import React, { useState } from 'react';
import styles from './App.module.css';

const INITIAL_BOARD = Array(9)
  .fill(null)
  .map(() => Array(9).fill(''));

export default function App() {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [status, setStatus] = useState(null); // { isValid: boolean, message: string } | null

  const handleCellChange = (rowIndex, colIndex, value) => {
    // Only accept empty string or single digit 1-9
    const lastChar = value.slice(-1);
    if (value === '' || /^[1-9]$/.test(lastChar)) {
      const nextVal = value === '' ? '' : lastChar;
      setBoard((prev) => {
        const newBoard = prev.map((row) => [...row]);
        newBoard[rowIndex][colIndex] = nextVal;
        return newBoard;
      });
      // Reset status on modification
      if (status !== null) {
        setStatus(null);
      }
    }
  };

  const validateSudoku = () => {
    // Check rows
    for (let r = 0; r < 9; r++) {
      const seen = new Set();
      for (let c = 0; c < 9; c++) {
        const val = board[r][c];
        if (val !== '') {
          if (seen.has(val)) {
            setStatus({ isValid: false, message: 'Invalid Sudoku! Conflicts found.' });
            return;
          }
          seen.add(val);
        }
      }
    }

    // Check columns
    for (let c = 0; c < 9; c++) {
      const seen = new Set();
      for (let r = 0; r < 9; r++) {
        const val = board[r][c];
        if (val !== '') {
          if (seen.has(val)) {
            setStatus({ isValid: false, message: 'Invalid Sudoku! Conflicts found.' });
            return;
          }
          seen.add(val);
        }
      }
    }

    // Check 3x3 subgrids
    for (let boxRow = 0; boxRow < 9; boxRow += 3) {
      for (let boxCol = 0; boxCol < 9; boxCol += 3) {
        const seen = new Set();
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            const val = board[boxRow + r][boxCol + c];
            if (val !== '') {
              if (seen.has(val)) {
                setStatus({ isValid: false, message: 'Invalid Sudoku! Conflicts found.' });
                return;
              }
              seen.add(val);
            }
          }
        }
      }
    }

    setStatus({ isValid: true, message: 'Sudoku is valid so far!' });
  };

  const handleClear = () => {
    setBoard(
      Array(9)
        .fill(null)
        .map(() => Array(9).fill(''))
    );
    setStatus(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Sudoku Validator</h1>
        <p className={styles.subtitle}>Enter numbers 1-9 and validate the board.</p>

        {/* Both styles.board and the global class 'board' are provided so Cypress cy.get('.board') succeeds */}
        <div className={`${styles.board} board`}>
          {board.map((row, rowIndex) =>
            row.map((val, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={val}
                onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                className={`${styles.cell} cell`}
              />
            ))
          )}
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.validateBtn} onClick={validateSudoku}>
            Validate
          </button>
          <button type="button" className={styles.clearBtn} onClick={handleClear}>
            Clear
          </button>
        </div>

        {status && (
          <div
            className={`${styles.statusMessage} ${
              status.isValid ? styles.valid : styles.invalid
            }`}
          >
            {status.isValid ? '✅ ' : '❌ '}
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
}

