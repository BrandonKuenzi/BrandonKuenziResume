import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";

interface SlidingTextProps {
    direction: "left" | "right";
    text: string;
    pageScrollPercent: number;
}

const ContentLeftDiv = styled(motion.div)`
padding: 0% 20%;
box-sizing: border-box;
color: white; 
justify-content: start;
margin-top: 100px;
width:100%;
`
const ContentRightDiv = styled(motion.div)`
padding: 0% 20%;
box-sizing: border-box;
color: white;
text-align: end;
display: flex;
align-items: end;
justify-content: end;
margin-top: 100px;
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
const slideAcrossRightAnim = (av: AnimValue): AnimationControls => {
    let progress = (1 - av.toCenter) * 2;
    if (progress > 1 && progress < 2) progress = 1;

    if (progress >= 2) progress = progress - 1;

    let x = (1 - progress) * 200;

    let opacity = 1 - Math.abs(av.toCenter);
    opacity = opacity * 1.5;
    if (opacity > 1) opacity = 1;
    return { x: x, opacity: opacity } as unknown as AnimationControls
}
const slideAcrossLeftAnim = (av: AnimValue): AnimationControls => {
    let progress = (1 - av.toCenter) * 2;
    if (progress > 1 && progress < 2) progress = 1;

    if (progress >= 2) progress = progress - 1;

    let x = (1 - progress) * 200;

    let opacity = 1 - Math.abs(av.toCenter);
    opacity = opacity * 1.5;
    if (opacity > 1) opacity = 1;

    return { x: -x, opacity: opacity } as unknown as AnimationControls
}

const SlidingText = (props: SlidingTextProps) => {
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);

    if (props.direction === "left")
        return (
            <ContentLeftDiv ref={ref} animate={slideAcrossLeftAnim(animValue)} transition={{ duration: 0 }}><TextBoxDiv>{props.text}</TextBoxDiv></ContentLeftDiv>

        )
    else
        return (<ContentRightDiv ref={ref} animate={slideAcrossRightAnim(animValue)} transition={{ duration: 0 }}><TextBoxDiv>{props.text}</TextBoxDiv></ContentRightDiv>
        )
}

export default SlidingText;