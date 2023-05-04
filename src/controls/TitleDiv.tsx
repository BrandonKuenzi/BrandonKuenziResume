import { motion } from "framer-motion";
import styled from "styled-components";

interface TitleDivProps {
    text: string;
    pageScrollPercent: number;
}

const TextDiv = styled(motion.div)`
font-family: 'TruenoBold';
white-space: nowrap;
margin-top: 100px;
width:100%;
font-size: clamp(10px, 6vw, 100px);
color: white;
`
const ContentCenterDiv = styled(motion.div)`
padding: 0% 20%;
color: white;
box-sizing: border-box;
width:100%;
`


const TitleDiv = (props: TitleDivProps) => {
    return (
        <ContentCenterDiv><TextDiv animate={{ y: 0, opacity: 1 }} transition={{ duration: 2 }} initial={{ y: 25, opacity: 0 }}>{props.text}</TextDiv></ContentCenterDiv>
    )

}
export default TitleDiv;