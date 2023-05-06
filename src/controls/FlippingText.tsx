import { AnimationControls, animateValue, motion, useAnimate, useMotionValue } from "framer-motion";
import styled from "styled-components";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";
import { useEffect, useRef, useState } from "react";
import { sleep } from "../utils/sleep";

interface FlippingTextProps {
    beforeText: string;
    flippingText: string[];
    afterText: string;
    pageScrollPercent: number;
    only2?: boolean;
}

const ContentDiv = styled(motion.div) <{ only2: boolean }>`
display: flex;
flex-direction: row;
flex-wrap: ${props => props.only2 ? "wrap" : "no-wrap"};
gap:0;
align-items: start;
justify-content: start;
color: white;
box-sizing: border-box;
width:100%;
padding-left: 20%;
padding-right: 20%;
`


const LargeTextBoxDiv = styled(motion.div)`
color: white;
justify-content: center;
font-size: clamp(.5vw, 4vw, 15vw);
font-family: 'TruenoLite';
white-space: pre-wrap;
transform-origin:80% 80%;
`

const FlippingHolderDiv = styled(motion.div) <{ only2: boolean }>`
display: flex;
flex-direction: column;
position: relative;
color: white;
justify-content:  ${props => props.only2 ? "start" : "center"};
align-items:  ${props => props.only2 ? "start" : "center"};
text-align:  ${props => props.only2 ? "start" : "center"};
`

const FlippingTextDiv = styled(motion.div) <{ only2: boolean }>`
color: white;
justify-content:  ${props => props.only2 ? "start" : "center"};
align-items:  ${props => props.only2 ? "start" : "center"};
font-size: clamp(.5vw, 4vw, 15vw);


font-family: 'TruenoLite';
white-space: pre;
transform-origin:80% 80%;
text-align: center;
`
const FlippingInvisibleDiv = styled(motion.div)`
height: 0;
color: transparent;
align-items: end;
font-size: clamp(.5vw, 4vw, 15vw);

font-family: 'TruenoLite';
white-space: pre;
transform-origin:80% 80%;
text-align: center;
`





const FlippingText = (props: FlippingTextProps) => {
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const [index, setIndex] = useState(0);

    const x = useMotionValue(0);
    const rotation = [90, 0, 0, 0, 0, 0, 90];
    const [scope, animate] = useAnimate();

    const longestStringIndex = (strings: string[]): number => {
        let longestIndex = 0;
        let longestLength = 0;

        for (let i = 0; i < strings.length; i++) {
            if (strings[i].length > longestLength) {
                longestIndex = i;
                longestLength = strings[i].length;
            }
        }

        return longestIndex;
    };

    useEffect(() => {
        startAnimationLoop();
    }, []);

    const startAnimationLoop = async () => {
        await onAnimComplete();
        startAnimationLoop();
    }

    const onAnimComplete = async (): Promise<void> => {

        const getValue = (prev: number): number => {
            let newIndex = prev + 1;
            if (newIndex >= props.flippingText.length)
                newIndex = 0;
            console.log("returning " + newIndex)
            return newIndex;
        }
        setIndex(prev => (getValue(prev)));
        await animate(scope.current, { rotateX: rotation }, { duration: 3 });
        return;
    }




    return (
        <ContentDiv only2={props.only2 ? true : false} ref={ref} transition={{ duration: 0 }}>
            {props.only2 ? props.beforeText.split(" ").map((word, idx) => <LargeTextBoxDiv key={"individualWord" + idx + word}>{word + " "}</LargeTextBoxDiv>) :
                <LargeTextBoxDiv>{props.beforeText}</LargeTextBoxDiv>
            }
            <FlippingHolderDiv only2={props.only2 ? true : false} >
                <FlippingTextDiv only2={props.only2 ? true : false} ref={scope} animate={{ rotateX: animValue.onScreen > 0 ? rotation : 0 }} transition={{ duration: 3, }}  >{props.flippingText[index]}</FlippingTextDiv>
                {props.flippingText.map((text) => {
                    return <FlippingInvisibleDiv>{text}</FlippingInvisibleDiv>
                })}
            </FlippingHolderDiv>
            <LargeTextBoxDiv>{props.afterText}</LargeTextBoxDiv>
        </ContentDiv >

    )
}

export default FlippingText;