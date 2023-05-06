import styled from "styled-components"
import tinyDinoIcon from "../images/tinyDinoIcon.png"
import { motion } from "framer-motion"
interface TinyDinoProps { delayStart?: number }
const TinyDinoDiv = styled(motion.img)`
position:absolute;
top:0;
left:0;
width: 10vw;
height: 10vw;
`
const TinyDino = (props: TinyDinoProps) => {

    return (<TinyDinoDiv animate={{ x: [-200, -100, -100, 0, 0, 0, -300], rotateZ: [0, 45, 45, 0, 0, 0, -15], rotateY: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 180, 180, 180] }} transition={{ duration: 6, repeat: Infinity, delay: props.delayStart ? props.delayStart : 3, repeatDelay: 6 }} src={tinyDinoIcon} />
    )
}
export default TinyDino;