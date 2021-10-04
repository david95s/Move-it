import {createContext, ReactNode, useContext, useState, useEffect} from 'react';
import { ChallengesContext } from './ChallengesContexts';

interface CountDownContextData{
  minutes:number;
  seconds:number;
  hasFinished:boolean;
  isActive:boolean;
  startCountDown:()=> void;
  resetCountDown:()=> void;
}

interface CountDownProviderProps{
  children:ReactNode;
}
let countdownTimeout: NodeJS.Timeout; 

export const CountDownContext = createContext({} as CountDownContextData);

export function CountDownProvider({children}: CountDownProviderProps){
  const {startNewChallenge} = useContext(ChallengesContext);
  const minuteInSeconds = (0.1 * 60);  
  
  //States
  const [timeX, setTimeX] = useState(minuteInSeconds);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  //States

  const minutes = Math.floor(timeX / 60);
  const seconds = timeX % 60;//rest of Division 

  useEffect(()=>{
    if(isActive && timeX > 0){
      countdownTimeout = setTimeout(()=>{
        setTimeX(timeX - 1);
      }, 1000);  
    }else if(isActive && timeX == 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  },[isActive, timeX]);

  function startCountDown(){
    setIsActive(true);
  }

  function resetCountDown(){
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTimeX(minuteInSeconds);
    setHasFinished(false);
  }

  const objtToChildren = {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountDown,
    resetCountDown,
  }

  return (
      <CountDownContext.Provider  value={objtToChildren}>
          {children}
      </CountDownContext.Provider>
    )

}