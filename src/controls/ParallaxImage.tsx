import { AnimationControls, motion } from "framer-motion";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";
import styled from "styled-components";


interface ParallaxImageProps {
    pageScrollPercent: number;
    text?: string;
    image: string;
    screenHeightPercent?: number;
    parallaxSpeedX?: "off" | "slow" | "medium" | "fast";
    parallaxSpeedY?: "off" | "slow" | "medium" | "fast";
}

const ContainerDiv = styled(motion.div) <{ parallax_progress_x: string, parallax_progress_y: string, height: number, width: number, bg_image: string }>`
display: flex;
color: white;
background-image:${props => `url(${props.bg_image})`};
justify-content: center;
align-items:start;
background-repeat: no-repeat;
margin-top: 100px;
width: ${props => props.width + "px"};
height: ${props => props.height + "px"};
background-position-x:${props => props.parallax_progress_x};
background-position-y:${props => props.parallax_progress_y};
overflow:  clip;
`

const TextBoxDiv = styled(motion.div) <{ width: number }>`
color: white;
display: flex;
text-align: center;
justify-content: center;
font-size: clamp(12px, 2vw, 30px);

font-family: 'TruenoBold';
white-space: pre-wrap;
width: ${props => props.width + "px"};
`

const ParallaxImage = (props: ParallaxImageProps) => {
    const xSpeed = props.parallaxSpeedX ? props.parallaxSpeedX : "medium";
    const ySpeed = props.parallaxSpeedY ? props.parallaxSpeedY : "medium";
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const heightPercent = props.screenHeightPercent ? props.screenHeightPercent : .5;

    const getOffsetX = (): string => {
        if (xSpeed === "off") return "50%"
        // const value = Math.round(animValue.toCenter * 100) - (window.screen.width / 2);
        const speed = xSpeed === "slow" ? 1 : xSpeed === "medium" ? 5 : 10;


        const value = 50 + (animValue.toCenter * speed);
        return value.toString() + "%";
    }
    const getOffsetY = (): string => {
        if (ySpeed === "off") return "50%"
        const speed = ySpeed === "slow" ? 1 : ySpeed === "medium" ? 5 : 10;
        const value = 50 + (animValue.toCenter * -speed);


        return (value).toString() + "%";
    }
    const textAnim = (av: AnimValue): AnimationControls => {


        return { y: av.toCenter * 500, } as unknown as AnimationControls
    }

    return (<ContainerDiv parallax_progress_y={getOffsetY()} parallax_progress_x={getOffsetX()} bg_image={props.image} height={window.innerHeight * heightPercent} width={window.screen.width} ref={ref}>

        {props.text && <TextBoxDiv animate={textAnim(animValue)} width={window.screen.width / 2} transition={{ duration: 0 }}>{props.text}</TextBoxDiv>}
    </ContainerDiv>)
}

export default ParallaxImage;