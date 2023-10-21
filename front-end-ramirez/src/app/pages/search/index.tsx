import { 
   Container,
   PhotographersList,
   SearchPhotographerContainer, 
} from "./style";
import { useEffect, useState } from "react";
import { PhotographerCard } from "../../components/PhotographerCard";
import { Header } from "../../components/Header";
import { parseCookies } from "nookies";
import { useAuthLogin } from "../../context/AuthContext";
import Router from "next/router";
import { GetServerSideProps } from "next";

export type UserP = {
  _id: {
      $oid: string;
  },
  name: string;
  city: string;
  state: string;
  bio: string;
  specialization: string[];
  profile_img: string,
  services_price: number[],
  views: number
}

type Search = {
  name: string;
  orderBy: string;
  location: string;
  specialization: string;
  minPrice: number;
  maxPrice: number;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["ramirez-user"]: token } = parseCookies(context);

  if (!token) {
      return {
          redirect: {
              destination: '/login',
              permanent: false,
          }
      }
  }

  return {
      props: {}
  }
}


export default function Search() {
  const [users, setUsers] = useState<UserP[]>([]);

  let cookies = parseCookies();
  let userSectionId = cookies["ramirez-user-id"]

  const {
      verifyTokenExpiration,
      getProfileImage,
  } = useAuthLogin();


  useEffect(() => {
      async function getAllSpecializations() {
          // futura integração
          const data = await fetch("", {}).then(response => response.json());
      }
      getAllSpecializations();
  }, [])

  useEffect(() => {
      getProfileImage();
      getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function getUsers() {
      if (!verifyTokenExpiration()) {
          Router.push("/login");
          return;
      } 

      let cookies = parseCookies();
      let token = cookies["ramirez-user"];

      // futura integração
       const data = await fetch('', { }).then(res => res.json());

      setUsers(data);
  }

  return (
      <Container
          initial={{width: 0}} 
          animate={{width: "100vw"}} 
          exit={{ x: "100%" }}
      >
          <Header userId={userSectionId}/>
          <SearchPhotographerContainer>
              <h1>Pesquisa por algum fotógrafo</h1>
             
              <PhotographersList>
                  {Array.isArray(users) && users?.map(user => (
                      <PhotographerCard key={user._id.$oid} user={user}/>
                  ))}
              </PhotographersList>
          </SearchPhotographerContainer>
      </Container>
  )
}