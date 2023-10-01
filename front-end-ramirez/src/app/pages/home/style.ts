import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

export const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background-color: ${pallete.blackOne};
    color: ${pallete.whiteOne};
`