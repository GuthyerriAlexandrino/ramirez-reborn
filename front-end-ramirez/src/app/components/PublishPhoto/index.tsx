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
