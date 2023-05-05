import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { AnimValue, useScrollValues } from "../utils/customHooks/useScrollValues";

interface SubtleRotateTextProps {
    text: string;
    pageScrollPercent: number;
    isSubText?: boolean;
}

const ContentDiv = styled(motion.div)`
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
width:75%;
`
const SmallTextBoxDiv = styled(motion.div)`
color: white;
justify-content: center;
font-size: clamp(10px, 6vw, 25px);
font-family: 'TruenoLite';
white-space: pre-wrap;
width:75%;
`

const subtleRotateInAnim = (av: AnimValue): AnimationControls => {
    if (av.onScreen < 0)
        return { rotateX: -90 } as unknown as AnimationControls;

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

const SubtleRotateText = (props: SubtleRotateTextProps) => {
    const { componentRef: ref, animValue: animValue } = useScrollValues(props.pageScrollPercent);
    const shouldBeSmall = props.isSubText;
    return (

        <ContentDiv ref={ref} animate={subtleRotateInAnim(animValue)} transition={{ duration: 0 }}>
            {shouldBeSmall ?
                <SmallTextBoxDiv>{props.text}</SmallTextBoxDiv>
                :
                <LargeTextBoxDiv>{props.text}</LargeTextBoxDiv>
            }
        </ContentDiv>
    )
}

export default SubtleRotateText;