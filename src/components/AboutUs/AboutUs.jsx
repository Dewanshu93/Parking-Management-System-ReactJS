import React from 'react';
import Navbar from "../Navbar/Navbar"
import "./AboutUs.css"
import OnScrollSlider from "../OnScrollSlider/OnScrollSlider";

function AboutUs(props) {
    return (
        <>
            <div className='aboutUsContainer'>
            <Navbar/>
            <div className='contentContainer'>
                <OnScrollSlider />
                <div className='aboutContainer'>
                    <h1 className='head10'>About me</h1>
                    <p className='para10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem iure cumque harum cupiditate? Recusandae quia adipisci nemo dolorum quam ut, doloribus nulla maxime corrupti, repellendus quaerat fugit aperiam placeat voluptates.</p>
                </div>
            </div>
            </div>
        </>
    );
}

export default AboutUs;