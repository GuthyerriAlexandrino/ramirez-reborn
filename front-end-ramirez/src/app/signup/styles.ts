import { motion } from "framer-motion";
import styled from "styled-components";
import { pallete } from "../styles/colors";

export const Container = styled(motion.section)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  padding: 46px 0;
  background-color: ${pallete.blackOne};
`;

export const SignUpFormContainer = styled(motion.section)`
  display: flex;
  flex-direction: column;
`;

export const SignUpAside = styled(motion.aside)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 30rem;
  margin-left: 8.25rem;

  h1 {
    font-size: 2.25rem;
    line-height: 2.625rem;
    margin-top: 2.375rem;
    color: ${pallete.whiteOne};
  }

  p {
    font-size: 1rem;
    line-height: 1.188rem;
    margin-top: 2.375rem;
    margin-bottom: 3.75rem;
    color: ${pallete.grayThree};
  }
`;

export const BackPageLink = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    cursor: pointer;

    button {
      margin-left: 0.875rem;
      font-size: 1rem;
      font-family: "Inter", sans-serif;
      font-weight: 500;
      color: ${pallete.turquoiseOne};
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
`;
