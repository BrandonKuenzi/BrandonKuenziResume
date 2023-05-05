import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface SenseOfHumorProps {
    pageScrollPercent: number;

}
const MainDiv = styled(motion.div)`
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
gap:20px;
padding: 100px;
color: #fff;
//box-shadow: 0px 0px 15px #fff;
box-sizing: border-box;
padding:20px;
width:80%;
`

const TitleTextDiv = styled(motion.div)`
color: white;
justify-content: center;
font-size: clamp(20px, 3vw, 60px);
font-family: 'TruenoBold';
white-space: pre-wrap;
`
const ContentTextDiv = styled(motion.div)`
color: white;
justify-content: center;
align-items: center;
font-size: clamp(8px, 3vw, 20px);
font-family: 'TruenoLite';
white-space: pre-wrap;
`

const ButtonHolderDiv = styled(motion.div)`
position: relative;
margin-top: 20px;
width:150px;
height: 50%;
`
const FakeButtonDiv = styled(motion.div) <{ x: any, y: number }>`
position: absolute;
top: ${props => props.y};
left: ${props => props.x};
display: flex;
justify-content:center;
font-size: clamp(8px, 3vw, 14px);
align-items: center;
border-radius: 90px;
height:50px;
color:black;
padding:0px 30px;
white-space: pre;
background:white;
z-index: 2;
`
const SenseOfHumor = (props: SenseOfHumorProps) => {
    const width = 250;
    const height = 50;
    const buttonRef = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    // useEffect(() => {
    //     const rect = buttonRef.current?.getBoundingClientRect();
    //     if (rect) {
    //         setPosition({ x: rect.left, y: rect.top });
    //     }
    // }, []);

    useEffect(() => {
        function handleMouseMove(event: MouseEvent) {
            const rect = buttonRef.current?.getBoundingClientRect();
            if (rect?.left !== undefined && rect.right !== undefined) {
                const centerX = rect?.left + width / 2;
                const centerY = rect?.top + height / 2;
                const distance = Math.sqrt(
                    Math.pow(centerX - event.clientX, 2) + Math.pow(centerY - event.clientY, 2)
                );
                if (distance < 150) { // replace 100 with your desired threshold
                    let newX = position.x + (centerX - event.clientX) / 10; // replace 10 with your desired movement speed
                    if (newX > window.screen.width * .4)
                        newX = window.screen.width * .4;
                    if (newX < -window.screen.width * .075)
                        newX = -window.screen.width * .075;
                    let newY = position.y + (centerY - event.clientY) / 10;
                    setPosition({
                        x: newX,
                        y: newY
                    });
                    console.log("SetX", newX)
                    console.log("SetY", newY)
                }
            }
        }

        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [position, width, height]);

    const onClick = () => {
        let movement = 100;
        if (position.y > 0)
            movement = -100;

        setPosition(prev => ({ x: prev.x, y: prev.y + movement }));
    }


    return (<MainDiv>
        <TitleTextDiv>Sense Of Humor</TitleTextDiv>
        <ContentTextDiv>They say my sense of humor is like a refreshing oasis in a desert, but let's be honest - the proof is in the pudding. I've provided some "pudding" below. </ContentTextDiv>

        <ButtonHolderDiv>
            <FakeButtonDiv onHoverStart={onClick} onClick={onClick} ref={buttonRef} x={(position.x.toString() + "px") as any} y={(position.y.toString() + "px") as any}>Click here to learn more about my humor</FakeButtonDiv>

        </ButtonHolderDiv>
    </MainDiv>)
}

export default SenseOfHumor;