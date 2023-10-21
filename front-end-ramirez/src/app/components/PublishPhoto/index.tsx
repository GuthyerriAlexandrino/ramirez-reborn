import { 
  FormArea,
  InputContainer,
  InputValue,
  InputFileLabel,
  InputFile,
  FormAreaContainer, 
  PopupContainer,
  Typography,
  ButtonSubmit,
  IconArea,
  IconContainer,
  PreviewImage,
  Icon
} from "./style";

import { FilePlus, Minus, Plus, XCircle } from "phosphor-react";
import { pallete } from "../../styles/colors";
import { FormEvent, useState } from "react";
import Image from "next/image";
import { parseCookies } from "nookies";
import { formatBytes } from "../../utils/formatBytes";
import { useNotify } from "../../context/NotifyContext";
import { useRouter } from "next/router";

type PublishPhotoProps = {
  handlePopUp: (value: boolean) => void;
}

export function PublishPhoto({handlePopUp}: PublishPhotoProps) {
  const [photoImageContent, setPhotoImageContent] = useState<File>();
  const [photoPrice, setPhotoPrice] = useState<number | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const router = useRouter();

  const {
      notifyError,
      notifySuccess
  } = useNotify();

  async function addNewPost(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      if (!verifyIfSizesImageIsValid()) {
          notifyError("Falha ao postar conteúdo! Tamanho da imagem é maior que 2 MB!")
          return;
      }

      const imageData = new FormData();
      imageData.append('image', photoImageContent!)
      imageData.append('title', photoTitle)
      if (photoPrice! > 0) {
          imageData.append('price', photoPrice?.toString()!)
      }

      let cookies = parseCookies();
      let token = cookies["ramirez-user"]
      let userSectionId = cookies["ramirez-user-id"]
      
      // futura integração
      const res = await fetch("", {}).then(response => response)
      .catch(error => error.json())

      if (res.error) {
          notifyError("Não foi possível enviar a imagem. Verifique os campos!")
      }
      notifySuccess("Postagem enviada com sucesso!");
      handlePopUp(false);
      router.push(`/profile/photographer/${userSectionId}`)
      console.log(res)
  }

  function verifyIfSizesImageIsValid() {
      const {value, sizes} = formatBytes(photoImageContent?.size!);

      if (sizes === "mb" && value > 2) {
          return false;
      }
      return true;
  }

  return (
      <PopupContainer>
          <FormAreaContainer>
              <IconArea onClick={() => handlePopUp(false)}>
                  <XCircle color={pallete.red} weight="fill" size={40} />
              </IconArea>
              <Typography>Postar uma nova foto</Typography>
              <FormArea 
                  action="http://localhost:3001" 
                  encType="multipart/form-data"
                  method="post" 
                  onSubmit={addNewPost}
              >
                 
                  <ButtonSubmit type="submit">Postar foto</ButtonSubmit>
              </FormArea>
          </FormAreaContainer>            
      </PopupContainer>
  )
}