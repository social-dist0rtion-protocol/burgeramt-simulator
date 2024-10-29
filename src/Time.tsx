import { useEffect, useState } from "react";
import Clock from "react-clock";
import styles from "./Time.module.css";

export function Time() {
  const [value, setValue] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    const now = new Date();
    const formatted = new Intl.DateTimeFormat("de-DE", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(now);
    setFormattedDate(formatted);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.c}>
      <Clock value={value} />
      <p>
        <strong>{formattedDate}</strong>
      </p>
    </div>
  );
}
