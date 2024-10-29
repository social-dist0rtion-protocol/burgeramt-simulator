import { useState, useEffect } from "react";
import styles from "./TerminTable.module.css";
import chime from "./assets/chime.m4a";

type TerminType = {
  number: number;
  platz: number;
  timestamp: number;
};

export function TerminTable() {
  const [array1, setArray1] = useState<TerminType[]>(generateTerminArray(6));
  const [array2, setArray2] = useState<TerminType[]>(generateTerminArray(6));

  useEffect(() => {
    const interval = setInterval(() => {
      setArray1((prevArray) => updateRandomElements(prevArray));
      setArray2((prevArray) => updateRandomElements(prevArray));
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className={styles.c}>
      <Table termine={array1} />
      <Table termine={array2} />
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

  for (let i = 0; i < size; i++) {
    const number = generateSecureNumber(100000, 700000);
    const platz = generateSecureNumber(1, 17); // Range for platz: 1 to 16
    const timestamp = 0;
    array.push({ number, platz, timestamp });
  }

  return array;
}

function updateRandomElements(array: TerminType[]) {
  const shouldUpdate = generateSecureNumber(1, 101) === 1;

  if (shouldUpdate) {
    const randomIndex = generateSecureNumber(0, array.length);

    array[randomIndex] = {
      number: generateSecureNumber(100000, 700000),
      platz: generateSecureNumber(1, 17),
      timestamp: Date.now(),
    };
  }

  return [...array]; // Return a new array reference to trigger state update
}
