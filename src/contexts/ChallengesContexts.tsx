import {ReactNode, createContext, useState, useEffect} from 'react';

import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompletes: number;
  experienceToNextLevel:number;
  activeChallenge: Challenge;
  levelUp: () => void;
  startNewChallenge: ()=> void;
  resetNewChallenge: ()=>void;
  completeChallenge: ()=> void;
  closeLevelUpModal: ()=> void;
}

interface ChallengesProviderProps{
  children:ReactNode;
  level:number;
  currentExperience:number;
  challengesCompletes:number;
}


export const ChallengesContext = createContext({} as ChallengesContextData);


export const ChallengesProvider = ({children, ...rest}:ChallengesProviderProps)=>{
  
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompletes, setChallengesCompletes] = useState(rest.challengesCompletes ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);
  const experienceToNextLevel = Math.pow( ((level+1)*4), 2 ); 

  useEffect(()=>{
    Notification.requestPermission();
  },[]);

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompletes', String(challengesCompletes)); 
  },[level, currentExperience, challengesCompletes]);

  function levelUp(){
    setLevel(level + 1);
    setisLevelUpModalOpen(true);
  }

  function closeLevelUpModal(){
    setisLevelUpModalOpen(false);
  }

  function startNewChallenge(){
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play();

    if(Notification.permission === "granted"){
      new Notification("Novo Desafio 💪",{
        body:`Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetNewChallenge(){
    setActiveChallenge(null);
  }

  function completeChallenge(){
    if(!activeChallenge){
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if(finalExperience >= experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompletes(challengesCompletes + 1);
  }


  const objtToChildren = {
    level,
    levelUp,
    currentExperience,
    challengesCompletes,
    startNewChallenge,
    activeChallenge,
    resetNewChallenge,
    experienceToNextLevel,
    completeChallenge,
    closeLevelUpModal
  }
  
  return (
    <ChallengesContext.Provider value={objtToChildren}>
      {children}
      {isLevelUpModalOpen && <LevelUpModal/>}
    </ChallengesContext.Provider>
  );
}