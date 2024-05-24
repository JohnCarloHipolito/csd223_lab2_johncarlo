import {Col, Container, Image, Row} from 'react-bootstrap';
import appStore from '../images/app_store.png';
import googlePlay from '../images/google_play.png';
import icon_facebook from "../images/icon_facebook.png";
import icon_instagram from "../images/icon_instagram.png";
import icon_youtube from "../images/icon_youtube.png";
import icon_tiktok from "../images/icon_tiktok.png";
import icon_twitter from "../images/icon_twitter.png";
import React from "react";

function Footer() {
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h5>Resources</h5>
                    <ul>
                        <li><a href="/">Help Center</a></li>
                        <li><a href="/">Learning Center</a></li>
                        <li><a href="/">Contact Us</a></li>
                        <li><a href="/">ABM Locator</a></li>
                        <li><a href="/">Rates</a></li>
                    </ul>
                </Col>
                <Col md={3}>
                    <h5>About Us</h5>
                    <ul>
                        <li><a href="/">Who We Are</a></li>
                        <li><a href="/">Awards</a></li>
                        <li><a href="/">Partnerships</a></li>
                        <li><a href="/">Careers</a></li>
                    </ul>
                </Col>
                <Col md={3}>
                    <h5>Connect to Us</h5>
                    <ul>
                        <li><a href="/">Who We Are</a></li>
                        <li><a href="/">Awards</a></li>
                        <li><a href="/">Partnerships</a></li>
                        <li><a href="/">Careers</a></li>
                    </ul>
                </Col>
                <Col md={3}>
                    <h5>Download The App</h5>
                    <ul className="list-unstyled">
                        <li><a href="/"><Image src={appStore} alt="App Store" height="50px"/></a></li>
                        <li><a href="/"><Image src={googlePlay} alt="Google Play" height="50px"/></a></li>
                    </ul>
                </Col>
            </Row>
            <Row>
                <Col className="text-md-center mt-2">
                    <a href="/" className="p-2"><Image src={icon_facebook} alt="Facebook" height="30px"/></a>
                    <a href="/" className="p-2"><Image src={icon_instagram} alt="Instagram" height="30px"/></a>
                    <a href="/" className="p-2"><Image src={icon_youtube} alt="YouTube" height="30px"/></a>
                    <a href="/" className="p-2"><Image src={icon_tiktok} alt="TikTok" height="30px"/></a>
                    <a href="/" className="p-2"><Image src={icon_twitter} alt="Twitter" height="30px"/></a>
                </Col>
            </Row>
            <Row>
                <Col className="text-center mt-4">
                    <p>&copy; 2024 Tangerine</p>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;