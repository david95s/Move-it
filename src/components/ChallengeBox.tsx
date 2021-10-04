import React from 'react';
import {ChallengesContext} from '../contexts/ChallengesContexts';
import { CountDownContext } from '../contexts/CountDownContext';
import styles from '../styles/components/ChallengeBox.module.css';


export function ChallengeBox(){
  
  const {activeChallenge, resetNewChallenge, completeChallenge} = React.useContext(ChallengesContext);
  const {resetCountDown} = React.useContext(CountDownContext);

  function handleChallengeSucceeded(){
    completeChallenge();
    resetCountDown();
  }


  function handleChallengeFailed(){
    resetNewChallenge()
    resetCountDown();
  }

  return (
      <div className={styles.challengeBoxContainer}>
  
        {activeChallenge ? (          
          <div className={styles.activeChallenge}>
            <header>Ganhe {activeChallenge.amount} xp</header>
            <main>
              {activeChallenge.type ==="eye" ? (
                <img src="icons/eye.svg" alt="work out"/>
              ):(
                <img src="icons/body.svg" alt="work out"/>
              )}
              <strong>Novo Desafio</strong>
              <p>{activeChallenge.description}</p>
            </main>
            <footer>
               <button 
                  type="button"
                  className={styles.challengeFailedBTN}
                  onClick={handleChallengeFailed}
                >
                Falhei
               </button>
               <button 
                  type="button"
                  className={styles.challengeSucceededBTN}
                  onClick={handleChallengeSucceeded}
                >
                Completei
               </button>
               
            </footer>
          </div>

        ):(

          <div className={styles.challengeNotActive}>
            <strong>Finalize um ciclo para receber um desafio</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level up"/>
              Avance de level completando desafios.
            </p>
          </div>
        )
        }
    </div>
  )
}