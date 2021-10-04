import React from 'react';
import {ChallengesContext} from '../contexts/ChallengesContexts';
import styles from '../styles/components/Profile.module.css';

export function Profile(){

  const {level} = React.useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://picsum.photos/200/300" alt="David Linconl" />
      <div>
        <strong>First Name </strong>
        <p>
        <img src="icons/level.svg" alt="Level"/>
          Level {level}
          </p>
      </div>
    </div>
  );
}