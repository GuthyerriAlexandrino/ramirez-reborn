"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Container,
  LogInAside,
  ExternaltLink,
  Divider,
  RegisterLink,
} from "./styles";
import { Button, FormBody, Icon, InputContainer } from "../styles/form";
import Logo from "../assets/logo.svg";
import Password from "../assets/password.svg";
import Email from "../assets/email.svg";
import EyeVisible from "../assets/ant-design-eye-visible.svg";
import EyeInvisible from "../assets/ant-design_eye-invisible-filled.svg";

import { makeFadeInRightAnimation, stagger } from "../utils/animations";
import { useAuthLogin } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useNotify } from "../context/NotifyContext";

export default function LogIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const { handleLogin, verifyTokenExpiration } = useAuthLogin();

  function handleVisiblePassword() {
    setVisible(!visible);
  }

  async function handleSubmit(event: any) {
    event.preventDefault();
    await handleLogin({ email, password });
  }

  useEffect(() => {
    if (verifyTokenExpiration()) {
      router.push("/search");
    }
  }, []);

  return (
    <Container
      initial="initial"
      animate="animate"
      exit={{ opacity: 0 }}
      variants={stagger}
    >
      <LogInAside variants={makeFadeInRightAnimation()}>
        <Link href="/">
          <Image src={Logo} style={{ cursor: "pointer" }} alt={""} />
        </Link>
        <h1>Faça o seu login na plataforma</h1>
      </LogInAside>
      <FormBody
        variants={makeFadeInRightAnimation()}
        action=""
        onSubmit={handleSubmit}
      >
        <InputContainer>
          <Icon align="left">
            <Image src={Email} width={24} height={24} alt={""} />
          </Icon>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </InputContainer>
        <InputContainer>
          <Icon align="left">
            <Image src={Password} width={24} height={24} alt={""} />
          </Icon>
          <Icon
            align="right"
            valuePosition={10}
            onClick={handleVisiblePassword}
          >
            <Image
              src={visible ? EyeVisible : EyeInvisible}
              width={24}
              height={24}
              alt={""}
            />
          </Icon>
          <label htmlFor="passworld"></label>
          <input
            title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
            type={visible ? "text" : "password"}
            id="passworld"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </InputContainer>
        <Link href="#">
          <ExternaltLink align="left" isBold={false}>
            Esqueci minha senha
          </ExternaltLink>
        </Link>
        <Button type="submit">Entrar</Button>
        <Divider />
        <RegisterLink>
          <span>Não tem uma conta?</span>
          <Link href="/signup">
            <ExternaltLink align="center" isBold={true}>
              Registre-se
            </ExternaltLink>
          </Link>
        </RegisterLink>
      </FormBody>
    </Container>
  );
}
