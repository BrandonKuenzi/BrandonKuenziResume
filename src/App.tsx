import React, { FunctionComponent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import './App.css';
import styled from 'styled-components'
import { AnimationControls, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { randomRangeInt } from './utils/randomRange';
import { sleep } from './utils/sleep';
import Scrollbars from 'react-custom-scrollbars';
import { AnimValue, useScrollValues } from './utils/customHooks/useScrollValues';
import ParallaxImage from './controls/ParallaxImage';
import Fall2015 from "./images/Fall2015.png"
import coolThing from "./images/coolThing.jpg"
import dots from "./images/dots.jpg"
import airplane from "./images/airplane.jpg"
import stars from "./images/stars.jpg"
import freelance from "./images/freelance.jpg"
import dusty from "./images/dusty.jpg"
import road from "./images/Road.jpg"
import sand from "./images/sand.jpg"
import codeImg from "./images/codeImg.jpg"
import laptop from "./images/laptop.jpg"
import SlidingText from './controls/SlidingText';
import SubtleRotateText from './controls/SubtleRotateText';
import TitleDiv from './controls/TitleDiv';
import TaglineControl from './controls/TaglineControl';
import TickerTape from './controls/TickerTape';
import Card from './controls/Card';
import SenseOfHumor from './controls/SenseOfHumor';
import FlippingText from './controls/FlippingText';


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
const TextParagraphDiv = styled(motion.div) <{ color?: string | undefined }>`
color: ${props => props.color ? props.color : "white"};
display: flex;
overflow: clip;
font-family: 'TruenoLite';
font-size: clamp(10px, 6vw, 30px);
width: 60%;
flex-direction: column;
align-items: center;
justify-content: center;
margin-top: 50px;
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
          <div style={{ width: "100%" }}>
            <TitleDiv text="Brandon Kuenzi" pageScrollPercent={pageScrollPercent} />
            <TaglineControl pageScrollPercent={pageScrollPercent} />
          </div>
          <div style={{ marginTop: window.screen.height / 8 }} />
          <TextParagraphDiv animate={{ opacity: 1 }} initial={{ opacity: 0 }} transition={{ duration: 1, delay: 2 }}>Scroll to Begin</TextParagraphDiv>
          <div style={{ marginTop: window.screen.height / 8 }} />
          <ParallaxImage text='Scrolling tutorial complete' image={stars} screenHeightPercent={.4} pageScrollPercent={pageScrollPercent} parallaxSpeedX='fast' parallaxSpeedY='insane' ></ParallaxImage>
          <div style={{ marginTop: 100 }} />
          <TextParagraphDiv >Hello and welcome to my digital resume! I'm Brandon Kuenzi, a software developer who loves to make stunning digital experiences. </TextParagraphDiv>
          <TextParagraphDiv >Please take a look around my website to learn more about my skills, experience, and hobbies.</TextParagraphDiv>
          <div style={{ marginTop: 200 }} />
          <TickerTape text={["React", "Typescript", "Javascript", "CSS", "HTML", "C#", "HL7"]} pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 200 }} />
          <FlippingText beforeText="Im a " flippingText={['front end', "full stack", "back end", "freelance", "reliable", "Unity", "versatile",]} afterText=' developer' pageScrollPercent={pageScrollPercent} />

          <TextParagraphDiv >My career has encompassed working on large teams and also independently as a freelance software developer. I am a motivated problem-solver with a passion for creating engaging user experiences. </TextParagraphDiv>
          <div style={{ marginTop: 200 }} />
          <SlidingText text={"Fun fact: I created this site using React and Typescript"} direction='left' pageScrollPercent={pageScrollPercent} />
          <SlidingText text={"I used Framer Motion for all animations that are currently tickling your fancy"} direction='left' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 200 }} />
          <ParallaxImage text={"My Experience"} useGiantFont={true} image={laptop} manualHeight={200} pageScrollPercent={pageScrollPercent} parallaxSpeedX='slow' parallaxSpeedY='fast' />
          <TickerTape text={["React", "TypeScript", "Javascript", "AWS", "Amplify", "Cognito", "S3", "GraphQL", "AWS Geo", "AWS Location API",]} length={90} pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 100 }} />
          <SubtleRotateText text="As Lead Fullstack Developer for Portico Wellness" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="2022 - 2023" isSubText={true} pageScrollPercent={pageScrollPercent} />
          <TextParagraphDiv >I built a single-page application using React/Typescript that helps health care providers connect and interact with their clients. </TextParagraphDiv>
          <TextParagraphDiv >AWS was used for hosting, user authentication, and data storage. I integrated third-party APIs into the app to provide additional functionality and improve user experience.</TextParagraphDiv>
          <TextParagraphDiv >I used GraphQL to create a seamless data exchange between multiple users.</TextParagraphDiv>
          <div style={{ marginTop: 100 }} />
          <ParallaxImage image={sand} manualHeight={100} pageScrollPercent={pageScrollPercent} parallaxSpeedX='slow' parallaxSpeedY='fast' />
          <TickerTape text={["React", "TypeScript", "Javascript", "C#", "UWP", "WPF", "Unity",]} length={90} pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 100 }} />
          <SubtleRotateText text="As Museum UX Design Integration Developer" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="2018 - Current" isSubText={true} pageScrollPercent={pageScrollPercent} />
          <TextParagraphDiv >I work with a large team creating and debugging experiences used by hundreds of thousands of visitors annually</TextParagraphDiv>
          <TextParagraphDiv >Design documents are transformed into interactions using React, WPF, or UWP</TextParagraphDiv>
          <TextParagraphDiv >Some advanced experiences are created using the Unity Game engine and involve using Arduino microcontrollers for custom user controls</TextParagraphDiv>

          <div style={{ marginTop: 100 }} />
          <ParallaxImage image={coolThing} manualHeight={100} pageScrollPercent={pageScrollPercent} parallaxSpeedX='slow' parallaxSpeedY='fast' />
          <TickerTape text={["React", "React Native", "TypeScript", "Javascript", "C#", "UWP", "WPF", "Unity",]} length={90} pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 100 }} />
          <SubtleRotateText text="As Freelance Developer" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="2012 - Current" isSubText={true} pageScrollPercent={pageScrollPercent} />
          <TextParagraphDiv >I have a track record of successfully managing multiple software projects simultaneously for both personal and client work, meeting tight deadlines and exceeding expectations.</TextParagraphDiv>
          <TextParagraphDiv >I developed and released applications using React/TypeScript, Unity/C#, UWP/WPF on various platforms including Google Play, Apple App Store, Windows Store, and Steam.</TextParagraphDiv>
          <div style={{ marginTop: 100 }} />
          <ParallaxImage image={dusty} manualHeight={100} pageScrollPercent={pageScrollPercent} parallaxSpeedX='slow' parallaxSpeedY='fast' />
          <div style={{ marginTop: 100 }} />
          <SubtleRotateText text="That's 10+ years " pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="of experience" pageScrollPercent={pageScrollPercent} />
          <SubtleRotateText text="and counting" pageScrollPercent={pageScrollPercent} />


          <div style={{ marginTop: 200 }} />
          <TextParagraphDiv> Now a bit about me, personally</TextParagraphDiv>
          <div style={{ marginTop: 200 }} />
          <ParallaxImage text='Alaska has been my home since 2011' color='black' image={Fall2015} screenHeightPercent={.4} pageScrollPercent={pageScrollPercent} parallaxSpeedX='slow' parallaxSpeedY='fast' ></ParallaxImage>
          <div style={{ marginTop: 200 }} />
          <SubtleRotateText text={"My Hobbies"} pageScrollPercent={pageScrollPercent} ></SubtleRotateText>
          <div style={{ marginTop: 100 }} />
          <HorizFlexDiv>
            <Card titleText='Astrophotography' contentText={"Alaska produces great shots of the night sky, including shots of the northern lights"} startOffsetY={-30} pageScrollPercent={pageScrollPercent} />
            <Card titleText='DIY Electronics' contentText={"Arduinos, FPV drones, and more. My workbench always has some project on it."} startOffsetY={0} pageScrollPercent={pageScrollPercent} startOffsetRotate={-2} />
            <Card titleText='Music Production' contentText={"Piano, uke, bass, and synth. Those are what I find myself plinking away on usually."} startOffsetY={-80} pageScrollPercent={pageScrollPercent} />
          </HorizFlexDiv>
          <HorizFlexDiv>
            <Card titleText='Camping' contentText={"Grab some bear spray and watch out for mosquitos. They're worse than the bears. "} startOffsetY={20} pageScrollPercent={pageScrollPercent} />
            <Card titleText='Plants' contentText={"Spring and summer I work in the garden. In winter I tinker with amateur hydroponics. "} startOffsetY={60} pageScrollPercent={pageScrollPercent} />
            <Card titleText='Rocks' contentText={"I'm the guy that stops and stares at gravel. My collection of shiny rocks grows monthly."} startOffsetY={-10} pageScrollPercent={pageScrollPercent} startOffsetRotate={1} />
          </HorizFlexDiv>
          <div style={{ marginTop: 200 }} />

          <TextParagraphDiv> And I am one of THOSE developers that also like to code in my free time. Some of my personal projects in progress: </TextParagraphDiv>

          <div style={{ marginTop: 50 }} />
          <SubtleRotateText text="Our Hero Farmer - a 2d platforming game about farming built in Unity" pageScrollPercent={pageScrollPercent} isSubText={true} />
          <div style={{ marginTop: 50 }} />
          <SubtleRotateText text="Library of the Unknown - an online collection of science mysteries yet to be solved. Built using React and AWS" pageScrollPercent={pageScrollPercent} isSubText={true} />
          <div style={{ marginTop: 50 }} />
          <SubtleRotateText text="brandonkuenzi.com - That's right. This website is an ongoing project. " pageScrollPercent={pageScrollPercent} isSubText={true} />
          <div style={{ marginTop: 200 }} />

          <ParallaxImage text={"\"I wish I had contacted Brandon sooner.\" \n - Future you"} image={codeImg} screenHeightPercent={.5} pageScrollPercent={pageScrollPercent} parallaxSpeedX='fast' parallaxSpeedY='slow' />
          <div style={{ marginTop: 100 }} />


          <SenseOfHumor pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 200 }} />

          <SlidingText text={"\"Working with Brandon is a delight and a pleasure. He is my go-to guy for anything tech related\"\n - Courtney K"} direction='left' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 50 }} />
          <SlidingText text={"This part of the website is like references on an application"} direction='right' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 50 }} />
          <SlidingText text={"\"More quotes coming soon\"\n -Brandon K"} direction='right' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 50 }} />
          <SlidingText text={"\"Here is just one more example of what I plan on doing on this part of the website. \"\n -Brandon K"} direction='left' pageScrollPercent={pageScrollPercent} />
          <div style={{ marginTop: 200 }} />
          <ParallaxImage screenHeightPercent={.75} text={"Thank you for visiting. Check back for more updates!"} pageScrollPercent={pageScrollPercent} image={road} />
          <div style={{ marginTop: 400 }} />
          <div>{"😉 -Brandon Kuenzi"}</div>
          <div style={{ marginTop: 100 }} />
        </MainDiv>
      </Scrollbars>
    </PageDiv >
  );
}

export default App;
