import React, { useState } from "react"
import SlideOne from "../../assets/sliderOne.jpg"
import SlideTwo from "../../assets/sliderTwo.jpg"
import SlideThree from "../../assets/sliderThree.jpg"
import LeftArrow from "../../assets/leftArrow.svg"
import RightArrow from "../../assets/rightArrow.svg"
import { 
  ArrowSliderLeft, 
  ArrowSliderRight, 
  Container, 
} from "./style"

const imagesSlide = [
    {
        image: SlideOne,
    },
    {
        image: SlideTwo,
    },
    {
        image: SlideThree,
    }
]

export const Slider = () => {
    const [current, setCurrent] = useState(0);
    const length = imagesSlide.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    }

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    }
    
    if (!Array.isArray(imagesSlide) || imagesSlide.length <= 0) {
        return null;
    }

    return (
        <Container>
            <ArrowSliderLeft alt={"arrow"} src={LeftArrow} height={50} width={50} onClick={prevSlide}/>
            {imagesSlide.map((slide, index) => {
                return (
                    <div>test</div>
                )
            })}
            <ArrowSliderRight alt={"arrow"}  src={RightArrow}  height={50} width={50} onClick={nextSlide}/>
        </Container>
    )
}