import React from 'react';
import styles from '../styles/components/CountDown.module.css';
import { CountDownContext } from '../contexts/CountDownContext';


export function CountDown(){

  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown,
  } = React.useContext(CountDownContext);
  
  
  const [minuteLeft, minuteRight]= String(minutes).padStart(2,'0').split('');
  const [secondLeft, secondRight]= String(seconds).padStart(2,'0').split('');

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>      
        {hasFinished ? (
             <button disabled className={styles.countdownBtn}>
              Ciclo Encerrado
           </button>
        ): (
          <>
          {isActive ? (
              <button onClick={resetCountDown} type="button" className={`${styles.countdownBtn} ${styles.countdownBtnActive}` }>
                Abandonar ciclo
              </button>
            ) : 
            <button onClick={startCountDown} type="button" className={styles.countdownBtn}>
              Iniciar um ciclo
            </button>
          }
          </>
        )}

    </div>

  );
}