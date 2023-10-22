import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { motion }from "framer-motion";
import { GetServerSideProps } from "next";
import { Header } from "../../../../components/Header";
import { UserP } from "../../../search";
import { MenuButton } from "../../../../components/MenuButton";
import { PublishPhoto } from "../../../../components/PublishPhoto";
import { getDownloadURL } from "firebase/storage";
import { ref as refFirebase, storage } from "../../../../utils/keys/firebaseconfig";
import { useAuthLogin } from "../../../../context/AuthContext";
import Router from "next/router";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const { ["ramirez-user"]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    //futura integração
    const data: UserP = await fetch(``, {}).then(res => res.json());

    const user = {
        _id: data._id ?? null,
        name: data.name ?? null,
        city: data.city ?? null,
        state: data.state ?? null,
        bio: data.bio ?? null,
        specialization: data.specialization ?? null,
        services_price: data.services_price ?? null,
        profile_img: data.profile_img ?? null,
        views: data.views ?? null
    }

    return {
        props: {
            user,
        },
    }
}

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
    const [profileImage, setProfileImage] = useState<string | null>();


    const { ref, inView } = useInView();
    const animation = useAnimation();

    const cookies = parseCookies();
    const userSectionId = cookies["ramirez-user-id"]
    const token = cookies["ramirez-user"]

    
    function handlePopUpScreen(value: boolean) {
        setPopupIsOpen(value);
    }

    async function getProfileImage() {
        if (user.profile_img === "") {
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
        const allPosts: Post[] = await fetch(``, {}).then(response => response.json())
        .catch(error => error.json());

        await generateImagesLinks(allPosts)
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
            initial={{width: 0}} 
            animate={{width: "100vw"}} 
            exit={{ x: "100%" }}
        >
            <Header userId={userSectionId}/>
            <MenuButton id={user?._id?.$oid} openModal={() => handlePopUpScreen(true)}/>
            
        </Container>
    )
}