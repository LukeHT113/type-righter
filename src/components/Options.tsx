import styles from "../assets/css/Options.module.css"

interface Props {
  wordCount: number,
  setWordCount: (wordCount: number)=>void,
  textType: 'words' | 'quotes',
  setTextType: (testType: 'words' | 'quotes')=>void,
  quoteLength: 'short' | 'medium' | 'long',
  setQuoteLength: (quoteLength: 'short' | 'medium' | 'long')=>void,
}

export default function Options({ wordCount, setWordCount, textType, setTextType, quoteLength, setQuoteLength }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <label className={styles.sectionLabel}>TEST TYPE</label>
        <div className={styles.sectionButtons}>
          <button className={`${styles.textButton} ${textType === 'words' ? styles.textButtonActive : ''}`} onClick={() => setTextType('words')}>words</button>
          <button className={`${styles.textButton} ${textType === 'quotes' ? styles.textButtonActive : ''}`} onClick={() => setTextType('quotes')}>quotes</button>
        </div>
      </div>
      {
        textType === 'words' ?
        <div className={styles.section}>
          <label className={styles.sectionLabel}># OF WORDS</label>
          <div className={styles.sectionButtons}>
            <button className={`${styles.textButton} ${wordCount === 10 ? styles.textButtonActive : ''}`} onClick={() => setWordCount(10)}>10</button>
            <button className={`${styles.textButton} ${wordCount === 25 ? styles.textButtonActive : ''}`} onClick={() => setWordCount(25)}>25</button>
            <button className={`${styles.textButton} ${wordCount === 50 ? styles.textButtonActive : ''}`} onClick={() => setWordCount(50)}>50</button>
            <button className={`${styles.textButton} ${wordCount === 100 ? styles.textButtonActive : ''}`} onClick={() => setWordCount(100)}>100</button>
          </div>
        </div>
        :
        <div className={styles.section}>
        <label className={styles.sectionLabel}>LENGTH OF QUOTE</label>
        <div className={styles.sectionButtons}>
          <button className={`${styles.textButton} ${quoteLength === 'short' ? styles.textButtonActive : ''}`} onClick={() => setQuoteLength('short')}>short</button>
          <button className={`${styles.textButton} ${quoteLength === 'medium' ? styles.textButtonActive : ''}`} onClick={() => setQuoteLength('medium')}>medium</button>
          <button className={`${styles.textButton} ${quoteLength === 'long' ? styles.textButtonActive : ''}`} onClick={() => setQuoteLength('long')}>long</button>
        </div>
      </div>
      }

    </div>
  )
}
