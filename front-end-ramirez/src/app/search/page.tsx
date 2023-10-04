"use client"

import { PhotographerCard } from "../components/PhotographerCard"
import { Container, InputName, PhotographersList, SearchButton, SearchInputContainer, SearchPhotographerContainer } from "./style"

export default function Search() {
  return (
    <Container>
      <SearchPhotographerContainer>
        <h1>Pesquisa por algum fotógrafo</h1>
        <SearchInputContainer>
          <div>
            <InputName
              type="text" 
              placeholder="Digite aqui o nome de um fotógrafo"
              required
            />
            <SearchButton>Pesquisar</SearchButton>
          </div>
        </SearchInputContainer>
        <PhotographersList>
          <PhotographerCard/>
          <PhotographerCard/>
          <PhotographerCard/>
          <PhotographerCard/>
          <PhotographerCard/>
          <PhotographerCard/>
          <PhotographerCard/>
        </PhotographersList>
      </SearchPhotographerContainer>
    </Container>
  )
}