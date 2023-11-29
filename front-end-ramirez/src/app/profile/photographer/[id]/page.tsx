"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import "react-lazy-load-image-component/src/effects/blur.css";
import { motion } from "framer-motion";
import { Header } from "../../../components/Header";
import { UserP } from "../../../search/page";
import { MenuButton } from "../../../components/MenuButton";
import { PublishPhoto } from "../../../components/PublishPhoto";
import { getDownloadURL } from "firebase/storage";
import {
  ref as refFirebase,
  storage,
} from "../../../utils/keys/firebaseconfig";
import { useParams } from "next/navigation";
import {
  Container,
  ProfileAbout,
  ProfileCareer,
  ProfileInfo,
  ProfileImage,
  ProfileInfoContainer,
  ProfileName,
  Divider,
  ProfileViews,
  ProfileAside,
  CareerData,
  CareerDataContainer,
  DividerArea,
  PhotosGallery,
  ProfileLocation,
  MansoryGrid,
  ImageLazyLoad,
} from "./style";
import { useAuthLogin } from "@/app/context/AuthContext";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

interface Post {
  _id: {
    $oid: string;
  };
  image: string;
}

export default function ProfilePhotographer() {
  const [user, setUser] = useState<UserP>({} as UserP);
  const [isObject, setIsObject] = useState<Boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>("");
  const [popupIsOpen, setPopupIsOpen] = useState(false);
  const [allPostsList, setAllPostsList] = useState<Post[]>([]);
  const { ref, inView } = useInView();
  const animation = useAnimation();
  const cookies = parseCookies();
  const userSectionId = cookies["ramirez-user-id"];
  const token = cookies["ramirez-user"];
  const { id } = useParams();

  function handlePopUpScreen(value: boolean) {
    setPopupIsOpen(value);
  }

  async function getUser() {
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    const data: UserP = await fetch(`http://127.0.0.1:3001/user/${id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const currenUser = {
      _id: data._id ?? null,
      name: data.name ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      bio: data.bio ?? null,
      specialization: data.specialization ?? null,
      services_price: data.services_price ?? null,
      profile_img: data.profile_img ?? null,
      views: data.views ?? null,
    };

    setUser(currenUser);
  }

  async function getAllPostsFromUser() {
    const allPosts: Post[] = await fetch(
      `http://127.0.0.1:3001/posts/${user._id.$oid}`,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => response.json());

    await generateImagesLinks(allPosts);
  }

  async function generateImagesLinks(allPosts: Post[]) {
    let urlsLinks: Post[] = [];

    for (let post of allPosts) {
      const foresRef = refFirebase(storage, post.image);
      await getDownloadURL(foresRef)
        .then((url) => urlsLinks.push({ _id: post._id, image: url }))
        .catch((error) => console.log(error));
    }

    setAllPostsList(urlsLinks);
  }

  async function getProfileImage() {
    if (user.profile_img === "") {
      setProfileImage("/default-photo-profile.png");
      return;
    }
    const data: UserP = await fetch(`http://127.0.0.1:3001/user/${id}`, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());

    const foresRef = refFirebase(storage, isObject ? user.profile_img : data.profile_img);
    await getDownloadURL(foresRef)
      .then((url) => setProfileImage(url))
      .catch((error) => console.log(error));
  }

  function verifyIfHasPrices() {
    return user?.services_price?.reduce((prev, curr) => prev + curr, 0);
  }

  useEffect(() => {
    try {
      setUser(JSON.parse(decodeURIComponent(id)));
      setIsObject(true)
    } catch (error) {
      getUser();
    }
  }, []);

  useEffect(() => {
    if (user._id) {
      getProfileImage();
      getAllPostsFromUser();
    }
  }, [user]);

  useEffect(() => {
    if (inView) {
      animation.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: [0.6, -0.05, 0.01, 0.99],
        },
      });
    } else {
      animation.start({
        y: 30,
        opacity: 0,
        transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] },
      });
    }
  }, [animation, inView]);

  return (
    <Container
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100vw", opacity: 1 }}
      exit={{ x: "100%" }}
    >
      <Header userId={userSectionId} />
      <MenuButton
        id={user?._id?.$oid}
        openModal={() => handlePopUpScreen(true)}
      />
      <ProfileInfoContainer>
        <ProfileInfo>
          <ProfileAside>
            <ProfileImage>
              <Image
                src={profileImage ? profileImage : "/default-photo-profile.png"}
                layout="responsive"
                objectFit="cover"
                width={176}
                height={176}
                alt={"Foto de perfil"}
              />
            </ProfileImage>
            <ProfileName>{user?.name}</ProfileName>
            <ProfileLocation>
              {user?.city} - {user?.state}
            </ProfileLocation>
            <Divider vertical={false} height={2} />
            <ProfileViews>
              <p>
                Esse perfil recebeu <br />
                <span>
                  {user?.views <= 1
                    ? `${user?.views} visualização`
                    : `${user?.views} visualizações`}
                </span>
              </p>
            </ProfileViews>
          </ProfileAside>
          <ProfileAbout>
            <h2>Sobre mim</h2>
            <p data-bio={user?.bio !== "" ? "hasBio" : "noBio"}>
              {user?.bio ? user?.bio : "Nenhuma informação escrita..."}
            </p>
          </ProfileAbout>
          <ProfileCareer>
            <h2>Carreira Profissional</h2>
            <CareerDataContainer>
              <CareerData isRight={false}>
                <h3>Especialização</h3>
                {user?.specialization?.length
                  ? user?.specialization?.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))
                  : "Nenhuma especialização informada"}
              </CareerData>
              <Divider vertical={true} height={90} />
              <CareerData isRight={true}>
                <h3>Valor de Serviço</h3>
                {verifyIfHasPrices() ? (
                  <span>
                    R$ {user?.services_price[0]} - R$ {user?.services_price[1]}{" "}
                    / foto
                  </span>
                ) : (
                  <span>Sem informações</span>
                )}
              </CareerData>
            </CareerDataContainer>
          </ProfileCareer>
        </ProfileInfo>
      </ProfileInfoContainer>
      <DividerArea>
        <Divider vertical={false} height={2} />
      </DividerArea>
      <PhotosGallery variants={stagger} ref={ref}>
        <MansoryGrid>
          {Array.from(allPostsList).map((id) => (
            // eslint-disable-next-line @next/next/link-passhref
            <Link
              href={`/profile/photographer/${user?._id?.$oid}/post/${id._id.$oid}`}
              key={id._id.$oid}
            >
              <motion.div
                animate={animation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ImageLazyLoad
                  effect="blur"
                  src={id.image}
                  alt="Foto da galeria"
                />
              </motion.div>
            </Link>
          ))}
        </MansoryGrid>
      </PhotosGallery>
      {popupIsOpen && <PublishPhoto handlePopUp={handlePopUpScreen} />}
    </Container>
  );
}
