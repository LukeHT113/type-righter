import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import styles from '../assets/css/App.module.css'
import useTimer from '../hooks/useTimer';
import Header from '../components/Header';
import stringToArray from '../utils/stringToArray';
import { useDebounce } from '../hooks/useDebounce';
import Options from '../components/Options';
import Results from '../components/Results';
import SettingsModal from '../components/SettingsModal';
import InfoModal from '../components/InfoModal';
import Footer from '../components/Footer';

type textType = 'words' | 'quotes';
type quoteLength = 'short' | 'medium' | 'long';

function App() {

  const [theme, setTheme] = useState<string>('');

  const settingsModal = useRef<HTMLDialogElement>(null);
  const infoModal = useRef<HTMLDialogElement>(null);

  const getTestType = localStorage.getItem('testType') as textType;
  const getWordCount = localStorage.getItem('wordCount');
  const getQuoteLength = localStorage.getItem('quoteLength') as quoteLength;

  const [words, setWords] = useState<string[]>(['default']);
  const [wordCount, setWordCount] = useState<number>(getWordCount ? JSON.parse(getWordCount!) : 25);
  const [lengthOfQuote, setLengthOfQuote] = useState<quoteLength>(getQuoteLength ? getQuoteLength : 'medium');
  const [textType, setTextType] = useState<textType>(getTestType ? getTestType : 'words');
  const [activeWord, setActiveWord] = useState<number>(0);
  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [input, setInput] = useState<string[]>(new Array(wordCount).fill(''));
  const [finished, setFinished] = useState<boolean>(false);
  const [started, setStarted] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);
  const [restartFlag, setRestartFlag] = useState<boolean>(false);
  const [restartCooldown, setRestartCooldown] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedFocus = useDebounce(focused, 300);
  const timer = useTimer();


  const fetchWord = () => {
    fetch(`https://random-word-api.vercel.app/api?words=${wordCount}`)
    .then((res) => {
      return res.json();
    }).then((data) => {
      if (data) {
        setWords([...data]);
      }
    })
  }

  const fetchQuote = () => {
    let minCharLength: number;
    let maxCharLength: number;
    switch(lengthOfQuote) {
      case 'short':
        minCharLength = 0;
        maxCharLength = 100;
        break
      case 'medium':
        minCharLength = 100;
        maxCharLength = 175;
        break
      default:
        minCharLength = 175;
        maxCharLength = 250;
    }
    fetch(`https://api.quotable.io/quotes/random?minLength=${minCharLength}&maxLength=${maxCharLength}`)
    .then((res) => {
      return res.json();
    }).then((data) => {
      if (data) {
        if (data[0].content.includes("…") || data[0].content.includes("—")) {
          data[0].content.replace("…", "...");
          data[0].content.replace("—", "-");
        }
        setWords(stringToArray(data[0].content));
      }
    })
  }

  useEffect(() => {
    reset();
    if (textType === 'words') {
      fetchWord();
    } else if (textType === 'quotes') {
      fetchQuote();
    }
  }, [wordCount, lengthOfQuote, textType])

  useEffect(() => {
    if (restartCooldown) {
      return
    }

    reset();
    if (textType === 'words') {
      fetchWord();
    } else if (textType === 'quotes') {
      fetchQuote();
    }

    setRestartCooldown(true);
    setTimeout(() => {
      setRestartCooldown(false);
    }, 600)
  }, [restartFlag])

  useEffect(() => {
    const getTheme = localStorage.getItem('setTheme');
    if (getTheme) {
      setTheme(getTheme);
    }
    window.addEventListener('keydown', (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        restart();
      }
    });

    const settings = settingsModal.current;
    const info = infoModal.current;
    const onClick = (e: MouseEvent, modal: HTMLDialogElement) => {
      const rect = modal?.getBoundingClientRect();
      if (!rect) {
        return
      }
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        toggleSettingsModal(false);
        toggleInfoModal(false);
      }
    }

    settings?.addEventListener('click', (e) => onClick(e, settings));
    info?.addEventListener('click', (e) => onClick(e, info));
    return () => {
      settings?.removeEventListener('click', (e) => onClick(e, settings));
      info?.removeEventListener('click', (e) => onClick(e, info));
      window.removeEventListener('keydown', (e) => {
        if (e.key === "Tab") {
          e.preventDefault();
          restart();
        }
      });
    }
  }, [])

  function setTestType(testType: textType) {
    localStorage.setItem('testType', testType);
    setTextType(testType);
  }

  function setWordAmount(wordCount: number) {
    localStorage.setItem('wordCount', JSON.stringify(wordCount));
    setWordCount(wordCount);
  }

  function setQuoteLength(length: quoteLength) {
    localStorage.setItem('quoteLength', length);
    setLengthOfQuote(length);
  }

  function reset( repeat?: boolean) {
    setFinished(false);
    setStarted(false);
    timer.handleReset();
    if (!repeat) {
      setWords([]);
    }
    if (textType === 'words') {
      setInput(new Array(wordCount).fill(''));
    } else if (textType === 'quotes') {
      switch(lengthOfQuote) {
        case 'short':
          setInput(new Array(100).fill(''));
          break
        case 'medium':
          setInput(new Array(175).fill(''));
          break
        default:
          setInput(new Array(250).fill(''));
          break
      }
    }
    setActiveWord(0);
    setActiveLetter(0);
    if (inputRef.current) {
      inputRef.current!.focus();
    }
  }

  function repeat() {
    reset(true);
  }

  function restart() {
    setRestartFlag(prev => !prev);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    if (!started) {
      setStarted(true)
      timer.handleStart();
    }
    const inputValue = e.target.value;
    const inputLength = inputValue.length;

    setInput(prev => {
      const res = prev;
      res[activeWord] = inputValue;
      return res;
    });
    const scan: boolean[] = [];
    for (let i = 0; i < inputLength; i++) {
      const char = inputValue[i];
      if (char == words[activeWord].charAt(i)) {
        scan.push(true);
      } else {
        scan.push(false);
      }
    }
    if (activeWord === words.length-1 && scan.length === words[activeWord].length && !scan.includes(false)) {
      onFinish();
    } else {
      setActiveLetter(inputLength);
    }
  }

  function handleKeydown(e: KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Backspace' && input[activeWord] === '') {
      e.preventDefault();
      setActiveWord(prev => {
        if (prev == 0) {
          return 0;
        } else {
          setActiveLetter(input[activeWord-1].length);
          return prev-1;
        }
      })
    }

    
    if (e.key === ' ') {
      if (activeLetter === 0) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setActiveLetter(0);
      if (activeWord === words.length-1) {
        onFinish();
      } else {
        setActiveWord(prev => prev+1)
      }
    }
  }

  function onFinish() {
    timer.handlePause();
    setFinished(true);
  }

  function calculateResults() {
    let extras: number = 0;
    let mistakes: number = 0;
    let unCorrectedWords: number = 0;
    let totalCharacters: number = 0;
    let charactersInCorrectWords: number = 0;
    for (let index = 0; index < words.length; index++) {
      const word = words[index];
      totalCharacters += word.length;
      if (word.length > input[index].length) {
        mistakes += (word.length - input[index].length);
      }
      if (word !== input[index]) {
        unCorrectedWords += 1;
        for (let i = 0; i < input[index].length; i++) {
          const letter = input[index].charAt(i);
          if (word.charAt(i) !== "") {
            if (word.charAt(i) !== letter) {
              mistakes += 1;
            }
          } else {
            extras += 1;
          }
        }
        continue
      }
      charactersInCorrectWords += word.length
    }
    const rawWRPM = ((totalCharacters+words.length-1-unCorrectedWords)/5)/(timer.elapsedTime/60000);
    const WPM = ((charactersInCorrectWords+words.length-1-unCorrectedWords)/5)/(timer.elapsedTime/60000);
    return {
      WPM: WPM,
      rawWPM: rawWRPM,
      totalCharacters: totalCharacters,
      uncorrectedWords: unCorrectedWords,
      mistakes: mistakes,
      extras: extras,
      wordCount: words.length
    };
  }

  function switchTheme(theme: string) {
    localStorage.setItem('setTheme', theme);
    setTheme(theme);
  }

  function toggleSettingsModal(opened: boolean) {
    if (opened) {
      settingsModal.current?.showModal();
    } else {
      settingsModal.current?.close();
      if (inputRef.current) {
        inputRef.current!.focus();
      }
    }
  }

  function toggleInfoModal(opened: boolean) {
    if (opened) {
      infoModal.current?.showModal();
    } else {
      infoModal.current?.close();
      if (inputRef.current) {
        inputRef.current!.focus();
      }
    }
  }

  return (
    <div className={`${styles[`theme${theme}`]}`}>
      <SettingsModal 
        reference={settingsModal} 
        setOpened={toggleSettingsModal} 
        testType={textType} 
        setTestType={setTestType} 
        wordCount={wordCount}
        setWordCount={setWordAmount}
        quoteLength={lengthOfQuote}
        setQuoteLength={setQuoteLength}
        theme={theme}
        switchTheme={switchTheme} 
      />
      <InfoModal
        reference={infoModal}
        setOpened={toggleInfoModal}
      />
      <Header 
        toggleSettings={toggleSettingsModal}
        toggleInfo={toggleInfoModal}
      />
      {
        <Options
          wordCount={wordCount} 
          setWordCount={setWordAmount} 
          textType={textType}
          setTextType={setTestType}
          quoteLength={lengthOfQuote}
          setQuoteLength={setQuoteLength}
        />
      }
      {
        !finished && words ?
        <>
        <div onClick={() => inputRef.current!.focus()} className={`${!focused && !debouncedFocus ? styles.containerBlurred : styles.container}`}>
          {!focused && !debouncedFocus ? <div className={styles.blurText}>Click to refocus</div> : null}
          {words.map((word, wordIdx) => {
            return (
            <div 
              key={wordIdx} 
              className={`${activeWord == wordIdx ? styles.wordActive : styles.word} ${(input[wordIdx] !== words[wordIdx]) && wordIdx < activeWord ? styles.wordError : ''}`}
            >
              {
                input[wordIdx].length > word.length ?
                <>
                  {word.split("").map((letter, letterIdx) => {
                    return (
                      <span 
                        key={letterIdx} 
                        className={`
                          ${activeWord == wordIdx && activeLetter == letterIdx ? styles.letterActive : styles.letter} 
                          ${input[wordIdx].length-1 >= letterIdx ? input[wordIdx].charAt(letterIdx) == words[wordIdx][letterIdx] ? styles.letterCorrect : styles.letterIncorrect : ''}
                        `}
                      >
                        {letter}
                      </span>
                    )
                  })}
                  {
                    input[wordIdx].slice(word.length).split("").map((letter, letterIdx) => {
                      return (
                        <span 
                          key={letterIdx + word.length} 
                          className={`${activeWord == wordIdx && activeLetter == letterIdx ? styles.letterActive : styles.letter} ${styles.letterExtra}`}
                        >
                          {letter}
                        </span>
                      )
                    })
                  }
                </>
                :
                
                (input[wordIdx].length == word.length) && wordIdx == activeWord ?
                <>
                {word.split("").map((letter, letterIdx) => {
                  return (
                    <span 
                      key={letterIdx} 
                      className={`${activeWord == wordIdx && activeLetter == letterIdx ? styles.letterActive : styles.letter} ${input[wordIdx].length-1 >= letterIdx ? input[wordIdx].charAt(letterIdx) == words[wordIdx][letterIdx] ? styles.letterCorrect : styles.letterIncorrect : ''}`}
                    >
                      {letter}
                    </span>
                  )
                })}
                <span 
                key={word.length} 
                className={`
                  ${styles.letterActive} 
                  ${styles.letterIncorrect}
                `}
                >
                  { }
                </span>
                </>
                :
                word.split("").map((letter, letterIdx) => {
                  return (
                    <span 
                      key={letterIdx} 
                      className={`${activeWord == wordIdx && activeLetter == letterIdx ? styles.letterActive : styles.letter} ${input[wordIdx].length-1 >= letterIdx ? input[wordIdx].charAt(letterIdx) == words[wordIdx][letterIdx] ? styles.letterCorrect : styles.letterIncorrect : ''}`}
                    >
                      {letter}
                    </span>
                  )
                })
              }
            </div>
            )
          })}
        </div>
        <input 
          autoComplete='off'
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          autoFocus
          ref={inputRef}
          value={input[activeWord]}
          onKeyDown={handleKeydown}
          onChange={handleChange}
          className={styles.input}
        />
        </>
        :
        <Results 
          WPM={calculateResults().WPM} 
          rawWPM={calculateResults().rawWPM}
          totalCharacters={calculateResults().totalCharacters}
          mistakes={calculateResults().mistakes}
          extras={calculateResults().extras}
          timeTaken={timer.elapsedTime}
          textType={textType}
          wordCount={calculateResults().wordCount}

          restart={restart}
          repeat={repeat}
        />
      }
      <Footer />
    </div>
  )
}

export default App