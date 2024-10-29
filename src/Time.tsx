import { useEffect, useState } from "react";
import Clock from "react-clock";

export function Time() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <Clock value={value} />
      <p>Current time:</p>
    </div>
  );
}
