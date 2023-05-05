import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";
import { useEffect, useRef, useState } from "react";

interface TickerTapeProps {
    pageScrollPercent: number;
    text: string[];
    height?: number;
    length?: number;
}

const MainContainerDiv = styled(motion.div)`
display: flex;
position:relative;
margin-top: 100px;
flex-direction: row;
justify-content: start;
align-items: start;
gap:100px;
padding: 0% 0%;
color: white;
width: 100%;
height: 100px;
overflow:hidden;
`
const TextContainerDiv = styled(motion.div)`
position: absolute;
left:0;
top:0;
color: white;
justify-content: center;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: nowrap;
overflow:visible;
`

const TextDiv = styled(motion.div)`
position:absolute;
top:0;
left:0;
color: white;
justify-content: center;
font-size: clamp(10px, 6vw, 50px);
font-family: 'TruenoLite';
white-space: pre-wrap;
overflow:visible;

`



const TickerTape = (props: TickerTapeProps) => {
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const controlHeight = props.height ? props.height : 75;
    const divRefs = useRef<(HTMLDivElement | null)[]>(Array(props.text.length).fill(null));
    const [forceRerender, setForceRerender] = useState(0);
    const length = props.length ? props.length : 50;
    const duration = 30;
    const gapTime = 1;

    const [delays, setDelays] = useState<number[]>(Array(props.text.length).fill(0));

    function getWidestDiv(): HTMLDivElement | null {
        let widestDiv: HTMLDivElement | null = null;
        let maxWidth = 0;

        if (divRefs.current)
            divRefs.current?.forEach((ref) => {
                if (ref) {
                    const width = ref.offsetWidth;
                    if (width > maxWidth) {
                        widestDiv = ref;
                        maxWidth = width;
                    }
                }
            });

        return widestDiv;
    }



    useEffect(() => {
        let currentDelay = 0;
        let newDelays = delays;
        props.text.forEach((text, idx) => {

            const screenWidth = window.screen.width;

            let prevWidth = 0;
            if (idx > 0 && divRefs.current[idx]?.clientWidth !== undefined)
                prevWidth = divRefs.current[idx - 1]?.clientWidth as number;

            const percentOfScreenPrev = prevWidth / screenWidth;
            const delayPercent = percentOfScreenPrev * duration;

            const delay = delayPercent + gapTime;

            console.log("delay " + delay)
            currentDelay += delay;
            newDelays[idx] = currentDelay;

        });
        setDelays([...newDelays]);
        console.log("Set delays ", delays)
        setForceRerender(prev => prev + 1)
    }, [props.text]);

    const getAnim = (idx: number) => {
        const screenWidth = window.screen.width;
        const divWidth: number = getWidestDiv()?.clientWidth !== undefined ? getWidestDiv()?.clientWidth as number : screenWidth / 2;
        console.log(divWidth + " is divwidth")
        return { x: [screenWidth, -divWidth] }
    }

    const getRepeatDelayTime = (): number => {
        const screenWidth = window.screen.width;

        const lastOneLaunchedTime = delays[delays.length - 1]; // Could be 45 seconds
        const finishedBeforeThatTime = lastOneLaunchedTime - duration;

        return (delays[1] + gapTime) + (finishedBeforeThatTime < 0 ? 0 : finishedBeforeThatTime);

        // if it takes DURATION seconds for each one to cross the screen.
        // We know



    }

    return (
        <MainContainerDiv ref={ref} >
            {props.text.map((text, idx) => {


                return (
                    <TextContainerDiv key={text + idx}>
                        <div ref={(ref) => (divRefs.current[idx] = ref)} style={{ height: controlHeight, color: "transparent" }}>{text}</div>
                        {(delays[delays.length - 1] > 0) && <TextDiv animate={getAnim(idx)} transition={{ duration: duration, repeat: Infinity, ease: 'linear', delay: delays[idx] as number, repeatDelay: getRepeatDelayTime() }}>{text}</TextDiv>
                        }
                    </TextContainerDiv>)
            })}
        </MainContainerDiv>

    )
}

export default TickerTape;