"use client"
import { Container, Header, HeaderContent, LogoImage, MenuContainer, Button, MenuIcon } from "./style";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { List, X } from "phosphor-react";

export default function HomePage() {
    const [menuIsActive, setMenuIsActive] = useState(false);

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
        </Container>
    )
}