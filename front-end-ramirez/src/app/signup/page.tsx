"use client";
import Image from "next/image";
import {
  BackPageLink,
  Container,
  SignUpAside,
  SignUpFormContainer,
} from "./styles";
import Logo from "../Assets/logo.svg";
import ArrowBack from "../Assets/arrow-back.svg";
import Link from "next/link";
import { makeFadeInRightAnimation, stagger } from "../utils/animations";

export default function SignUp() {
  return (
    <Container
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      variants={stagger}
    >
      <SignUpFormContainer variants={makeFadeInRightAnimation()}>
        Form
      </SignUpFormContainer>
      <SignUpAside variants={makeFadeInRightAnimation()}>
        <Link href="/">
          <Image
            alt={"ramirez logo"}
            src={Logo}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <h1>Encontre profissionais ou destaque o seu trabalho</h1>
        <p>Junte-se a nossa comunidade e una-se a outros profissionais</p>
        <BackPageLink>
          <Link href="/login">
            <div>
              <Image alt={"icone de retorno"} src={ArrowBack} />
              <button>Voltar para o login</button>
            </div>
          </Link>
        </BackPageLink>
      </SignUpAside>
    </Container>
  );
}
