import React, { useState } from "react";
import {
  Button,
  CheckBoxArea,
  CheckBoxConfirm,
  FormBody,
  Icon,
  InputContainer,
  InputFlex,
  Panel,
} from "./style";
import { Buildings, Eye, EyeSlash, Key, User } from "phosphor-react";
import Email from "../../assets/email.svg";

import Image from "next/image";
import { pallete } from "../../styles/colors";

export function FormRegister() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [isPhotographer, setIsPhotographer] = useState(false);
  function handleVisiblePassword() {
    setVisiblePassword(!visiblePassword);
  }
  function handleVisibleConfirmePassword() {
    setVisibleConfirmPassword(!visibleConfirmPassword);
  }
  return (
    <FormBody action="">
      <h2>Criar a sua conta</h2>
      <InputContainer>
        <Icon align="left">
          <User size={24} color={pallete.blackFour} weight="fill" />
        </Icon>
        <label htmlFor="name"></label>
        <input type="text" id="name" name="name" placeholder="Nome" required />
      </InputContainer>
      <InputContainer>
        <Icon align="left">
          <Image alt="icone de email" src={Email} width={24} height={24} />
        </Icon>
        <label htmlFor=""></label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          required
        />
      </InputContainer>
      <InputContainer>
        <Icon align="left">
          <Key size={24} color={pallete.blackFour} weight="fill" />
        </Icon>
        <Icon align="right" onClick={handleVisiblePassword}>
          {visiblePassword ? (
            <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
          ) : (
            <EyeSlash size={24} color={pallete.turquoiseOne} weight="fill" />
          )}
        </Icon>
        <label htmlFor="password"></label>
        <input
          title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
          type={visiblePassword ? "text" : "password"}
          id="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          placeholder="Senha"
          required
        />
      </InputContainer>
      <InputContainer>
        <Icon align="left">
          <Key size={24} color={pallete.blackFour} weight="fill" />
        </Icon>
        <Icon align="right" onClick={handleVisibleConfirmePassword}>
          {visibleConfirmPassword ? (
            <Eye size={24} color={pallete.turquoiseOne} weight="fill" />
          ) : (
            <EyeSlash size={24} color={pallete.turquoiseOne} weight="fill" />
          )}
        </Icon>
        <label htmlFor="password_confirmatiopn"></label>
        <input
          title="deve conter ao menos um número, uma letra maiúscula e minúscula e deve conter pelo menos 8 caracteres"
          type={visibleConfirmPassword ? "text" : "password"}
          id="password_confirmatiopn"
          name="password_confirmatiopn"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
          placeholder="Confirme sua senha"
          required
        />
      </InputContainer>
      <CheckBoxConfirm>
        <CheckBoxArea>
          <input
            title="Checkbox para registro de fotógrafo"
            type="checkbox"
            id="photographer"
            name="photographer"
            checked={isPhotographer}
            onChange={() => {
              setIsPhotographer(!isPhotographer);
            }}
          />
          <label htmlFor="photographer">Sou fotógrafo</label>
        </CheckBoxArea>
        <Panel active={isPhotographer}>
          <InputFlex>
            <InputContainer>
              <Icon align="left">
                <Buildings size={24} color={pallete.blackFour} weight="fill" />
              </Icon>
              <label htmlFor="city"></label>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="Cidade"
                required={isPhotographer ? true : false}
              />
            </InputContainer>
            <InputContainer>
              <Icon align="left">
                <Buildings size={24} color={pallete.blackFour} weight="fill" />
              </Icon>
              <label htmlFor="state"></label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Estado"
                required={isPhotographer ? true : false}
              />
            </InputContainer>
          </InputFlex>
        </Panel>
      </CheckBoxConfirm>
      <Button>Cadastrar</Button>
    </FormBody>
  );
}
