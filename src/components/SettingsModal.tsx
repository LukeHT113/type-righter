import { useEffect } from "react"
import styles from "../assets/css/SettingsModal.module.css"

interface Props {
  reference: React.RefObject<HTMLDialogElement>,
  setOpened: (opened: boolean)=>void,
  testType: 'words' | 'quotes',
  setTestType: (testType: 'words' | 'quotes')=>void,
  wordCount: number,
  setWordCount: (wordCount: number)=>void,
  quoteLength: 'short' | 'medium' | 'long',
  setQuoteLength: (quoteLength: 'short' | 'medium' | 'long')=>void,
  theme: string,
  switchTheme: (theme: string)=>void
}

export default function SettingsModal({ reference, setOpened, testType, setTestType, wordCount, setWordCount, quoteLength, setQuoteLength, theme, switchTheme }: Props) {

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
          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="inherit" d="M10.825 22q-.675 0-1.162-.45t-.588-1.1L8.85 18.8q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.225-1.65q.1-.65.588-1.1T10.825 2h2.35q.675 0 1.163.45t.587 1.1l.225 1.65q.325.125.613.3t.562.375l1.55-.65q.625-.275 1.25-.05t.975.8l1.175 2.05q.35.575.2 1.225t-.675 1.075l-1.325 1q.025.175.025.338v.674q0 .163-.05.338l1.325 1q.525.425.675 1.075t-.2 1.225l-1.2 2.05q-.35.575-.975.8t-1.25-.05l-1.5-.65q-.275.2-.575.375t-.6.3l-.225 1.65q-.1.65-.587 1.1t-1.163.45zm1.225-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"/></svg>
          Settings
        </h1>

        <div className={styles.section}>
          <h2 className={styles.title}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="inherit" d="m10 21l4-4h8v4H10Zm8.3-12.075l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575t1.412.575l1.4 1.4q.575.575.6 1.388t-.55 1.387L18.3 8.925ZM16.85 10.4L6.25 21H2v-4.25l10.6-10.6l4.25 4.25Z"/></svg>
            Test Type
          </h2>
          <p className={styles.text}>
            Choose what type of prompt you'd like to practice typing. "words" will give you randomly generated english words & "quotes" will give you a randomly selected quote.
          </p>
          <div className={styles.buttons}>
            <button onClick={() => setTestType('words')} className={testType === 'words' ? styles.buttonActive : styles.button} >words</button>
            <button onClick={() => setTestType('quotes')} className={testType === 'quotes' ? styles.buttonActive : styles.button}>quotes</button>
          </div>
        </div>

        
        <div className={styles.section}>
          <h2 className={styles.title}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512"><path fill="inherit" d="M177.9 494.1c-18.7 18.7-49.1 18.7-67.9 0l-92.1-92.2c-18.7-18.7-18.7-49.1 0-67.9l50.7-50.7l48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48l41.4-41.4l48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48l41.4-41.4l48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48l41.4-41.4l48 48c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-48-48L333.9 18C352.6-.7 383-.7 401.8 18l92.1 92.1c18.7 18.7 18.7 49.1 0 67.9z"/></svg>
            Test Length
          </h2>
          <p className={styles.text}>
            {testType === "words" ?
            `Determine the amount of random words in the prompt.`
            :
            `Determine the length of the quote.`
            }
          </p>
          <div className={styles.buttons}>
            {
              testType === 'words' ?
              <>
              <button onClick={() => setWordCount(10)} className={wordCount === 10 ? styles.buttonActive : styles.button}>10</button>
              <button onClick={() => setWordCount(25)} className={wordCount === 25 ? styles.buttonActive : styles.button}>25</button>
              <button onClick={() => setWordCount(50)} className={wordCount === 50 ? styles.buttonActive : styles.button}>50</button>
              <button onClick={() => setWordCount(100)} className={wordCount === 100 ? styles.buttonActive : styles.button}>100</button>
              </>
              :
              <>
              <button onClick={() => setQuoteLength('short')} className={quoteLength === 'short' ? styles.buttonActive : styles.button}>short</button>
              <button onClick={() => setQuoteLength('medium')} className={quoteLength === 'medium' ? styles.buttonActive : styles.button}>medium</button>
              <button onClick={() => setQuoteLength('long')} className={quoteLength === 'long' ? styles.buttonActive : styles.button}>long</button>
              </>
            }
          </div>
        </div>

        <div className={styles.sectionList}>
          <h2 className={styles.title}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="inherit" d="M12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.813-3.9t2.2-3.175T8.25 2.788T12.2 2q2 0 3.775.688t3.113 1.9t2.125 2.875T22 11.05q0 2.875-1.75 4.413T16 17h-1.85q-.225 0-.312.125t-.088.275q0 .3.375.863t.375 1.287q0 1.25-.687 1.85T12 22m-5.5-9q.65 0 1.075-.425T8 11.5t-.425-1.075T6.5 10t-1.075.425T5 11.5t.425 1.075T6.5 13m3-4q.65 0 1.075-.425T11 7.5t-.425-1.075T9.5 6t-1.075.425T8 7.5t.425 1.075T9.5 9m5 0q.65 0 1.075-.425T16 7.5t-.425-1.075T14.5 6t-1.075.425T13 7.5t.425 1.075T14.5 9m3 4q.65 0 1.075-.425T19 11.5t-.425-1.075T17.5 10t-1.075.425T16 11.5t.425 1.075T17.5 13"/></svg>
            Theme
          </h2>
          <p className={styles.text}>
            Customize your theme.
          </p>
          <div className={styles.buttonsList}>
            <button 
              onClick={() => switchTheme('ParmaViolet')} 
              className={theme === 'ParmaViolet' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#b94189",
                backgroundColor: "#fffbfe"
              }}
            >
              Parma Violet
            </button>

            <button 
              onClick={() => switchTheme('Peach')} 
              className={theme === 'Peach' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#fe5503",
                backgroundColor: "#ffede0"
              }}
            >
              Peach
            </button>

            <button 
              onClick={() => switchTheme('SeaBreeze')} 
              className={theme === 'SeaBreeze' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#96ceb4",
                backgroundColor: "#ffeead"
              }}
            >
              Sea Breeze
            </button>

            <button 
              onClick={() => switchTheme('Strawberry')} 
              className={theme === 'Strawberry' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#fcfcf8",
                backgroundColor: "#f37f83"
              }}
            >
              Strawberries & Cream
            </button>

            <button 
              onClick={() => switchTheme('')} 
              className={theme === '' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#e2b714",
                backgroundColor: "#323437"
              }}
            >
              Default
            </button>

            <button 
              onClick={() => switchTheme('DeepBlue')} 
              className={theme === 'DeepBlue' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#007acc",
                backgroundColor: "#1e1e1e"
              }}
            >
              Deep Blue
            </button>

            <button 
              onClick={() => switchTheme('Smoulder')} 
              className={theme === 'Smoulder' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#ff3a32",
                backgroundColor: "#1a0b0c"
              }}
            >
              Smoulder
            </button>

            <button 
              onClick={() => switchTheme('Matrix')} 
              className={theme === 'Matrix' ? styles.themeButtonActive : styles.themeButton} 
              style={{
                color: "#89c559",
                backgroundColor: "#0c100e"
              }}
            >
              Matrix
            </button>
          </div>
        </div>
      
      </div>
    </dialog>
  )
}
