import { useState, useEffect } from "react";
import styles from "./TerminTable.module.css";
import chime from "./assets/chime.m4a";

type TerminType = {
  number: number;
  platz: number;
  timestamp: number;
};

export function TerminTable() {
  const [termine, setTermine] = useState<TerminType[]>(generateTerminArray(12));

  useEffect(() => {
    const interval = setInterval(() => {
      setTermine((prev) => updateRandomElements(prev));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className={styles.c}>
      <Table termine={termine.slice(0, 6)} />
      <Table termine={termine.slice(-6)} />
    </div>
  );
}

function Table({ termine }: { termine: TerminType[] }) {
  return (
    <table>
      <thead>
        <tr>
          <td>Nummer</td>
          <td>Platz</td>
        </tr>
      </thead>
      <tbody>
        {termine.map((t, i) => (
          <Termin termin={t} key={i} />
        ))}
      </tbody>
    </table>
  );
}

function Termin({ termin }: { termin: TerminType }) {
  const active = Date.now() - termin.timestamp < 5000;
  useEffect(() => {
    // Play sound only when active becomes true
    if (active) {
      const audio = new Audio(chime);
      audio.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [active]); // Only runs when `active` changes
  return (
    <tr className={active ? styles.active : undefined}>
      <td>
        <span className={styles.terminkunde}>Terminkunde</span>
        <span>{termin.number}</span>
      </td>
      <td>{termin.platz}</td>
    </tr>
  );
}

function generateSecureNumber(min: number, max: number): number {
  const randomValue = crypto.getRandomValues(new Uint32Array(1))[0];
  return min + (randomValue % (max - min));
}

function generateTerminArray(size: number): TerminType[] {
  const array: TerminType[] = [];
  const platzPool = Array.from({ length: 16 }, (_, i) => i + 1); // [1, 2, ..., 16]

  for (let i = 0; i < size; i++) {
    const number = generateSecureNumber(100000, 700000);

    // Securely select a unique platz by picking a random index from the platzPool
    const randomIndex = generateSecureNumber(0, platzPool.length);
    const platz = platzPool.splice(randomIndex, 1)[0]; // Remove selected platz from the pool

    const timestamp = 0;
    array.push({ number, platz, timestamp });
  }

  return array;
}

function updateRandomElements(array: TerminType[]) {
  const shouldUpdate = generateSecureNumber(1, 101) === 1;

  if (shouldUpdate) {
    const randomIndex = generateSecureNumber(0, array.length);

    // Create an array of all possible platz values
    const allPlatzValues = Array.from({ length: 16 }, (_, i) => i + 1);

    // Filter out the platz values that are already in use
    const existingPlatzValues = array.map((item) => item.platz);
    const availablePlatzValues = allPlatzValues.filter(
      (platz) => !existingPlatzValues.includes(platz)
    );

    // Select a random platz from the available values
    const newPlatz =
      availablePlatzValues[
        generateSecureNumber(0, availablePlatzValues.length)
      ];

    // Update the selected item with a unique platz
    array[randomIndex] = {
      number: generateSecureNumber(100000, 700000),
      platz: newPlatz,
      timestamp: Date.now(),
    };
  }

  return [...array]; // Return a new array reference to trigger state update
}
