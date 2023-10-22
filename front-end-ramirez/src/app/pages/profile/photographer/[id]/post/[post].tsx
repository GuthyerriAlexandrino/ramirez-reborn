import { TrashSimple, Chat, Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import { getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { Header } from "../../../../../components/Header";
import { pallete } from "../../../../../styles/colors";
import { parseCookies } from "nookies";
import { storage, ref } from "../../../../../utils/keys/firebaseconfig";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useNotify } from "../../../../../context/NotifyContext";

interface Post {
    price: number,
    title: string,
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id, post } = context.params!;
    const { ["ramirez-user"]: token } = parseCookies(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            }
        }
    }

    const data: Post = await fetch(`http://localhost:3001/post/${id}/${post}`, {
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        }
    }).then(res => res.json());

    const postContent = {
        price: data.price ?? null,
        title: data.title ?? null,
    }

    return {
        props: {
            postContent,
        },
    }
}

interface PostImage {
    image: string;
}

interface PostScreenProps {
    postContent: Post
}

export interface Comment {
    _id: {
        $oid: string;
    },
    content: string;
    created_at: Date;
    post_id: {
        $oid: string;
    },
    likes: {
        _id: {
            $oid: string
        },
        user_id: {
            $oid: string
        }
    },
    user_id: {
        $oid: string;
    }
}

export default function Post({ postContent }: PostScreenProps) {

    const router = useRouter();

    const [image, setImage] = useState<any>();
    const [userCommentary, setUserCommentary] = useState("");
    const [commentsList, setCommentsList] = useState<Comment[]>([]);

    const {
        notifyError,
        notifySuccess
    } = useNotify();

    let cookies = parseCookies();
    let userSectionId = cookies["ramirez-user-id"];

    async function getImageFromApi() {

        const userId = window?.location.pathname.split("/")[3];
        const postId = window?.location.pathname.split("/")[5];

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const data: PostImage = await fetch(`http://127.0.0.1:3001/post/${userId}/${postId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(result => result.json());

        if (data.image !== undefined) {
            const foresRef = ref(storage, data.image);
            await getDownloadURL(foresRef)
            .then(url => {
                setImage(url)
            })
            .catch(error => console.log(error))
        }
    }

    async function deletePost() {

        const postId = window?.location.pathname.split("/")[5];

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const data: PostImage = await fetch(`http://127.0.0.1:3001/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(result => result.json())
        .catch(error => error.json())

    }

    async function getComments() {
        const postId = window?.location.pathname.split("/")[5];

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const data: Comment[] = await fetch(`http://127.0.0.1:3001/comments/${postId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(result => result.json())
        .catch(error => error.json())

        setCommentsList(data)
    }

    async function sendCommentaryToPost() {

        if (userCommentary === "") {
            notifyError("Error! Comentário está vazio!");
            return;
        }

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const userId = window?.location.pathname.split("/")[3];
        const postId = window?.location.pathname.split("/")[5];

        const newComment = {
            comment: {
                user_id: userId,
                content: userCommentary,
                post_id: postId
            }
        }

        const res: Comment = await fetch("http://127.0.0.1:3001/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newComment)
        }).then(response => response.json())
        .catch(error => console.log(error))

        setCommentsList([...commentsList, res]);
    }

    async function incrementLikeAmountInACommentary(commentaryId: string) {

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const userId = window?.location.pathname.split("/")[3];
        const postId = window?.location.pathname.split("/")[5];

        const incrementLike = {
            comments: {
                post_id: postId,
                author_id: userId,
                id: commentaryId
            }
        }

        const res = await fetch(`http://127.0.0.1:3001/comments_like`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(incrementLike)
        }).then(response => response)
        .catch(error => console.log(error))

        console.log(res)
    }

    async function deleteACommentaryFromPost(commentaryId: string) {

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const commentaryToDelete = {
            comment: {
                post_id: router.query.post,
                author_id: userSectionId
            }
        }

        const deletedComment: Comment = await fetch(`http://127.0.0.1:3001/comments/${commentaryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(commentaryToDelete)
        }).then(response => response.json())
        .catch(error => console.log(error))

        console.log(deletedComment)

        setCommentsList(commentsList.filter(data => data?._id?.$oid !== deletedComment?._id?.$oid))
    }

    useEffect(() => {
        getImageFromApi()
        getComments()
    }, [commentsList?.length])

    return (
        <Container>
            <Header userId={userSectionId}/>

        </Container>
    )
}