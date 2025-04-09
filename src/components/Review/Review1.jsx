import React from 'react';
import passportPhoto from "./Images/passportsizephoto.jpg"

function Review1(props) {
    return (
        <>
            <div className='reviewDashboard'>
                            <h1 className='head19'>"</h1>
                            <div className='reviewDetails'>
                                <p className='para19'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam accusamus soluta consectetur adipisci veritatis consequatur accusantium dolorum distinctio maxime qui sunt sit animi expedita incidunt corrupti dolorem, quis aut hic atque tempore tenetur dicta voluptate magni? Deserunt quae vero molestias! Labore corrupti recusandae est minima, error commodi aut quibusdam fugiat? Laborum atque sint, quos sunt officia quam aliquid! Tempore, laudantium!</p>
                                <hr className='hr2'/>
                                <p className='para19'>
                                    Post on 21 March 2021
                                </p>
                            </div>
                        </div>
                        <div className='profileContainer'>
                            <img src={passportPhoto} alt="" className='img10'/>
                            <div className='profileNameContainer'>
                                <h2 className='head20'>Julio Robert</h2>
                                <p className='para20'>Digital marketing Execuetive</p>
                            </div>
                        </div>
        </>
    );
}

export default Review1;