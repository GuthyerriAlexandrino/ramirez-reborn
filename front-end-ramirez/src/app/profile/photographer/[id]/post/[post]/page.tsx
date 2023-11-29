"use client"
import { 
    Container, 
    ContentFooter, 
    FeedBackArea, 
    FeedBackList, 
    IconsArea, 
    PostContainer, 
    PostArea,
    PostContent, 
    PostImage,
    CommentaryInputContainer,
    CommentaryInput,
    CommentaryButton,
    PostLoading
} from "./style";

import { TrashSimple, Chat, Heart } from "phosphor-react";
import { useEffect, useState } from "react";
import { getDownloadURL } from "firebase/storage";
import Image from "next/image";
import { Header } from "../../../../../components/Header";
import { Loading } from "../../../../../components/Loading";
import { CommentaryCard } from "../../../../../components/ComentaryCard";
import { parseCookies } from "nookies";
import { storage, ref } from "../../../../../utils/keys/firebaseconfig";
import { useParams, useRouter } from "next/navigation";
import { useNotify } from "../../../../../context/NotifyContext";
import { pallete } from "../../../../../styles/colors";
import { UserP } from "@/app/search/page";

interface Post {
    price: number,
    title: string,
}

interface PostImage {
    image: string;
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
    likes: [],
    user_id: {
        $oid: string;
    },
    user_name: string
}

export default function Post() {
    const router = useRouter();
    const { id, post } =  useParams();
    const [image, setImage] = useState<any>();
    const [postContent,  setPostContent] = useState<Post>({} as Post) ;
    const [userCommentary, setUserCommentary] = useState("");
    const [commentsList, setCommentsList] = useState<Comment[]>([]);

    const {
        notifyError,
        notifySuccess
    } = useNotify();

    let cookies = parseCookies();
    let userSectionId = cookies["ramirez-user-id"];
    let token = cookies["ramirez-user"];

    async function getPost() {
        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                }
            }
        }

        const data: Post = await fetch(`http://127.0.0.1:3001/post/${id}/${post}`, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json());

        const currentPostContent = {
            price: data.price ?? null,
            title: data.title ?? null,
        }

        setPostContent(currentPostContent);      
    }

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

        router.push(`/profile/photographer/${userSectionId}`);
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

        console.log("commentsList", commentsList);
        setCommentsList(data)
    }

    async function sendCommentaryToPost() {
        setUserCommentary(null);

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
            comment: {
                post_id: postId,
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

        getComments();
    }

    async function deleteACommentaryFromPost(commentaryId: string) {

        let cookies = parseCookies();
        let token = cookies["ramirez-user"];

        const deletedComment: Comment = await fetch(`http://127.0.0.1:3001/comments/${commentaryId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then(response => response.json())
        .catch(error => console.log(error))

        getComments();
        // setCommentsList(commentsList.filter(data => data?._id?.$oid !== deletedComment?._id?.$oid))
    }

    useEffect(() => {
        getImageFromApi()
        getComments()
    }, [postContent, commentsList?.length])

    useEffect(() => {
        getPost();
    }, [])

    return (
        <Container>
            <Header userId={userSectionId}/>
            <PostContainer>
                <PostArea>
                    <PostContent>
                        {image ? (
                            <PostImage>
                                <Image 
                                    src={image}
                                    alt={"Imagem da postagem"}
                                    width={"100"}
                                    height={"50"}
                                    layout="responsive"
                                    objectFit="cover"
                                />
                            </PostImage>
                        ) : (
                            <PostLoading>
                                <Loading/>
                            </PostLoading>
                        )}
                        <ContentFooter>
                            <span>
                                {postContent.title}
                                {postContent.price ? ` - R$ ${postContent.price}` : ""}
                            </span>
                            <IconsArea>
                                {userSectionId === id &&
                                    <TrashSimple 
                                        color={pallete.grayOne} 
                                        size={30} 
                                        weight="fill"
                                        style={{cursor: "pointer"}}
                                        onClick={() => deletePost()}
                                    />
                                }
                            </IconsArea>
                        </ContentFooter>
                    </PostContent>
                    <CommentaryInputContainer>
                        <CommentaryInput
                            placeholder="Escreva aqui o seu comentário"
                            cols={50}
                            minLength={0}
                            maxLength={500} 
                            value={userCommentary}
                            onChange={(event) => setUserCommentary(event.target.value)}
                        />
                        <CommentaryButton
                            type="button"
                            title="Clique para comentar"
                            value={"Comentar"}
                            onClick={() => sendCommentaryToPost()}
                        >
                            Comentar
                        </CommentaryButton>
                    </CommentaryInputContainer>
                    <FeedBackArea>
                        <h2>Comentários ({commentsList?.length})</h2>
                        <FeedBackList>
                            {commentsList?.map(comment => (
                                <CommentaryCard
                                    like={!!comment?.likes?.filter((user) => user.user_id?.$oid === userSectionId )}
                                    content={comment}
                                    key={comment._id.$oid}
                                    id={comment._id.$oid}
                                    incrementLikes={incrementLikeAmountInACommentary}
                                    deleteCommentary={deleteACommentaryFromPost}
                                />
                            ))}
                        </FeedBackList>
                    </FeedBackArea>
                </PostArea> 
            </PostContainer>
        </Container>
    )
}