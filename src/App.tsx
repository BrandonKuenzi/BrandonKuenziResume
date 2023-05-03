import React, { FunctionComponent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import styled from 'styled-components'
import { AnimationControls, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { randomRangeInt } from './utils/randomRange';
import { greetings } from './content/greetings';
import { sleep } from './utils/sleep';
import Scrollbars from 'react-custom-scrollbars';
import { AnimValue, useScrollValues } from './utils/customHooks/useScrollValues';
import ParallaxImage from './controls/ParallaxImage';
import codeImg from "./images/codeImg.jpg"
import laptop from "./images/laptop.jpg"
import SlidingText from './controls/SlidingText';
import SubtleRotateText from './controls/SubtleRotateText';


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
const TitleDiv = styled(motion.div)`
font-family: 'TruenoBold';
white-space: nowrap;
margin-top: 100px;
width:100%;
font-size: clamp(10px, 6vw, 100px);
color: white;
`
const TaglineDiv = styled(motion.div)`
color: white;
white-space: nowrap;
margin-top: 10px;
font-size:  clamp(5px, 2vw, 25px);
font-family: 'TruenoBold';
`
const ContentCenterDiv = styled(motion.div)`
padding: 0% 20%;
color: white;
box-sizing: border-box;
width:100%;
`

const TextBoxDiv = styled(motion.div)`
color: white;
justify-content: start;
font-size: 18px;
font-family: 'TruenoLite';
white-space: pre-wrap;
width:75%;
`
const LargeTextBoxDiv = styled(motion.div)`
color: white;
justify-content: center;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: pre-wrap;
width:75%;
`



function App() {
  const MainDivAnimation = { background: ["#fff", "#000"] };
  const MainDivTransition = { duration: 2, delay: 1 }
  const [greeting, setGreeting] = useState(greetings[randomRangeInt(0, greetings.length - 1)])
  const [shownError, setShownError] = useState(false);
  const [pageScrollPercent, setPageScrollPercent] = useState(0);
  const tempText = "This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?";


  const updateGreeting = async () => {
    await sleep(5000); // Wait 5 seconds
    let newGreeting = greetings[randomRangeInt(0, greetings.length - 1)];
    while (greeting === newGreeting)
      newGreeting = greetings[randomRangeInt(0, greetings.length - 1)];
    setGreeting(newGreeting);
  }

  useEffect(() => {
    if (!shownError) {
      setShownError(true);
      console.error("😎 Even Brandon's errors are cool.")
    }
  }, [shownError]);

  useEffect(() => {
    updateGreeting();

  }, [greeting]);


  const onPageScroll = (e: any) => {
    const scrollPos = (e.target as any).scrollTop;
    const maxScroll = (e.target as any).scrollHeight - (e.target as any).clientHeight;
    const percent = scrollPos / maxScroll;
    setPageScrollPercent(percent);

  }





  return (
    <PageDiv animate={MainDivAnimation} transition={MainDivTransition} >
      <Scrollbars thumbSize={100} renderThumbVertical={() => { return <div style={{ background: "white" }} /> }} onScroll={(e: any) => onPageScroll(e)}>
        <MainDiv >
          <ContentCenterDiv><TitleDiv>Brandon Kuenzi</TitleDiv></ContentCenterDiv>
          <ContentCenterDiv><TaglineDiv>{"... " + greeting}</TaglineDiv></ContentCenterDiv>
          <SlidingText text={"To begin your adventure"} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={"simply scroll down."} direction='right' pageScrollPercent={pageScrollPercent} />

          <div style={{ marginTop: 300 }} />
          <SubtleRotateText text="These words" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="fold over as" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="you scroll" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="the page" pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='right' pageScrollPercent={pageScrollPercent} />
          <ParallaxImage text={"\"Marrying Brandon was the best decision I ever made\" \n - Courtney K"} image={laptop} screenHeightPercent={.4} pageScrollPercent={pageScrollPercent} parallaxSpeedX='slow' parallaxSpeedY='fast' />
          <SubtleRotateText text="Software Developer" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="UI/UX" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="React" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="Typescript" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="Unity" pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='right' pageScrollPercent={pageScrollPercent} />
          <ParallaxImage text={"\"I wish I had contacted Brandon sooner.\" \n - Courtney K"} image={codeImg} screenHeightPercent={.5} pageScrollPercent={pageScrollPercent} parallaxSpeedX='fast' parallaxSpeedY='slow' />
          <SlidingText text={tempText} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={tempText} direction='right' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 500 }} />

        </MainDiv>
      </Scrollbars>
    </PageDiv >
  );
}

export default App;
