import styles from "./page.module.css";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [city, setCity] = useState('')

  const inputRef = useRef(null);

  useEffect(() => {
     inputRef.current.focus();
  }, [])

  return (
    <main className={styles.main}>
        <div className={styles.weatherContainer}>
            <input type="text" onChange={(e) => { setCity(e.target.value) }} value={city} ref={inputRef}/>
        </div>
    </main>
  );
}
