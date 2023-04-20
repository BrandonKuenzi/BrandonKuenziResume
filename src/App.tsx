import React, { useEffect, useState } from 'react';
import './App.css';
import styled from 'styled-components'
import { motion } from 'framer-motion';
import { randomRangeInt } from './utils/randomRange';
import { greetings } from './content/greetings';
import { sleep } from './utils/sleep';

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
flex-direction: column;
gap:15px;
overflow: hidden;
background: black;
align-items: center;
justify-content: center;
border: 20px solid blanchedalmond; 
`
function App() {
  const MainDivAnimation = { background: ["#fff", "#000"] };
  const MainDivTransition = { duration: 2, delay: 1 }
  const [greeting, setGreeting] = useState(greetings[randomRangeInt(0, greetings.length - 1)])
  const [shownError, setShownError] = useState(false);

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

  return (
    <MainDiv animate={MainDivAnimation} transition={MainDivTransition}  >
      BK's resume...
      <div>{greeting}</div>
    </MainDiv>
  );
}

export default App;
