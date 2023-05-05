import { AnimationControls, motion } from "framer-motion";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";
import styled from "styled-components";
import { JsxElement } from "typescript";
import { ReactElement } from "react";


interface ParallaxImageProps {
    pageScrollPercent: number;
    color?: string;
    text?: string;
    image: string;
    screenHeightPercent?: number;
    manualHeight?: number;
    parallaxSpeedX?: "off" | "slow" | "medium" | "fast" | "insane";
    parallaxSpeedY?: "off" | "slow" | "medium" | "fast" | "insane";
    children?: ReactElement<any, any>;
    useGiantFont?: boolean;
}
const OuterShellDiv = styled(motion.div) <{ height: number }>`
display: flex;
width: 100%;
height: ${props => props.height + "px"};
overflow:  clip;
background-size: 150% auto;

`
const ContainerDiv = styled(motion.div) <{ parallax_progress_x: string, parallax_progress_y: string, height: number, bg_image: string }>`
display: flex;
color: white;
background-image:${props => `url(${props.bg_image})`};
justify-content: center;
align-items:start;
background-repeat: no-repeat;
width: 100%;
height: ${props => props.height + "px"};
background-position-x:${props => props.parallax_progress_x};
background-position-y:${props => props.parallax_progress_y};
overflow:  clip;
background-size: 150% auto;

`

const TextBoxDiv = styled(motion.div) <{ width: any, usegiantfont: boolean, color: string }>`
color: ${props => props.color};
display: flex;
text-align: center;
justify-content: center;
font-size: clamp(12px,${props => props.usegiantfont ? "5vh" : "4vh"} ,80px);
font-family: 'TruenoBold';
white-space: pre-wrap;
width: ${props => props.width};
`

const ParallaxImage = (props: ParallaxImageProps) => {
    const xSpeed = props.parallaxSpeedX ? props.parallaxSpeedX : "medium";
    const ySpeed = props.parallaxSpeedY ? props.parallaxSpeedY : "medium";
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const heightPercent = props.screenHeightPercent ? props.screenHeightPercent : .5;
    const height = props.manualHeight ? props.manualHeight : window.innerHeight * heightPercent;
    const color = props.color ? props.color : "white";
    const width = window.screen.width / 2;
    console.log(width + " width");
    const getOffsetX = (): string => {


        if (animValue.onScreen < 0)
            return ("0%")

        if (xSpeed === "off") return "50%"
        // const value = Math.round(animValue.toCenter * 100) - (window.screen.width / 2);
        const speed = xSpeed === "slow" ? 1 : xSpeed === "medium" ? 5 : xSpeed === "fast" ? 10 : 20;


        const value = 50 + (animValue.toCenter * speed);
        return value.toString() + "%";
    }
    const getOffsetY = (): string => {



        if (ySpeed === "off") return "50%"
        const speed = ySpeed === "slow" ? 1 : ySpeed === "medium" ? 5 : ySpeed === "fast" ? 10 : 20;
        const value = 50 + (animValue.toCenter * -speed);


        return (value).toString() + "%";
    }
    const textAnim = (av: AnimValue): AnimationControls => {
        if (animValue.onScreen < 0)
            return { opacity: 0 } as unknown as AnimationControls

        return { y: av.toCenter * 500, opacity: 1 } as unknown as AnimationControls
    }

    return (

        <ContainerDiv animate={{ opacity: [0, 1] }} transition={{ duration: 2, delay: 1 }} parallax_progress_y={animValue.onScreen > 0 ? getOffsetY() : "0px"} parallax_progress_x={animValue.onScreen > 0 ? getOffsetX() : "0px"} bg_image={animValue.onScreen > 0 ? props.image : "white"} height={height} ref={ref} >
            {props.children && props.children}
            {props.text && <TextBoxDiv color={color} animate={textAnim(animValue)} width={((width).toString() + "px") as any} transition={{ duration: 0 }} usegiantfont={props.useGiantFont ? props.useGiantFont : false}>{props.text}</TextBoxDiv>}
        </ContainerDiv>
    )


}

export default ParallaxImage;