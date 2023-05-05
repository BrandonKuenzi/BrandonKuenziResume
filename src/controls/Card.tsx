import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";

interface CardProps {
    pageScrollPercent: number;
    titleText: string;
    contentText: string;
    startOffsetY: number;
    startOffsetRotate?: number;
}


const MainCardDiv = styled(motion.div)`
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
gap:10px;
padding: 100px;
color: #000000;
overflow: visible;
height: 150px;

//box-shadow: 0px 0px 15px #fff;
background:whitesmoke;
border-radius: 20px;
box-sizing: border-box;
padding:20px;
max-width: 30%;
`

const TitleTextDiv = styled(motion.div)`
color: black;
justify-content: center;
font-size: clamp(3px, 1.5vw, 30px);
font-family: 'Trueno';
white-space: pre-wrap;
`
const ContentTextDiv = styled(motion.div)`
color: black;
justify-content: center;
font-size: clamp(8px, 2vw, 25px);
font-family: 'TruenoLite';
white-space: pre-wrap;
`

const Card = (props: CardProps) => {
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const getOffsetY = (av: AnimValue): AnimationControls => {
        let progress = (-av.toCenter);
        if (progress < 0) progress = 0;
        let y = props.startOffsetY * progress;

        let rotateStart = props.startOffsetRotate ? props.startOffsetRotate : 0;
        let rotate = rotateStart * progress;


        return { y: y, rotateZ: rotate } as unknown as AnimationControls
    }

    return (<MainCardDiv ref={ref} animate={getOffsetY(animValue)} transition={{ duration: 0 }}>
        <TitleTextDiv>{props.titleText}</TitleTextDiv>
        <ContentTextDiv>{props.contentText}</ContentTextDiv>
    </MainCardDiv>)
}

export default Card;