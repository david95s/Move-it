import Head from 'next/head';
import {GetServerSideProps} from 'next';
import styles  from '../styles/pages/Home.module.css';
import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDownProvider } from '../contexts/CountDownContext';
import { ChallengesProvider } from '../contexts/ChallengesContexts';


interface HomeProps  {
  level:number;
  currentExperience:number;
  challengesCompletes:number;
}

export default function Home(props: HomeProps) {
  
  console.log("%c Move-it", "background:black;padding:3px;padding-right:10px;border-radius:3px;font-size:14px;margin:4px 0;font-family:Arial;");
  return (
    <ChallengesProvider 
    level={props.level} 
      currentExperience={props.currentExperience}
     challengesCompletes={props.challengesCompletes} >
      <div className={styles.container}>
        <Head>
          <title>Inicio | move.it </title>
        </Head>
        <ExperienceBar/>

        <CountDownProvider>
          <section>
              <div >
                <Profile/>
                <CompletedChallenges/>
                <CountDown/>
              </div>
              <div>
                <ChallengeBox/>
              </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>

  );
}

/*
  Function NEXT.JS
  in this Method below, its kinda a part of Back-End.
*/
export const getServerSideProps: GetServerSideProps= async(ctx)=>{

  const {level, currentExperience, challengesCompletes} = ctx.req.cookies;

  return {
    props:{
      level:Number(level), 
      currentExperience:Number(currentExperience), 
      challengesCompletes:Number(challengesCompletes),
    },
  }
}

 