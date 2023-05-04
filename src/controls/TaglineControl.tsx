import { motion } from "framer-motion"
import styled from "styled-components"
import { greetings } from '../content/greetings';
import { useEffect, useState } from "react";
import { randomRangeInt } from "../utils/randomRange";
import { sleep } from "../utils/sleep";

interface TaglineControlProps {
    pageScrollPercent: number

}

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
const TaglineControl = (props: TaglineControlProps) => {
    const [greeting, setGreeting] = useState(greetings[randomRangeInt(0, greetings.length - 1)])
    const updateGreeting = async () => {
        await sleep(5000); // Wait 5 seconds
        let newGreeting = greetings[randomRangeInt(0, greetings.length - 1)];
        while (greeting === newGreeting)
            newGreeting = greetings[randomRangeInt(0, greetings.length - 1)];
        setGreeting(newGreeting);
    }

    useEffect(() => {


        updateGreeting();
    }, [greeting]);

    return (
        <ContentCenterDiv> <TaglineDiv animate={{ y: 0, opacity: 1 }} transition={{ duration: 2 }} initial={{ y: 25, opacity: 0 }}>{"... " + greeting}</TaglineDiv></ContentCenterDiv>
    )
}

export default TaglineControl;