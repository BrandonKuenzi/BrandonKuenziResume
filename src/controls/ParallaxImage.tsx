import { AnimationControls, motion } from "framer-motion";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";
import styled from "styled-components";


interface ParallaxImageProps {
    pageScrollPercent: number;
    image: string;
    screenHeightPercent?: number;
}

const ContainerDiv = styled(motion.div) <{ parallaxProgressX: string, parallaxProgressY: string, height: number, width: number, bgImage: string }>`

color: white;
background-image:${props => `url(${props.bgImage})`};
justify-content: start;
background-repeat: no-repeat;
margin-top: 100px;
width: ${props => props.width + "px"};
height: ${props => props.height + "px"};
background-position-x:${props => props.parallaxProgressX + "px"};
background-position-y:${props => props.parallaxProgressY + "px"};
`
const ParallaxImage = (props: ParallaxImageProps) => {
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const heightPercent = props.screenHeightPercent ? props.screenHeightPercent : .5;

    const getOffsetX = (): string => {
        const value = Math.round(animValue.toCenter * 100) - (window.screen.width / 2);
        return value.toString();
    }
    const getOffsetY = (): string => {
        const value = Math.round(animValue.toCenter * 200) - (window.screen.width / 2);
        return (value).toString();
    }

    return (<ContainerDiv parallaxProgressY={getOffsetY()} parallaxProgressX={getOffsetX()} bgImage={props.image} height={window.innerHeight * heightPercent} width={window.screen.width} ref={ref}></ContainerDiv>)
}

export default ParallaxImage;