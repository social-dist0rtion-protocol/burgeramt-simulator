import Header from "./Header";
import styles from "./App.module.css";
import { Time } from "./Time";
import { TerminTable } from "./TerminTable";
import "react-clock/dist/Clock.css";
import berlinCoa from "./assets/berlin-coa.svg";
import { BackgroundMusicPlayer } from "./BackgroundMusic";

function App() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.content}>
        <div className={styles.info}>
          <Time />
          <TerminTable />
        </div>
        <div className={styles.bg}>
          <img src={berlinCoa} />
        </div>
      </div>
      <BackgroundMusicPlayer />
    </main>
  );
}

export default App;
