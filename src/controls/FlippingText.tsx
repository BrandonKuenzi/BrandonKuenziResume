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
}

const ContentDiv = styled(motion.div)`
display: flex;
flex-direction: row;
gap:0;
align-items: start;
justify-content: start;
padding: 0% 20%;
color: white;
box-sizing: border-box;
width:100%;
`


const LargeTextBoxDiv = styled(motion.div)`
color: white;
justify-content: center;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: pre-wrap;
transform-origin:80% 80%;
`
const FlippingHolderDiv = styled(motion.div)`
display: flex;
flex-direction: column;
position: relative;
color: white;
justify-content: center;
align-items: center;
text-align: center;
`

const FlippingTextDiv = styled(motion.div)`
color: white;
justify-content: center;
align-items: center;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: pre;
transform-origin:80% 80%;
text-align: center;
`
const FlippingInvisibleDiv = styled(motion.div)`
height: 0;
color: transparent;
align-items: end;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: pre;
transform-origin:80% 80%;
text-align: center;
`



const subtleRotateInAnim = (av: AnimValue): AnimationControls => {
    let rotate = (av.toTop) * 100;
    rotate = rotate - 100;
    if (rotate < -90)
        rotate = -90;

    let opacity = av.toTop;
    if (opacity > .5)
        opacity = opacity * 1.5;
    if (opacity > 1) opacity = 1;
    return { rotateX: -rotate, opacity: opacity } as unknown as AnimationControls
}

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
        <ContentDiv ref={ref} animate={subtleRotateInAnim(animValue)} transition={{ duration: 0 }}>
            <LargeTextBoxDiv>{props.beforeText}</LargeTextBoxDiv>
            <FlippingHolderDiv>
                <FlippingTextDiv ref={scope} animate={{ rotateX: animValue.onScreen > 0 ? rotation : 0 }} transition={{ duration: 3, }}  >{props.flippingText[index]}</FlippingTextDiv>
                {props.flippingText.map((text) => {
                    return <FlippingInvisibleDiv>{text}</FlippingInvisibleDiv>
                })}
            </FlippingHolderDiv>
            <LargeTextBoxDiv>{props.afterText}</LargeTextBoxDiv>
        </ContentDiv >

    )
}

export default FlippingText;