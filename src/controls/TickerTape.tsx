import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";

interface TickerTapeProps {
    pageScrollPercent: number;
    text: string[];
    height?: number;
}

const MainContainerDiv = styled(motion.div)`
display: flex;
margin-top: 100px;
flex-direction: row;
justify-content: start;
align-items: start;
gap:100px;
padding: 0% 0%;
color: white;
box-sizing: border-box;
width: 100%;
`
const TextContainerDiv = styled(motion.div)`
position: relative;
color: white;
justify-content: center;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: pre-wrap;
`

const TextDiv = styled(motion.div) <{ width: string }>`
position:absolute;
top:0;
color: white;
justify-content: center;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: pre-wrap;
`



const TickerTape = (props: TickerTapeProps) => {
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const controlHeight = props.height ? props.height : 75;

    const getAnim = (idx: number) => {
        const screenWidth = window.screen.width;
        return { x: [screenWidth, -(screenWidth)] }
    }
    const eachWidth = (window.screen.width / props.text.length).toString();

    return (
        <MainContainerDiv ref={ref} >
            {props.text.map((text, idx) => {
                return (
                    <TextContainerDiv key={text + idx}>
                        <div style={{ height: controlHeight, color: "transparent" }}>{text}</div>
                        <TextDiv animate={getAnim(idx)} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }} width={eachWidth}>{text}</TextDiv>
                        <TextDiv animate={getAnim(idx)} transition={{ duration: 50, repeat: Infinity, ease: 'linear', delay: 25 }} width={eachWidth}>{text}</TextDiv>
                    </TextContainerDiv>)
            })}
        </MainContainerDiv>

    )
}

export default TickerTape;