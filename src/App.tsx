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
overflow: visible;
width: 60%;
flex-direction: column;
gap:15px;
align-items: start;
justify-content: start;
`
const TitleDiv = styled(motion.div)`
padding: 0% 20%;
font-family: 'TruenoBold';
width:100%;
font-size: 60px;
color: white;
`
const TaglineDiv = styled(motion.div)`
padding: 0% 20%;
color: white;
font-size: 25px;
font-family: 'TruenoBold';
`
const ContentCenterDiv = styled(motion.div)`
padding: 0% 20%;
color: white;
justify-content: center;
margin-top: 100px;
width:100%;
`
const ContentLeftDiv = styled(motion.div)`
padding: 0% 20%;
color: white;
justify-content: start;
margin-top: 100px;
width:100%;
`
const ContentRightDiv = styled(motion.div)`
padding: 0% 20%;
color: white;
text-align: end;
display: flex;
align-items: end;
justify-content: end;
margin-top: 100px;
width:100%;
`
const TextBoxDiv = styled(motion.div)`
padding: 0% 20%;
color: white;
justify-content: start;
font-size: 18px;
font-family: 'TruenoLite';
white-space: pre-wrap;
width:50%;
`




function App() {
  const MainDivAnimation = { background: ["#fff", "#000"] };
  const MainDivTransition = { duration: 2, delay: 1 }
  const [greeting, setGreeting] = useState(greetings[randomRangeInt(0, greetings.length - 1)])
  const [shownError, setShownError] = useState(false);
  const [pageScrollPercent, setPageScrollPercent] = useState(0);
  const { componentRef: ref1, animValue: animValue1 } = useScrollValues(pageScrollPercent);
  const { componentRef: ref2, animValue: animValue2 } = useScrollValues(pageScrollPercent);
  const { componentRef: ref3, animValue: animValue3 } = useScrollValues(pageScrollPercent);
  const { componentRef: ref4, animValue: animValue4 } = useScrollValues(pageScrollPercent);
  const { componentRef: ref5, animValue: animValue5 } = useScrollValues(pageScrollPercent);
  const { componentRef: ref6, animValue: animValue6 } = useScrollValues(pageScrollPercent);
  const { componentRef: ref7, animValue: animValue7 } = useScrollValues(pageScrollPercent);
  const { componentRef: ref8, animValue: animValue8 } = useScrollValues(pageScrollPercent);


  const animatedChildRefs = useRef<Array<HTMLDivElement | null>>([]);


  // useEffect(() => {
  //   const top = (ref1.current as HTMLDivElement).getBoundingClientRect().top;
  //   const maxHeight = window.innerHeight;
  //   const elementHeight = (ref1.current as HTMLDivElement).scrollHeight;
  //   const elementHeightScreenPercent = elementHeight / maxHeight;
  //   const center = (ref1.current as HTMLDivElement).getBoundingClientRect().top - (elementHeight / 2);
  //   const toTop = 1 - top / maxHeight;
  //   const centerToTop = toTop + (maxHeight / 2);
  //   const toCenter = ((.5 - (toTop - (elementHeightScreenPercent / 2))) * -2);
  //   const toBottom = (1 - toTop) + elementHeightScreenPercent / 2;
  //   let onScreen = 1;
  //   if (toCenter > 0) {
  //     onScreen = 1 - (((1 - top) - elementHeightScreenPercent) / elementHeight);
  //     if (onScreen > 1) onScreen = 1;
  //   }
  //   else if (toCenter <= 0) {
  //     onScreen = toTop / elementHeightScreenPercent;
  //     if (onScreen > 1) onScreen = 1;
  //   }
  //   const animValue = { toTop: toTop, toCenter: toCenter, toBottom: toBottom, onScreen: onScreen };

  //   setRef1Progress(animValue);
  // }, [pageScrollPercent]);


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

  //const ref = useRef(null)



  const onPageScroll = (e: any) => {
    const scrollPos = (e.target as any).scrollTop;
    const maxScroll = (e.target as any).scrollHeight - (e.target as any).clientHeight;
    const percent = scrollPos / maxScroll;
    //  console.log(ref);
    //console.log((ref.current as any).scrollTop);
    setPageScrollPercent(percent);

  }

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((entry, index) => {
        console.log(`AnimatedChild ${index} is ${entry.isIntersecting ? 'visible' : 'hidden'}`);
      });
    });
    animatedChildRefs.current.forEach((animatedChildRef, index) => {
      if (animatedChildRef) {
        observer.observe(animatedChildRef);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  const slideInRightAnim = (av: AnimValue): AnimationControls => {
    let progress = (1 - Math.abs(av.toCenter)) * 1.5;
    if (progress > 1) progress = 1;
    let x = (1 - progress) * 200;
    if (x < 0) x = x * -1;
    return { x: x, opacity: progress } as unknown as AnimationControls
  }
  const slideInLeftAnim = (av: AnimValue): AnimationControls => {
    let progress = (1 - Math.abs(av.toCenter)) * 1.5;
    if (progress > 1) progress = 1;
    let x = (1 - progress) * (window.screen.width / 2);
    if (x > 0) x = x * -1;
    return { x: x, opacity: progress } as unknown as AnimationControls
  }




  return (
    <PageDiv animate={MainDivAnimation} transition={MainDivTransition} >
      <Scrollbars thumbSize={100} renderThumbVertical={() => { return <div style={{ background: "white" }} /> }} onScroll={(e: any) => onPageScroll(e)}>
        <MainDiv >
          <ContentCenterDiv><TitleDiv>Brandon Kuenzi...</TitleDiv></ContentCenterDiv>
          <ContentCenterDiv><TaglineDiv>{greeting}</TaglineDiv></ContentCenterDiv>
          <ContentLeftDiv ref={ref1} animate={slideInLeftAnim(animValue1)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentLeftDiv>
          <ContentRightDiv ref={ref2} animate={slideInRightAnim(animValue2)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentRightDiv>
          <ParallaxImage image={laptop} screenHeightPercent={.4} pageScrollPercent={pageScrollPercent} />
          <ContentLeftDiv ref={ref3} animate={slideInLeftAnim(animValue3)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentLeftDiv>
          <ContentRightDiv ref={ref4} animate={slideInRightAnim(animValue4)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentRightDiv>
          <ContentLeftDiv ref={ref5} animate={slideInLeftAnim(animValue5)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentLeftDiv>
          <ContentRightDiv ref={ref6} animate={slideInRightAnim(animValue6)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentRightDiv>
          <ContentLeftDiv ref={ref7} animate={slideInLeftAnim(animValue7)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentLeftDiv>
          <ContentRightDiv ref={ref8} animate={slideInRightAnim(animValue8)} transition={{ duration: 0 }}><TextBoxDiv>This is my website. Im working on branding right now. So this is just some content to test out the font I picked. How does it look?</TextBoxDiv></ContentRightDiv>
          <ParallaxImage image={codeImg} screenHeightPercent={.5} pageScrollPercent={pageScrollPercent} />
        </MainDiv>
      </Scrollbars>
    </PageDiv >
  );
}

export default App;
