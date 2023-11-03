import Image from "next/image";
import { Header } from "../../components/Header";


import { 
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
        </Container>
    )
}