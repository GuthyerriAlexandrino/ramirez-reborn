import { UserPhotographer } from "@/types/userPhotographer";
import {
  CardContainer,
  CardContent,
  FilterImage,
  ListSpecialization,
} from "./style";
import Link from "next/link";

type photographerCardProps = {
  user: UserPhotographer;
};

export function PhotographerCard({ user }: photographerCardProps) {
  return (
    <Link href={`/profile/photographer/${encodeURIComponent(JSON.stringify(user))}`}>
      <CardContainer
        imageUrl={
          user.profile_img ? user.profile_img : "/default-photo-profile.png"
        }
      >
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
    </Link>
  );
}
