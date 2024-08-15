import styles from "../assets/css/Results.module.css"

interface Props {
  WPM: number,
  rawWPM: number,
  totalCharacters: number,
  mistakes: number,
  extras: number,
  timeTaken: number,
  textType: string | undefined,
  wordCount: number,
  restart: ()=>void,
  repeat: ()=>void
}

export default function Results({ WPM, rawWPM, totalCharacters, mistakes, extras, timeTaken, textType, wordCount, restart, repeat }: Props) {

  const timeSeconds = Math.round(timeTaken/1000);
  const timeMinutes = Math.round(timeSeconds / 60);
  const timeHours = Math.floor(timeMinutes / 60);
  const formattedTime = `${timeHours === 0 ? '' : `${timeHours}:`}${timeMinutes%60 == 0 || timeMinutes%60 < 10 ? `0${timeMinutes%60}` : timeMinutes%60}:${timeSeconds%60 === 0 || timeSeconds%60 < 10 ? `0${timeSeconds%60}` : timeSeconds%60}`;

  return (
    <div className={styles.container}>
      <div className={styles.wpm}>
        <h2 className={styles.wpmLabel}>WPM</h2>
        <h3 data-wpm={`${Math.round(WPM*100)/100} wpm`} className={styles.wpmStat}>{Math.round(WPM)}</h3>
      </div>
      <div className={styles.grid}>
        <div className={styles.box2}>
          <h2 className={styles.boxLabel}>Raw WPM</h2>
          <h3 data-wpm={`${Math.round(rawWPM*100)/100} wpm`} className={styles.boxStatHover}>{Math.round(rawWPM)}</h3>
        </div>
        <div className={styles.box2}>
          <h2 className={styles.boxLabel}>char/err/extra</h2>
          <h3 data-wpm={`${Math.round(WPM*100)/100} wpm`} className={styles.boxStat}>{totalCharacters}/{mistakes}/{extras}</h3>
        </div>
        <div className={styles.box2}>
          <h2 className={styles.boxLabel}>Time</h2>
          <h3 data-wpm={`${Math.round(timeTaken/10)/100}s`} className={styles.boxStatHover}>{formattedTime}</h3>
        </div>
        <div className={styles.box2}>
          <h2 className={styles.boxLabel}>Test Type</h2>
          {
            textType == 'words' ?
            <h3 className={styles.boxStat}>{wordCount} {textType}</h3>
            :
            <h3 className={styles.boxStat}>{textType}</h3>
          }
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <button data-title="Next test" onClick={restart} title="Next Test" className={styles.button}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="m14.475 12l-7.35-7.35q-.375-.375-.363-.888t.388-.887t.888-.375t.887.375l7.675 7.7q.3.3.45.675t.15.75t-.15.75t-.45.675l-7.7 7.7q-.375.375-.875.363T7.15 21.1t-.375-.888t.375-.887z"/></svg>
        </button>
        <button data-title="Repeat test" onClick={repeat} title="Repeat Test" className={styles.button}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="m6.85 19l.85.85q.3.3.288.7t-.288.7q-.3.3-.712.313t-.713-.288L3.7 18.7q-.15-.15-.213-.325T3.426 18t.063-.375t.212-.325l2.575-2.575q.3-.3.713-.287t.712.312q.275.3.288.7t-.288.7l-.85.85H17v-3q0-.425.288-.712T18 13t.713.288T19 14v3q0 .825-.587 1.413T17 19zm10.3-12H7v3q0 .425-.288.713T6 11t-.712-.288T5 10V7q0-.825.588-1.412T7 5h10.15l-.85-.85q-.3-.3-.288-.7t.288-.7q.3-.3.712-.312t.713.287L20.3 5.3q.15.15.213.325t.062.375t-.062.375t-.213.325l-2.575 2.575q-.3.3-.712.288T16.3 9.25q-.275-.3-.288-.7t.288-.7z"/></svg>
        </button>
      </div>
    </div>
  )
}
