"use client"
import { Container, Header, HeaderContent, LogoImage, MenuContainer, Button, MenuIcon, Main,  Services} from "./style";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoHome from "../../assets/logo-home.svg";
import { List, X } from "phosphor-react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { Slider } from "../../components/Slider";

let easing = [0.6, -0.05, 0.01, 0.99];

export default function HomePage() {
    const [menuIsActive, setMenuIsActive] = useState(false);
    const { ref, inView } = useInView();
    const animation = useAnimation();

    useEffect(() => {
        if (inView) {
            animation.start({
                y: 0,
                opacity: 1,
                transition: {
                    duration: 0.8,
                    ease: easing,
                }
            })
        } else {
            animation.start({
                y: 30,
                opacity: 0,
                transition: { duration: 0.6, ease: easing }
            });
        }
    }, [animation, inView])

    return (
        <Container 
            initial={{width: 0}} 
            animate={{width: "100%"}} 
            exit={{ x: 100, transition: { duration: 0.6 } }}
        >
            <MenuIcon onClick={() => setMenuIsActive(!menuIsActive)}>
                {menuIsActive ? (
                    <X size={40} />
                ) : (
                    <List size={40}/>
                )}
            </MenuIcon>
            <Header toggleMenu={menuIsActive}>
                <HeaderContent>
                    <LogoImage />
                    <MenuContainer>
                        <ul>
                            <li>
                                <Button>Sobre</Button>
                            </li>
                            <li>
                                <Link href="/login">
                                    <Button>Log-in</Button>
                                </Link>
                            </li>
                            <li>
                                /
                            </li>
                            <li>
                                <Link href="/signup">
                                    <Button background={true}>
                                        Sign-up
                                    </Button>
                                </Link>
                            </li>
                        </ul>
                    </MenuContainer>
                </HeaderContent>
            </Header>
            <Main>
                <motion.div>
                    <Image alt={"logo"} src={logoHome}/>
                </motion.div>
                <Slider/>
            </Main>
        </Container>
    )
}