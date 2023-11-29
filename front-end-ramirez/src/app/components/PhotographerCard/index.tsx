"user-client";

import { UserPhotographer } from "@/types/userPhotographer";
import {
  CardContainer,
  CardContent,
  FilterImage,
  ListSpecialization,
} from "./style";
import Link from "next/link";
import { useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/app/utils/keys/firebaseconfig";

type photographerCardProps = {
  user: UserPhotographer;
};

export function PhotographerCard({ user }: photographerCardProps) {
  const [userProfileImage, setUserProfileImage] = useState("");

  async function getImageForCard() {
    if (user.profile_img === "") {
      return;
    }

    const foresRef = ref(storage, user.profile_img);
    await getDownloadURL(foresRef)
      .then((url) => {
        setUserProfileImage(url);
      })
      .catch((error) => console.log(error));
  }

  getImageForCard();

  function verifyIfHasPrices() {
    return user?.services_price?.reduce((prev, curr) => prev + curr, 0);
  }

  return (
    <Link
      href={`/profile/photographer/${encodeURIComponent(JSON.stringify(user))}`}
    >
      <CardContainer
        imageUrl={
          userProfileImage ? userProfileImage : "/default-photo-profile.png"
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
              {verifyIfHasPrices() ? (
                <strong>
                  R$ {user?.services_price[0]} - R$ {user?.services_price[1]} /
                  foto
                </strong>
              ) : (
                <strong>Nenhum preço informado</strong>
              )}
            </article>
            <ListSpecialization>
              <span>Especialidades:</span>
              <ul>
                {user.specialization.length ? (
                  user.specialization.map((item) => <li key={item}>{item}</li>)
                ) : (
                  <li>Nada foi informado</li>
                )}
              </ul>
            </ListSpecialization>
          </div>
        </CardContent>
      </CardContainer>
    </Link>
  );
}
