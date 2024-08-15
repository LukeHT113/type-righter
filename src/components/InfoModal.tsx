import { useEffect } from "react"
import styles from "../assets/css/InfoModal.module.css"

interface Props {
  reference: React.RefObject<HTMLDialogElement>,
  setOpened: (opened: boolean)=>void,
}

export default function InfoModal({ reference, setOpened }: Props) {

  useEffect(() => {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpened(false);
      }
    })

    return () => {
      window.removeEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          setOpened(false);
        }
      })
    }
  })

  return (
    <dialog ref={reference} className={styles.modal}>
      <div className={styles.inner}>
        <button className={styles.close} onClick={() => setOpened(false)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="inherit" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"/></svg>
        </button>

        <h1 className={styles.heading}>
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 11 11"><path d="M5.599.94c-.6 0-1.1.5-1.1 1.1s.5 1.1 1.1 1.1s1.1-.5 1.1-1.1s-.5-1.1-1.1-1.1zM3 4l-.001.74S4.5 4.634 4.5 6v1.5c0 1.5-1.501 1.74-1.501 1.74L3 10h5.2l-.001-.76s-1.2 0-1.2-1.5L7 5s0-1-1-1H3z"/></svg>
          Information
        </h1>

        <div className={styles.section}>
          <h2 className={styles.title}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="inherit" d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2S2 6.5 2 12s4.5 10 10 10M11 7h2v2h-2zm3 10h-4v-2h1v-2h-1v-2h3v4h1z"/></svg>
            About
          </h2>
          <p className={styles.text}>
            Welcome to Type Righter, my typing speed test app designed to help master typing precision and speed. Explore a variety of test settings and cusomizable themes to make you feel at home while improving.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.title}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="inherit" d="M15 20v-2h3V6h-3V4h5v16zM4 20V4h5v2H6v12h3v2z"/></svg>
            Word Sets
          </h2>
          <p className={styles.text}>
            When the "words" test type is selected you will be tested on random english words provided by this <a href="https://random-word-api.vercel.app/">random word API</a>.
          </p>
          <p className={styles.text}>
            When the "quotes" test type is selected you will be tested on random quotes provided by this <a href="https://api.quotable.io/">random quote API</a>.
          </p>
        </div>
      
        <div className={styles.section}>
          <h2 className={styles.title}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="inherit" d="M18 4h3v16h-3zM3 13h3v7H3zm11-9h3v3h-3zm-4 1h3v4h-3zm-3 5h3v4H7z"/></svg>
            Stats
          </h2>
          <p className={styles.text}>
            WPM: total number of characters in correctly typed words + spaces, divided by 5 and normalised to 60 seconds.
          </p>
          <p className={styles.text}>
            Raw WPM: Calculated the same as WPM but includes all typed characters not just correct ones.
          </p>
          <p className={styles.text}>
            CHAR/ERR/EXTRA: Total characters in test / Mistakes made / Extra characters typed. Calculated at the end of test.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.title}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="inherit" d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m-9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-1 2H5v-2h2zm0-3H5V8h2zm9 7H8v-2h8zm0-4h-2v-2h2zm0-3h-2V8h2zm3 3h-2v-2h2zm0-3h-2V8h2z"/></svg>
            Keybinds
          </h2>
          <p className={styles.text}>
            By default, you can go to the next typing test with the same parameters at anypoint using <span className={styles.key}>tab</span>.
          </p>
        </div>
      </div>
    </dialog>
  )
}
