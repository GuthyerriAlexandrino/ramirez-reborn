"use client"
import { Container, Header, HeaderContent, LogoImage, MenuContainer, Button, MenuIcon, Main, Services, ServiceCardArea, ServiceCard } from "./style";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoHome from "../../assets/logo-home.svg";
import logo from "../../assets/logo.svg";
import Icon1 from "../../assets/icon1.svg";
import Icon2 from "../../assets/icon2.svg";
import Icon3 from "../../assets/icon3.svg";
import { List, X } from "phosphor-react";
import { useInView } from "react-intersection-observer";
import { useAnimation, motion } from "framer-motion";
import { Slider } from "../../components/Slider";
import { makeFadeInUptAnimation, stagger } from "@/app/utils/animations";

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
            initial={{width: 0, opacity: 0}} 
            animate={{width: "100%", opacity: 1}} 
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
                    <LogoImage>
                        <Image 
                            src={logo}
                            width={123}
                            height={40}
                            objectFit="contain"
                            alt=""
                        />
                    </LogoImage>
                    
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
                <motion.div variants={makeFadeInUptAnimation()}>
                    <Image alt={"logo"} src={logoHome}/>
                </motion.div>

                <Slider/>
                
                <Services>
                    <motion.h1 animate={animation}>Serviços</motion.h1>
                    <ServiceCardArea variants={stagger} ref={ref}>
                        <ServiceCard animate={animation} >
                            <Image src={Icon1} alt="" />
                            <div>
                                <h3>Construa seu portfólio</h3>
                                <p>Adicione os seus trabalhos em nosso site e inicie o seu portfólio para adquirir novos clientes</p>
                            </div>
                        </ServiceCard>
                        <ServiceCard animate={animation} >
                            <Image src={Icon2} alt="" />
                            <div>
                                <h3>Pesquise por profissionais</h3>
                                <p>Busque por profissionais de diversas áreas e que atenda as suas necessidades</p>
                            </div>
                        </ServiceCard>
                        <ServiceCard animate={animation} >
                            <Image src={Icon3} alt="" />
                            <div>
                                <h3>Indique o seu valor tipo de serviço</h3>
                                <p>Informe aos futuros clientes o seu modo de trabalho e o seu valor de serviço</p>
                            </div>
                        </ServiceCard>
                    </ServiceCardArea>
                </Services>
            </Main>
        </Container>
    )
}