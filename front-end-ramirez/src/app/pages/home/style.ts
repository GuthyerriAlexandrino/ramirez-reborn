import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import { pallete } from "../../styles/colors";

interface HeaderProps {
    toggleMenu: boolean;
}

interface ButtonProps {
    background?: boolean
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

export const LogoImage = styled.div`
    display: block;
`

export const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    margin-bottom: 10px;

    @media screen and (max-width: 771px) {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;

        ${LogoImage} {
            position: absolute;
            top: 10px;
            left: 0;
        }
    }   
`

export const MenuContainer = styled.nav`
    max-width: 300px;
    width: 100%;
    /* margin-right: 30px; */

    ul {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        list-style: none;

        li {
            margin-right: 10px;
        }
    }

    @media screen and (max-width: 771px) {
        margin-top: 4rem;

        ul {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            li {
                margin-bottom: 2rem;

                &:nth-child(3) {
                    display: none;
                }
            }
        }
    }
`

export const Button = styled.button<ButtonProps>`
    font-family: 'Inter', sans-serif;
    font-weight: ${props => props.background ? "normal" : 600};
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    padding: 5px;
    background: ${props => props.background ? pallete.whiteOne : "none"};
    color: ${props => props.background ? "#000000" : pallete.whiteOne};
    border: ${props => !props.background ? "none" : "1px solid #000000"};
    border-radius: ${props => props.background && "5px"};
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        ${props => props.background && css`
            background-color: #f5f4f4;
        `}
    }

    @media screen and (max-width: 771px) {
        font-size: 2rem;
        padding: 1rem;
    }
`
