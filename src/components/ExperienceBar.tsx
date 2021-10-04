import React from 'react'
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/ExperienceBar.module.css';

export const ExperienceBar = ()=>{  
  
  const {currentExperience, experienceToNextLevel} = React.useContext(ChallengesContext);

  const percentToNextLevel = Math.round( (currentExperience * 100)/experienceToNextLevel );
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{width:`${(percentToNextLevel === 0 )? percentToNextLevel + 0.5 : percentToNextLevel}%`}}>
          <span style={{left:`${percentToNextLevel}%`}}  className={styles.currentExperience}>
            {currentExperience} xp
          </span>
        </div>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
    );
}
