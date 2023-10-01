import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../../styles/colors";

interface HeaderProps {
    toggleMenu: boolean;
}

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

export const Header = styled.header<HeaderProps>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 3.75rem;
    transition: all ease 0.2s;

    &::after {
        content: '';
        display: block;
        bottom: 0;
        height: 1px;
        width: 93%;
        margin: 0 auto;
        background-color: ${pallete.whiteOne};
    }

    @media screen and (max-width: 771px) {
        position: fixed;
        top: 0;
        left: ${props => props.toggleMenu ? "0%" : "-100%"};
        height: 100vh;
        background-color: ${pallete.blackOne};
        z-index: 999999;

        &::after {
            content: '';
            display: none;
        }

        div {
            flex-direction: column;
        }
    }
`