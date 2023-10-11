import { useState } from "react";
import { 
    Container,
    LogInAside,
    ExternaltLink,
    Divider,
    RegisterLink,
} from "./styles";
import { 
    Button, 
    FormBody, 
    Icon, 
    InputContainer 
} from "../../styles/form";
import Logo from "../../assets/logo.svg";
import Password from "../../assets/password.svg";
import Email from "../../assets/email.svg";
import EyeVisible from "../../assets/ant-design-eye-visible.svg"
import EyeInvisible from "../../assets/ant-design_eye-invisible-filled.svg"

import Link from "next/link";
import Image from "next/image";
import { useAuthLogin } from "../../context/AuthContext";
import { makeFadeInRightAnimation, stagger } from "../../utils/animations";


export default function LogIn()  {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);

    const {
        handleLogin,
    } = useAuthLogin();

    function handleVisiblePassword() {
        setVisible(!visible);
    }

    async function handleSubmit(event: any) {
        event.preventDefault();
        await handleLogin({email, password});
    }
}