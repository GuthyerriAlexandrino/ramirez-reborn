"use client"
import { Container} from "./style";

export default function HomePage() {
    return (
        <Container 
            initial={{width: 0}} 
            animate={{width: "100%"}} 
            exit={{ x: 100, transition: { duration: 0.6 } }}>
            oi
        </Container>
    )
}