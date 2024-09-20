import Image from "next/image";
import { Heart, TrashSimple } from "phosphor-react";
import { 
    CommentaryDetail, 
    CommentaryImage, 
    CommentaryInfo, 
    CommentaryProfile, 
    Container, 
    Content, 
    IconsArea
} from "./style";

//import Image01 from "../../Assets/photographer-profile.png";
import { pallete } from "../../styles/colors";
import {  useState } from "react";
import { Comment } from "../../profile/photographer/[id]/post/[post]/page";
import { parseCookies } from "nookies";
import { formatDate } from "../../utils/formatData";

interface CommentaryCardProps {
    id: string;
    like: boolean;
    content: Comment;
    incrementLikes: (commentaryId: string) => void;
    deleteCommentary: (commentaryId: string) => void;
}

export function CommentaryCard({id, like, content, incrementLikes, deleteCommentary}: CommentaryCardProps) {

    const [isLikeButtonClicked, setIsLikeButtonClicked] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>();

    let cookies = parseCookies();
    let userSectionId = cookies["ramirez-user-id"];

    return (
        <Container>
            <CommentaryInfo>
                <CommentaryProfile>
                     <CommentaryImage>
                        {profileImage ? (
                            <Image 
                                src={profileImage}
                                width={50}
                                height={50}
                                layout="responsive"
                                objectFit="cover"
                                alt="Foto do usuário"
                            />
                        ) : (
                            <Image 
                                src={"/default-photo-profile.png"}
                                width={50}
                                height={50}
                                layout="responsive"
                                objectFit="cover"
                                alt="Foto do usuário"
                            />
                        )}
                    </CommentaryImage>
                    <CommentaryDetail>
                        <span>{content.user_name}</span>
                        <span>{formatDate(content.created_at)}</span>
                    </CommentaryDetail>
                </CommentaryProfile>
                <IconsArea>
                    <Heart 
                        color={like ? pallete.red : pallete.grayOne} 
                        size={30} 
                        weight="fill"
                        onClick={() => {
                            setIsLikeButtonClicked(!isLikeButtonClicked) 
                            incrementLikes(id)
                        }}
                        style={{cursor: "pointer", transition: "all 0.2s ease"}}
                    />
                    {userSectionId === content.user_id.$oid ? (
                        <TrashSimple 
                            color={pallete.grayOne} 
                            size={30} 
                            weight="fill" 
                            onClick={() => {
                                deleteCommentary(id)
                            }}
                            style={{marginLeft: "1.188rem", cursor: "pointer"}}
                        />
                    ) : (
                        ""
                    )}
                </IconsArea>
            </CommentaryInfo>
            <Content>
               {content?.content}
            </Content>
        </Container>
    )
}