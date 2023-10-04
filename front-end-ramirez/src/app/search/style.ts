import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../styles/colors";

export const Container = styled(motion.section)`
  min-height: 100vh;
  height: 100%;
  background-color: ${pallete.blackOne};
`

export const SearchPhotographerContainer = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width:100%;

    h1 {
        font-size: 1rem;
        font-weight: 500;
        text-align: left;
        margin-bottom: 0.625rem;
        width: 93%;
        text-align: left;
        color: ${pallete.whiteOne};
    }
`

export const SearchInputContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 93%;

    & > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 100%;
        margin-bottom: 1.25rem;

        @media screen and (max-width: 500px) {
            flex-direction: column;
        }
    }
`

export const InputName = styled.input`
    width: 100%;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    border: 1px solid #515151;
    border-radius: 10px;
    padding: 0.75rem;
    margin-right: 1.813rem;

    @media screen and (max-width: 500px) {
        width: 93%;
        margin-right: 0rem;

    }
`

export const SearchButton = styled.button`
    font-family: 'Inter', sans-serif;
    font-size: 1rem;;
    font-weight: 600;
    text-transform: uppercase;
    border: none;
    border-radius: 10px;
    padding: 0.75rem 2rem;
    background-color: ${pallete.turquoiseOne};
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
        filter: brightness(0.92);
    }

    @media screen and (max-width: 500px) {
        width: 93%;
        margin-top: 1rem;
    }   
`

export const PhotographersList = styled(motion.div)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    gap: 3.75rem;
`