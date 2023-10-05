"use client"

import { PhotographerCard } from "../components/PhotographerCard"
import {
  AditionalInputs,
  Container,
  Divider,
  GenericInput,
  InputName,
  LocationAccordion,
  PhotographersList,
  PriceRange,
  PriceRangeContainer,
  SearchButton,
  SearchInputContainer,
  SearchPhotographerContainer,
} from "./style"

const orderOptions = [
  { name: "Nenhum", field: null },
  { name: "Visitas", field: "views" },
  { name: "Curtidas", field: "likes" },
  { name: "Preço", field: "price" },
]

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
          <AditionalInputs>
            <PriceRangeContainer>
              <PriceRange>Faixa de preço:</PriceRange>
              <label htmlFor="minPrice"></label>
              <GenericInput
                type="number"
                id="minPrice"
                name="minPrice"
                placeholder="Mínimo"
              />
              <Divider />
              <label htmlFor="maxPrice"></label>
              <GenericInput
                type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="Máximo"
              />
            </PriceRangeContainer>
            <LocationAccordion isActive={true}>
              <label htmlFor="location">
                <div></div>
                Local
              </label>
              <div>
                <GenericInput
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Quixadá"
                />
              </div>
            </LocationAccordion>
          </AditionalInputs>
        </SearchInputContainer>
        <PhotographersList>
          <PhotographerCard />
          <PhotographerCard />
          <PhotographerCard />
          <PhotographerCard />
          <PhotographerCard />
          <PhotographerCard />
          <PhotographerCard />
        </PhotographersList>
      </SearchPhotographerContainer>
    </Container>
  )
}
