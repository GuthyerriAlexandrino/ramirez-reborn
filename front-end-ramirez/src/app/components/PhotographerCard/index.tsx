import { CardContainer,  CardContent, FilterImage, ListSpecialization } from "./style";

export function PhotographerCard() {

  return (
    <CardContainer imageUrl={"https://thispersondoesnotexist.com/"}>
      <FilterImage/>
      <CardContent>
        <h3>User name</h3>
        <div>
          <article>
            <span>Cidade - Estado</span>
            <strong>Nenhum preço informado</strong>
          </article>
          <ListSpecialization>
            <span>Especialidades:</span>
            <ul>
              <li>Social</li>
            </ul>
          </ListSpecialization>
        </div>
      </CardContent>
    </CardContainer>
    )
}  