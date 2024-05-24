import React from 'react';
import HomeCard from "../components/HomeCard";
import {Carousel} from "react-bootstrap";
import carousel01 from '../images/carousel_02.jpg';
import carousel02 from '../images/carousel_01.jpg';

function HomePage() {
    const images = [
        {src: carousel01, alt: "Deposit", caption: "Confidently save money with us."},
        {src: carousel02, alt: "Withdraw", caption: "Get your cash anytime, anywhere."},
        // Add more images as needed
    ];

    return (
        <div>
            <Carousel className="image-carousel p-4 mb-2" interval={3000} slide>
                {images.map((image, index) => (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" src={image.src} alt={image.alt}/>
                        <Carousel.Caption>
                            <h3>{image.alt}</h3>
                            <p>{image.caption}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
            <div className="d-flex gap-4 flex-column align-items-center flex-lg-row justify-content-lg-evenly m-4">
                <HomeCard type="Deposit" text="Secure Your Future, Deposit Today!"/>
                <HomeCard type="Withdraw" text="Empower Your Finances, Withdraw with Confidence!"/>
                <HomeCard type="Transfer" text="Send Money To Your Love Ones!"/>
            </div>
        </div>
    );
}

export default HomePage;