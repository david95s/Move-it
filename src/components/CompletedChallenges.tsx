import React from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){
  
  const {challengesCompletes} = React.useContext(ChallengesContext);

  return(
    <div className={styles.completedChallengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompletes}</span>
    </div>
  );
}