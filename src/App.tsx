import Header from "./Header";
import styles from "./App.module.css";
import { Time } from "./Time";
import "react-clock/dist/Clock.css";

function App() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <Time />
      </div>
    </main>
  );
}

export default App;
