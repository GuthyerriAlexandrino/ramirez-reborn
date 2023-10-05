"use client"

import { PhotographerCard } from "../components/PhotographerCard"
import { SelectInput } from "../components/SelectInput"
import { PopupItem } from "../components/SelectInput/style"
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
  const specializationOptions = [
    { id: 1, name: "Fotojornalismo" },
    { id: 2, name: "Gastronomia" },
    { id: 3, name: "Astrofotografia" },
    { id: 4, name: "Publicidade" },
    { id: 5, name: "Subaquática" },
    { id: 6, name: "Aérea" },
  ]

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
            <SelectInput selectName={"Especialização"}>
              {Array.isArray(specializationOptions) &&
                specializationOptions.map((item, id) => (
                  <PopupItem key={id}>{item.name}</PopupItem>
                ))}
            </SelectInput>
            <SelectInput selectName={"Ordenação por:"}>
              {orderOptions.map((item, id) => (
                <PopupItem key={id}>{item.name}</PopupItem>
              ))}
            </SelectInput>
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
