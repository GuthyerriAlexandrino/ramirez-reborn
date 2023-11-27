"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion }from "framer-motion";
import { GetServerSideProps } from "next";
import { Header } from "../../../components/Header";
import { UserP } from "../../../search/page";
import { MenuButton } from "../../../components/MenuButton";
import { PublishPhoto } from "../../../components/PublishPhoto";
import { getDownloadURL } from "firebase/storage";
import { ref as refFirebase, storage } from "../../../utils/keys/firebaseconfig";
import { useAuthLogin } from "../../../context/AuthContext";
import Router from "next/router";
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
    ImageLazyLoad
} from "./style";

let photos = [
    {id:1, width: 640, height: 960},
    {id:2, width: 1920, height: 2880},
    {id:3, width: 2400, height: 3600},
    {id:4, width: 640, height: 425},
    {id:5, width: 1440, height: 1277},
    {id:6, width: 2400, height: 1596},
    {id:7, width: 640, height: 960},
    {id:8, width: 1920, height: 2880},
    {id:9, width: 2400, height: 3600},
    {id:10, width: 640, height: 425},
    {id:11, width: 1920, height: 1277},
    {id: 12, width: 2400, height: 1596}
]

// futura integração
// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const { id } = context.params!;
//     const { ["ramirez-user"]: token } = parseCookies(context);

//     if (!token) {
//         return {
//             redirect: {
//                 destination: '/login',
//                 permanent: false,
//             }
//         }
//     }

//     //futura integração
//     const data: UserP = await fetch(``, {}).then(res => res.json());

//     // mock
//     const user = {
//         _id: data._id ?? "1",
//         name: data.name ?? "Isa",
//         city: data.city ?? "Pedro II",
//         state: data.state ?? "PI",
//         bio: data.bio ?? "Sou lindo",
//         specialization: data.specialization ?? "comer",
//         services_price: data.services_price ?? "caro",
//         profile_img: data.profile_img ?? "sou emo",
//         views: data.views ?? "0"
//     }

//     return {
//         props: {
//             user,
//         },
//     }
// }

interface PhotographerProps {
    user: UserP;
}

const stagger = {
    animate: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

interface Post {
    _id: {
        $oid: string;
    },
    image: string;
}

export default function ProfilePhotographer({user}: PhotographerProps) {
    const [popupIsOpen, setPopupIsOpen] = useState(false);
    const [allPostsList, setAllPostsList] = useState<Post[]>([]);
    const [profileImage, setProfileImage] = useState<string | null>("");
    const { ref, inView } = useInView();
    const animation = useAnimation();
    const cookies = parseCookies();
    const userSectionId = cookies["ramirez-user-id"]
    const token = cookies["ramirez-user"]

    const mockUser = {
        _id: {
            $oid: "1"
        },
        name: "Isa",
        city: "Pedro II",
        state: "PI",
        bio: "Sou lindo",
        specialization: [],
        profile_img: "",
        services_price: [],
        views: 0
    }

    function handlePopUpScreen(value: boolean) {
        setPopupIsOpen(value);
    }

    async function getProfileImage() {
        if (mockUser.profile_img === "") {
            setProfileImage("/default-user.png")
            return;
        }

        const foresRef = refFirebase(storage, user.profile_img);
        await getDownloadURL(foresRef)
        .then(url => setProfileImage(url))
        .catch(error => console.log(error));
    }

    async function getAllPostsFromUser() {
        //futura integração
        // const allPosts: Post[] = await fetch(``, {}).then(response => response.json())
        // .catch(error => error.json());

        await generateImagesLinks([])
    }

    async function generateImagesLinks(allPosts: Post[]) {
        let urlsLinks: Post[] = []

        for (let post of allPosts) {
            const foresRef = refFirebase(storage, post.image);
            await getDownloadURL(foresRef)
            .then(url => urlsLinks.push({_id: post._id, image: url}))
            .catch(error => console.log(error));
        }

        setAllPostsList(urlsLinks)
    }

    useEffect(() => {
        getProfileImage();
        getAllPostsFromUser();
    }, [])

    useEffect(() => {
        if (inView) {
            animation.start({
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.8,
                    ease: [0.6, -0.05, 0.01, 0.99],
                }
            })
        } else {
            animation.start({
                y: 30,
                opacity: 0,
                transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
            });
        }
    }, [animation, inView])

    return (
        <Container
            initial={{width: 0, opacity: 0}} 
            animate={{width: "100vw", opacity: 1 }} 
            exit={{ x: "100%" }}
        >
            <Header userId={userSectionId}/>
            <MenuButton id={mockUser?._id?.$oid} openModal={() => handlePopUpScreen(true)}/>
            <ProfileInfoContainer>
                <ProfileInfo>
                    <ProfileAside>
                        <ProfileImage>
                            <Image 
                                src={profileImage ? profileImage : "/default-user.pn"}
                                layout="responsive"
                                objectFit="cover"
                                width={176}
                                height={176}
                                alt={"Foto de perfil"}
                            />
                        </ProfileImage>
                        <ProfileName>
                            {mockUser?.name}
                        </ProfileName>
                        <ProfileLocation>
                            {mockUser?.city} - {mockUser?.state}
                        </ProfileLocation>
                        <Divider vertical={false} height={2}/>
                        <ProfileViews>
                            <p>
                                Esse perfil recebeu <br/>
                                <span>
                                    {mockUser?.views <= 1 ? `${mockUser?.views} visualização` : `${mockUser?.views} visualizações`}
                                </span>
                            </p>
                        </ProfileViews>
                    </ProfileAside>
                    <ProfileAbout>
                        <h2>Sobre mim</h2>
                        <p data-bio={mockUser?.bio !== "" ? "hasBio" : 'noBio'}>
                            {mockUser?.bio !== "" ? mockUser?.bio : "Nenhuma informação escrita..."}
                        </p>
                    </ProfileAbout>
                    <ProfileCareer>
                        <h2>Carreira Profissional</h2>
                        <CareerDataContainer>
                            <CareerData isRight={false}>
                                <h3>Especialização</h3>
                                {mockUser?.specialization?.map((item, index) => (
                                    <span key={index}>{item}</span>
                                ))}
                            </CareerData>
                            <Divider vertical={true} height={90}/>
                            <CareerData isRight={true}>
                                <h3>Valor de Serviço</h3>
                                {mockUser?.services_price?.length >  0 ? (
                                    <span>R$ {mockUser?.services_price[0]} -  R$ {mockUser?.services_price[1]} / foto</span>
                                ) : (
                                    <span>Sem informações</span>
                                )}
                            </CareerData>
                        </CareerDataContainer>
                    </ProfileCareer>
                </ProfileInfo>
            </ProfileInfoContainer>
            <DividerArea>
                <Divider vertical={false} height={2}/>
            </DividerArea>
            <PhotosGallery variants={stagger} ref={ref}>
                <MansoryGrid>
                     {Array.from(allPostsList).map((id) => (
                        // eslint-disable-next-line @next/next/link-passhref
                        <Link 
                            href={`/profile/photographer/${mockUser?._id?.$oid}/post/${id._id.$oid}`} 
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
            {popupIsOpen && <PublishPhoto handlePopUp={handlePopUpScreen}/>}
        </Container>
    )
}