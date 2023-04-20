import React from 'react';
import './App.css';
import styled from 'styled-components'
import { Variant, motion } from 'framer-motion';

const MainDiv = styled(motion.div)`
color: white;
position: absolute;
font-family: 'Roboto';
font-size: large;
top:0;
bottom: 0;
right: 0;
left: 0;
display: flex;
overflow: hidden;
background: black;
align-items: center;
justify-content: center;
border: 2px solid blanchedalmond; 
`
function App() {
  const MainDivAnimation = { background: ["#fff", "#000"] };
  const MainDivTransition = { duration: 2, delay: 1 }

  console.error("😎 Even Brandon's errors are cool.")
  return (
    <MainDiv animate={MainDivAnimation} transition={MainDivTransition}  >
      BK resume. You're welcome.
    </MainDiv>
  );
}

export default App;
