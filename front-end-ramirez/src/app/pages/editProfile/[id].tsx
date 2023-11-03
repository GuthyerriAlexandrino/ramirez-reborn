import Image from "next/image";
import { Header } from "../../components/Header";


import { 
    Camera, 
    FilePlus,
    User,
    XCircle 
} from "phosphor-react";
import { pallete } from "../../styles/colors";

export default function EditProfile() {

    return (
        <Container
            initial='initial' 
            animate='animate' 
        >
            <Header userId={"user-id"}/>
            <ModalChangeImageContainer isActive={true}>
                <ModalChangeImage>
                    <div data-name="photoEditImage">
                        <Image
                            src={""} 
                            objectFit="cover"
                            width={100} 
                            height={100}
                            alt={"Foto de perfil"}
                        />
                        <IconEdit>
                            <FilePlus size={15} weight="bold" />
                        </IconEdit>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            placeholder="Insira aqui uma foto"
                            accept=".jpg,.jpeg,.png"
                            onChange={() => {})}
                        />
                    </div>
                    <div data-name="photoImageContent">
                        <strong>User Name</strong>
                    </div>
                    <small data-name="photoImageSpan">Personalizando meu perfil</small>
                    <button 
                        type="button" 
                        onClick={() => {}}
                    >
                        Alterar foto
                    </button>
                    <IconExclude onClick={() => {}}>
                        <XCircle color={pallete.red} size={40} weight="fill" />
                    </IconExclude>
                </ModalChangeImage>
            </ModalChangeImageContainer>
            <EditFormContainer variants={makeFadeInRightAnimation()}>
                <EditForm onSubmit={() => {}}>
                    <ProfileBasicInfo>
                        <ProfileImage onClick={() => {}}>
                            <Image 
                                src={""} 
                                objectFit="cover"
                                width={150} 
                                height={150}
                                alt={"Foto de perfil"}
                            />
                            <UpdateImage>
                                <Camera color={pallete.grayThree} size={30} weight="fill" />
                            </UpdateImage>
                        </ProfileImage>
                        <h2>User name</h2>
                    </ProfileBasicInfo>
                    <Button type="submit">Confirmar</Button>
                </EditForm>
            </EditFormContainer>
        </Container>
    )
}