import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface HeadingAndContentProps {
    pageScrollPercent: number;
    headingText: string;
    contentText: string[];
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
overflow: visible;
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
overflow: visible;
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
const HeadingAndContent = (props: HeadingAndContentProps) => {

    return (<MainDiv>
        <TitleTextDiv>{props.headingText}</TitleTextDiv>
        {props.contentText.map((text, idx) => <ContentTextDiv key={idx + "headerAndContentContent"}>{text} </ContentTextDiv>)}

        {/*  USE THIS FOR A FUTURE LINK.
        
        <ButtonHolderDiv>
            <FakeButtonDiv onHoverStart={onClick} onClick={onClick} ref={buttonRef} x={(position.x.toString() + "px") as any} y={(position.y.toString() + "px") as any}>Click here to learn more about my humor</FakeButtonDiv>

        </ButtonHolderDiv> */}
    </MainDiv>)
}

export default HeadingAndContent;