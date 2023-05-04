import React, { FunctionComponent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import styled from 'styled-components'
import { AnimationControls, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { randomRangeInt } from './utils/randomRange';
import { sleep } from './utils/sleep';
import Scrollbars from 'react-custom-scrollbars';
import { AnimValue, useScrollValues } from './utils/customHooks/useScrollValues';
import ParallaxImage from './controls/ParallaxImage';
import codeImg from "./images/codeImg.jpg"
import laptop from "./images/laptop.jpg"
import SlidingText from './controls/SlidingText';
import SubtleRotateText from './controls/SubtleRotateText';
import TitleDiv from './controls/TitleDiv';
import TaglineControl from './controls/TaglineControl';
import TickerTape from './controls/TickerTape';
import Card from './controls/Card';
import SenseOfHumor from './controls/SenseOfHumor';


const PageDiv = styled(motion.div)`
position: absolute;
top:0;
bottom: 0;
right: 0;
left: 0;
display: flex;
flex-direction: row;
font-family: 'TruenoBold';
gap:0px;
background: black;
align-items: center;
justify-content: center;
border: 0px solid whitesmoke; 
`


const MainDiv = styled(motion.div)`
color: white;
display: flex;
overflow: clip;
width: 100%;
flex-direction: column;
gap:15px;
align-items: center;
justify-content: center;
`
const HorizFlexDiv = styled(motion.div)`
display: flex;
flex-direction: row;
align-items: center;
width: 80%;
justify-content: space-evenly;
`





function App() {
  const MainDivTransition = { duration: 2, delay: 1 }
  const [shownError, setShownError] = useState(false);
  const [pageScrollPercent, setPageScrollPercent] = useState(0);
  const tempText = "This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?";




  useEffect(() => {
    if (!shownError) {
      setShownError(true);
      console.error("😎 Even Brandon's errors are cool.")
    }
  }, [shownError]);




  const onPageScroll = (e: any) => {
    const scrollPos = (e.target as any).scrollTop;
    const maxScroll = (e.target as any).scrollHeight - (e.target as any).clientHeight;
    const percent = scrollPos / maxScroll;
    setPageScrollPercent(percent);

  }





  return (
    <PageDiv  >
      <Scrollbars thumbSize={100} renderThumbVertical={() => { return <div style={{ background: "white" }} /> }} onScroll={(e: any) => onPageScroll(e)}>
        <MainDiv >
          <TitleDiv text="Brandon Kuenzi" pageScrollPercent={pageScrollPercent} />
          <TaglineControl pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 50 }} />
          <SlidingText text={"To begin your adventure"} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={"simply scroll down."} direction='right' pageScrollPercent={pageScrollPercent} />
          <TickerTape text={["React", "Typescript", "Javascript", "CSS", "HTML", "C#", "HL7"]} pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 200 }} />
          <SubtleRotateText text="These words" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="animate as" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="you scroll" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="the page" pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='right' pageScrollPercent={pageScrollPercent} />
          <TickerTape text={["Visual Studio", "Visual Studio Code", "Unity", "Git", "AWS", "Azure"]} pageScrollPercent={pageScrollPercent} />
          <ParallaxImage text={"\"Marrying Brandon was the best decision I ever made\" \n - Courtney K"} image={laptop} screenHeightPercent={.4} pageScrollPercent={pageScrollPercent} parallaxSpeedX='slow' parallaxSpeedY='fast' />
          <div style={{ marginTop: 100 }} />
          <SubtleRotateText text="Software Developer" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="UI/UX" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="React" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="Typescript" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="Unity" pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 100 }} />
          <SenseOfHumor pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='right' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 100 }} />

          <ParallaxImage text={"\"I wish I had contacted Brandon sooner.\" \n - Courtney K"} image={codeImg} screenHeightPercent={.5} pageScrollPercent={pageScrollPercent} parallaxSpeedX='fast' parallaxSpeedY='slow' />

          <div style={{ marginTop: 100 }} />


          <SlidingText text={tempText} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='right' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 200 }} />
          <HorizFlexDiv>
            <Card titleText='Bold Title' contentText={"This is a card component's subtext"} startOffsetY={-30} pageScrollPercent={pageScrollPercent} />
            <Card titleText='Bold Title' contentText={"This is a card component's subtext"} startOffsetY={0} pageScrollPercent={pageScrollPercent} />
            <Card titleText='Bold Title' contentText={"This is a card component's subtext"} startOffsetY={-80} pageScrollPercent={pageScrollPercent} />
          </HorizFlexDiv>
          <div style={{ marginTop: 500 }} />

        </MainDiv>
      </Scrollbars>
    </PageDiv >
  );
}

export default App;
