import { UserPhotographer } from "@/types/userPhotographer"
import {
  CardContainer,
  CardContent,
  FilterImage,
  ListSpecialization,
} from "./style"

type photographerCardProps = {
  user: UserPhotographer
}

export function PhotographerCard({ user }: photographerCardProps) {
  return (
    <CardContainer imageUrl={"https://thispersondoesnotexist.com/"}>
      <FilterImage />
      <CardContent>
        <h3>{user.name}</h3>
        <div>
          <article>
            <span>
              {user.city} - {user.state}
            </span>
            <strong>Nenhum preço informado</strong>
          </article>
          <ListSpecialization>
            <span>Especialidades:</span>
            <ul>
              {user.specialization.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ListSpecialization>
        </div>
      </CardContent>
    </CardContainer>
  )
}
