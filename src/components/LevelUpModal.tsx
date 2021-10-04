import React from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/LevelUpModal.module.css'

export function LevelUpModal(){
  const {level, closeLevelUpModal} = React.useContext(ChallengesContext);

  const closedModal = ()=>{
    closeLevelUpModal();
  }

  const modalCloseHimself = ({target, currentTarget})=>{
    console.log('sss')
    if(target === currentTarget){
      closedModal();
    }
  }

  return (
    <div className={styles.overlay} onClick={modalCloseHimself}>
      <div className={styles.container}>
        <header>{level}</header>
        <strong>Parabéns</strong>
        <p>Você alcançou um novo level.</p>
        
        <button type="button" onClick={closedModal}>
          <img src="/icons/close.svg" alt="Fechar Modal"/>
        </button>
      </div>
    </div>
    );
}